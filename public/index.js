$('#btnNext').click(next);

function next(event) {
    if (event) {
        event.preventDefault();
    }
    $('#message').addClass('loading');
    $.getJSON('/advice/random', function(data) {
        $('#message').html(data.text);
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

