$(document).ready(function () {

    //Создание поля для игры
    function createField(width, height) {
        for (var i = 0; i < height; i++) {
            $('.field').append('<div id = "field-line_' + i + '" class="field-line"></div>');
            for (var j = 0; j < width; j++) {
                $('#field-line_' + i).append('<div id = "block_' + i + '_' + j + '"></div>');
            }
        }
    }

    //Создание змейки
    function createSnake() {
        for (var i = 0; i < 3; i++) {
            $('#block_' + snake_x[i] + '_' + snake_y[i]).css('background', color_snace);
        }
    }

    //указываем направление движения змейки
    function route(lastTouch) {
        switch (lastTouch) {
            case 37:
                return snake_y[length - 1]--;
            case 38:
                return snake_x[length - 1]--;
            case 39:
                return snake_y[length - 1]++;
            case 40:
                return snake_x[length - 1]++;
        }
    }

//    function stat() {
//        console.log(last_game);
//                console.log(counter);
//                if(counter> last_game) {
//                    $('.best_game').html('<span>' + counter + '</span>');
//                }
//                console.log(last_game);
//                console.log(counter);
//        if(counter !== 0) {
//             $('.last_game').html('<span>' + last_game + '</span>');
//            last_game = counter;
//        }
//    }
    
    //начинает новую игру, если змейка пересекает сама себя
    function Intersection() {
        for (var ind = length - 5; ind >= 0; ind--) {
            if (snake_x[length - 1] === snake_x[ind] && snake_y[length - 1] === snake_y[ind]) {
                $('.field').empty();
                createField(width, height);
//                stat();
                length = 3,
                    snake_x = [0, 1, 2],
                    snake_y = [0, 0, 0],
                    lastTouch = 40,
                    counter = 0;
                $('#counter').html('<span>' + counter + '</span>');
                createSnake();
                coordinatesApple = randomApple();
            }
        }
    }

    //Если змейка выходит за край поля, то появляется на противоположном
    function Overstepping() {
        if (snake_x[length - 1] === width) {
            snake_x[length - 1] = 0;
            $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', color_snace);
        } else if (snake_y[length - 1] === height) {
            snake_y[length - 1] = 0;
            $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', color_snace);
        } else if (snake_x[length - 1] === -1) {
            snake_x[length - 1] = width-1;
            $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', color_snace);
        } else if (snake_y[length - 1] === -1) {
            snake_y[length - 1] = height-1;
            $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', color_snace);
        }
    }

    //змейка перемещается на клетку
    function snakeStep() {
        $('#block_' + snake_x[0] + '_' + snake_y[0]).css('background', '#009999');
        for (var k = 0; k < length - 1; k++) {
            snake_x[k] = snake_x[k + 1];
            snake_y[k] = snake_y[k + 1];
        }
        route(lastTouch);
        Intersection();
        $('#block_' + snake_x[0] + '_' + snake_y[0]).css('background', color_snace);
        $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', color_snace);
        Overstepping();
        eatApple(coordinatesApple[0], coordinatesApple[1]);
    }

    //Генерация рандомного числа в заданом диапазоне
    function randomInteger(min, max) {
        var rand = min + Math.random() * (max - min)
        rand = Math.round(rand);
        return rand;
    }

    //Помещает "яблоко" на случайную клетку
    function randomApple() {
        var indication = true;
        while (indication) {
            var i = randomInteger(0, width-1),
                j = randomInteger(0, height-1),
                intersection = false;
            for (var l = 0; l < length; l++) {
                if (snake_x[l] === i && snake_y[l] === j) {
                    intersection = true;
                }
            }
            if (intersection === false) {
                $('#block_' + i + '_' + j).css('background-color', '#FF7373');
                indication = false;
            }

        }
        return [i, j];
    }

    //змейка сьедает яблоко
    function eatApple(i, j) {
        if (i === snake_x[length - 1] && j === snake_y[length - 1]) {
            length++;
            counter++;
            $('#counter').html('<span>' + counter + '</span>');
            for (var k = length - 1; k >= 0; k--) {
                snake_x[k] = snake_x[k - 1];
                snake_y[k] = snake_y[k - 1];
            }
            if (snake_x[1] == snake_x[2] && snake_y[1] > snake_y[2]) {
                snake_x[0] = snake_x[1];
                snake_y[0] = snake_y[1] + 1;
            } else if (snake_x[1] == snake_x[2] && snake_y[1] < snake_y[2]) {
                snake_x[0] = snake_x[1];
                snake_y[0] = snake_y[1] - 1;
            } else if (snake_y[1] == snake_y[2] && snake_x[1] > snake_x[2]) {
                snake_y[0] = snake_y[1];
                snake_x[0] = snake_x[1] + 1;
            } else if (snake_y[1] == snake_y[2] && snake_x[1] < snake_x[2]) {
                snake_y[0] = snake_y[1];
                snake_x[0] = snake_x[1] - 1;
            }
            coordinatesApple = randomApple();
        }
    }

    //отлавливаем нажатие клавиш
    function keyDown() {
        intervalId = setInterval(snakeStep, speed);
        $('html').keydown(function (eventObject) {
            if (event.keyCode == 38 && lastTouch != 40) {
                lastTouch = 38;
                clearInterval(intervalId);
                intervalId = setInterval(snakeStep, speed);
            } else if (event.keyCode == 40 && lastTouch != 38) {
                lastTouch = 40;
                clearInterval(intervalId);
                intervalId = setInterval(snakeStep, speed);
            } else if (event.keyCode == 37 && lastTouch != 39) {
                lastTouch = 37;
                clearInterval(intervalId);
                intervalId = setInterval(snakeStep, speed);
            } else if (event.keyCode == 39 && lastTouch != 37) {
                lastTouch = 39;
                clearInterval(intervalId);
                intervalId = setInterval(snakeStep, speed);
            }
        });
    }

    var width = 30, height = 30, speed = 100;
    createField(width, height); //создаем поле 30х30
    var length = 3,
        snake_x = [0, 1, 2],
        snake_y = [0, 0, 0],
        lastTouch = 40,
        counter = 0,
        best_game = 0,
        last_game = 0,
        color_snace = '#7AE969';
    createSnake();
    var coordinatesApple = randomApple();
    keyDown();
    eatApple(coordinatesApple[0], coordinatesApple[1]);
});
