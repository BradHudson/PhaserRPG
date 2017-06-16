function loadAssetsByStage(stage){
    switch(stage) {
        case "Stage1":
            game.load.spritesheet('dude', 'assets/newguy.png', 30, 32);
            game.load.spritesheet('adam', 'assets/characters/adam/adam.png', 30, 32);
            game.load.spritesheet('adam-back', 'assets/characters/adam/adam-back.png', 30, 32);
            game.load.spritesheet('adam-right', 'assets/characters/adam/adam-right.png', 30, 32);
            game.load.spritesheet('adam-left', 'assets/characters/adam/adam-left.png', 30, 32);
            game.load.spritesheet('gus', 'assets/gus.png', 30, 32);
            game.load.tilemap('MyTilemap', 'rpgmap.json', null, Phaser.Tilemap.TILED_JSON);
            game.load.image('grass', 'assets/grass-tiles.png');
            game.load.image('tree', 'assets/tree-tile.png');
            game.load.image('red', 'assets/RED.png');
            game.load.image('terrain-atlas', 'assets/terrain_atlas.png')
            break;
    }
}
