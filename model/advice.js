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

    var getRandomAdvice = function (callback) {
        if (_count == 0) {
            callback(null);
            return;
        }

        var skipCount = Math.floor(Math.random() * (_count));
        Advice.findOne().skip(skipCount).limit(1).exec(function (error, advice) {
            if (error) {
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
            _count ++;
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
            callback();
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