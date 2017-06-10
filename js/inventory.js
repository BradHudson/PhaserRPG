function showInventory(){
    var inventory = document.getElementById('inventory-menu');
    if(inventory.style.display === 'none' || inventory.style.display === ''){
        inventory.style.display = 'block';
    } else {
        inventory.style.display = 'none';
    }
    
}