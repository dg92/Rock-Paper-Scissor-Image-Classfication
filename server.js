var express = require('express');
var path = require('path');
const multer = require('multer');

var bodyParser = require('body-parser');
const tf =  require('@tensorflow/tfjs');
const tfn =  require('@tensorflow/tfjs-node');
// Tha app!
var app = express();

// Load your trained model
const MODEL_PATH = __dirname + '/python/tensor_model/model.json';
const handler = tfn.io.fileSystem(MODEL_PATH);
let model;

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({dest: '/tmp'}).any());

app.get('/', (req, res) => {
    res.sendFile('/index.html');
});

app.post('/predict', (req, res) => {
  console.log(req);
})

app.get('*', (req, res) => {
  res.send('NOT FOUND')
})

app.listen(5000, async () => {
    model = await tf.loadLayersModel(handler);
    console.log('Model loaded. Start serving...');
    console.log(`Server listening on port ${5000}!`)
})