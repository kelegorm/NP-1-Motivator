// last advice id
var lastAdvice;


// load new random advice
$('#btnNext').click(next);
function next(event) {
    if (event) {
        event.preventDefault();
    }
    $('#message').addClass('loading');
    var lastId = (lastAdvice)?lastAdvice._id:'';
    $.getJSON('/advice/random', {lastId: lastId}, function(data) {
        lastAdvice = data;
        $('#message').html(lastAdvice.text);
        $('#message').removeClass('loading');
    });
}


// Submit new advice
$('#addAdviceForm').submit(function (event) {
    event.preventDefault();
    $.post('/advice', $(this).serialize());
    $('#addAdviceWindow').modal('hide');
});


// Clear new advice window when show
$('#addAdviceWindow').on('show', function (event) {
    $('#addAdviceForm').find('input[type=text], textarea').val('');
});


// Load first advice after page loaded
next();