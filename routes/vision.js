require('dotenv').config();
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: __dirname + '/uploads/images' });
const vision = require('@google-cloud/vision');

//imageFilePath
detectImage = async (image) => {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection(image);
    const labels = result.labelAnnotations;
    const descriptions = [];
    labels.forEach(label => {
        descriptions.push(label.description);
    });
    return labels;
};

/* POST vision API */
router.post('/vision', upload.single('image'), (req, res) => {
    if (req.file) {
        const image = req.file;
        detectImage(image).then(labels => {
                res.json({ image: req.file, labels: labels });
        });   
    }
    else throw 'error';
});

module.exports = router;