const mongoose = require('mongoose');


//Specify the attributes collected for each feature in the database
var featureSchema = new mongoose.Schema({
    feature_title: {
        type: String,
        required: 'This field is required.'
    },
    feature_content: {
        type: String,
        required: 'This field is required.'
    },
    coordinates_1: {
        type: String,
        required: 'This field is required.'
    },
    coordinates_2: {
        type: String,
        required: 'This field is required.'
    },
    link: {
        type: String,
        required: 'This field is required.'
    },
    rotation: {
        type: String,
        required: 'This field is required.'
    }
});


mongoose.model('Feature', featureSchema);
