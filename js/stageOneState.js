var stage1State = {
    preload: function(){
        game.load.spritesheet('dude', 'assets/newguy.png', 30, 32);
        game.load.spritesheet('adam', 'assets/characters/adam/adam.png', 30, 32);
        game.load.spritesheet('adam-back', 'assets/characters/adam/adam-back.png', 30, 32);
        game.load.spritesheet('adam-right', 'assets/characters/adam/adam-right.png', 30, 32);
        game.load.spritesheet('adam-left', 'assets/characters/adam/adam-left.png', 30, 32);
        game.load.spritesheet('weapons', 'assets/weapons-sheet.png', 32, 32);
        game.load.spritesheet('limb', 'assets/deku-stick.png', 16, 16);
        game.load.spritesheet('gus', 'assets/gus.png', 30, 32);
        game.load.tilemap('MyTilemap', 'rpgmap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('TownMap', 'townmap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('grass', 'assets/grass-tiles.png');
        game.load.image('tree', 'assets/tree-tile.png');
        game.load.image('red', 'assets/RED.png');
        game.load.image('terrain-atlas', 'assets/terrain_atlas.png')
        game.load.image('speech_part', 'assets/speech_part.png');
        game.load.image('pop', 'assets/pop.png');
        game.load.image('townTiles1', 'assets/TownTiles1.png');
        game.load.image('townTiles2', 'assets/townTiles2.png');
    },
    create: function() {
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        actionKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        npcJSONForCurrentStage = loadEnemyStats()[currentStage];
        game.world.setBounds(0, 0, 1920, 1920);
        map = game.add.tilemap('MyTileMap');
        map.addTilesetImage('grass', 'grass');
        map.addTilesetImage('tree', 'tree');
        map.addTilesetImage('RED', 'red');
        map.addTilesetImage('terrain-atlas', 'terrain-atlas');
		addLayersPlayerCollisions();
        // addNPC();
        addPlayerAnimations();
        addTextOnScreen();
    },
    update: function(){
    // handleCollisions();
    // resetPlayerVelocity();
	// setKeys();
    }

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
            startConversation(dialogArray,bigTreeSprite,true);
            addWeaponToInventory('Limb');
            inQuest = false;
        }
        if(Phaser.Rectangle.intersects(player.getBounds(), exitToTownSprite.getBounds())){
            whoWeTalkingTo = "BigTree";
            allowCollision = false;
            setTimeout(preventDoubleCollision(), 500)
            dialogArray = conversationJSON.Level1["BigTree"];
            startConversation(dialogArray,bigTreeSprite,true);
            addWeaponToInventory('Limb');
            inQuest = false;
        }
    }

    function handleNPCCollision() {
        game.physics.arcade.collide(player, npcGroup, function(player,n){ npcCollisionHandler(player,n) });
        if(Phaser.Rectangle.intersects(player.getBounds(), npcGroup.getBounds()) && actionKeyAndAllowCollision() && inQuest === false){
            allowCollision = false;// prevent double collision for half a second
            setTimeout(preventDoubleCollision(), 500)
            if(inConversation === false){
                whoWeTalkingTo = npcJSONForCurrentStage[whoWeTalkingToID].Name;
                dialogArray = conversationJSON.Level1[whoWeTalkingTo][stageOfNPCConversation];
                inQuest = true;
                startConversation(dialogArray, npcGroup.children[whoWeTalkingToID]);
                if(stageOfNPCConversation === 1){
                    setTimeout(function(){
                        fight(whoWeTalkingToID,2,3,npcGroup.children[whoWeTalkingToID])}, 1500);  
                }
            }
        }
    }

    function npcCollisionHandler(player,n) {
        whoWeTalkingToID = npcGroup.children.indexOf(n);
        setVelocityZero(n);
    }

    function addLayersPlayerCollisions(){
        //COLLISIONS LAYER MOST IMPORTANT
        collisionlayer = map.createLayer('Collisions');
		map.setCollision(137, true, 'Collisions');

		//BASE LAYER
        layer = map.createLayer('Background');
		
        // //INVISIBLE WALL BIG TREE
        // bigTreeSprite = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50);
        // bigTreeSprite.scale.setTo(7, 7);
        // bigTreeSprite.position.x = map.objects.BigTree[0].x + 20;
        // bigTreeSprite.position.y = map.objects.BigTree[0].y - 20;
        // game.physics.enable(bigTreeSprite, Phaser.Physics.ARCADE);
        // bigTreeSprite.body.immovable = true;
        // bigTreeSprite.body.collideWorldBounds = true;

        // //INVISIBLE WALL EXIT TO TOWN
        // exitToTownSprite = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50);
        // exitToTownSprite.scale.setTo(4, 4);
        // exitToTownSprite.position.x = map.objects.ExitToTown[0].x;
        // exitToTownSprite.position.y = map.objects.ExitToTown[0].y;
        // game.physics.enable(exitToTownSprite, Phaser.Physics.ARCADE);
        // exitToTownSprite.body.immovable = true;
        // exitToTownSprite.body.collideWorldBounds = true;

        //LOAD THE PLAYER
		player = game.add.sprite(800, 400, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
		player.bringToTop();
        player.position.x = map.objects.StartPosition[0].x;
        player.position.y = map.objects.StartPosition[0].y;
        //equipWeapon(player, 'Axe'); //wanna see him hold the axe? click to swing

		// add other layers
		map.createLayer('Foreground');
        map.createLayer('Treetop');
		layer.resizeWorld();
		layer.wrap = true;  
    }

    // function addNPC(){
    //     npcGroup = game.add.group();

    //     //add enemy/NPC's
    //     for (var i = 0; i < npcJSONForCurrentStage.length; i++){
    //         createSprite(npcJSONForCurrentStage[i]);
    //     }
    // }

    // function createSprite(npcInfo){
    //     npc = npcGroup.create(game.world.centerX - 50, game.world.centerY - 50, npcInfo.LoadImage);
    //     npcInformation = new Enemy(currentStage, npcInfo.ID, npc);
    //     game.physics.enable(npc, Phaser.Physics.ARCADE);
    //     npc.body.immovable = true;
    //     npc.body.stopVelocityOnCollide = true;
    //     npc.body.collideWorldBounds = true;
    //     npc.position.x = map.objects.NPC[npcInfo.ID].x
    //     npc.position.y = map.objects.NPC[npcInfo.ID].y
    //     npcInformation.startXY = [npc.position.x,npc.position.y];
    //     if(npcInfo.ShouldWander === true) {
    //         makeWander(npcInformation, true);
    //     }
    //     npcInformatonJSON[currentStage].push(npcInformation); 
    // }

    // function ensureBigTreeSize() {
    //     if(bigTreeSprite.width <= 100 || bigTreeSprite.height <= 100){
    //         bigTreeSprite.width = 224;
    //         bigTreeSprite.height = 224;
    //     }
    // }