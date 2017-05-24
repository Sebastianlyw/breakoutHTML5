module GameTestSebLi {
    export enum gameOrientation { lanscape, portrait }
    export var orientation = gameOrientation.lanscape;

    export class MenuState extends Phaser.State {
        game: Phaser.Game;
        logoImage: Phaser.Sprite;
        menuBackGround: Phaser.Sprite;
        menuText: Phaser.Text;
      
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

           
            
            this.input.onTap.addOnce(this.menuClicked, this);
        }

        loadStaticImages() {
            this.menuBackGround = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'galaxy1');
            this.menuBackGround.anchor.setTo(0.5, 0.5);
            this.menuBackGround.scale.setTo(this.game.width / this.menuBackGround.width, this.game.height / this.menuBackGround.height);

            this.logoImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.logoImage.anchor.setTo(0.5, 0.5);
            var widthRation = this.game.width / this.logoImage.width;
            var heightRation = this.game.height / this.logoImage.height;
            this.logoImage.scale.setTo(widthRation / 5, heightRation / 5);
            this.game.add.tween(this.logoImage.scale).to({ x: widthRation / 1.2, y: heightRation / 1.2 }, 2000, Phaser.Easing.Bounce.Out, true);


            this.menuText = this.game.add.text(this.game.world.centerX, window.innerHeight * 0.7, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
            this.menuText.anchor.setTo(0.5, 0.5);
        }

        update() {
            var s = this.game.state.getCurrentState();

            if (window.innerWidth < window.innerHeight && orientation != gameOrientation.portrait) {
                orientation = gameOrientation.portrait;
                this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                this.loadStaticImages();
                console.log("change to portrait");
            }
            else if (window.innerWidth > window.innerHeight && orientation != gameOrientation.lanscape) {
                orientation = gameOrientation.lanscape;
                this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                this.loadStaticImages();
                console.log("change to lanscape");
            } 
        }

        menuClicked() {

            this.game.state.start("GamePlayState");

        }
    }
}