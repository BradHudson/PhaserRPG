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


var lerp = function(first, second, fraction){
    var dx = first.x + (second.x - first.x) * fraction;
    var dy = first.y + (second.y - first.y) * fraction;
    return {
        x: dx,
        y: dy
    }
}

var areYouOutside = function(x, y, world){
  returner = {
    x : (x < 0 || x > world.bounds.width - 1)? x *= -1: x,
    y : (y < 0 || y > world.bounds.height - 1)? y *= -1: y
  }
  return returner;
}

function NPC(game, texture){
  this.game = game;
  this.texture = game;
  Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, texture);
  this.heading = {
    x: 0,
    y: 0
  }
  this.currentHeading = {
    x: 0,
    y: 0
  }
  this.movementStack = new Array();

  this.anchor.setTo(0.5, 0.5);
  game.physics.enable(this);

  this.updateHeading = function(_this){
    var ANGLE = 90 * (Math.PI / 180); // Constraint in radians
    var DIST = 200; // Within 200 pixels of current position

    // get the current heading
    _this.currentHeading.x = _this.position.x + Math.cos(_this.rotation) * DIST;
    _this.currentHeading.y = _this.position.y + Math.sin(_this.rotation) * DIST;
    // Grab an offset angle based on the constraint
    var offset = (Math.floor(Math.random() * ANGLE) -  ANGLE/2); 
    // Get a random point within the constraint angle at DIST length away
    var newX = _this.position.x + Math.cos(_this.rotation + offset) * DIST;
    var newY = _this.position.y + Math.sin(_this.rotation + offset) * DIST;
    sanitised = areYouOutside(newX, newY, _this.game.world);
    // set the new heading for the NPC
    _this.heading = {
      x: sanitised.x,
      y: sanitised.y
    }
    // clear out movement stack
    _this.movementStack = [];
    for(var i = 1; i <= 60; i++){
      _this.movementStack.push(lerp(_this.heading, _this.currentHeading, i/60));
    }
  }
}
NPC.prototype = Object.create(Phaser.Sprite.prototype);

NPC.prototype.constructor = NPC;

NPC.prototype.update = function(){
  if(Math.floor(Math.random() * 20) === 0)
    this.updateHeading(this);

  var coord;
    if(coord = this.movementStack.pop()){
      game.physics.arcade.moveToXY(this, coord.x, coord.y);
      var dx = coord.x - this.position.x;
      var dy = coord.y - this.position.y;
      this.rotation = Math.atan2(dy, dx);
    } else {
      // Invoke the moveToXY function of the arcade physics to move NPC
      game.physics.arcade.moveToXY(this, this.heading.x, this.heading.y);
      var dx = this.heading.x - this.position.x;
      var dy = this.heading.y - this.position.y;
      // Rotate the NPC toward the new heading
      this.rotation = Math.atan2(dy, dx);
    }
}