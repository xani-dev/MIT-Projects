

const BALL = function(x, y, radius) {
        // random color :)
        this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
        // this.color = "deeppink";
        // this below will set a random direction around 360 degrees of it. 
        this.direction = Math.random() * Math.PI *2;
        this.radius = radius;
        this.speed = Math.random() * 3 + 1;
        this.x = x;
        this.y = y;

    };

// function to update our ball's position. All JavaScript objects inherit properties and methods from a prototype.

BALL.prototype = {

    updatePosition:function (width, height) {

        // this below will give x and y independent coordinates accross their axis
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        // colission detection by converting polar coordinates to cartisian coordinates:
        // ----------X AXIS collision code------
        if(this.x - this.radius < 0) {
            
            this.x =this.radius;
        
            this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1)
        } else if (this.x + this.radius > width){
            
            this.x = width - this.radius;

            this.direction = Math.atan2(Math.sin(this.direction), Math.cos(this.direction) * -1)
        }

        // ----------Y AXIS collision code------
        if(this.y - this.radius < 0) {
            
            this.y =this.radius;
        
            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction) )
        } else if (this.y + this.radius > height){
            
            this.y = height - this.radius;

            this.direction = Math.atan2(Math.sin(this.direction) * -1, Math.cos(this.direction))
        }

        // basic diagonal movement
        // this.x++;
        // this.y++;

    }
}

var context = document.querySelector("canvas").getContext("2d");
    
// code for multiple balls (50 in this case)
    var balls = new Array();

    // this will make all balls explode from the center of the page:
    let x = document.documentElement.clientWidth *.5;
    let y = document.documentElement.clientHeight *.5;


    for(let quantity = 0; quantity < 45; quantity++) {
        // Random size with Math
        balls.push(new BALL(x, y, Math.floor(Math.random() *50 +10)));
    }

// code for one ball only
// var ball = new BALL (100, 100, 50);


// gameloop. -It is the central piece of the game’s engine and is responsible for trying to balance running a game’s logic, and executing its drawing operations.


function  theLoop() {

    window.requestAnimationFrame(theLoop);

    let height = document.documentElement.clientHeight;
    let width = document.documentElement.clientWidth;

    context.canvas.width = width;
    context.canvas.height = height;   

    for(let quantity = 0; quantity < balls.length; quantity++) {
        
        let ball = balls[quantity];

        // actually "draws" the balls
        context.fillStyle = ball.color;
        context.beginPath();
        context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        context.fill();

        ball.updatePosition(width, height);
    }

    // leave this one here for a single ball document, for multile put it inside theLoop function
    // ball.updatePosition(width, height);

//  console.log("running"); //--to check the animation is running


    // leave this here for a single ball project ------ inside theLoop function for multiple balls
    // context.canvas.width = width;
    // context.canvas.height = height;   

    // leave this here if using a single ball ------- comment for multiple balls
    // context.fillStyle = ball.color;
    // context.beginPath();
    // context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    // context.fill();

    // This was deleted during the video by the YT guy
    // context.fillStyle = "gray";
    // context.fillRect(0, 0, 100, 100);

}
theLoop();

















//Set global variable that would contain the position, velocity and the html element "ball"
// var positionX = 0;
// var positionY = 0;
// var velocity = 10;
// var reverse = false;
// var time = 100;
// var ball = document.getElementById("ball1");
// var Xmin = 0;
// var Xmax = 600;
// var Ymin = 0;
// var Ymax = 600;
// //The function that can change the position of the html element "ball"

// function moveBall() {

// if (reverse) {
//   positionX = positionX - velocity;
//   positionY = positionY - velocity;
//   ball.style.left = positionX + "px";
//   ball.style.top = positionY + "px";
// } else {
//   positionX = positionX + velocity;
//   positionY = positionY + velocity;
//   ball.style.left = positionX + "px";
//   ball.style.top = positionY + "px";
// }

// if (
//   positionX > Xmax ||
//   positionX === Xmin ||
//   positionY > Ymax ||
//   positionY === Ymin
// ) {
//   reverse = !reverse;
// }
// }

// setInterval(moveBall, time) 