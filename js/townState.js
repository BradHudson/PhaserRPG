var townState = {
    create: function() {
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        actionKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        npcJSONForCurrentStage = loadEnemyStats()[currentStage];
        game.world.setBounds(0, 0, 1920, 1920);
        map = game.add.tilemap('TownMap');
        map.addTilesetImage('grass', 'grass');
        // map.addTilesetImage('tree', 'tree');
        map.addTilesetImage('RED', 'red');
        map.addTilesetImage('terrain-atlas', 'terrain-atlas');
        map.addTilesetImage('townTiles1', 'townTiles1');
        map.addTilesetImage('townTiles', 'townTiles2');
		addLayersPlayerCollisions();
        if(game.state.current === 'stage1'){
        addNPC();
        }
        addPlayerAnimations();
        addTextOnScreen();
    },
    update: function(){
    handleCollisions();
    resetPlayerVelocity();
	setKeys();
    }

}