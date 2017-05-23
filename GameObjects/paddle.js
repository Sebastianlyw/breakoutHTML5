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
    var Paddle = (function (_super) {
        __extends(Paddle, _super);
        function Paddle(game, x, y) {
            var _this = _super.call(this, game, x, y, "breakout", "paddle_big.png") || this;
            _this.game = game;
            //!Move origin pint of sprit to center
            _this.anchor.set(0.5, 0.5);
            _this.scale.setTo(GameTestSebLi.defaultScale, GameTestSebLi.defaultScale);
            //!set colloision detection attributes.
            game.physics.enable(_this, Phaser.Physics.ARCADE);
            _this.body.collideWorldBounds = true;
            _this.body.bounce.set(1);
            _this.body.immovable = true;
            return _this;
        }
        Paddle.prototype.update = function () {
            //!Paddle position will follow mouse cursor's x.
            this.x = this.game.input.x;
            var halfWidth = this.width / 2;
            if (this.x < halfWidth) {
                this.x = halfWidth;
            }
            else if (this.x > this.game.width - halfWidth) {
                this.x = this.game.width - halfWidth;
            }
        };
        return Paddle;
    }(Phaser.Sprite));
    GameTestSebLi.Paddle = Paddle;
})(GameTestSebLi || (GameTestSebLi = {}));
//# sourceMappingURL=Paddle.js.map