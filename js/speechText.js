SpeechText = function(game,x,y, offset_x, offset_y, speech, visible_ms, follow, callback) {
    Phaser.Group.call(this, game);

    this.follow = follow;
    this.offset_x = offset_x;
    this.offset_y = offset_y;
    this.pos_x = x;
    this.pos_y = y;

    this.callback = callback;

    //background image
    this.popupback = game.add.sprite(this.pos_x, this.pos_y - 20, 'pop');
    this.popupback.anchor.setTo(0.5, 1);
    this.popupback.name = 'pop_background';
    this.addChild(this.popupback);

    this.def_text = speech;

    this.nameLabel = game.add.text(this.pos_x, this.pos_y - 20, this.def_text, { font: '20px Patrick Hand SC', fill: '#000000' });
    this.nameLabel.anchor.setTo(0.5, 1);
    this.nameLabel.lineSpacing = 0;
    this.nameLabel.name = 'pop_text';

    this.resize_me();
    this.addChild(this.nameLabel);

    this.speech_part = game.add.sprite(this.pos_x, this.pos_y - 19.5, 'speech_part');
    this.speech_part.anchor.setTo(0.5, 1);
    this.speech_part.position.y = this.nameLabel.position.y + this.nameLabel._height - 11;
    this.addChild(this.speech_part);

    this.tween_in = game.add.tween(this).to({alpha: 1, y: 20}, 300,Phaser.Easing.Quadratic.In,true);
    this.tween_in.start();
    this.resize_me();
}

SpeechText.prototype = Object.create(Phaser.Group.prototype);
SpeechText.prototype.constructor = SpeechText;

SpeechText.prototype.resize_me = function() {
    this.popupback.width = this.nameLabel._width + 50; //offset
    this.popupback.height = this.nameLabel._height + 10;
}

SpeechText.prototype.update = function() {

    if( Object.prototype.toString.call(this.follow ) === '[object Object]' ) {
        ////////////////////
        //follow player
        this.popupback.position.x = this.follow.position.x + this.offset_x;
        this.popupback.position.y = this.follow.position.y + this.offset_y;
        this.speech_part.position.x = this.follow.position.x + this.offset_x ;
        this.speech_part.position.y = this.follow.position.y + this.offset_y + 17;
        this.nameLabel.position.x = this.follow.position.x + this.offset_x ;
        this.nameLabel.position.y = this.follow.position.y + this.offset_y;
        ////////////////////
    }

    var check_timer = this.pop_end_timer - game.time.now + 1000;
    if(this.type_speech == 'multi') {
        // this.new_text_position = findValue(this.speech_ranges);

        if(typeof this.speech_pick[parseInt(this.new_text_position) - 1] != "undefined") {
            this.new_title = this.speech_pick[parseInt(this.new_text_position) - 1];
            if(this.nameLabel.text != this.new_title) {
                this.nameLabel.text = this.new_title;
                // this.resize_me();
            }
        }
    }

}
