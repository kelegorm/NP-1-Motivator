$('#btnNext').click(next);

function next() {
    $('#message').addClass('loading');
    $.getJSON('/advice/random', function(data) {
        $('#message').html(data.message);
        $('#message').removeClass('loading');
    });
}

next();