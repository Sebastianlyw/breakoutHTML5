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
    var BallState;
    (function (BallState) {
        BallState[BallState["OnPaddle"] = 0] = "OnPaddle";
        BallState[BallState["OffPaddle"] = 1] = "OffPaddle";
        BallState[BallState["OutOfBounds"] = 2] = "OutOfBounds";
    })(BallState = GameTestSebLi.BallState || (GameTestSebLi.BallState = {}));
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(game, x, y) {
            var _this = _super.call(this, game, x, y, "breakout", "ball_1.png") || this;
            _this.ballState = BallState.OnPaddle;
            _this.game = game;
            _this.anchor.set(0.5, 0.5);
            _this.scale.setTo(GameTestSebLi.defaultScale, GameTestSebLi.defaultScale);
            _this.checkWorldBounds = true;
            _this.game.physics.enable(_this, Phaser.Physics.ARCADE);
            //! ball should fall off the bottom border.
            _this.game.physics.arcade.checkCollision.down = false;
            _this.body.collideWorldBounds = true;
            _this.body.bounce.set(1);
            _this.game.input.onDown.add(_this.releaseBall, _this);
            return _this;
        }
        Ball.prototype.update = function () {
        };
        Ball.prototype.releaseBall = function () {
            if (this.ballState == BallState.OnPaddle) {
                this.ballState = BallState.OffPaddle;
                this.body.velocity.y = -300;
                this.body.velocity.x = -75;
            }
        };
        return Ball;
    }(Phaser.Sprite));
    GameTestSebLi.Ball = Ball;
})(GameTestSebLi || (GameTestSebLi = {}));
