//selecting the canvan used in html
 const canvas = document.getElementById('myCanva');
 const context = canvas.getContext("2d");

//buttons
const buttons = document.getElementById("buttons");
const leftcom = document.getElementById("left-com");
const rightcom = document.getElementById("right-com");
const leftuser = document.getElementById("left-user");
const rightuser = document.getElementById("right-user");


 //a function for drawing a rectangle in canvas
 function drawRect(x , y , w , h, color) {
     context.fillStyle = color;
     context.fillRect(x , y , w , h)
 }
 //calling the drawRect function for drawing the rectangle
//  drawRect(0 , 0 , 400 , 600 , 'black');

 
 //paddle for the computer bascically it is a rectangle
 const com = {
     x: canvas.width/2 - 50/2,
     y: 10 , 
     width: 80,
     height: 10,
     color: "white",
     score:0 
 }
//calling the rectangle function
// drawRect(com.x , com.y , com.width , com.height , com.color);

//paddle for the player 
const user = {
    x: canvas.width/2 - 50/2,
    y: canvas.height - 10  -10, 
    width: 80,
    height: 10,
    color: "white",
    score:0 
}
//callint the rectangle function for the user
// drawRect(user.x , user.y , user.width , user.height , user.color);


//for creating the centre line
//function
function centerLine(){
    context.beginPath();
    context.setLineDash([10]);
    context.moveTo(0 , canvas.height/2);
    context.lineTo(canvas.width , canvas.height/2);
    context.strokeStyle = "white";
    context.stroke();
}
//for creating the line
// centerLine();

//function for drawing the circle
function drawCircle(x , y ,r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x , y , r , 0 , Math.PI*2 ,false);
    context.closePath();
    context.fill();
}
//creating the ball array so that we can move the ball
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    radius: 10,
    speed: 1, 
    velocityX: 5 ,
    velocityY: 5,
    color: "white"
}
//calling the drawCircle function to create a circle
// drawCircle(ball.x , ball.y ,ball.radius, ball.color);

//scores section
//function for text
function drawText(text , x, y, color){
    context.fillStyle = color;
    context.font = "32px josefin sans";
    context.fillText(text , x , y)
}
// //calling the drawtext function
// drawText(com.score , 20 , canvas.height/2-30);
// drawText(user.score , 20 , canvas.height/2+50);

//Complete render the game
function render(){
    //canvas
    drawRect(0 , 0 , 400 , 600 , "black");
    //computer paddle
    drawRect(com.x , com.y , com.width , com.height , com.color);
    //user paddle
    drawRect(user.x , user.y , user.width , user.height , user.color);
    //center line
    centerLine();
    //ball
    drawCircle(ball.x , ball.y ,ball.radius, ball.color);

    //scores of com and user
    drawText(com.score , 20 , canvas.height/2-30);
    drawText(user.score , 20 , canvas.height/2+50);

}
//controll the user padle
// canvas.addEventListener("mousemove" , movepaddle);
// function movepaddle(e){
//     let rect = canvas.getBoundingClientRect();
//     user.x = e.clientX - rect.left - user.width/2;
// }

//to control the paddles
window.addEventListener('keydown' , control)
function control(e){
    if(e.keyCode === 37){
        if(com.x > 50){
            com.x -=80;
        }
    }
    else if(e.keyCode === 39){
        if(com.x < 310)
        {
            com.x +=80;
        }
    }
    else if(e.keyCode === 65){
        if(user.x > 50){
            user.x -= 80;
        }
    }
    else if(e.keyCode === 68){
        if(user.x < 310)
        {
            user.x +=80;
        }
    }
}


//control paddle with touch
leftcom.addEventListener('click',function(){
    if(com.x > 50){
        com.x -=80;
    }
});
rightcom.addEventListener('click' , function(){
    if(com.x < 310){
        com.x += 80;
    }
})

leftuser.addEventListener('click',function(){
    if(user.x > 50){
        user.x -=80;
    }
});
rightuser.addEventListener('click' , function(){
    if(user.x < 310){
        user.x += 80;
    }
})




// collision function b ball p player
function collision(b , p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return p.right > b.left && p.left < b.right && b.bottom > p.top && b.top < p.bottom;
}

//reset ball function
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 1;
    ball.velocityY = -ball.velocityY;
}

//game over function
function ShowGameOver(){
    //hidding canvas
    canvas.style.display = "none";
    const can = document.getElementById("can");
    can.style.display = "none";
    buttons.style.display = "none"; 
    //container
    const result = document.getElementById("result");
    result.style.display = "block";
}


//calling the render function
// render();
//update function
function update(){
    ball.x += ball.velocityX * ball.speed;
    ball.y += ball.velocityY * ball.speed;
    
    //to controll the computer paddle
    // let computerLevel = 0.1;
    // com.x += (ball.x - (com.x + com.width/2)) + computerLevel;
    // //to loose the ball by computer
    // if(ball.speed >2){
    //     com.x += ball.x + 100;
    // }
    //making it to reflect from the wall
    if(ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.velocityX = -(ball.velocityX);
    }
    // else if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
    //     ball.velocityY = -ball.velocityY;
    // }

    //if collision happens
    let player = (ball.y < canvas.height/2) ? com : user;
    if(collision(ball , player)){
        ball.velocityY = -ball.velocityY;
        // ball.speed += 0.1;
    }
    
    //scores
    if(ball.y - ball.radius < 0){
        user.score++;
        resetBall();
    }
    else if(ball.y + ball.radius > canvas.height)
    {
        com.score++;
        resetBall();
    }
    //game over
    if(user.score > 4 || com.score >4){
        clearInterval(loop);
        ShowGameOver();
    }
}

////stating the game
function start(){
    update();
    render();
}

const loop = setInterval(start , 1000/50);
