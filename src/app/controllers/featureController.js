const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Feature = mongoose.model('Feature');

router.get('/', (req, res) => {
    res.render("features/add-modify", {
        viewTitle: "Add Feature"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        console.log("calling update")
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var feature = new Feature();
    feature.feature_title = req.body.feature_title;
    feature.feature_content = req.body.feature_content;
    feature.coordinates_1 = req.body.coordinates_1;
    feature.coordinates_2 = req.body.coordinates_2;
    feature.save((err, doc) => {
        if (!err)
            res.redirect('features/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("features/add-modify", {
                    viewTitle: "Add Feature",
                    feature: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Feature.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('features/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("features/add-modify", {
                    viewTitle: 'Update Feature',
                    feature: req.body
                });
            }
            else
                console.log('Error performing record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Feature.find((err, docs) => {
        if (!err) {
            res.render("features/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving features list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'feature_title':
                body['featureTitleError'] = err.errors[field].message;
                break;
            case 'feature_content':
                body['featureContentError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Feature.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("features/add-modify", {
                viewTitle: "Update Features",
                feature: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Feature.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/features/list');
        }
        else { console.log('Error in feature delete :' + err); }
    });
});

module.exports = router;
