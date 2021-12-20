var tower;
var towerimg;

var ghoststanding;
var ghoststandingimg;

var door;
var doorimg;

var climber;
var climberimg;

var doorgroup;
var climbergroup;

var gamestate = "play";



function preload()
{
towerimg = loadImage("tower.png")

ghoststandingimg = loadImage("ghost-standing.png")

doorimg = loadImage("door.png")

climberimg = loadImage("climber.png")
}

function setup()
{
  createCanvas(600,600)
  
  tower = createSprite(300,300)
  tower.addImage("tower", towerimg)

  ghoststanding = createSprite(300,300)
  ghoststanding.addImage("ghoststanding", ghoststandingimg)
  ghoststanding.scale = 0.5

  doorgroup = new Group()
  climbergroup = new Group()
}

function draw()
{
background("black")



if(gamestate=="play")
{//starting of play
  tower.velocityY = 3
  if(tower.y>600)
  {
  tower.y=300
  }

  ghoststanding.velocityY = 6
if(keyDown("space"))
{
  ghoststanding.velocityY = -10
}

if(keyDown("LEFT_ARROW"))
{
  ghoststanding.velocityX = -5
}

if(keyDown("RIGHT_ARROW"))
{
  ghoststanding.velocityX = 5
}

if(ghoststanding.isTouching(doorgroup)||ghoststanding.isTouching(climbergroup)||ghoststanding.y>600)
{
gamestate = "end"

}
door_climbers()
}//ending of play

if(gamestate=="end")
{
  tower.destroy()
  ghoststanding.destroy()
  doorgroup.destroyEach()
  climbergroup.destroyEach()
fill ("yellow")
textSize(30)
  text("Game Over", 200,200)

}



drawSprites()
}

function door_climbers()
{
if(frameCount%60==0)
{
  door = createSprite(Math.round(random(0,600)), 0)
  door.addImage("door", doorimg)

  climber = createSprite(Math.round(random(0,600)), 60)
  climber.addImage("climber", climberimg)

  climber.x = door.x

  door.velocityY = 6
  climber.velocityY = 6

  door.depth = ghoststanding.depth
  ghoststanding.depth+=1

  climber.depth = ghoststanding.depth
  ghoststanding.depth+=1

  doorgroup.add(door)
  climbergroup.add(climber)
}
}