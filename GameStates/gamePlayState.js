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
    var brickRows = 4;
    var brickColumns = 16;
    var leftOffset = 200;
    var topOffset = 100;
    var columnPadding = 36;
    var rowPadding = 52;
    var paddleStartY = 600;
    var ballInitPading = 16;
    var xSpeed = 10;
    var hitBrickScore = 100;
    var rewardScore = 800;
    var maxScale = 5;
    GameTestSebLi.defaultScale = 1.3;
    var GamePlayState = (function (_super) {
        __extends(GamePlayState, _super);
        function GamePlayState() {
            return _super.call(this) || this;
        }
        GamePlayState.prototype.create = function () {
            this.lives = 4;
            GamePlayState.score = 0;
            //!load backgroupnd image.
            this.gameBackGround = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'galaxy2');
            this.gameBackGround.anchor.setTo(0.5, 0.5);
            this.gameBackGround.scale.setTo(this.game.width / this.gameBackGround.width, this.game.height / this.gameBackGround.height);
            //! load bricks sprite and set collison attributes.
            this.brickGroups = this.game.add.group();
            var brick;
            for (var y = 0; y < brickRows; ++y) {
                for (var x = 0; x < brickColumns; ++x) {
                    brick = new GameTestSebLi.Brick(this.game, leftOffset + (x * columnPadding), topOffset + (y * rowPadding), 'brick_' + (y + 1) + '_1.png');
                    this.brickGroups.add(brick);
                }
            }
            this.brickGroups.scale.setTo(GameTestSebLi.defaultScale, GameTestSebLi.defaultScale);
            //! load paddle
            this.paddle = new GameTestSebLi.Paddle(this.game, this.game.world.centerX, paddleStartY);
            this.game.add.existing(this.paddle);
            //! load ball and set it on the paddle at starting stage.
            this.ball = new GameTestSebLi.Ball(this.game, this.paddle.x + ballInitPading, this.paddle.y - this.paddle.height);
            this.game.add.existing(this.ball);
            this.ball.events.onOutOfBounds.add(this.ballOutOfBounds, this);
            this.livesText = this.game.add.text(50, 50, 'lives: ' + this.lives, { font: "20px Arial", fill: "#ffffff", align: "left" });
            this.scoreText = this.game.add.text(50, 600, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });
            //this.bgm = this.game.add.audio("inGameMusic");
            //this.bgm.volume = 90;
            //this.bgm.loop = true;
            ////!play sound track will lag the  game. Will Fix later.
            //this.bgm.play();
        };
        GamePlayState.prototype.update = function () {
            //! bounce logic 
            if (this.ball.ballState == GameTestSebLi.BallState.OnPaddle) {
                this.ball.body.x = this.paddle.body.x + ballInitPading;
            }
            else {
                this.game.physics.arcade.collide(this.ball, this.paddle, this.ballCollidedWithPaddle, null, this);
                this.game.physics.arcade.collide(this.ball, this.brickGroups, this.ballCollidedWithBrick, null, this);
            }
        };
        GamePlayState.prototype.ballCollidedWithPaddle = function (_ball, _paddle) {
            //Change x velocity of ball to make ball reflect with some angle.
            var diff = _ball.x - _paddle.x;
            //! if ball hit the middle of paddle, try to avoid bouncing straight up.
            _ball.body.velocity.x = (diff != 0) ? xSpeed * diff * (Math.random() + 0.5) : Math.random() * xSpeed + 3;
        };
        GamePlayState.prototype.ballCollidedWithBrick = function (_ball, _brick) {
            this.hitSound = this.game.add.audio("hitSound");
            this.hitSound.volume = 80;
            this.hitSound.play();
            _brick.kill();
            GamePlayState.score += hitBrickScore;
            this.scoreText.text = "score: " + GamePlayState.score;
            //!Reset level if all bricks are destoried.
            if (this.brickGroups.countLiving() == 0) {
                this.ball.ballState = GameTestSebLi.BallState.OnPaddle;
                this.ball.body.velocity.set(0);
                this.ball.x = this.paddle.x + ballInitPading;
                this.ball.y = this.paddle.y - this.paddle.height;
                this.brickGroups.callAll('revive', null);
            }
            //! give some reward if player meet certain score achivement
            if (GamePlayState.score % rewardScore == 0 && this.paddle.scale.x < maxScale) {
                var cs = this.paddle.scale.x;
                this.paddle.scale.setTo(cs * 1.2, 1);
            }
        };
        GamePlayState.prototype.ballOutOfBounds = function () {
            this.livesText.text = "lives: " + --this.lives;
            if (this.lives == 0) {
                //  this.bgm.stop();
                this.game.state.start("GameOverState");
            }
            else {
                this.ball.ballState = GameTestSebLi.BallState.OnPaddle;
                this.ball.reset(this.paddle.x + ballInitPading, this.paddle.y - this.paddle.height);
            }
        };
        return GamePlayState;
    }(Phaser.State));
    GamePlayState.score = 0;
    GameTestSebLi.GamePlayState = GamePlayState;
})(GameTestSebLi || (GameTestSebLi = {}));
//# sourceMappingURL=GamePlayState.js.map