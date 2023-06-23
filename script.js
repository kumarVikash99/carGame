
const score=document.querySelector('.score');
const  startScreen=document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
//console.log(gameArea);

 let keys={ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false};
 let player={speed:5, score:0};

 console.log(player.speed);
 startScreen.addEventListener('click',start);






document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e){
    e.preventDefault();
    keys[e.key] =true;
    //console.log(e.key);
    //console.log(keys);
}
function keyUp(e){
    e.preventDefault();
    keys[e.key] = false;
    //console.log(e.key);
}
function isCollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();
    return!((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.right<bRect.left)||(aRect.left>bRect.right));

}

function moveLines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=730){
            item.y-=750
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";

    });
}
function endGame(){
    player.start=false;
    pauseAudio();
    startScreen.classList.remove('hide');
    startScreen.innerHTML="<h3>Game Over</h3>x <br> Your Score is :"+(player.score +1) +"<br> click to restart";
    
    player.speed=5;

    

    
}
function randomColor(){
    function A(){
        let hexadecimal=Math.floor(Math.random()*256).toString(16);
        return("0"+String(hexadecimal)).substr(-2);
    }
    return "#"+A()+A()+A();
}
function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            console.log("hit");
            endGame();
            pauseAudio();
          

        }
        if(item.y>=750){
            item.y=-50
            item.style.left=Math.floor(Math.random()*350) +'px';
        }
        item.y+=player.speed;
        item.style.top=item.y+"px";

    });
}
var music = document.getElementById("myAudio");
function playAudio() { 
    
    music.play(); 
  } 
  function pauseAudio() { 
    
    music.pause(); 
  }
  

function gamePlay(){
   
    let car =document.querySelector('.car');
    let road= gameArea.getBoundingClientRect();
    //var x = document.getElementById("myAudio"); 
    //console.log(road);
    //console.log("hey i am cliced ")
    if(player.start){
        moveLines();
        moveEnemy(car);
        playAudio();
        if(player.score>1000){
            player.speed=10;
            score.innerHTML="Lelvel 2"
         }
         if(player.score>1500){
            player.speed=15;
            score.innerHTML="Lelvel 3"

         }
         if(player.score>2000){
            player.speed=20;
            score.innerHTML="Lelvel 4"
         }
        
       
        if(keys.ArrowDown &&(player.y<road.bottom-70) ){
            player.y+=player.speed;
        }
        if(keys.ArrowUp &&(player.y>(road.top+70))){
            player.y-=player.speed;
        }
        if(keys.ArrowLeft && (player.x>0)){
            player.x-=player.speed;
        
        }
        if(keys.ArrowRight &&(player.x<(road.width -50))){
            player.x+=player.speed;
        }
        car.style.top=player.y +"px";
        car.style.left=player.x +"px";
        requestAnimationFrame(gamePlay);
        player.score++;
        score.innerHTML= "Score:"+ player.score
        
        
 
    }

    

}
function start(){
    startScreen.classList.add('hide');
    gameArea.innerHTML="";

    player.start=true;
    player.score = 0;

    requestAnimationFrame(gamePlay);
    for(x=0;x<5;x++){
        let roadlines=document.createElement('div');
        roadlines.setAttribute('class', 'lines');
        roadlines.y=(x*150);
        roadlines.style.top=roadlines.y+"px";
        gameArea.appendChild(roadlines);

    }

    

    let car=document.createElement('div');
    car.setAttribute('class', 'car');
    car.style.backgroundColor= "#FFE569"
    gameArea.appendChild(car);

    player.x=car.offsetLeft;
    player.y=car.offsetTop;

    //console.log(car.offsetLeft);
    //console.log(car.offsetTop);
    for(x=0;x<3;x++){
        let otherCar=document.createElement('div');
        otherCar.setAttribute('class', 'enemy');
        otherCar.y=((x+1)*250)*-1;
        otherCar.style.top=otherCar.y+"px";
        otherCar.style.left=Math.floor(Math.random()*350) +'px';
        otherCar.style.backgroundColor=randomColor();
        gameArea.appendChild(otherCar);

    }

   
    


}

