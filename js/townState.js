var townState = {
    create: function() {
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        actionKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        npcJSONForCurrentStage = loadEnemyStats()[currentStage];
        game.world.setBounds(0, 0, 1920, 1920);
        map = game.add.tilemap('TownMap');
        map.addTilesetImage('grass', 'grass');
        map.addTilesetImage('RED', 'red');
        map.addTilesetImage('terrain-atlas', 'terrain-atlas');
        map.addTilesetImage('townTiles1', 'townTiles1');
        map.addTilesetImage('townTiles', 'townTiles2');
		this.addLayersPlayerCollisions();
        // addNPC();
        addPlayerAnimations();
        addTextOnScreen();
    },
    update: function(){
    this.handleCollisions();
    resetPlayerVelocity();
	setKeys();
    },

    handleCollisions: function() {
        game.physics.arcade.collide(player, collisionlayer);
        if(Phaser.Rectangle.intersects(player.getBounds(), exitToWoodsSprite.getBounds())){
            playerProfile.ComingFromLocation = 'town';
            game.state.start('woods');
        }
    },
    addLayersPlayerCollisions: function(){
        collisionlayer = map.createLayer('Collisions');
		map.setCollision(329, true, 'Collisions');

		//BASE LAYER
        layer = map.createLayer('Background');
        
        exitToWoodsSprite = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50);
        exitToWoodsSprite.scale.setTo(5, 1);
        exitToWoodsSprite.position.x = map.objects.ExitToWoods[0].x;
        exitToWoodsSprite.position.y = map.objects.ExitToWoods[0].y;
        game.physics.enable(exitToWoodsSprite, Phaser.Physics.ARCADE);
        exitToWoodsSprite.body.immovable = true;
        exitToWoodsSprite.body.collideWorldBounds = true;


        player = game.add.sprite(800, 400, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
		player.bringToTop();
        player.position.x = map.objects.PlayerStart[0].x;
        player.position.y = map.objects.PlayerStart[0].y;

        // add other layers
		map.createLayer('Foreground');
        map.createLayer('Treetop');
		layer.resizeWorld();
		layer.wrap = true;  
    }

}