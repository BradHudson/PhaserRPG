var playerProfile = new Player();
var inQuest = false;
var weaponList = [];

function Player(){
    playerJSON = loadPlayerStats();
    this.skillLevel = playerJSON.SkillLevel;
    this.playerHealth = playerJSON.Health;
    this.playerCheckPoint = playerJSON.Checkpoint;
    this.playerWeapons = playerJSON.Weapons;
    this.playerInventory = playerJSON.Inventory;
}

function savePlayer(){
    //export to new json or overwrite existing
}

 function loadPlayerStats(){
   var request = new XMLHttpRequest();
   request.open("GET", "gameData/player1.json", false);
   request.send(null);
   return JSON.parse(request.responseText);
 }