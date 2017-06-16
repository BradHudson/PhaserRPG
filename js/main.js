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
    var npcInformation;
    
    function preload() {
        loadAssetsByStage(currentStage);
    }
    function create() {
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        actionKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        game.world.setBounds(0, 0, 1920, 1920);
        addTileMapByStage(currentStage);
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
        ensureBigTreeSize();
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
        game.physics.arcade.collide(player, npc, function(){ setVelocityZero(npc); });
        if(Phaser.Rectangle.intersects(player.getBounds(), npc.getBounds()) && actionKeyAndAllowCollision() && inQuest === false){
            whoWeTalkingTo = "NPC1";
            allowCollision = false;
            setTimeout(preventDoubleCollision(), 500)
            if(inConversation === false){
                dialogArray = conversationJSON.Level1["NPC"][stageOfNPCConversation];
                inQuest = true;
                startConversation(dialogArray);
                if(stageOfNPCConversation === 1){
                    setTimeout(function(){
                        fight('NPC',2,3)}, 1500);  
                }
            }
        }
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
        npcJSONForCurrentStage = loadEnemyStats()[currentStage];
        //add enemy/NPC's
        for (var i = 0; i < npcJSONForCurrentStage.length; i++){
            createSprite(npcJSONForCurrentStage[i]);
        }
    }

    function createSprite(npcInfo){
        npc = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50, npcInfo.LoadImage);
        npcInformation = new Enemy(currentStage, npcInfo.ID, npc);
        game.physics.enable(npc, Phaser.Physics.ARCADE);
        npc.body.immovable = true;
        npc.body.stopVelocityOnCollide = true;
        npc.body.collideWorldBounds = true;
        npc.position.x = map.objects.NPC[npcInfo.ID].x
        npc.position.y = map.objects.NPC[npcInfo.ID].y
        npcInformation.startXY = [npc.position.x,npc.position.y];
        if(npcInfo.ShouldWander === true) {
            makeWander(npcInformation, true);
        } 
    }

    function ensureBigTreeSize() {
        if(bigTreeSprite.width <= 100 || bigTreeSprite.height <= 100){
            bigTreeSprite.width = 224;
            bigTreeSprite.height = 224;
        }
    }
