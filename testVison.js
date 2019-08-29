require('dotenv').config();



async function detectImage(){

    const vision = require('@google-cloud/vision');
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection("./plant.jpg");
    const labels = result.labelAnnotations;
    let descriptions = [];
    labels.forEach(label => descriptions.push(label.description));
    return descriptions;
}

detectImage().then(results => {
    console.log(results);
});