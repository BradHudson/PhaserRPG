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
var playerProfile = new Player();
var inQuest = false;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');
game.state.add('boot', bootState);
game.state.add('stage1', stage1State);
game.state.add('town', townState);
game.state.start('boot');

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
