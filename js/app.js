var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
};

var pingpong = {
	scoreA : 0,
	scoreB : 0
}
pingpong.pressedKeys = [];

pingpong.ball ={
	speed: 5,
	x: 150,
	y: 100,
	directionX: 1,
	directionY: 1
}

$(function(){
	// set interval to call gameloop every 30 milliseconds
	pingpong.timer = setInterval(gameloop,30);
	
	// mark down what key is down and up into an array called "pressedKeys"
	$(document).keydown(function(e){
		pingpong.pressedKeys[e.keyCode] = true;
    });
    $(document).keyup(function(e){
    	pingpong.pressedKeys[e.keyCode] = false;
	});
});

function gameloop(){
	moveBall();
	movePaddles();
}

function moveBall(){
	//reference useful variables
	var playgroundHeight = parseInt($("#playground").height());
	var playgroundWidth = parseInt($("#playground").width());
	var ball = pingpong.ball;

	// check playground boundary and bottom edge
	if(ball.y + ball.speed * ball.directionY > playgroundHeight)
	{
		ball.directionY = -1;
	}
	// top edge
	if(ball.y + ball.speed * ball.directionY < 0)
	{
		ball.directionY = 1;
	}
	// right edge
	if(ball.x + ball.speed * ball.directionX > playgroundWidth)
	{
		//player B lost, rset ball
		ball.x = 250;
		ball.y  = 100;
		$("#ball").css({
			"left":ball.x,
			"top":ball.y
		});
		ball.directionX = -1;
		pingpong.scoreA++;
		$("#scoreA").html(pingpong.scoreA);
	}
	//left edge
	if(ball.x + ball.speed*ball.directionX < 0)
	{
		//player A lost, reset ball
		ball.x = 150;
		ball.y = 100;
		$("#ball").css({
			"left":ball.x,
			"top":ball.y
		});
		ball.directionX = 1;
		pingpong.scoreB++;
		$("#scoreB").html(pingpong.scoreB);
	}
	ball.x += ball.speed * ball.directionX;
	ball.y += ball.speed * ball.directionY;

	//check left paddle
	var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
	var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
	var paddleAYTop = parseInt($("#paddleA").css("top"));
	if(ball.x + ball.speed* ball.directionX < paddleAX)
	{
		if(ball.y + ball.speed * ball.directionY <= paddleAYBottom && ball.y+ball.speed*ball.directionY >= paddleAYTop)
		{
			ball.directionX = 1;
		}
	}
	//check right paddle
	var paddleBX = parseInt($("#paddleB").css("left"));
	var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
	var paddleBYTop = parseInt($("#paddleB").css("top"));
	if(ball.x + ball.speed*ball.directionX >= paddleBX)
	{
		if(ball.y + ball.speed*ball.directionY <= paddleBYBottom && ball.y + ball.speed*ball.directionY >= paddleBYTop)
		{
			ball.directionX = -1;
		}
	}

	//move ball with speed and direction
	$("#ball").css({
		"left" : ball.x,
		"top": ball.y
	});
}

function movePaddles(){
	// use our custom timer to continuously check if a key is pressed. 
	if (pingpong.pressedKeys[KEY.UP]){
		// move the paddle B up 5 pixels
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top-5);	
	}
	if (pingpong.pressedKeys[KEY.DOWN]){
		// move the paddle B down 5 pixels
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top+5);
	}
	if (pingpong.pressedKeys[KEY.W]){
		// move the paddle A up 5 pixels
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top-5);
	}
	if (pingpong.pressedKeys[KEY.S]){
		// move the paddle A down 5 pixels
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top+5);			
	}
}