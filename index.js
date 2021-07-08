const gridContainer = document.querySelector('.grid');
const startBtn = document.getElementById('start');
const scoreDisplay=document.getElementById('score');
const appleBite=new Audio('audio/Apple-bite.mp3');
appleBite.loop=false;
appleBite.playbackRate=3;
let squares=[];
let snake= [2,1,0];  //[4,4,3]
const width=20;
let appleSquare=0;
let direction=1;
let timerId=0;
let score=0;
let time=600;
let speed=25;
function createGrid(){
    // we need to create 100 divs or grid elements
    for(let i=0;i<width*width;i++){
        const square = document.createElement('div');
        gridContainer.appendChild(square);
        squares.push(square);
    }
    snake.forEach((index)=>{
        squares[index].classList.add('snake');
    })
    
}



createGrid();

function generateApples(){
    
appleSquare= Math.floor(Math.random()*(width*width));
if(squares[appleSquare].classList.contains('snake')){
    generateApples();
}
squares[appleSquare].classList.add('apple');
}
   
generateApples();


function moveSnake(){
    const snakeHead=snake[0];
// we can find the position of snake using modulus (%) operator
// How to check if snake is:
// at the left wall: snakeHead%10===0
// at right wall: snakeHead%10===9
// at top wall: snakeHead-10<0
// at bottom wall : snakeHead+10>100
    if(
        (snakeHead%width===0 && direction===-1) || 
        (snakeHead%width===width-1 && direction===1) || 
        (snakeHead-width<0 && direction===-width) || 
        (snakeHead+width>=width*width && direction===width)||
        (squares[snakeHead+direction].classList.contains('snake'))){
         scoreDisplay.innerText="Game Over! Your score is : "+score;
        return clearInterval(timerId);
    }
    
    scoreDisplay.textContent=`Score : ${score}`;
    
        const tail=snake.pop();
        squares[tail].classList.remove('snake');
        snake.unshift(snake[0]+direction);
        // snake eats an apple
        // we have to check whether snakeHead is equal to appleSquare
        if(snakeHead===appleSquare){
            // play the sound
            appleBite.play();
        //  we have to increase length of snake by pushing its tail back to array
          squares[tail].classList.add('snake');
        snake.push(tail);
        // remove apple by removing class 'apple'
        squares[appleSquare].classList.remove('apple');
        // generate a new apple
        generateApples();
         //increase score by 1
        score+=1;
        scoreDisplay.innerText=`Score : ${score}`;
        // increase our speed
        clearInterval(timerId);     
         time>100?time-=speed:time=100;
         timerId=setInterval(moveSnake,time);
        }
        
        squares[snake[0]].classList.add('snake');
 } 
  

function controlMovement(e){
if(e.key==="ArrowRight"){
    direction=1;
}else if(e.key==="ArrowLeft"){
    direction=-1;
}else if(e.key==="ArrowDown"){
    direction=width;
}else {
    direction=-width;
}

}

startBtn.addEventListener('click',function(){
    
    timerId=setInterval(moveSnake,time);
    if(this.innerText==="Start"){
        this.innerText="Restart";
    }else{
        document.querySelector('h2').innerText="Score : ";   
        clearInterval(timerId);
        // in case user restarts the game
        // reset the direction
        direction=1;
         // reset the interval time to 600
            time=600;
        // score is reset to 0
        score=0;
        scoreDisplay.innerText=`Score : ${score}`;
        // destroy the previous snake
        snake.forEach((index)=>{
            squares[index].classList.remove('snake');
        });
        // reset the snake to its original position
        snake= [2,1,0]; 
        snake.forEach((index)=>{
            squares[index].classList.add('snake');
        });   
        // remove the current apple and generate a new apple
        squares[appleSquare].classList.remove('apple');
        generateApples();
        // automatically move the snake as the game restarts
           timerId=setInterval(moveSnake,time);
    }
});
document.addEventListener('keydown', controlMovement);