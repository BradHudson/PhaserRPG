var currentEnemy = "NPC1";
var weaponsProfile = loadWeaponStats();
var enemiesProfile = loadEnemyStats();
var inBattle = false;

function fight(){
    resetPlayerVelocity();
    inBattle = true;
    //Show stats, weapon, moves
    setupFightWindow();
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

function setupFightWindow(){
    document.getElementsByClassName('modal')[0].style.display = 'block';

    //set images
    document.getElementById('player-image').src = 'assets/playerCloseUp.png';
    document.getElementById('enemy-image').src = npcProfile.enemyImage;

    //set levels
    document.getElementById('fw-player-level').innerHTML = "Level " + playerProfile.skillLevel;
    document.getElementById('fw-enemy-level').innerHTML = "Level " + npcProfile.skillLevel;
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

$(document).ready(function() {
  $('#inventory').click(function() {
    fight();
  });
//   window.onclick = function(event) {
//     if (event.target === document.getElementsByClassName('modal')[0]) {
//       document.getElementsByClassName('modal')[0].style.display = 'none';
//     }
//   };
//   $('.close').click(function() {
//     document.getElementsByClassName('modal')[0].style.display = 'none';
//   });
});