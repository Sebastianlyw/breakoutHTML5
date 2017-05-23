var Game;
(function (Game) {
    Game.gameResolution = {
        with: 1280,
        height: 720,
    };
    var BreakOutGame = (function () {
        function BreakOutGame() {
            this.game = new Phaser.Game(Game.gameResolution.with, Game.gameResolution.height, Phaser.AUTO, 'content', { preload: this.preload, create: this.create, update: this.update });
        }
        BreakOutGame.prototype.preload = function () {
            this.game.load.atlas("breakout", "/Graphics/breakout.png", "/Graphics/breakout.json");
            this.game.load.image("galaxy1", "/Graphics/galaxy1.jpg");
            this.game.load.image("galaxy2", "/Graphics/galaxy2.jpg");
            this.game.load.image("logo", "/Graphics/breakoutLogo.png");
            //   this.game.load.audio("inGameMusic", ["/Audio/inGameScifi.ogg", "/Audio/inGameScifi.mp3", "/Audio/inGameScifi.wav"]);
            this.game.load.audio("endGameMusic", "/Audio/endGame.wav");
            this.game.load.audio("hitSound", "/Audio/hitSoundEffect.wav");
        };
        BreakOutGame.prototype.create = function () {
            this.game.state.add("MenuState", GameTestSebLi.MenuState, true);
            this.game.state.add("GamePlayState", GameTestSebLi.GamePlayState, false);
            this.game.state.add("GameOverState", GameTestSebLi.GameOverState, false);
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        };
        BreakOutGame.prototype.update = function () {
        };
        return BreakOutGame;
    }());
    Game.BreakOutGame = BreakOutGame;
})(Game || (Game = {}));
window.onload = function () {
    var game = new Game.BreakOutGame();
};
//# sourceMappingURL=main.js.map