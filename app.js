var port        = 3000;
var express     = require("express");
var app         = express();
var mongoose = require('mongoose');
var Advice = require('./model/advice')( mongoose);

var adviceCount = 0;

/**
 *  Configuration express application
 */
app.use(express.static('public'));


/**
 *  Setup routes
 */
app.get('/advice/random', function(req, res) {
    var number = Math.floor(Math.random * adviceCount);
    Advice.getAdvice(number, function (data) {
        res.send(data);
    });
});


/**
 *  Run application
 */
mongoose.connect('mongodb://testuser:testpassword@widmore.mongohq.com:10010/demo1', function(error) {
    if (error) {
        console.log('Mongoose.connect error: ' + error);
        return;
    }

    console.log('Connected to mongodb');

    Advice.model.count(function (error, count) {
        if (error) {
            console.log('Advice.count error: ' + error);
            return;
        }

        adviceCount = count;
        console.log('Count of advices: ' + adviceCount);

        //'process.env.PORT' for run in Cloud9
        app.listen(process.env.PORT || port);
        console.log('Listening on port ' + port);
    });

});
