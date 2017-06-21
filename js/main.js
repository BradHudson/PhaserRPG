    //var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });
    var player;
    var spaceKey;
    var actionKey
	var collisionlayer;
    var allowCollision = true;
    var bigTreeSprite;
    var npc;
    var currentStage = "Stage1";
    var npcInformation;
    var whoWeTalkingToID;
    var npcInformatonJSON = { Stage1: [] };

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');
    game.state.add('boot', bootState);
    game.state.add('stage1', stage1State);
    game.state.add('town', townState);
    game.state.start('boot');

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
            game.state.start('town');
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

    function addNPC(){
        npcGroup = game.add.group();

        //add enemy/NPC's
        for (var i = 0; i < npcJSONForCurrentStage.length; i++){
            createSprite(npcJSONForCurrentStage[i]);
        }
    }

    function createSprite(npcInfo){
        npc = npcGroup.create(game.world.centerX - 50, game.world.centerY - 50, npcInfo.LoadImage);
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
        npcInformatonJSON[currentStage].push(npcInformation); 
    }

    function ensureBigTreeSize() {
        if(bigTreeSprite.width <= 100 || bigTreeSprite.height <= 100){
            bigTreeSprite.width = 224;
            bigTreeSprite.height = 224;
        }
    }
