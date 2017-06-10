    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });
    var player;
    var cursors;
    var direction = "down";
    var speed;
    var spaceKey;
    var actionKey
	var collisionlayer;
    var allowCollision = true;
    var dialogArray;
    var indexOfDialog = 0;
    var inConversation = false;
    var inQuest = false;
    var invisWall;
    var npc;
    var textOnScreen;
    var conversationJSON = loadJSONConversations();

    function preload() {
        game.load.spritesheet('dude', 'assets/newguy.png', 30, 32);
	    game.load.spritesheet('adam', 'assets/adam.png', 30, 32);
        game.load.spritesheet('gus', 'assets/gus.png', 30, 32);
        game.load.tilemap('MyTilemap', 'rpgmap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass', 'assets/grass-tiles.png');
        game.load.image('tree', 'assets/tree-tile.png');
		game.load.image('red', 'assets/RED.png');
        game.load.image('terrain-atlas', 'assets/terrain_atlas.png')
    }
    function create() {
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        actionKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        game.world.setBounds(0, 0, 1920, 1920);
        addTileMap();
		addLayersPlayerCollisions();
        addNPC();
        game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
        addPlayerAnimations();
        cursors = game.input.keyboard.createCursorKeys();
        textOnScreen = game.add.text(200, 500, "", { font: "32px Arial", fill: "#ffffff", align: "center" });
        textOnScreen.fixedToCamera = true;
        textOnScreen.cameraOffset.setTo(200, 500);
    }

    function update() {
    handleCollisions();
    resetPlayerVelocity();
	setKeys();
    }

    function addPlayerAnimations() {
        //animations for player
        player.animations.add('down', [0, 1, 2], 10, true);
        player.animations.add('left', [3, 4, 5], 10, true);
        player.animations.add('right', [6, 7,8], 10, true);
        player.animations.add('up', [9, 10, 11], 10, true);
    }

    function handleCollisions(){
        //Collision between player and collision layer
        game.physics.arcade.collide(player, collisionlayer);
        handleNPCCollision();
        handleBigTreeCollision();
    }

    function handleBigTreeCollision() {

    }

    function handleNPCCollision() {
        //game.physics.arcade.collide(player, invisWall);
        game.physics.arcade.collide(player, npc);
        if(Phaser.Rectangle.intersects(player.getBounds(), npc.getBounds()) && actionKey.isDown && allowCollision === true && inQuest === false){
            allowCollision = false;
            setTimeout(preventDoubleCollision(), 500)
            if(inConversation === false){
            dialogArray = conversationJSON.Level1["Intro-Chat"];
            inQuest = true;
            startConversation(dialogArray);
            }
        }
    }

    function preventDoubleCollision(){
        allowCollision = true;
    }

    function resetPlayerVelocity(){
        player.body.velocity.x = 0
        player.body.velocity.y = 0
    }

    function setKeys(){
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
    }

    function addTileMap(){
        //add tilemap and tilesetimages
        map = game.add.tilemap('MyTilemap');
        map.addTilesetImage('grass', 'grass');
        map.addTilesetImage('tree', 'tree');
        map.addTilesetImage('RED', 'red');
        map.addTilesetImage('terrain-atlas', 'terrain-atlas');
    }

    function addLayersPlayerCollisions(){
        //Collision between player and collision layer
        collisionlayer = map.createLayer('Collisions');
		map.setCollision(137, true, 'Collisions');
		//add base layer
        layer = map.createLayer('Background');
		
        //add inviswall 
        invisWall = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50);
        invisWall.scale.setTo(7, 7);
        invisWall.position.x = map.objects.BigTree[0].x + 20;
        invisWall.position.y = map.objects.BigTree[0].y - 20;
        game.physics.enable(invisWall, Phaser.Physics.ARCADE);
        invisWall.body.immovable = true;
        invisWall.body.collideWorldBounds = true;

		player = game.add.sprite(800, 400, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
		player.bringToTop();
        player.position.x = map.objects.StartPosition[0].x;
        player.position.y = map.objects.StartPosition[0].y;
		// add other layers
		map.createLayer('Foreground');
        map.createLayer('Treetop');
		layer.resizeWorld();
		layer.wrap = true;  
    }

    function addNPC(){
        //add enemy
        npc = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50, 'adam');
        game.physics.enable(npc, Phaser.Physics.ARCADE);
        npc.body.immovable = true;
        npc.body.moves =false;
        npc.body.collideWorldBounds = true;
        npc.position.x = map.objects.NPC[0].x
        npc.position.y = map.objects.NPC[0].y
    }