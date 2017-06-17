var direction = "down";
var speed;
var cursors;

function setKeys(){
	if(inBattle === false){
		if (cursors.left.isDown){
			if(spaceKey.isDown)
			{
				speed = -500;
			}else{
				speed = -300;
			}
			player.body.velocity.x = speed
			player.animations.play('left');
			direction = "left";
		} else if (cursors.right.isDown){
			if(spaceKey.isDown)
			{
				speed = 500;
			}else{
				speed = 300;
			}
			player.body.velocity.x = speed
			player.animations.play('right');
			direction = "right";
		} else if (cursors.up.isDown) {
			if(spaceKey.isDown)
			{
				speed = -500;
			}else{
				speed = -300;
			}
			player.body.velocity.y = speed
			//player.body.moveUp(speed);
			player.animations.play('up');
			direction = "up";
		} else if (cursors.down.isDown) {
			if(spaceKey.isDown)
			{
				speed = 500;
			}else{
				speed = 300;
			}
			player.body.velocity.y = speed
			//player.body.moveDown(speed);
			player.animations.play('down');
			direction = "down";
		} else {
			player.animations.stop(null, true);
			if(direction === "left"){
				player.frame = 4;
			}else if(direction === "right"){
				player.frame = 7;
			}else if(direction === "up"){
				player.frame = 10;
			}else{
				player.frame = 1;
			}
		}
	} else{
		resetPlayerVelocity();
	}
}

function resetPlayerVelocity(){
    player.body.velocity.x = 0
    player.body.velocity.y = 0
}

function addPlayerAnimations() {
    //animations for player
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    player.animations.add('down', [0, 1, 2], 10, true);
    player.animations.add('left', [3, 4, 5], 10, true);
    player.animations.add('right', [6, 7,8], 10, true);
    player.animations.add('up', [9, 10, 11], 10, true);
    cursors = game.input.keyboard.createCursorKeys();
}

//USE THIS npc.body.moveTo(3000, 100, 270); up
//npc.body.moveTo(3000, 100, 90); down

function makeWander(npcInfo, moveUp = true, goHome = false){
	var object = npcInfo.object;
	if(inConversation === true){
		setTimeout(function(){ return makeWander(npcInfo, moveUp) }, 1000);
	}else{
	if(goHome === false){
		if(moveUp === true){
			game.physics.arcade.moveToXY(object, object.position.x, object.position.y - 10);
			npc.loadTexture('adam-back');
		}else { 
			game.physics.arcade.moveToXY(object, object.position.x, object.position.y + 10); 
			npc.loadTexture('adam');
		}
		setTimeout(function(){
			setVelocityZero(object);
			return makeWander(npcInfo, !moveUp, true);
		}, 2000);
	} else{ //return to start position
		if(moveUp === true){
			npc.loadTexture('adam-back');
		}else{npc.loadTexture('adam');}
		game.physics.arcade.moveToXY(object, npcInfo.startXY[0], npcInfo.startXY[1],60,2000);
		setTimeout(function(){
			setVelocityZero(object);
			return makeWander(npcInfo, moveUp);
		}, 2000);
	}
	}
}

function preventDoubleCollision(){
	allowCollision = true;
}

function actionKeyAndAllowCollision(){
	return (actionKey.isDown && allowCollision === true)
}

function setVelocityZero(object){
	object.body.velocity.x = 0; 
	object.body.velocity.y = 0;
}
