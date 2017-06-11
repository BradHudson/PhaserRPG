var npcProfile = new Enemy(currentStage, currentEnemy);
var inQuest = false;

function Enemy(stage, enemyID){
    playerJSON = loadEnemyStats();
    this.skillLevel = playerJSON.SkillLevel;
    this.playerHealth = playerJSON.Health;
    this.playerCheckPoint = playerJSON.Checkpoint;
    this.playerWeapons = playerJSON.Weapons;
    this.playerInventory = playerJSON.Inventory;
}

function saveEnemyData(){
    //export to new json or overwrite existing
}

 function loadEnemyStats(){
   var request = new XMLHttpRequest();
   request.open("GET", "gameData/enemy.json", false);
   request.send(null);
   return JSON.parse(request.responseText);
 }