// JavaScript Document

$(function(){
  var canvas = document.getElementById('back'),
      ctx = canvas.getContext('2d')
  canvas.width = 1280;
  canvas.height = 720;
  ctx.lineWidth = 0.1;
  ctx.strokeStyle = (new Color(150)).style;

  var snakePlane = document.getElementById('front'),
      sP = snakePlane.getContext('2d')
  snakePlane.width = 1280;
  snakePlane.height = 720;

  var foodPlane = document.getElementById('food'),
      fP = foodPlane.getContext('2d')
  foodPlane.width = 1280;
  foodPlane.height = 720;
  var alive = true;
  var deathMess = parseInt(Math.random() * 6);
  var xPlane = 64;
  var yPlane = 36;
  var size = 20;
  var head_x;
  var head_y;
  var shipCout = 0;
  var wide = (((window.innerWidth || document.body.clientWidth) - 1280) / 2);
  var snakePos = {
    x: 0,
    y: 0
  };
  var audio = new Audio('Background.mp3');
  var death = new Audio('Death.mp3');
  var grow = new Audio('Grow.mp3');
  var snake,
      size = 10,
      speed = 0.1,
      dir,
      game_loop,
      hitType;

    var msgsSelf = [];
    	msgsSelf[0] = "There's plenty of food. Don't eat yourself!";
    	msgsSelf[1] = "Is your body tastier than the food?";
    	msgsSelf[2] = "Aaarrgghhh!! I bit myself!!";
    	msgsSelf[3] = "Are you autophagic?";
      msgsSelf[4] = "...";
      msgsSelf[5] = "Cannibalism is curable my friend.";
      msgsSelf[6] = "At least you didn't hit the wall...";

  	var msgsWall = [];
    	msgsWall[0] = "Is your head still screwed on?";
    	msgsWall[1] = "The wall is stronger than it seems!";
    	msgsWall[2] = "There's no way to escape the game... Unless...";
    	msgsWall[3] = "LOOK MA! NO HEAD!!!";
    	msgsWall[4] = "Can't see the wall? Huh?";
      msgsWall[5] = "Maybe I'll be nice and let you weaken the wall a bit. Nah! ;)";
      msgsWall[6] = "Reminder: You need to keep inside the walls to win.";

//change these to modify output of back
  var dots = {
    nb: 1000,
    distance: 25,
    d_radius: 125,
    array: []
  };

  function colorValue(min) {
    return Math.floor(Math.random() * 255 + min);
  }

  function createColorStyle(r,g,b) {
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
  }

  function mixComponents(comp1, weight1, comp2, weight2) {
    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
  }

  function averageColorStyles(dot1, dot2) {
    var color1 = dot1.color,
        color2 = dot2.color;

    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
  }

  function Color(min) {
    min = min || 0;
    this.r = colorValue(min);
    this.g = colorValue(min);
    this.b = colorValue(min);
    this.style = createColorStyle(this.r, this.g, this.b);
  }

  function Dot(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -.5 + Math.random();
    this.vy = -.5 + Math.random();

    this.radius = Math.random() * 2;

    this.color = new Color();
  }

  Dot.prototype = {
    draw: function(){
      ctx.beginPath();
      ctx.fillStyle = this.color.style;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  };

  function createDots(){
    for(i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
    }
  }

  function moveDots() {
    for(i = 0; i < dots.nb; i++){

      var dot = dots.array[i];

      if(dot.y < 0 || dot.y > canvas.height){
        dot.vx = dot.vx;
        dot.vy = - dot.vy;
      }
      else if(dot.x < 0 || dot.x > canvas.width){
        dot.vx = - dot.vx;
        dot.vy = dot.vy;
      }
      dot.x += dot.vx;
      dot.y += dot.vy;
    }
  }

  function connectDots() {

    snakePos.x = head_x * 10;
    snakePos.y = head_y * 10;
    for(i = 0; i < dots.nb; i++){
      for(j = 0; j < dots.nb; j++){
        i_dot = dots.array[i];
        j_dot = dots.array[j];

        if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
          if((i_dot.x - snakePos.x) < dots.d_radius && (i_dot.y - snakePos.y) < dots.d_radius && (i_dot.x - snakePos.x) > - dots.d_radius && (i_dot.y - snakePos.y) > - dots.d_radius){
            ctx.beginPath();
            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
            ctx.moveTo(i_dot.x, i_dot.y);
            ctx.lineTo(j_dot.x, j_dot.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }
  }

  function drawDots() {
    for(i = 0; i < dots.nb; i++){
      var dot = dots.array[i];
      dot.draw();
    }
  }

  /*
  var canvasArr;
  function create2D1(x, y) { //used for everything except the snake body
  	canvasArr = new Array(x);
  	for (var i = 0; i < x; i++) {
  	  canvasArr[i] = new Array(y);
  	}
  	for (var x = 0; x > canvasArr.length; x++) {
    	for (var y = 0; y > canvasArr.length; y++) {
    	canvasArr	[x][y] = false;
    }}
  }
  var snakeArr;
  function create2D2(x, y) { //used ONLY for snake
 	snakeArr = new Array(x);
  	for (var i = 0; i < x; i++) {
  	  snakeArr[i] = new Array(y);
  	}
  	for (var x = 0; x > snakeArr.length; x++) {
    	for (var y = 0; y > snakeArr.length; y++) {
    	snakeArr[x][y] = false;
  	}}
  }

  function drawSnake(x, y) { //Paints a snake cublet at the specified GRID location. The method handles all shift modification.
	sP.rect(x * size,y * size,size,size);
	sP.fillStyle = "black";
	sP.lineWidth = 2;
	sP.strokeStyle="white";
	sP.stroke();
  }

  function deleteSnake(x, y) { //Removes a snake cublet at the specified GRID location. The method handles all shift modification.
	sP.clearRect(x * size,y * size,size,size);
  }

  function updateSnake() { //Called during periodic to redraw snake location.
	for (var x = 0; x >= snakeArr.length; x++){
  	for (var y = 0; y >= snakeArr.length; y++){
  		if (snakeArr[x][y] == true) {
  			drawSnake(x, y);
  		}
  		else {
  			deleteSnake(x, y);
  		}
  	}}
  } */

  var Food = function(){
		this.x = Math.round(Math.random() * (snakePlane.width - size) / size);
		this.y = Math.round(Math.random() * (snakePlane.height - size) / size);
			fP.fillStyle = "red";
			fP.fillRect(this.x*size, this.y*size, size, size);
	}
      var f = new Food();

  function initSnake() {
    var length = 10;
    snake = [];
    for(var i = length - 1; i >= 0; i--) {
      snake.push({x: i, y: 0});
    }
  }

  function paintSnake() {
    for(var i = 0; i < snake.length; i++) {
      var s = snake[i];

      sP.fillStyle = "white";
      sP.fillRect(s.x*size, s.y*size, size, size);
    }
  }

  function updateSnake() {
    if (alive == true){
		//Update the position of the snake
		head_x = snake[0].x;
		head_y = snake[0].y;
		//Get the directions
		document.onkeydown = function(e) {
			var key = e.keyCode;

			if(key == 65 && dir != "right") setTimeout(function() {dir = "left"; }, 30);
			else if(key == 87 && dir != "down") setTimeout(function() {dir = "up"; }, 30);
			else if(key == 68 && dir != "left") setTimeout(function() {dir = "right"; }, 30);
			else if(key == 83 && dir != "up") setTimeout(function() {dir = "down"; }, 30);

			if(key) e.preventDefault();
}
		}

			//Directions
			if(dir == "right") head_x++;
		else if(dir == "left") head_x--;
		else if(dir == "up") head_y--;
		else if(dir == "down") head_y++;
    snakePos.x = head_x;
    snakePos.y = head_y;
		//Move snake
		var tail = snake.pop();
		tail.x = head_x;
		tail.y = head_y;
		snake.unshift(tail);

		//Wall Collision
		if(head_x >= snakePlane.width/size || head_x <= -1 || head_y >= snakePlane.height/size || head_y <= -1) {
				hitType = "wall";
        gameOver();
		}
		//Food collision
		if(head_x == f.x && head_y == f.y) {
      fP.clearRect(0,0,foodPlane.width,foodPlane.height);
			coll = 1;
      shipCout++;
			f = new Food();
			var tail = {x: head_x, y:head_y};
          dots.distance = dots.distance + 25;
          dots.d_radius = dots.d_radius + 25;
      grow.play();
			snake.unshift(tail);
    }
	}
  function gameOver(){
    alive = false;
    head_x = canvas.width/2;
    head_y = canvas.height/2;
    death.play();
    sP.font = "30px Courier New";
    sP.fillStyle = "White";
    sP.textAlign = "center";
    sP.fillText("GAME OVER", canvas.width/2, (canvas.height/2) - 17);
    if (hitType == "wall") {
      sP.fillText(msgsWall[deathMess], canvas.width/2, (canvas.height/2) + 17);
    }
    else {
      sP.fillText(msgsSelf[deathMess], canvas.width/2, (canvas.height/2) + 17);
    }
    fP.clearRect(0,0,foodPlane.width,foodPlane.height);
    death.onended = function () {
      //sleep(1000);
      window.location.reload();
    }
  }
  function deteriorate() {

    if (!(dots.distance > 130 || dots.d_radius > 130)){
      if (!(dots.distance < 25 || dots.d_radius < 25)){
        dots.distance = dots.distance - 0.25;
        dots.d_radius = dots.d_radius - 0.25;
      }
      else {
        dots.distance = 25;
        dots.d_radius = 25;
      }
    }
    else {
      dots.distance = 130;
      dots.d_radius = 130;
    }

  }

  function deleteBoard() { //Removes all current board objects. DOES NOT RESET GAME STATE
	sP.clearRect(0,0,snakePlane.width,snakePlane.height);
  }


  function updateScore() {
    sP.font = "30px Courier New";
    sP.fillStyle = "White";
    sP.textAlign = "center";
    sP.fillText(shipCout, canvas.width/2, canvas.height-15);
    globalFire = dots.distance;
  }

  function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveDots();
    connectDots();
    drawDots();
    deleteBoard();
    paintSnake();
    //console.log(dots.distance);
    updateSnake();
    updateScore();
  }
/*
  $('canvas').on('mousemove', function(e){
    snakePos.x = e.pageX - wide;
    snakePos.y = e.pageY - 50 ;
  });

  $('canvas').on('mouseleave', function(e){
    snakePos.x = canvas.width / 2;
    snakePos.y = canvas.height / 2;
  });
  */

  createDots();
  initSnake();
  audio.play();
  //called as a periodic
  setInterval(animateDots, 40);
  setInterval(deteriorate, 250);
});
