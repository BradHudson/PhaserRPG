var currentEnemy;
var weaponsProfile = loadWeaponStats();
var enemiesProfile = loadEnemyStats();
var inBattle = false;

function fight(stage, enemy){
    currentEnemy = enemies.Stages[stage];

    //Open Fight Window
    //Show stats, weapon, moves
    // List of player moves
    //Fight Loop
        // Select a move
        // Randomize to see if lands
        // Use SkillLevel to determine amount of damage
        // Reduce health of enemy
        // Enemy uses only move
        //Randomize
        // If it lands, reduce players health
        // Once someone is dead exit loop
    //Depending on Winner, display some text showing
    //Winner, Loot, Skill Points, Change JSON value of enemy to "fought"
}

function loadWeaponStats(){
   var request = new XMLHttpRequest();
   request.open("GET", "gameData/weapons.json", false);
   request.send(null);
   return JSON.parse(request.responseText);
 }

 function loadEnemyStats(){
   var request = new XMLHttpRequest();
   request.open("GET", "gameData/enemy.json", false);
   request.send(null);
   return JSON.parse(request.responseText);
 } 