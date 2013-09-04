module.exports = function(mongoose) {
    var AdviceSchema = new mongoose.Schema({
        text: { type: String, required: true }
    });

    var _count = 0;

    var Advice = mongoose.model('Advice', AdviceSchema);

    var getAdvice = function (number, callback) {
        Advice.findOne({number: number}, function (error, advice) {
            if (error) {
                callback(null);
                return;
            }

            callback(advice);
        });
    };

    var getRandomAdvice = function (lastId, callback) {
        if (_count == 0) {
            callback(null);
            return;
        }

        var skipCount = Math.floor(Math.random() * (_count-1));
        var query = (lastId)?{_id: { $ne: lastId }}:{};
        Advice.findOne(query).skip(skipCount).exec(function (error, advice) {
            if (error) {
                console.log(error, lastId);
                callback(null);
                return;
            }

            callback(advice);
        });
    }

    var addAdvice = function(text, callback) {
        var newAdvice = new Advice({text: text, number: _count});
        newAdvice.save(function (error) {
            if (error) {
                console.log('addAdviceError:' + error);
                return;
            }
            init();
        });
    };

    var init = function (callback) {
        Advice.count(function (error, count) {
            if (error) {
                console.log('Advice.count error: ' + error);
                callback(error);
                return;
            }

            _count = count;
            if (callback) {
                callback();
            }
        });
    };

    var getCount = function () {
        return _count;
    };

    return {
        model:Advice,
        init:init,
        getAdvice: getAdvice,
        getRandomAdvice: getRandomAdvice,
        addAdvice: addAdvice,
        getCount : getCount
    }
}