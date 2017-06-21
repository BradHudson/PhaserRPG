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
    },
    addLayersPlayerCollisions: function(){
        collisionlayer = map.createLayer('Collisions');
		map.setCollision(329, true, 'Collisions');

		//BASE LAYER
        layer = map.createLayer('Background');
        
        player = game.add.sprite(800, 400, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
		player.bringToTop();

        // add other layers
		map.createLayer('Foreground');
        map.createLayer('Treetop');
		layer.resizeWorld();
		layer.wrap = true;  
    }

}