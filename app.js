var port        = 3000;
var express     = require("express");
var app         = express();
var mongoose = require('mongoose');
var Advice = require('./model/advice')( mongoose);

/**
 *  Configuration express application
 */
app.use(express.static('public'));
app.use(express.limit('1mb'));
app.use(express.bodyParser());


/**
 *  Setup routes
 */
app.get('/advice/:id', function(req, res) {
    if (req.params.id == 'random') {
        Advice.getRandomAdvice(req.query.lastId, function (data) {
            if (data) {
                res.send(data);
            } else {
                res.send(404);
            }
        });
    } else {
        Advice.getAdvice(req.params.id, function (data) {
            if (data) {
                res.send(data);
            } else {
                res.send(404);
            }
        });
    }
});

app.post('/advice', function(req, res) {
    Advice.addAdvice(req.body.text);
    res.send(200);
});


/**
 *  Run application
 */
mongoose.connect('mongodb://localhost:27017/motivator', function(error) {
    if (error) {
        console.log('Mongoose.connect error: ' + error);
        return;
    }

    console.log('Connected to mongodb');

    Advice.init(function (error) {
        if (error) {
            console.log(error);
            return;
        }
        //'process.env.PORT' for run in Cloud9
        app.listen(process.env.PORT || port);
        console.log('Listening on port ' + port);
    });

});

function getMongodbURL() {
    if (process.env.VCAP_SERVICES) {
        var mongo = JSON.parse(process.env.VCAP_SERVICES)['mongodb-1.8'][0]['credentials'];
    }
    
    if (!mongo) {
        mongo = {
            "hostname":"localhost",
            "port":27017,
            "db":"finance"
        }
    }
    
    var result = 'mongodb://';
    if (mongo.username && mongo.password) {
         result += mongo.username + ":" + mongo.password + "@";
    }
    
    return result + mongo.hostname + ":" + mongo.port + "/" + mongo.db;
}
