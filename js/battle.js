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
var playerHP;
var enemyHP;
var whosTurn = 'Player';
var playerWon;
var battleCenter;
var currentEnemySprite;
var normalEnemyTint;
var normalPlayerTint;

function fight(enemy,winningIndex,losingIndex,sprite){
    npcProfile = new Enemy(currentStage, enemy,sprite);
    currentEnemy = npcProfile.name;
    winningConvoIndex = winningIndex;
    losingConvoIndex = losingIndex;
    window.setInterval(flash,200);
    setTimeout( stopFlashing, 1000 );
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
        textOnScreen.text =  whosTurn + " attempts " + moveDetails.Name + " and Misses!";
        return 0;
    } else {
        textOnScreen.text = whosTurn + " attempts " + moveDetails.Name + " and Lands Dealing " + moveDetails.Damage +  " Damage!";
        return moveDetails.Damage;
    }
}

function updateNPCStats(damage){
    setTimeout(function(){
        
     },1000)
}

function updatePlayerStats(damage){
    setTimeout(function(){
    playerProfile.playerHealth = playerProfile.playerHealth - damage;
    playerHP.text = "HP:" + playerProfile.playerHealth;
    if(playerProfile.playerHealth < 1){
        textOnScreen.text = "Player has been Killed!";
        playerWon = false;
        setTimeout(finishBattle,1000);
    }else{
        textOnScreen.text = "Player has " + playerProfile.playerHealth + " Remaining. You're Turn Hero!";
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
        document.getElementById('flashScreen').style.backgroundColor="RED";
        flashStep=1;
        }
    }
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
    move1.destroy();
    move2.destroy();
    textMove1.destroy();
    textMove2.destroy();
    playerHP.destroy();
    enemyHP.destroy();
    if(playerWon === true){
        dialogArray = conversationJSON.Level1[currentEnemy][winningConvoIndex];
        startConversation(dialogArray, npcProfile.object);
    }else{
        dialogArray = conversationJSON.Level1[currentEnemy][losingConvoIndex];
        startConversation(dialogArray, npcProfile.object);
    }
    inBattle = false;
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);
    battleCenter.destroy();
}

function renderFightButtons(){
    move1 = game.add.button(player.position.x, player.position.y + 50, '', move1Click);
    move1.width = 300;
    move2 = game.add.button(player.position.x, player.position.y + 100, '', move2Click);
    move2.width = 300;
    textMove1 = game.add.text(player.position.x, player.position.y + 50, getWeaponMoves(playerProfile.equippedWeapon)[0].Name,  { font: "24px Arial", fill: '#ffffff', backgroundColor: 'rgb(38, 12, 12)' });
    textMove2 = game.add.text(player.position.x, player.position.y + 100, getWeaponMoves(playerProfile.equippedWeapon)[1].Name,  { font: "24px Arial", fill: '#ffffff', backgroundColor: 'rgb(38, 12, 12)' });
    playerHP = game.add.text(player.position.x, player.position.y - 30, "HP:" + playerProfile.playerHealth,  { font: "24px Arial", fill: '#ffffff' });
    enemyHP = game.add.text(currentEnemySprite.position.x, currentEnemySprite.position.y - 30, "HP:" + npcProfile.enemyHealth,  { font: "24px Arial", fill: '#ffffff' });
}

function move1Click() {
    if(whosTurn = 'Player'){
    moveDetails = weaponsProfile[playerProfile.equippedWeapon].Moves[0];
    performMoveText(moveDetails.Name)
    setTimeout(function(){playerAttack(moveDetails)},1000)
    }
}

function move2Click() {
    if(whosTurn = 'Player'){
    moveDetails = weaponsProfile[playerProfile.equippedWeapon].Moves[1];
    performMoveText(moveDetails.Name)
    setTimeout(function(){playerAttack(moveDetails)},1000)
    }
}

function playerAttack(moveDetails){
    damageDone = determineDamage.bind(moveDetails)();
    if(damageDone > 0){
    player.position.x = npc.position.x - 25
    normalEnemyTint = currentEnemySprite.tint;
    currentEnemySprite.tint = "0xff0000";
    npcProfile.enemyHealth = npcProfile.enemyHealth - damageDone;
    enemyHP.text = "HP:" + npcProfile.enemyHealth;
    }
    if(npcProfile.enemyHealth < 1){
        textOnScreen.text = "The enemy has been Killed!";
        playerWon = true;
        setTimeout(finishBattle,1000);
    }else{
        textOnScreen.text = "The enemy has " + npcProfile.enemyHealth + " Health Remaining.";
        whosTurn = 'Enemy';
        setTimeout(enemyAttack, 2000);
    }
    setTimeout(function() {
    currentEnemySprite.tint = normalEnemyTint;
    player.position.x = battleCenter.position.x - 100;
    }, 1000)
}

function enemyAttack() {
    moveDetails = weaponsProfile[npcProfile.enemyWeapon].Moves[Math.floor(Math.random() * 2)]
    damageDone = determineDamage.bind(moveDetails)();
    normalPlayerTint = player.tint;
    if(damageDone > 0){
    npcProfile.object.position.x = player.position.x + 25;
    player.tint = "0xff0000";

    playerProfile.playerHealth = playerProfile.playerHealth - damageDone;
    playerHP.text = "HP:" + playerProfile.playerHealth;
}
    setTimeout(function(){
    if(playerProfile.playerHealth < 1){
        textOnScreen.text = "Player has been Killed!";
        playerWon = false;
        setTimeout(finishBattle,1000);
    }else{
        textOnScreen.text = "Player has " + playerProfile.playerHealth + " Remaining. You're Turn Hero!";
    }
    setTimeout(function() {
    player.tint = normalPlayerTint;
    npcProfile.object.position.x = battleCenter.position.x + 100;
    }, 1000)
    whosTurn = "Player"},1000)
}

function performMoveText(moveName){
    textOnScreen.text = (whosTurn + " performs " + moveName);;
}

function stopFlashing(){
    positionPlayers(npcProfile.object)
    document.getElementById('flashScreen').style.display = 'none';
    document.getElementById('flashScreen').style.backgroundColor="";
    keepFlashing = false;
}