var rows = 20, col = 20, blockSize = 25;
var board, context;
var foodX, foodY
var snakeX =5*blockSize, snakeY =5*blockSize;
var velocityX = 0, velocityY = 0;
var snakeBody = []
var gameOver = false
var score = document.getElementById("gameScore");

window.onload = function(){
    board = document.getElementById("board");
    board.width = rows*blockSize;
    board.height  = col*blockSize;
    context = board.getContext("2d");
    placeFood();
    document.addEventListener("keyup", changeDirection)
    setInterval(updateBoard, 1000/10);
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY!=1){
        velocityX = 0
        velocityY = -1
    }
    else if(e.code == "ArrowDown" && velocityY!=-1){
        velocityX = 0
        velocityY = 1
    }
    else if(e.code == "ArrowRight" && velocityX!=-1 ){
        velocityX = 1
        velocityY = 0
    }
    else if(e.code == "ArrowLeft" && velocityX!= 1){
        velocityX = -1;
        velocityY = 0;
    }
}

function updateBoard(){
    if(gameOver){
        return;
    }
    
    context.fillStyle = "rgba(0,0,54,0.5)";
    context.fillRect(0,0,board.height, board.width);
    
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY]);
        score++;
        document.getElementById("gameScore").innerHTML = score;
        placeFood();
    }

    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "white";
    snakeX += velocityX*blockSize;
    snakeY += velocityY*blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    
    //if(snakeX == -1*blockSize || snakeY == -1*blockSize) velocityX = 0, velocityY=0

    for(let i=0; i<snakeBody.length; i++){
        context.fillStyle = "rgba(0, 100, 0, 0.8)";
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
        
    }

    if(snakeX < 0 || snakeX > rows*blockSize || snakeY<0 || snakeY > col*blockSize){
        gameOver = true;
        alert("Game Over");
    }
    //if snake strikes its own body
    for(let i = 0; i<snakeBody.length; i++){
        if(snakeBody[i][0] == snakeX && snakeBody[i][1] == snakeY){
            gameOver = true;
            alert("Game Over");
        }
    }

}


function placeFood(){
    foodX = Math.floor(Math.random()*col)*blockSize;
    foodY = Math.floor(Math.random()*rows)*blockSize;
    
}