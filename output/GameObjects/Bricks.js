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
    var Brick = (function (_super) {
        __extends(Brick, _super);
        function Brick(game, x, y, brickSprite) {
            var _this = _super.call(this, game, x, y, "breakout", brickSprite) || this;
            _this.game = game;
            //!Move origin pint of sprit to center
            _this.anchor.set(0.5, 0.5);
            //!set colloision detection attributes.
            game.physics.enable(_this, Phaser.Physics.ARCADE);
            _this.body.bounce.set(1);
            _this.body.immovable = true;
            return _this;
        }
        return Brick;
    }(Phaser.Sprite));
    GameTestSebLi.Brick = Brick;
})(GameTestSebLi || (GameTestSebLi = {}));
