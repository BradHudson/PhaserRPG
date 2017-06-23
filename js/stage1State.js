var stage1State = {
    create: function() {
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        actionKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        npcJSONForCurrentStage = loadEnemyStats()[currentStage];
        game.world.setBounds(0, 0, 1920, 1920);
        map = game.add.tilemap('MyTilemap');
        map.addTilesetImage('grass', 'grass');
        map.addTilesetImage('tree', 'tree');
        map.addTilesetImage('RED', 'red');
        map.addTilesetImage('terrain-atlas', 'terrain-atlas');
		stage1State.addLayersPlayerCollisions();
        addNPC();
        addPlayerAnimations();
        addTextOnScreen();
    },
    update: function(){
    stage1State.handleCollisions();
    resetPlayerVelocity();
	setKeys();
    },
    handleCollisions: function(){
        game.physics.arcade.collide(player, collisionlayer);
        stage1State.handleNPCCollision();
        stage1State.handleBigTreeCollision();
    },
    addLayersPlayerCollisions: function(){
        collisionlayer = map.createLayer('Collisions');
		map.setCollision(137, true, 'Collisions');

		//BASE LAYER
        layer = map.createLayer('Background');
        map.setCollision(137, true, 'Collisions');

        
        bigTreeSprite = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50);
        bigTreeSprite.scale.setTo(7, 7);
        bigTreeSprite.position.x = map.objects.BigTree[0].x + 20;
        bigTreeSprite.position.y = map.objects.BigTree[0].y - 20;
        game.physics.enable(bigTreeSprite, Phaser.Physics.ARCADE);
        bigTreeSprite.body.immovable = true;
        bigTreeSprite.body.collideWorldBounds = true;

        //INVISIBLE WALL EXIT TO TOWN
        exitToTownSprite = game.add.sprite(game.world.centerX - 50, game.world.centerY - 50);
        exitToTownSprite.scale.setTo(5, 1);
        exitToTownSprite.position.x = map.objects.ExitToTown[0].x;
        exitToTownSprite.position.y = map.objects.ExitToTown[0].y;
        game.physics.enable(exitToTownSprite, Phaser.Physics.ARCADE);
        exitToTownSprite.body.immovable = true;
        exitToTownSprite.body.collideWorldBounds = true;

        //LOAD THE PLAYER
		player = game.add.sprite(800, 400, 'dude');
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
		player.bringToTop();
        player.position.x = map.objects.StartPosition[0].x;
        player.position.y = map.objects.StartPosition[0].y;
        equipWeapon(player, 'Axe'); //wanna see him hold the axe? click to swing

        // add other layers
		map.createLayer('Foreground');
        map.createLayer('Treetop');
		layer.resizeWorld();
		layer.wrap = true;  
    },
    handleBigTreeCollision: function() {
        stage1State.ensureBigTreeSize();
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
            playerProfile.ComingFromLocation = 'woods';
            game.state.start('town');
        }
    },
    handleNPCCollision: function(){
        game.physics.arcade.collide(player, npcGroup, function(player,n){ stage1State.npcCollisionHandler(player,n) });
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
    },
    npcCollisionHandler: function(player,n) {
        whoWeTalkingToID = npcGroup.children.indexOf(n);
        setVelocityZero(n);
    },
    ensureBigTreeSize: function() {
        if(bigTreeSprite.width <= 100 || bigTreeSprite.height <= 100){
            bigTreeSprite.width = 224;
            bigTreeSprite.height = 224;
        }
    }

}