module Game {
    export const gameResolution = {
        with: 1280,
        height: 720,
    }
    export class BreakOutGame {
        game: Phaser.Game;
      
        constructor() {
            this.game = new Phaser.Game(gameResolution.with, gameResolution.height, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });

        }

        preload() {
            this.game.load.atlas("breakout", "/Graphics/breakout.png", "/Graphics/breakout.json");
            this.game.load.image("galaxy1", "/Graphics/galaxy1.jpg");
            this.game.load.image("galaxy2", "/Graphics/galaxy2.jpg");
            this.game.load.image("logo", "/Graphics/breakoutLogo.png");
         //   this.game.load.audio("inGameMusic", ["/Audio/inGameScifi.ogg", "/Audio/inGameScifi.mp3", "/Audio/inGameScifi.wav"]);
            this.game.load.audio("endGameMusic", "/Audio/endGame.wav");
            this.game.load.audio("hitSound", "/Audio/hitSoundEffect.wav");
        }

        create() {
            this.game.state.add("MenuState", GameTestSebLi.MenuState, true);
            this.game.state.add("GamePlayState", GameTestSebLi.GamePlayState, false);
            this.game.state.add("GameOverState", GameTestSebLi.GameOverState, false);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        }

        update() {

        }


    }

}

window.onload = () => {
    var game = new Game.BreakOutGame();

};
    