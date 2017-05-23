module GameTestSebLi {

    export class MenuState extends Phaser.State {
        game: Phaser.Game;
        logoImage: Phaser.Sprite;
        menuBackGround: Phaser.Sprite;
        menuText: Phaser.Text;

        constructor() {
            super();
        }

        create()
        {
            this.menuBackGround = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'galaxy1');
            this.menuBackGround.anchor.setTo(0.5, 0.5);
            this.menuBackGround.scale.setTo(this.game.width / this.menuBackGround.width, this.game.height / this.menuBackGround.height);

            this.logoImage = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.logoImage.anchor.setTo(0.5, 0.5);
            var widthRation = this.game.width / this.logoImage.width;
            var heightRation = this.game.height / this.logoImage.height;

            this.logoImage.scale.setTo(widthRation / 5, heightRation / 5);
            this.game.add.tween(this.logoImage.scale).to({ x: widthRation / 1.2, y: heightRation / 1.2 }, 2000, Phaser.Easing.Bounce.Out, true);
            this.menuText = this.game.add.text(this.game.world.centerX, 600, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });

            this.menuText.anchor.setTo(0.5, 0.5);
            this.input.onTap.addOnce(this.menuClicked, this);
        }

        menuClicked() {

            this.game.state.start("GamePlayState");

        }
    }
}