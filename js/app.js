var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
};

var pingpong = {}
pingpong.pressedKeys = [];

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
	movePaddles();
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