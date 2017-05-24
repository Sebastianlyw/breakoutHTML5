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
    var gameOrientation;
    (function (gameOrientation) {
        gameOrientation[gameOrientation["lanscape"] = 0] = "lanscape";
        gameOrientation[gameOrientation["portrait"] = 1] = "portrait";
    })(gameOrientation = GameTestSebLi.gameOrientation || (GameTestSebLi.gameOrientation = {}));
    GameTestSebLi.orientation = gameOrientation.lanscape;
    var MenuState = (function (_super) {
        __extends(MenuState, _super);
        function MenuState() {
            var _this = _super.call(this) || this;
            if (window.innerWidth > window.innerHeight) {
                GameTestSebLi.orientation = gameOrientation.lanscape;
            }
            else {
                GameTestSebLi.orientation = gameOrientation.portrait;
            }
            return _this;
        }
        MenuState.prototype.create = function () {
            this.loadStaticImages();
            this.input.onTap.addOnce(this.menuClicked, this);
        };
        MenuState.prototype.loadStaticImages = function () {
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
        };
        MenuState.prototype.update = function () {
            var s = this.game.state.getCurrentState();
            if (window.innerWidth < window.innerHeight && GameTestSebLi.orientation != gameOrientation.portrait) {
                GameTestSebLi.orientation = gameOrientation.portrait;
                this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                this.loadStaticImages();
                console.log("change to portrait");
            }
            else if (window.innerWidth > window.innerHeight && GameTestSebLi.orientation != gameOrientation.lanscape) {
                GameTestSebLi.orientation = gameOrientation.lanscape;
                this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                this.loadStaticImages();
                console.log("change to lanscape");
            }
        };
        MenuState.prototype.menuClicked = function () {
            this.game.state.start("GamePlayState");
        };
        return MenuState;
    }(Phaser.State));
    GameTestSebLi.MenuState = MenuState;
})(GameTestSebLi || (GameTestSebLi = {}));
