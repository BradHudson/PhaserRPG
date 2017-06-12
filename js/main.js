    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });
    var player;
    var cursors;
    var direction = "down";
    var speed;
    var spaceKey;
    var actionKey
	var collisionlayer;
    var allowCollision = true;
    var bigTreeSprite;
    var npc;
    var currentStage = "Stage1";
    
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
        addPlayerAnimations();
        addTextOnScreen();
    }

    function update() {
    handleCollisions();
    resetPlayerVelocity();
	setKeys();
    }

    function handleCollisions(){
        //Collision between player and collision layer
        game.physics.arcade.collide(player, collisionlayer);
        handleNPCCollision();
        handleBigTreeCollision();
    }

    function handleBigTreeCollision() {
        if(Phaser.Rectangle.intersects(player.getBounds(), bigTreeSprite.getBounds()) && actionKeyAndAllowCollision() && inQuest === true){
            whoWeTalkingTo = "BigTree";
            allowCollision = false;
            setTimeout(preventDoubleCollision(), 500)
            dialogArray = conversationJSON.Level1["BigTree"];
            startConversation(dialogArray);
            addWeaponToInventory('Limb');
            inQuest = false;
        }
    }

    function handleNPCCollision() {
        game.physics.arcade.collide(player, npc);
        if(Phaser.Rectangle.intersects(player.getBounds(), npc.getBounds()) && actionKeyAndAllowCollision() && inQuest === false){
            whoWeTalkingTo = "NPC1";
            allowCollision = false;
            setTimeout(preventDoubleCollision(), 500)
            if(inConversation === false){
                dialogArray = conversationJSON.Level1["NPC"][stageOfNPCConversation];
                inQuest = true;
                startConversation(dialogArray);
                if(stageOfNPCConversation === 1){
                    setTimeout(fight, 1500);
                }
            }
        }
    }

    function preventDoubleCollision(){
        allowCollision = true;
    }

    function actionKeyAndAllowCollision(){
        return (actionKey.isDown && allowCollision === true)
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
        //COLLISIONS LAYER MOST IMPORTANT
        collisionlayer = map.createLayer('Collisions');
		map.setCollision(137, true, 'Collisions');

		//BASE LAYER
        layer = map.createLayer('Background');
		
        //INVISIBLE WALL 
        bigTreeSprite = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50);
        bigTreeSprite.scale.setTo(7, 7);
        bigTreeSprite.position.x = map.objects.BigTree[0].x + 20;
        bigTreeSprite.position.y = map.objects.BigTree[0].y - 20;
        game.physics.enable(bigTreeSprite, Phaser.Physics.ARCADE);
        bigTreeSprite.body.immovable = true;
        bigTreeSprite.body.collideWorldBounds = true;

        //LOAD THE PLAYER
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
        //add enemy/NPC's
        npc = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50, 'adam');
        game.physics.enable(npc, Phaser.Physics.ARCADE);
        npc.body.immovable = true;
        npc.body.moves =false;
        npc.body.collideWorldBounds = true;
        npc.position.x = map.objects.NPC[0].x
        npc.position.y = map.objects.NPC[0].y
    }
