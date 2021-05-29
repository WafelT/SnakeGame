function snakeReady () {
    const canvas = document.getElementById("game-field"); /* announce the game-field */
    const ctx = canvas.getContext("2d"); /* seting the spatial dimension */

            /* VARRIABLES */

    const gameField = new Image();
    gameField.src = "img/default.jpg";

    const foodImg = new Image();
    foodImg.src = "img/food.png";

    let box = 32;

    let score = 0;

    let overInscription = "Game Over";

    let food = { /* writing a random spawn of food */
        x: Math.floor((Math.random() * 42 + 1)) * box, 
        y: Math.floor((Math.random() * 17 + 4)) * box,
    };

    let snake = []; /* set the snake spawn */
    snake[0] = {
        x: 23 * box,
        y: 11 * box
    };

    document.addEventListener("keydown", direction);

    let dir;

            /* END /VARRIABLES */


    function direction(event) {
        if (event.keyCode == 65 && dir != "right")
            dir = "left";
        else if(event.keyCode == 87 && dir != "down")
            dir = "up";
        else if(event.keyCode == 68  && dir != "left")
            dir = "right";
        else if(event.keyCode == 83  && dir != "up")
            dir = "down";
    }

    function eatTail(head, arr) { /* responding for eating of tail */
        for(let i = 0; i < arr.length; i++) {
            if(head.x == arr[i].x && head.y == arr[i].y) {
                clearInterval(game);

                ctx.fillStyle = "#aa0909"; /* Score */
                ctx.font = "100px Century Gothic";
                ctx.fillText( overInscription,box * 14, box * 12.5);
            }
        }
    }

    function drawGame() { /* responding for image drawing */
        ctx.drawImage(gameField, 0, 0);

        ctx.drawImage(foodImg, food.x, food.y);

        for(let i = 0; i < snake.length; i++) { /* draws a head and tail */
            ctx.fillStyle = i == 0 ? "#476935" : "#6d9347";
            ctx.fillRect(snake[i].x, snake[i].y, box, box);
        }

            ctx.fillStyle = "#E5E7E9"; /* Score */
            ctx.font = "63px Century Gothic";
            ctx.fillText(score, box * 8.7, box * 1.95);

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if (snakeX == food.x && snakeY == food.y) { /* accrual a score */
                score++;
            }

            if(snakeX == food.x && snakeY == food.y) { /* set the spawn of food */
                food = {
                    x: Math.floor((Math.random() * 42 + 1)) * box,
                    y: Math.floor((Math.random() * 17 + 4)) * box,
                };
            } else {
                snake.pop();
            }

            if(snakeX < box || snakeX > box * 44 /* set the border of game-field */
                || snakeY < 4 * box || snakeY > box * 20) {
                    clearInterval(game);

                    ctx.fillStyle = "#aa0909"; /* Score */
                    ctx.font = "100px Century Gothic";
                    ctx.fillText( overInscription,box * 14, box * 12.5);
                }

                

                

            /* prescribing the mobility of the snake */
                    if(dir == "left") snakeX -= box;
                    if(dir == "right") snakeX += box;
                    if(dir == "up") snakeY -= box;
                    if(dir == "down") snakeY += box;


                    /* PRESCRIBING EATING SNAKES TAIL */
                
                
            let newHead = { /* prescribing the head of snake */
                x: snakeX,
                y: snakeY
            };

            eatTail(newHead, snake);

            snake.unshift(newHead);
            
        }

        let game = setInterval(drawGame, 100); /* update the timed in 100 miliseconds */
    }

    snakeReady();

    function pageReload () {
        location.reload();
    }




