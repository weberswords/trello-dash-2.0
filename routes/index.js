var express = require('express');
var router = express.Router();
var trelloService = require('../services/trelloService');


router.get('/', function(req, res) {

    trelloService.getLabelCount((error, data)=>{

        if (error != null) {
            res.render('error', {error: error})
        } else {

            console.log('this is what the data object looks like')
            console.log(data)

            res.render('index', {
                title: 'Development Dashboard',
                data: data
            });
        }
    });


});

module.exports = router;
