function loadAssetsByStage(stage){
    switch(stage) {
        case "Stage1":
            game.load.spritesheet('dude', 'assets/newguy.png', 30, 32);
            game.load.spritesheet('adam', 'assets/characters/adam/adam.png', 30, 32);
            game.load.spritesheet('adam-back', 'assets/characters/adam/adam-back.png', 30, 32);
            game.load.spritesheet('adam-right', 'assets/characters/adam/adam-right.png', 30, 32);
            game.load.spritesheet('adam-left', 'assets/characters/adam/adam-left.png', 30, 32);
            game.load.spritesheet('weapons', 'assets/weapons-sheet.png', 32, 32);
            game.load.spritesheet('limb', 'assets/deku-stick.png', 16, 16);
            game.load.spritesheet('gus', 'assets/gus.png', 30, 32);
            game.load.tilemap('MyTilemap', 'rpgmap.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.tilemap('TownMap', 'townmap.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('grass', 'assets/grass-tiles.png');
            game.load.image('tree', 'assets/tree-tile.png');
            game.load.image('red', 'assets/RED.png');
            game.load.image('terrain-atlas', 'assets/terrain_atlas.png');
            game.load.image('townTiles1', 'assets/townTiles1.png');
            game.load.image('townTiles2', 'assets/townTiles2.png');
            game.load.image('speech_part', 'assets/speech_part.png');
            game.load.image('pop', 'assets/pop.png');
            break;
    }
}

function addTileMapByStage(stage){
     switch(stage) {
        case "Stage1":
            map = game.add.tilemap('MyTilemap');
            map.addTilesetImage('grass', 'grass');
            map.addTilesetImage('tree', 'tree');
            map.addTilesetImage('RED', 'red');
            map.addTilesetImage('terrain-atlas', 'terrain-atlas');
        case "Town":
            map = game.add.tilemap('TownMap');
            map.addTilesetImage('grass', 'grass');
            map.addTilesetImage('tree', 'tree');
            map.addTilesetImage('RED', 'red');
            map.addTilesetImage('terrain-atlas', 'terrain-atlas');
            map.addTilesetImage('townTiles1', 'townTiles1');
            map.addTilesetImage('townTiles2', 'townTiles1');
    }
}
