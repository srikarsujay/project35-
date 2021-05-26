var Sheru, SheruImg, Sheru_SittingImg;
var database;
var foodS, foodStock;
var foodObject;
var feed, addFood;
var fedTime;

function preload()
{
  SheruImg = loadImage("images/dogImg1.png");
  Sheru_SittingImg = loadImage("images/dogImg.png");
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 500);
  foodObject=new Food();
  Sheru = createSprite(800,250);
  Sheru.scale=0.3;
  Sheru.addImage(Sheru_SittingImg);
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feed=createButton("Feed Sheru.");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}

function draw() {  
  background("green");
  foodObject.display()
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  drawSprites();
}

function readStock(data){
  foodS=data.val();

  foodObject.updateFoodStock(foodS)
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  Sheru.addImage(SheruImg);
  if (foodObject.getFoodStock()<=0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0);
  } else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1);
  }
  
  database.ref('/').update({
    Food:foodObject.getFoodStock(), FeedTime:hour()
  })
}