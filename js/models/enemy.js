var inQuest = false;

function Enemy(stage, enemyID, object = nil){
    enemyJSON = loadEnemyStats()[stage][enemyID];
    this.name = enemyJSON.Name;
    this.skillLevel = enemyJSON.SkillLevel;
    this.enemyHealth = enemyJSON.Health;
    this.enemyWeapon = enemyJSON.Weapon;
    this.enemyHaveFought= enemyJSON.HaveFought;
    this.enemyImage = enemyJSON.ImageSource[0];
    this.shouldWander = enemyJSON.ShouldWander;
    this.startXY = [];
    this.object = object;
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

 function listStageEnemies() {
     loadEnemyStats()[currentStage];
 }