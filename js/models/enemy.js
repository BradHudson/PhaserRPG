var npcProfile = new Enemy(currentStage, currentEnemy);
var inQuest = false;

function Enemy(stage, enemyID){
    enemyJSON = loadEnemyStats()[currentStage][currentEnemy];
    this.skillLevel = enemyJSON.SkillLevel;
    this.enemyHealth = enemyJSON.Health;
    this.enemyWeapon = enemyJSON.Weapon;
    this.enemyHaveFought= enemyJSON.HaveFought;
    this.enemyImage = enemyJSON.ImageSource;
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