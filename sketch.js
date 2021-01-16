
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var plinko = [];
var divisions = [];

var divisionHeight = 300;


var ground;
var score = 0;

var particle

var turn = 0

var gameState = "start"

count = 0;
function setup() {
  var canvas = createCanvas(480, 800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(230, 795, 500, 10);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }
  for (var j = 15; j <= width; j = j + 50) {
    plinko.push(new Plinko(j, 75, 10));
  }

  for (var j = 15; j <= width - 10; j = j + 50) {
    plinko.push(new Plinko(j, 275, 10));
  }

  for (var j = 30; j <= width - 10; j = j + 50) {
    plinko.push(new Plinko(j, 175, 10));
  }

}


function draw() {
  background(0);
  
  stroke("blue")
  strokeWeight(5)
  textSize(30)
  text("score: ",score,50,50)
  console.log(score)
  
  //Specify the points in between the divisions using text. One example is given below:-
  text("100", 10, 550)
  text("100", 90, 550)
  text("500", 180, 550)
  text("500", 260, 550)
  text("200", 330, 550)
  text("200", 410, 550)


  Engine.update(engine);
  ground.display();

  if (gameState === 0) {

    textSize(100);
    text("GameOver", 150, 250);

  }

  for (var b = 0; b < plinko.length; b++) {
    plinko[b].display();
  }

  if(particle!=null)
  {
     particle.display();
      
      if (particle.body.position.y>760)
      {
            if (particle.body.position.x < 150) 
            {
                score+=100
                particle=null;
                if ( turn>= 5){
                  gameState =0;
                }                           
            }


            else if (particle.body.position.x > 300 ) 
            {
                  score+=500
                  particle=null;
                  if ( turn>= 5){
                    gameState =0;
                  }  

            }
            else if (particle.body.position.x < 900 && particle.body.position.x > 601 )
            {
                  score+=200
                  particle=null;
                  if ( turn>= 5){
                    gameState =0;
                  }  

            }      
            
      }

    }
  for (var a = 0; a < divisions.length; a++) {
    divisions[a].display();
  }

}

function mousePressed(){

  if(gameState!=="end"){
    count++;
    particle = new Particle(mouseX,10,10,10)
    particle.display()
  }
}
