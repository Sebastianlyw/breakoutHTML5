var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameTestSebLi;
(function (GameTestSebLi) {
    var GameOverState = (function (_super) {
        __extends(GameOverState, _super);
        function GameOverState() {
            return _super.call(this) || this;
        }
        GameOverState.prototype.preload = function () {
            this.game.load.spritesheet('rain', 'Graphics/rain.png', 16, 16);
            this.game.load.audio("endGameMusic", "/Audio/endGame.wav");
        };
        GameOverState.prototype.create = function () {
            this.gameOverBackGround = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'galaxy1');
            this.gameOverBackGround.anchor.setTo(0.5, 0.5);
            this.gameOverBackGround.scale.setTo(this.game.width / this.gameOverBackGround.width, this.game.height / this.gameOverBackGround.height);
            this.gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Game Over ! \n\n - click to restart - ', { font: "40px Arial", fill: "#ffffff", align: "center" });
            this.gameOverText.anchor.setTo(0.5, 0.5);
            this.input.onTap.addOnce(this.gameOverClicked, this);
            //particle effect
            var emitter = this.game.add.emitter(this.game.world.centerX, 0, 500);
            emitter.width = this.game.world.width;
            // emitter.angle = 30; // uncomment to set an angle for the rain.
            emitter.makeParticles('rain');
            emitter.minRotation = 0;
            emitter.maxRotation = 0;
            emitter.minParticleScale = 0.1;
            emitter.maxParticleScale = 0.6;
            emitter.setYSpeed(300, 500);
            emitter.setXSpeed(-6, 6);
            emitter.start(false, 1550, 5, 0);
            this.gameOverMusic = this.game.add.sound("endGameMusic");
            this.gameOverMusic.volume = 80;
            this.gameOverMusic.loop = true;
            this.gameOverMusic.play();
        };
        GameOverState.prototype.gameOverClicked = function () {
            this.game.state.start("GamePlayState");
            this.gameOverMusic.stop();
        };
        return GameOverState;
    }(Phaser.State));
    GameTestSebLi.GameOverState = GameOverState;
})(GameTestSebLi || (GameTestSebLi = {}));
//# sourceMappingURL=GameOverState.js.map