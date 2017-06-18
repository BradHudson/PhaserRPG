var playerWeapon;

function showInventory(){
    var inventory = document.getElementById('inventory-menu');
    if(inventory.style.display === 'none' || inventory.style.display === ''){
        inventory.style.display = 'block';
    } else {
        inventory.style.display = 'none';
    }
}

function addWeaponToInventory(item){
    if(playerProfile.playerWeapons.indexOf(item) === -1){
        playerProfile.playerWeapons.push(item);
        var ul = document.getElementById("weapon-list");
        var li = document.createElement("li");

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = item;
        checkbox.value = item;
        checkbox.id = item;
        checkbox.checked = false;
        checkbox.onclick = selectOnlyThis;

        var label = document.createElement('label')
        label.htmlFor = item;
        label.appendChild(document.createTextNode('This is the limb label'));
        li.appendChild(document.createTextNode(item));
        ul.appendChild(checkbox);
        ul.appendChild(li);
    }
}

function selectOnlyThis() {
    updateWeaponEquipped(this);
    for (var i = 0; i <= playerProfile.playerWeapons.length - 1; i++)
    {
        document.getElementById(playerProfile.playerWeapons[i]).checked = false;
    }
    this.checked = true;
}

function updateWeaponEquipped(item){
    equipWeapon(player, item.id);
    var weaponImage = document.getElementById('weapon-image');
    weaponImage.style.display = 'block';
    weaponImage.src = weaponsProfile[item.name].ImageSource;
    playerProfile.equippedWeapon = item.name;
    document.getElementById('weapon-equipped').innerHTML = item.name;
}

function weaponEquipped(){
    playerProfile.equippedWeapon != "";
}

function getWeaponMoves(item){
    return weaponsProfile[item].Moves;
}

function chooseWeaponFromSheet(type){
    return weaponsProfile[type];
}

function equipWeapon(sprite, weaponType){
    weaponReference = chooseWeaponFromSheet(weaponType);
    if(weaponType === 'Limb') {
        playerWeapon = new Phaser.Sprite(this.game, 10, 10, "limb", weaponReference.SpriteSheetFrames.Start);
        playerWeapon.scale.setTo(1.3,1.3);
    }else{
        playerWeapon = new Phaser.Sprite(this.game, 10, 10, "weapons", weaponReference.SpriteSheetFrames.Start);
    }
    addWeaponAnimations(playerWeapon);
    sprite.addChild(playerWeapon);
    playerWeapon.animations.play('down');
	playerWeapon.anchor.setTo(.7, .3);
}

function addWeaponAnimations(weapon){
    weapon.animations.add('down',[weaponReference.SpriteSheetFrames.Down], 10, true);
    weapon.animations.add('left', [weaponReference.SpriteSheetFrames.Left], 10, true);
    weapon.animations.add('right', [weaponReference.SpriteSheetFrames.Right], 10, true);
    weapon.animations.add('swing-left', [weaponReference.SpriteSheetFrames.SwingLeft], 7, false);
    weapon.animations.add('swing-right', [weaponReference.SpriteSheetFrames.SwingRight], 7, false);
    weapon.animations.add('swing-down', [weaponReference.SpriteSheetFrames.SwingDown], 7, false); //cant swing down? idk
}