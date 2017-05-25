module GameTestSebLi {

    export class GameOverState extends Phaser.State {
       
        gameOverText: Phaser.Text;
        gameOverBackGround: Phaser.Sprite;
        gameOverMusic: Phaser.Sound;

        constructor() {
            super();
        }

        preload() {
            this.game.load.spritesheet('rain', '/asset/Graphics/rain.png', 16, 16);
            this.game.load.audio("endGameMusic", "/asset/Audio/endGame.wav");
        }

        create() {
            this.gameOverBackGround = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'galaxy1');
            this.gameOverBackGround.anchor.setTo(0.5, 0.5);
            this.gameOverBackGround.scale.setTo(this.game.width / this.gameOverBackGround.width, this.game.height / this.gameOverBackGround.height);

            this.gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Game Over ! \n\n - click to restart - ', { font: "40px Arial", fill: "#ffffff", align: "center" });

            this.gameOverText.anchor.setTo(0.5, 0.5);
            this.input.onTap.addOnce(this.gameOverClicked, this);

            //!rain particle effect
            var emitter = this.game.add.emitter(this.game.world.centerX, 0, 500);

            emitter.width = this.game.world.width;
         
            emitter.makeParticles('rain');
            emitter.minRotation = 0;
            emitter.maxRotation = 0;
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.6;
            emitter.setYSpeed(300, 500);
            emitter.setXSpeed(-6, 6);
            emitter.start(false, 1550, 5, 0);

            this.gameOverMusic = this.game.add.sound("endGameMusic");
            this.gameOverMusic.volume = 40;
            this.gameOverMusic.loop = true;
            
            this.gameOverMusic.play();
        }

        gameOverClicked() {
            this.game.state.start("MenuState");
            this.gameOverMusic.stop();
        }
    }
}