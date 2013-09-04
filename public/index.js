var lastAdvice;

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

$('#addAdviceForm').submit(function (event) {
    event.preventDefault();
    $.post('/advice', $(this).serialize());
    $('#addAdviceWindow').modal('hide');
});

$('#addAdviceWindow').on('show', function (event) {
    $('#addAdviceForm').find('input[type=text], textarea').val('');
});

next();

