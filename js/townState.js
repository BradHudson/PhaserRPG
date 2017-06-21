var townState = {
    // preload: function(){
    //     game.load.spritesheet('dude', 'assets/newguy.png', 30, 32);
    //     game.load.spritesheet('adam', 'assets/characters/adam/adam.png', 30, 32);
    //     game.load.spritesheet('adam-back', 'assets/characters/adam/adam-back.png', 30, 32);
    //     game.load.spritesheet('adam-right', 'assets/characters/adam/adam-right.png', 30, 32);
    //     game.load.spritesheet('adam-left', 'assets/characters/adam/adam-left.png', 30, 32);
    //     game.load.spritesheet('weapons', 'assets/weapons-sheet.png', 32, 32);
    //     game.load.spritesheet('limb', 'assets/deku-stick.png', 16, 16);
    //     game.load.spritesheet('gus', 'assets/gus.png', 30, 32);
    //     game.load.tilemap('MyTilemap', 'rpgmap.json', null, Phaser.Tilemap.TILED_JSON);
    //     game.load.tilemap('TownMap', 'townmap.json', null, Phaser.Tilemap.TILED_JSON);
    //     game.load.image('grass', 'assets/grass-tiles.png');
    //     game.load.image('tree', 'assets/tree-tile.png');
    //     game.load.image('red', 'assets/RED.png');
    //     game.load.image('terrain-atlas', 'assets/terrain_atlas.png')
    //     game.load.image('speech_part', 'assets/speech_part.png');
    //     game.load.image('pop', 'assets/pop.png');
    //     game.load.image('townTiles1', 'assets/TownTiles1.png');
    //     game.load.image('townTiles2', 'assets/townTiles2.png');
    // },
    create: function() {
        spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        actionKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
        npcJSONForCurrentStage = loadEnemyStats()[currentStage];
        game.world.setBounds(0, 0, 1920, 1920);
        map = game.add.tilemap('TownMap');
        map.addTilesetImage('grass', 'grass');
        map.addTilesetImage('tree', 'tree');
        map.addTilesetImage('RED', 'red');
        map.addTilesetImage('terrain-atlas', 'terrain-atlas');
        map.addTilesetImage('townTiles1', 'townTiles1');
        map.addTilesetImage('townTiles', 'townTiles2');
		addLayersPlayerCollisions();
        // addNPC();
        addPlayerAnimations();
        addTextOnScreen();
    },
    update: function(){
    handleCollisions();
    resetPlayerVelocity();
	setKeys();
    }
}