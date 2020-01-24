const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Admin2020@dreamheritagedb-pssov.mongodb.net/Sites', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./feature.model');