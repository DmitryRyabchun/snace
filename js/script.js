$(document).ready(function () {

    function createField(width, height) {
        for (var i = 0; i < height; i++) {
            $('.note').append('<div class = "note-line"></div>');
        }
        for (i = 0; i < width; i++) {
            $('.note-line').append('<div></div>');
        }
    }

    function randomColor() {
        $('.note-line>div').hover(function () {
            var randomcolor = '#'+((1<<24)*Math.random()|0).toString(16);
            $(this).css('background', randomcolor);
        });
    }

    createField(16, 16);
    randomColor();
    $('#reset').click(function () {
        $('.setting-container').css('height', '100%', 'overflow', 'none');
    });
    $('#submit').click(function () {
        $('.setting-container').css('height', '0', 'overflow', 'hidden');
        $('.note-line>div').css('background-color', 'red');
        $('.note-line>div').remove();
        $('.note-line').remove();
        var width = document.size.size_width.value,
            height = document.size.size_height.value;
        createField(width, height);
        randomColor();
    });
});