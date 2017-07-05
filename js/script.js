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
        $('#block_' + snake_x[2] + '_' + snake_y[2]).css('background', 'orange');
        $('#block_' + snake_x[1] + '_' + snake_y[1]).css('background', 'orange');
        $('#block_' + snake_x[0] + '_' + snake_y[0]).css('background', 'orange');
    }

    //указываем направление движеия змейки
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

    //змейка перемещается на клетку
    function snakeStep() {
        $('#block_' + snake_x[0] + '_' + snake_y[0]).css('background', 'chartreuse');
        for (var k = 0; k < length - 1; k++) {
            snake_x[k] = snake_x[k + 1];
            snake_y[k] = snake_y[k + 1];
        }
        route(lastTouch);
        $('#block_' + snake_x[0] + '_' + snake_y[0]).css('background', 'orange');
        $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', 'orange');
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
        while (indication === true) {
            var i = randomInteger(0, 15),
                j = randomInteger(0, 15),
                intersection = false;
            for (var l = 0; l < length; l++) {
                if (snake_x[l] === i && snake_y[l] === j) {
                    intersection = true;
                }
            }
            if (intersection === false) {
                $('#block_' + i + '_' + j).css('background-color', 'red');
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
            $('#counter').html('<span>'+counter+'</span>');
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
    
    function step() {
        intervalId = setInterval(snakeStep,300);
        $('html').keydown(function (eventObject) { //отлавливаем нажатие клавиш
        if (event.keyCode == 38 && lastTouch != 40) {
            lastTouch = 38;
            clearInterval(intervalId);
            intervalId = setInterval(snakeStep,300);
        } else if (event.keyCode == 40 && lastTouch != 38) {
            lastTouch = 40;
            clearInterval(intervalId);
            intervalId = setInterval(snakeStep,300);
        } else if (event.keyCode == 37 && lastTouch != 39) {
            lastTouch = 37;
            clearInterval(intervalId);
            intervalId = setInterval(snakeStep,300);
        } else if (event.keyCode == 39 && lastTouch != 37) {
            lastTouch = 39;
            clearInterval(intervalId);
            intervalId = setInterval(snakeStep,300);
        }
        if (snake_x[length - 1] === 16) {
            snake_x[length - 1] = 0;
            $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', 'orange');
        } else if (snake_y[length - 1] === 16) {
            snake_y[length - 1] = 0;
            $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', 'orange');
        } else if (snake_x[length - 1] === -1) {
            snake_x[length - 1] = 15;
            $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', 'orange');
        } else if (snake_y[length - 1] === -1) {
            snake_y[length - 1] = 15;
            $('#block_' + snake_x[length - 1] + '_' + snake_y[length - 1]).css('background', 'orange');
        }
    });
    } 

    createField(16, 16); //создаем поле 16х16
    var length = 3;
    snake_x = [0, 1, 2],
        snake_y = [0, 0, 0],
        lastTouch = 40,
        counter = 0;
    createSnake();
    var coordinatesApple = randomApple();
    step();
    eatApple(coordinatesApple[0], coordinatesApple[1]);


});
