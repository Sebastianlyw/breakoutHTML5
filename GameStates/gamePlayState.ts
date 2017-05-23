module GameTestSebLi {
    const brickRows = 4;
    const brickColumns = 16;
    const leftOffset = 200;
    const topOffset = 100;
    const columnPadding = 36;
    const rowPadding = 52;
    const paddleStartY = 600;
    const ballInitPading = 16;
    const xSpeed = 10;
    const hitBrickScore = 100;
    const rewardScore = 800;
    const maxScale = 5;
    export const defaultScale = 1.3;


    export class GamePlayState extends Phaser.State {
        game: Phaser.Game;
        gameBackGround: Phaser.Sprite;
        brickGroups: Phaser.Group;
        brick: GameTestSebLi.Brick;
        paddle: GameTestSebLi.Paddle;
        ball: GameTestSebLi.Ball;
        //bgm: Phaser.Sound;
        hitSound: Phaser.Sound;
        livesText: Phaser.Text;
        scoreText: Phaser.Text;
        lives: number;
        static score = 0;
       
        constructor() {
            super();
            
        }

        create() {
           
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
                    brick = new Brick(this.game, leftOffset + (x * columnPadding), topOffset + (y * rowPadding), 'brick_' + (y + 1) + '_1.png');
                    this.brickGroups.add(brick);
                }
            }
            this.brickGroups.scale.setTo(defaultScale, defaultScale);


            //! load paddle
            this.paddle = new Paddle(this.game, this.game.world.centerX, paddleStartY);
            this.game.add.existing(this.paddle);

            //! load ball and set it on the paddle at starting stage.
            this.ball = new Ball(this.game, this.paddle.x + ballInitPading, this.paddle.y - this.paddle.height);
            this.game.add.existing(this.ball);

            this.ball.events.onOutOfBounds.add(this.ballOutOfBounds, this);

            this.livesText = this.game.add.text(50, 50, 'lives: ' + this.lives, { font: "20px Arial", fill: "#ffffff", align: "left" });
            this.scoreText = this.game.add.text(50, 600, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });

            //this.bgm = this.game.add.audio("inGameMusic");
            //this.bgm.volume = 90;
            
            //this.bgm.loop = true;
            ////!play sound track will lag the  game. Will Fix later.
            //this.bgm.play();
        }
        update() {
            //! bounce logic 
            if (this.ball.ballState == BallState.OnPaddle) {
                this.ball.body.x = this.paddle.body.x + ballInitPading; 
            }
            else {
                this.game.physics.arcade.collide(this.ball, this.paddle, this.ballCollidedWithPaddle, null, this);
                this.game.physics.arcade.collide(this.ball, this.brickGroups, this.ballCollidedWithBrick, null, this);
            }

        }

        ballCollidedWithPaddle(_ball, _paddle) {
            //Change x velocity of ball to make ball reflect with some angle.
            var diff = _ball.x - _paddle.x;

            //! if ball hit the middle of paddle, try to avoid bouncing straight up.
            _ball.body.velocity.x = (diff != 0) ? xSpeed * diff * (Math.random() +0.5)  : Math.random() * xSpeed + 3;

        }

        ballCollidedWithBrick(_ball, _brick) {
            this.hitSound = this.game.add.audio("hitSound");
            this.hitSound.volume = 80;
            
            this.hitSound.play();

            _brick.kill();
            GamePlayState.score += hitBrickScore;
            this.scoreText.text = "score: " + GamePlayState.score;
            //!Reset level if all bricks are destoried.
            if (this.brickGroups.countLiving() == 0) {
            
                this.ball.ballState = BallState.OnPaddle;
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

        }

        ballOutOfBounds() {
          

            this.livesText.text = "lives: " + --this.lives;
            if (this.lives == 0)
            {
              //  this.bgm.stop();
                this.game.state.start("GameOverState");
            }
            else
            {
                this.ball.ballState = BallState.OnPaddle;
                this.ball.reset(this.paddle.x + ballInitPading, this.paddle.y - this.paddle.height);
            }

        }

    }

}