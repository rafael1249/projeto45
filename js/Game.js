class Game {
  constructor(){

    var imganjo = loadImage("images/anjo.png");
    var imgassasino = loadImage("images/assasino.png");
    var imgaldeao = loadImage("images/aldeao.png");
     
    

  }
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })  
   
  }



  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
   if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
       playerCount = playerCountRef.val();
       player.getCount();
      }
     form = new Form()
     form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1,car2,car3,car4];
  }


 play(){
  form.hide();

  Player.getPlayerInfo();

  
   if(allPlayers !== undefined){
    //var display_position = 100;
    
    //index of the array
    var index = 0;

    //x and y position of the cars
    var x = 175;
    var y;

    for(var plr in allPlayers){
      //add 1 to the index for every loop
      index = index + 1 ;

      //position the cars a little away from each other in x direction
      x = x + 200;
      //use data form the database to display the cars in y direction
      y = displayHeight - allPlayers[plr].distance;
      cars[index-1].x = x;
      cars[index-1].y = y;
      
      
      
      

      if (index === player.index){
        cars[index - 1].shapeColor = "red";
        camera.position.x = displayWidth/2;
        camera.position.y = cars[index-1].y

  
        var rand = Math.round(random(1,4));

        switch(rand){

          case 1:   imgassasino = createSprite(x,y);   // text("Você e o assasino"+ player.name,x,y);        
            break;
          case 2:   imganjo = createSprite(x,y);  //     text("Você e o anjo"+ player.name,x,y);
            break; 
          case 3:   imgaldeao = createSprite(x,y);       // text("Você e um aldeão"+ player.name,x,y);
            break;
          case 4:   imgaldeao = createSprite(x,y);           //text("Você e um aldeão"+ player.name,x,y);
            break;
          default: break;
  
        }

      }
     
      
      //textSize(15);
      //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
    }

   }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();  
 }

}