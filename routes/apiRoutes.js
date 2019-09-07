require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.PLANT_API_KEY;
const multer = require('multer');
const upload = multer({ dest: __dirname + '/uploads/images' });
const vision = require('@google-cloud/vision');
const { PubSub } = require('@google-cloud/pubsub');
const path = require('path');
const db = require("../models");

// Creates a client
const pubsub = new PubSub();

const subscriptionName = 'iot-subscription';

const subscription = pubsub.subscription(subscriptionName);

// Create an event handler to handle messages

const messageHandler = message => {
 
   
    let m = message.data;


    if (message.data.length > 0) {
        console.log(m.toString());

        let items = m.toString().split(",");

        let dataMessage = {
            
            moisture: items[2],
            light: 0,
            sensorTempFehr: items[0],
            weatherTemp: 0.00,
            precipIntensity: items[4],
            humidity: items[1],
            windSpeed: items[3],
            isWatering: 0
        };
        message.ack();
        db.LiveStats.create(dataMessage)
            .then((data) => {
                console.log(data);
                message.ack();
            })
            .catch(function (err) {
                console.log(err);

            });
    }
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);

const deleteData = () => {
    let sqlQuery = "";
    sqlQuery += "SELECT * FROM LiveStats";
    sqlQuery += " ORDER BY timeStamp DESC LIMIT 1;";

    db.sequelize
        .query(sqlQuery, { type: db.sequelize.QueryTypes.SELECT })
        .then(function (data) {
            let lastRowId = data[0].id;
            db.LiveStats.destroy({
                where: { id: { $notIn: [lastRowId] } }
            }).catch(function (err) {
                console.log(err);
            });
        })
        .catch(function (err) {
            console.log(err);
        });

};


setInterval(deleteData, 60000);



Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
};


module.exports = function (app) {

    /* GET plants By name */
    app.get('/plants/name/:name', function (req, res, next) {

        const plantName = req.params.name;
        if (plantName) {

            console.log("inside search plants");
            const token = `&token=${apiKey}`;
            const term = `?q=${plantName}`;
            const endPoint = 'https://trefle.io/api/plants' + term + token;

            axios.get(endPoint).then(result => {
                res.json(result.data);
            }).catch(error => {
               res.status(401).json(error);
            });

        } else {
            res.status(402).json({ error: "No Plant Name" });
        }


    });

    /* GET plants By id */
    app.get('/plants/id/:id', function (req, res, next) {
        console.log("inside /plants/id");

        const plantId = req.params.id;

        console.log(plantId);

        if (plantId) {
            console.log("inside search find plant id");
            const id = `/${plantId}`;
            const token = `?token=${apiKey}`;
            const endPoint = 'https://trefle.io/api/plants' + id + token;
            console.log(endPoint);
            axios.get(endPoint).then(result => {

                res.json(result.data);
            }).catch(error => {
                console.log(error);
                res.status(401).send(error);
            });

        } else {
            res.status(402).json({ error: "No Plant ID" });
        }

    });

    /* POST vision API */
    app.post('/vision', upload.single('image'), (req, res) => {
        const image = req.file;

        if (image) {

            let detectImage = async (imageFilePath) => {

                const client = new vision.ImageAnnotatorClient();
                const [result] = await client.labelDetection(imageFilePath).catch((err) => { console.log(err); });
                const labels = result.labelAnnotations;
                let descriptions = [];
                labels.forEach(label => {
                    descriptions.push(label.description);
                });

                return descriptions;
            };

            const imagePath = './routes/uploads/images/' + image.filename;
            detectImage(imagePath).then(descriptions => {

                res.json({ image: imagePath, labels: descriptions });
            }).catch(error => {
                throw error;
            });

        } else {
            throw error;
        }

    });


    app.get("/routes/uploads/images/:name", (req, res) => {
        let fname = req.params.name;
        res.sendFile(path.join(__dirname, "./routes/uploads/images/" + fname));
    });


    app.post("/api/live", function (req, res) {
        // var weather = req.body.weather;
        console.log("inside server live Route");

        console.log(req.body);
        var sensorData = req.body;
        if (!("DeviceId" in sensorData)) {
            console.log("bad request - DeviceId not included");
            res.json({ "error": "400" }).end();
        } else {
            console.log(sensorData);
            db.LiveStats.create(sensorData)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    console.log(err);
                    res.json({ "error": "400" }).end();
                });
        }
    });

    app.get("/api/livedata", function (req, res) {
        let sqlQuery = "";
            sqlQuery += "SELECT * FROM LiveStats";
        sqlQuery += " ORDER BY timeStamp DESC LIMIT 1;";

        db.sequelize
            .query(sqlQuery, { type: db.sequelize.QueryTypes.SELECT })
            .then(function (data) {
                console.log(data);
                res.json(data);
            })
            .catch(function (err) {
                console.log(err);
                res.status(400).end();
            });
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    });

};





