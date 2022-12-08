console.log("Starting. . . ");
const canvas = document.querySelector("canvas");
const view = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
view.fillStyle = "white";
view.strokeStyle = "white";

const ballSize = 4;

class Ball {
    x = 100;
    y = 100;
    dx = 2;
    dy = 2;
    dmax = 4;
    width = ballSize;
    height = ballSize;

    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
    
        this.dx = Math.random() * this.dmax - 2;
        this.dy = Math.random() * this.dmax - 2;
    }    
    update() {
        if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
        if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;
    
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
    }
    draw() {
        view.beginPath();
        view.arc(this.x, this.y, this.height, 0, 2 * Math.PI);
        view.fill()
    }
    reverseDirection() {
        this.dx = -this.dx;
        this.dy = -this.dy;
    } //setting the distance for when the line should be drawn
    drawLine(b1, b2) {
        if(this.x < 50 && this.y < 50) { 
            beginPath()
            moveTo(b1, b2)
            lineTo(b1, b2) 
            stroke()
        }
        else {
            return false
        }
    }
}

let balls = []

for(let i = 0; i <= 110; i++) {
    balls.push(new Ball())
} 


function animate() {
   collisions()
    view.clearRect(0, 0, canvas.width, canvas.height)
    
    balls.forEach((ball) => {
        ball.update();
    });
    
    //loops comparing the distances between 2 balls. Should line be drawn? 
    for(let i = 0; i < balls.length; i++){
      const b1 = balls[i]
      for(let j = i+1; j < balls.length; j++){
        const b2 = balls[j]
        //    drawLineBetweenBalls(b1, b2);
           dist(b1, b2)
      } //calculating distance between balls
    function dist(b1, b2) { 
        const xDiff = (b1.x - b2.x) **2; 
        const yDiff = (b1.y - b2.y) **2;
        const lineDistance = 200 - Math.sqrt(xDiff + yDiff); 
        if (lineDistance < 200){
            const strokeStyle = `rgba(255, 255, 255, ${lineDistance / 80})`;
            view.strokeStyle = strokeStyle;
            
            view.beginPath()
            view.moveTo(b1.x, b1.y)
            view.lineTo(b2.x, b2.y) 
            view.stroke()
        };
      }
    }
    
    requestAnimationFrame(animate);
}

animate();
    
    // if balls reach within eachother, call drawLine to draw a line
// function drawLineBetweenBalls(b1, b2) {
//         view.beginPath()
//         view.moveTo(b1.x, b1.y)
//         view.lineTo(b2.x, b2.y) 
//         view.stroke()
// }


function detectCollision(b1, b2) { 
  const x = Math.abs(b1.x - b2.x);  
  const y = Math.abs(b2.y - b1.y);      
    if(x < ballSize*2 && y < ballSize*2){
        return true
    }
    else {
        return false
    }
}
function bounceAway(b1, b2){
    b1.reverseDirection()
    b2.reverseDirection()
}

function collisions() {
    for(let i = 0; i < balls.length; i++){
        const b1 = balls[i]
        for(let j = i+1; j < balls.length; j++){
            const b2 = balls[j]
                    if(detectCollision(b1, b2)){
                    bounceAway(b1, b2)
            }
        }
    }
}

