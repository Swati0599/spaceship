var backGroundImage,backGround;
var restart,restartImage,gameOver,gameOverImage;
var asteroidImage;
var spaceShuttle,spaceShuttleImage;
var play;
var end;
var gameState="play";
var Mars;
var Jupiter;
var Saturn;
var Uranus;
var Neptune;

var score=0;

var PointSound,gameOverSound;
var missileImage;

var ufoImage;



function preload(){
  backGroundImage=loadImage("Galaxy Background.jpg");
  asteroidImage=loadImage("Asteroid 2.png");
  spaceShuttleImage=loadImage("SpaceShuttle2.png");
  Mars=loadImage("Mars.png");
  Jupiter=loadImage("Jupiter.png");
  Saturn=loadImage("Saturn2.png");
  Uranus=loadImage("Uranus2.png");
  Neptune=loadImage("neptune.png");
  PointSound=loadSound("Point Sound.wav");
  gameOverSound=loadSound("GameOver Sound.wav");
  missileImage=loadImage("Missile 4.png");
  restartImage=loadImage("restart.png");
  gameOverImage=loadImage("GameOver4.png");
  ufoImage=loadImage("UFO.png");
}

function setup() {
  createCanvas(800, 600);
  
  
  
  backGround=createSprite(300,300,10,10);
  backGround.addImage("g",backGroundImage);
  backGround.scale=1;
  
  gameOver=createSprite(400,30);
  gameOver.addImage("d",gameOverImage);
  gameOver.scale=1;
  
  restart=createSprite(400,80);
  restart.addImage("d",restartImage);
  restart.scale=0.8;
  
  spaceShuttle=createSprite(200,300,10,10);
  spaceShuttle.addImage("s",spaceShuttleImage);
  spaceShuttle.scale=0.3;
  
  spaceShuttle.debug=false;
  spaceShuttle.setCollider("rectangle",0,50,800,360);
  
  
  
  asteroidGroup= new Group();
  PlanetGroup = new Group();
  missileGroup = new Group();
  UFOGroup = new Group();
}

function draw() {
  background("white");
  
  
  if(gameState === "play"){
  backGround.velocityX=-5;
  
  if(backGround.x < 300){
    backGround.x=backGround.width/2;
  }
  
  if(keyDown("up_arrow") && spaceShuttle.y > 50 ){
    spaceShuttle.y=spaceShuttle.y-10;
  }
  
  if(keyDown("down_arrow") && spaceShuttle.y < 540){
    spaceShuttle.y = spaceShuttle.y+10;
  }
  
  if(spaceShuttle.isTouching(asteroidGroup)){
    gameOverSound.play();
    gameState = "end";
  }
   
  if(spaceShuttle.isTouching(PlanetGroup)){
    PointSound.play();
    PlanetGroup.destroyEach();
    score = score+10;   
  }
    
  if(spaceShuttle.isTouching(UFOGroup)){
    gameOverSound.play();
    gameState = "end";
  }  
    
    
  if(keyDown("space")){
    missileDot();
  }
    
  if(missileGroup.isTouching(asteroidGroup) ){
    asteroidGroup.destroyEach();
    missileGroup.destroyEach();
    
    score = score+5;
  }
   if( missileGroup.isTouching(UFOGroup)){
     missileGroup.destroyEach();
     UFOGroup.destroyEach();
   }
  gameOver.visible = false;  
  restart.visible = false;
    
  
    
  spawnAsteroid();
    
}
  else if(gameState === "end"){
    gameOver.visible = true;  
    restart.visible = true;
    
    
    
    backGround.velocityX=0;
    asteroidGroup.setVelocityXEach(0);
    asteroidGroup.setLifetimeEach(-1);
    PlanetGroup.setVelocityXEach(0);
    UFOGroup.setVelocityXEach(0);
    UFOGroup.setLifetimeEach(-1);
    PlanetGroup.setLifetimeEach(-1);
    missileGroup.destroyEach();
    
    if(mousePressedOver(restart)){
      Reset();
    }
  }
  
  
  drawSprites(); 
  
  
 if(gameState === "play") {
  fill("white");
  stroke("black");
  textSize(20);
  text("Score : " +score,600,100 );
  
  fill("white");
  stroke("red");
  textSize(20);
  text("Press Space to release weapon ",20,60 );
  
  fill("white");
  stroke("green");
  textSize(20);
  text("Hit Planets To score ",20,40 );
 }
  
  if(PlanetGroup.isTouching(asteroidGroup)){
    asteroidGroup.destroyEach();
  }
  
  if(PlanetGroup.isTouching(UFOGroup)){
    PlanetGroup.destroyEach();
  }
  
  if(UFOGroup.isTouching(asteroidGroup)){
    asteroidGroup.destroyEach();
  }
  
  
  
}

function spawnAsteroid(){
  if(frameCount % 100 === 0){
    var asteroid=createSprite(900,0,10,10);
    asteroid.addImage("a",asteroidImage);
    asteroid.y=Math.round(random(100,550));
    asteroid.scale=0.2;
    asteroid.velocityX=-10;
    asteroid.lifetime=110;
    asteroid.debug=false;
    asteroidGroup.add(asteroid);
   
  }
 if(frameCount % 400 === 0){
    var planets = createSprite(900,0,10,10);
    planets.y=Math.round(random(200,500))
    
   var rand = Math.round(random(1,5));
   switch(rand){
     case 1:planets.addImage(Mars);
            planets.scale=0.3;
       break;
     case 2:planets.addImage(Jupiter);
            planets.scale=0.3;
       break;
     case 3:planets.addImage(Saturn);
            planets.scale=0.5;
       break;
     case 4:planets.addImage(Uranus);
            planets.scale=0.6;
       break;  
     case 5:planets.addImage(Neptune);
            planets.scale=0.3;
       break;  
       default: break;
}   
   
      planets.lifetime=110;
      planets.velocityX=-8;
      planets.debug=false;
      planets.setCollider("rectangle",0,0,550,500);
      PlanetGroup.add(planets);
      
  }
  if(frameCount % 500 === 0  ){
    var UFO =createSprite(900,0,10,10);
    UFO.y=Math.round(random(150,500));
    UFO.addImage("u",ufoImage);
    UFO.scale=0.3;
    UFO.velocityX=-15;
    UFO.lifetime=110;
    UFO.debug=false;
    UFO.setCollider("rectangle",0,0,500,300);
    UFOGroup.add(UFO);
   
  }
  
}

function missileDot(){
  missile=createSprite(400,315,10,10);
  missile.velocityX=7;
  
  missile.y=spaceShuttle.y;
  missile.scale=0.1;
  missile.addImage(missileImage);
  missile.lifetime=100;
  missile.debug=false;
  missile.setCollider("rectangle",70,140,1000,400);
  missileGroup.add(missile) ;
  
}

function Reset(){
  gameState = "play";
  
  gameOver.visible = false;  
  restart.visible = false;
  
  asteroidGroup.destroyEach();
  PlanetGroup.destroyEach();
  UFOGroup.destroyEach();
  
  score =0;
}


