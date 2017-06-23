var currentEnemy;
var npcProfile;
var winningConvoIndex;
var losingConvoIndex;
var weaponsProfile = loadWeaponStats();
var enemiesProfile = loadEnemyStats();
var inBattle = false;
var flashStep = 1;
var keepFlashing = true;
var playerDamageCaused;
var enemyDamageCaused;
var playerTurn = true;
var playerMove1;
var playerMove2;
var enemyMove1;
var enemyMove2;
var whosTurn = 'Player';
var playerWon;
var battleCenter;
var currentEnemySprite;
var normalEnemyTint;

function fight(enemy,winningIndex,losingIndex,sprite){
    npcProfile = new Enemy(currentStage, enemy,sprite);
    currentEnemy = npcProfile.name;
    winningConvoIndex = winningIndex;
    losingConvoIndex = losingIndex;
    resetPlayerVelocity();
    inBattle = true;
    window.setInterval(flash,200);
    setTimeout( setupFightWindow, 1000 );
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
    playerMove1 = getWeaponMoves(playerProfile.equippedWeapon)[0].Name;
    playerMove2 = getWeaponMoves(playerProfile.equippedWeapon)[1].Name;
    enemyMove1 = getWeaponMoves(npcProfile.enemyWeapon)[0].Name;
    enemyMove2 = getWeaponMoves(npcProfile.enemyWeapon)[1].Name;

    document.getElementById('fw-player-move1').innerHTML = playerMove1;
    document.getElementById('fw-player-move2').innerHTML = playerMove2;
    document.getElementById('fw-enemy-move1').innerHTML = enemyMove1;
    document.getElementById('fw-enemy-move2').innerHTML = enemyMove2;

    $('#fw-player-move1').click(function(){
        if(whosTurn === 'Player'){
            attemptMove(playerProfile.equippedWeapon,0);
        }  
    });
    $('#fw-player-move2').click(function(){
        if(whosTurn === 'Player'){
            attemptMove(playerProfile.equippedWeapon,1);
        }  
    });
}

function attemptMove(item,moveIndex){
    moveDetails = weaponsProfile[item].Moves[moveIndex];
    updateFightCommentary(whosTurn + " performs " + moveDetails.Name);
    setTimeout(function(){ 
       damageDone = determineDamage.bind(moveDetails)();
        if(whosTurn === 'Player'){
        updateNPCStats(damageDone);
        } else{
            updatePlayerStats(damageDone);
        }
     }, 1000);
}

function determineDamage(){
    highestSuccessValue = Math.floor(Math.random() * 100) + 1;
    if(highestSuccessValue > moveDetails.Chance){
        updateFightCommentary(whosTurn + " attempts " + moveDetails.Name + " and Misses!");
        return 0;
    } else {
        updateFightCommentary(whosTurn + " attempts " + moveDetails.Name + " and Lands Dealing " + moveDetails.Damage +  " Damage!");
        return moveDetails.Damage;
    }
}

function updateNPCStats(damage){
    setTimeout(function(){
        npcProfile.enemyHealth = npcProfile.enemyHealth - damage;
        if(npcProfile.enemyHealth < 1){
            updateFightCommentary("The enemy has been Killed!");
            playerWon = true;
            setTimeout(endOfFight,1000);
        }else{
            updateFightCommentary("The enemy has " + npcProfile.enemyHealth + " Health Remaining.");
            whosTurn = 'Enemy';
            setTimeout(function(){
                attemptMove(npcProfile.enemyWeapon,Math.floor(Math.random() * 2))
            }, 1000);
        }
     },1000)
}

function updatePlayerStats(damage){
    setTimeout(function(){
    playerProfile.playerHealth = playerProfile.playerHealth - damage;
    if(playerProfile.playerHealth < 1){
        updateFightCommentary("Player has been Killed!");
        playerWon = false;
        setTimeout(endOfFight,1000);
    }else{
        updateFightCommentary("Player has " + playerProfile.playerHealth + " Remaining. You're Turn Hero!");
        whosTurn = 'Player';
    }}, 1000);
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

function updateFightCommentary(text){
    document.getElementById('fight-commentary').innerHTML = text;
}

function endOfFight(){
    document.getElementsByClassName('modal')[0].style.display = 'none';
    if(playerWon === true){
        dialogArray = conversationJSON.Level1[currentEnemy][winningConvoIndex];
        startConversation(dialogArray, npcProfile.object);
    }else{
        dialogArray = conversationJSON.Level1[currentEnemy][losingConvoIndex];
        startConversation(dialogArray, npcProfile.object);
    }
    inBattle = false;
}

function positionPlayers(enemy) {
    resetPlayerVelocity();
    currentEnemySprite = enemy;
    inBattle = true;
    enemy.body.velocity = 0;
    var x = (player.position.x + enemy.position.x)/2;
    var y = (player.position.y + enemy.position.y)/2;
    battleCenter = game.add.sprite(x,y);
    game.camera.follow(battleCenter, Phaser.Camera.FOLLOW_TOPDOWN);
    player.frame = 6;
    enemy.loadTexture('adam');
    player.position.x = battleCenter.position.x - 100;
    player.position.y = battleCenter.position.y;
    enemy.position.x = battleCenter.position.x + 100;
    enemy.position.y = battleCenter.position.y;
    renderFightButtons();
}

function finishBattle(){
    inBattle = false;
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    battleCenter.destroy();
}

function renderFightButtons(){
    move1 = game.add.button(player.position.x, player.position.y + 50, '', move1Click);
    move1.width = 300;
    move2 = game.add.button(player.position.x, player.position.y + 100, '', move2Click);
    move2.width = 300;
    textMove1 = game.add.text(player.position.x, player.position.y + 50, "Strike",  { font: "24px Arial", fill: '#ffffff', backgroundColor: 'rgb(38, 12, 12)' });
    textMove2 = game.add.text(player.position.x, player.position.y + 100, "Powerful Strike",  { font: "24px Arial", fill: '#ffffff', backgroundColor: 'rgb(38, 12, 12)' });
}

function move1Click() {
    if(whosTurn = 'Player'){
    playerAttack()
    }
}

function move2Click() {
    if(whosTurn = 'Player'){
    playerAttack()
    }
}

function playerAttack(){
    player.position.x = npc.position.x - 25
    playerWeapon.anchor.setTo(.5, .5);
    normalEnemyTint = currentEnemySprite.tint;
    currentEnemySprite.tint = "0xff0000";
	// playerWeapon.animations.play('swing-right');
    setTimeout(enemyTurn, 1000);
}

function enemyTurn() {
    currentEnemySprite.tint = normalEnemyTint;
    player.position.x = battleCenter.position.x - 100;
}