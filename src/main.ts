﻿module Game {
   
    export class BreakOutGame {
        game: Phaser.Game;
      
        constructor() {
            this.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
        }

        preload() {
            this.game.load.atlas("breakout", "/asset/Graphics/breakout.png", "/asset/Graphics/breakout.json");
            this.game.load.image("galaxy1", "/asset/Graphics/galaxy1.jpg");
            this.game.load.image("galaxy2", "/asset/Graphics/galaxy2.jpg");
            this.game.load.image("logo", "/asset/Graphics/breakoutLogo.png");
            this.game.load.image("mute", "/asset/Graphics/mute.png");
            this.game.load.image("on", "/asset/Graphics/unmute.png");
            this.game.load.image("flare1", "/asset/Graphics/flare_point.png");
            this.game.load.image("flare2", "/asset/Graphics/flare_diamond.png");
            this.game.load.image("flare3", "/asset/Graphics/flare_vertical.png");
            this.game.load.audio("inGameMusic", "/asset/Audio/badass.wav");
            this.game.load.audio("endGameMusic", "/asset/Audio/endGame.wav");
            this.game.load.audio("hitSound", "/asset/Audio/hitSoundEffect.wav");
            this.game.load.script('filter', "/asset/Graphics/Fire.js");
            this.game.load.spritesheet('rain', '/asset/Graphics/rain.png', 16, 16);
            this.game.load.audio("endGameMusic", "/asset/Audio/endGame.wav");
        }

        create() {
            this.game.state.add("MenuState", GameTestSebLi.MenuState, true);
            this.game.state.add("GamePlayState", GameTestSebLi.GamePlayState, false);
            this.game.state.add("GameOverState", GameTestSebLi.GameOverState, false);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            console.log("main create?");

        }

        update() {
            console.log("never triger?");
        }


    }

}

window.onload = () => {
    var game = new Game.BreakOutGame();

};
    