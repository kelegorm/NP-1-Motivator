module.exports = function(mongoose) {
    var AdviceSchema = new mongoose.Schema({
        text: { type: String },
        number: { type: Number, unique: true }
    });

    var Advice = mongoose.model('Advice', AdviceSchema);

    var getAdvice = function (number, callback) {
        Advice.get
    };

    var addAdvice = function(callback) {

    }

    return {
        model:Advice
    }
}