require('dotenv').config();
const axios = require('axios');
const apiKey = process.env.PLANT_API_KEY;
const multer = require('multer');
const upload = multer({ dest: __dirname + '/uploads/images' });
const vision = require('@google-cloud/vision');


module.exports = function (app) {

    /* GET plants By name */
    app.post('/plants/name/:name', function (req, res, next) {

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
    app.post('/plants/id/:id', function (req, res, next) {
        console.log("inside /plants/id");

        const plantId = req.params.id;

        console.log(plantId);

        if (plantId) {
            console.log("inside search find plant id");
            const term = `/${plantId}`;
            const token = `?token=${apiKey}`;
            const endPoint = 'https://trefle.io/api/plants' + term + token;
            console.log(endPoint);
            axios.get(endPoint).then(result => {
                console.log(result.data);
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

            const imagePath = './routes/uploads/images/' + imageFilePath.filename;
            detectImage(imagePath).then(descriptions => {
                
                res.json({ image: imagePath, labels: descriptions });
            }).catch(error => {
                throw error;
            });

        } else {
            throw error;
        }

    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    });

};







