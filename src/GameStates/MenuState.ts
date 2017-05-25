module GameTestSebLi {
    export enum gameOrientation { lanscape, portrait }
    export var orientation = gameOrientation.lanscape;

    export class MenuState extends Phaser.State {
        game: Phaser.Game;
        logoImage: Phaser.Sprite;
        menuBackGround: Phaser.Sprite;
        muteBtn: Phaser.Sprite;
        unMuteBtn: Phaser.Sprite;
        menuText: Phaser.Text;
        tween: Phaser.Tween;
        filter : Phaser.Filter;

        constructor() {
            super();
            if (window.innerWidth > window.innerHeight) {
                orientation = gameOrientation.lanscape;
            }
            else {
                orientation = gameOrientation.portrait;
            }
            
        }

        create()
        {
            this.loadStaticImages();
            this.filter = this.game.add.filter('Fire', this.game.width, this.game.height);
            this.menuBackGround.filters = [this.filter];
            
            //this.input.onTap.addOnce(this.menuClicked, this);
        }

        loadStaticImages() {
            this.menuBackGround = this.add.sprite(0,0);
            this.menuBackGround.anchor.setTo(0.5, 0.5);
            this.menuBackGround.scale.setTo(this.game.width / this.menuBackGround.width, this.game.height / this.menuBackGround.height);

            this.logoImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.logoImage.anchor.setTo(0.5, 0.5);
            var widthRation = this.game.width / this.logoImage.width;
            var heightRation = this.game.height / this.logoImage.height;
            this.logoImage.scale.setTo(widthRation / 5, heightRation / 5);
            this.game.add.tween(this.logoImage.scale).to({ x: widthRation / 1.2, y: heightRation / 1.2 }, 2000, Phaser.Easing.Bounce.Out, true);


            this.menuText = this.game.add.text(this.game.world.centerX, window.innerHeight * 0.8, '- click here to start -', { font: "40px Arial", fill: "#ceefff", align: "center" });
            this.menuText.anchor.setTo(0.5, 0.5);
            this.menuText.inputEnabled = true;
            this.menuText.events.onInputDown.addOnce(this.menuClicked, this);
            this.menuText.alpha = 1;
            this.tween = this.game.add.tween(this.menuText).to( { alpha: 0.1 }, 500, "Linear", true);
            this.tween.onComplete.addOnce(this.tweenTextOn, this);



            this.muteBtn = this.game.add.sprite(this.game.world.centerX, window.innerHeight * 0.9,'mute');
            this.muteBtn.visible = (this.game.sound.mute);
            this.muteBtn.anchor.set(0.5);
            this.muteBtn.scale.setTo(0.1,0.1);
            this.muteBtn.alpha = 0.85;
            this.muteBtn.inputEnabled = true;
            this.muteBtn.events.onInputDown.add(this.listener, this);
   

            this.unMuteBtn = this.game.add.sprite(this.game.world.centerX, window.innerHeight * 0.9,'on');
            this.unMuteBtn.visible = !(this.game.sound.mute);
            this.unMuteBtn.anchor.set(0.5);
            this.unMuteBtn.alpha = 0.85;
            this.unMuteBtn.scale.setTo(0.0625,0.0625);
            this.unMuteBtn.inputEnabled = true;
            this.unMuteBtn.events.onInputDown.add(this.listenerTwo, this);
        }

        listener(){
            this.muteBtn.visible = false;
            this.unMuteBtn.visible = true;
            this.game.sound.mute = false;
        }

        listenerTwo(){
            this.muteBtn.visible = true;
            this.unMuteBtn.visible = false;
            this.game.sound.mute = true;

        }

        tweenTextOn(){
            this.tween.to( { alpha: 1 }, 500, "Linear", true);
            this.tween.onComplete.addOnce(this.tweenTextOff, this);
        }
        tweenTextOff(){
             this.tween.to( { alpha: 0.1 }, 500, "Linear", true);
            this.tween.onComplete.addOnce(this.tweenTextOn, this);
        }


        update() {
            var s = this.game.state.getCurrentState();

            if (window.innerWidth < window.innerHeight && orientation != gameOrientation.portrait) {
                orientation = gameOrientation.portrait;
                this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                this.loadStaticImages();
            }
            else if (window.innerWidth > window.innerHeight && orientation != gameOrientation.lanscape) {
                orientation = gameOrientation.lanscape;
                this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                this.loadStaticImages();
            } 

             this.filter.update();
        }

        menuClicked() {

            this.game.state.start("GamePlayState");

        }
    }
}