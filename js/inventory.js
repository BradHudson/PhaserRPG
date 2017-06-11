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
    var weaponImage = document.getElementById('weapon-image');
    weaponImage.style.display = 'block';
    weaponImage.src = weaponsProfile[item.name].ImageSource;
    playerProfile.equippedWeapon = item;
    document.getElementById('weapon-equipped').innerHTML = item.name;
}

function weaponEquipped(){
    playerProfile.equippedWeapon != "";
}