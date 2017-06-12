var currentEnemy = "NPC1";
var weaponsProfile = loadWeaponStats();
var enemiesProfile = loadEnemyStats();
var inBattle = false;

function fight(){
    resetPlayerVelocity();
    inBattle = true;
    //Open Fight Window
    document.getElementsByClassName('modal')[0].style.display = 'block';
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

$(document).ready(function() {
  $('.modal-click').click(function() {
    document.getElementsByClassName('modal')[0].style.display = 'block';
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