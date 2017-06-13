var currentEnemy = "NPC1";
var weaponsProfile = loadWeaponStats();
var enemiesProfile = loadEnemyStats();
var inBattle = false;
var flashStep = 1;
var keepFlashing = true;
var playerDamageCaused;
var enemyDamageCaused;

function fight(){
    resetPlayerVelocity();
    inBattle = true;
    window.setInterval(flash,200);
    setTimeout( setupFightWindow, 1000 );
    while(inBattle === true){
        if(playerTurn === true){
            $('.player-move-button').click(function() {
                playerDamageCaused = determineDamage(this);
                updateStats()
            });
        }else{
            enemyDamageCaused = randomizeDamage(npcProfile.enemyWeapon);
            updateStats()
        }
        updateCommentary();
    }
    displayLootAndStats();
}

function setupFightWindow(){
    document.getElementById('flashScreen').style.display = 'none';
    document.getElementById('flashScreen').style.backgroundColor="";
    keepFlashing = false;
    document.getElementsByClassName('modal')[0].style.display = 'block';

    //set images
    document.getElementById('player-image').src = 'assets/playerCloseUp.png';
    document.getElementById('enemy-image').src = npcProfile.enemyImage;

    //set levels
    document.getElementById('fw-player-level').innerHTML = "Level " + playerProfile.skillLevel;
    document.getElementById('fw-enemy-level').innerHTML = "Level " + npcProfile.skillLevel;

    //set weapons
    document.getElementById('fw-player-weapon').innerHTML = "Weapon: " + playerProfile.equippedWeapon;
    document.getElementById('fw-enemy-weapon').innerHTML = "Weapon: " + npcProfile.enemyWeapon;

    //set moves
    document.getElementById('fw-player-move1').innerHTML = getWeaponMoves(playerProfile.equippedWeapon)[0].Name;
    document.getElementById('fw-player-move2').innerHTML = getWeaponMoves(playerProfile.equippedWeapon)[1].Name;
    document.getElementById('fw-enemy-move1').innerHTML = getWeaponMoves(npcProfile.enemyWeapon)[0].Name;
    document.getElementById('fw-enemy-move2').innerHTML = getWeaponMoves(npcProfile.enemyWeapon)[1].Name;
}

function determineDamage(){

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

 function flash() {
    if(keepFlashing === true){
        document.getElementById('flashScreen').style.display = 'block';
        if(flashStep==1) {
        document.getElementById('flashScreen').style.backgroundColor="BLUE";
        flashStep=2; 
        }
        else {
        document.getElementById('flashScreen').style.backgroundColor="WHITE";
        flashStep=1;
        }
    }
}




$(document).ready(function() {
//   $('#inventory').click(function() {
//     fight();
//   });
//   window.onclick = function(event) {
//     if (event.target === document.getElementsByClassName('modal')[0]) {
//       document.getElementsByClassName('modal')[0].style.display = 'none';
//     }
//   };
//   $('.close').click(function() {
//     document.getElementsByClassName('modal')[0].style.display = 'none';
//   });
});