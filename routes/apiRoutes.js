require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.PLANT_API_KEY;
const multer = require('multer');
const upload = multer({ dest: __dirname + '/uploads/images' });
const vision = require('@google-cloud/vision');
const path = require('path');
const db = require("../models");



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

    app.get("/api/livegauge/", function (req, res) {

        var type = req.params.type.toLowerCase();
        var deviceId = parseInt(req.params.deviceId);

        if (typeof deviceId !== 'number') {
            return;
        }
        var sqlQuery = "";
        var column = "";

        if (type === "moisture") {
            column = "moisture";
        }
        if (type === "light") {
            column = "light";
        }
        if (type === "temperature") {
            column = "sensorTempFehr";
        }
        if (type === "rain") {
            column = "precipIntensity";
        }
        if (type === "humidity") {
            column = "humidity";
        }
        if (type === "windSpeed") {
            column = "windSpeed";
        }
        if (type === "waterison") {
            column = "isWatering";
        }

        sqlQuery += "SELECT `" + column + "` ";
        sqlQuery += "FROM LiveStats ";
        sqlQuery += "WHERE DeviceId=" + deviceId + " ";
        sqlQuery += "ORDER BY timeStamp DESC ";
        sqlQuery += "LIMIT 1;";

        db.sequelize
            .query(sqlQuery, { type: db.sequelize.QueryTypes.SELECT })
            .then(function (data) {
                temp = 0;
                if (type === "moisture") {
                    temp = parseInt(data[0].moisture).map(0, 1023, 0, 100).toString();
                    data[0].moisture = temp;
                }
                if (type === "light") {
                    temp = parseInt(data[0].light).map(0, 1023, 0, 100).toString();
                    data[0].light = temp;
                }
                console.log(data);

                res.json(data);
            })
            .catch(function (err) {
                console.log(err);
                res.status(400).end();
            });
    });









};





