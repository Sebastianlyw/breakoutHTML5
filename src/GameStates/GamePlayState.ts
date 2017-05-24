﻿module GameTestSebLi {
    const brickRows = 4;
    const brickColumns = 14;
    const rowPadding = 52;
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
        bgm: Phaser.Sound;
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
            this.loadStaticImages();

            this.bgm = this.game.add.audio("inGameMusic");
            this.bgm.volume = 10;
            
            this.bgm.loop = true;
            ////!play sound track will lag the  game. Will Fix later.
            this.bgm.play();
        }

        loadStaticImages() {
            //!load backgroupnd image.
            this.gameBackGround = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'galaxy2');
            this.gameBackGround.anchor.setTo(0.5, 0.5);
            this.gameBackGround.scale.setTo(this.game.width / this.gameBackGround.width, this.game.height / this.gameBackGround.height);

            //! load brick sprite group. positoin and scaling should base on device size. 
            this.brickGroups = this.game.add.group();
            var brick;

            var offsetX = window.innerWidth / 8;
            var offsetY = window.innerHeight / 10;
            brick = new Brick(this.game, offsetX, offsetY, 'brick_1_1.png');
            var padding = brick.width + 2;
            var columns = 14;
            var rows = 4;
            if (orientation == gameOrientation.portrait) {
                rows = 8;
                columns = 7;
            }

            var sx = (window.innerWidth - offsetX * 2) / ((columns + 1) * (padding));
            sx = (sx > 1.5) ? 1.5 : sx;
            
            for (var y = 0; y < rows; ++y) {
                for (var x = 1; x < columns; ++x) {
                    brick = new Brick(this.game, offsetX + (x * padding), offsetY + (y * rowPadding), 'brick_' + (y%4 + 1) + '_1.png');
                    this.brickGroups.add(brick);
                }
            }

            var sy = (window.innerHeight - offsetY * 2.2) / (rows * rowPadding);
            sy = (sy > 1.1) ? 1.1 : sy;
            this.brickGroups.scale.setTo(sx, sy);
            

            //! load paddle
            this.paddle = new Paddle(this.game, window.innerWidth / 2, window.innerHeight * 0.9);
            this.paddle.scale.setTo(sx, sy);
            this.game.add.existing(this.paddle);


            //! load ball and set it on the paddle at starting stage.
            this.ball = new Ball(this.game, this.paddle.x + ballInitPading, this.paddle.y - this.paddle.height);
            this.ball.scale.setTo(sx, sx);
            this.game.add.existing(this.ball);
            this.ball.events.onOutOfBounds.add(this.ballOutOfBounds, this);

            this.livesText = this.game.add.text(window.innerWidth - 100, 25, 'lives: ' + this.lives, { font: "20px Arial", fill: "#ffffff", align: "left" });
            this.scoreText = this.game.add.text(25, window.innerHeight * 0.92, 'score: 0', { font: "20px Arial", fill: "#ffffff", align: "left" });


        }
        cleanObjects() {
            this.ball.kill();
            this.paddle.kill();
            this.brickGroups.destroy(true);
        }
        update() {

            if (window.innerWidth < window.innerHeight && orientation != gameOrientation.portrait) {
                orientation = gameOrientation.portrait;
                this.cleanObjects();
                this.loadStaticImages();
                this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                console.log("change to portrait");
            }
            else if (window.innerWidth > window.innerHeight && orientation != gameOrientation.lanscape) {
                orientation = gameOrientation.lanscape;
                this.cleanObjects();
                this.loadStaticImages();
                this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
                console.log("change to lanscape");
            } 

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
                this.paddle.scale.setTo(cs * 1.2, this.paddle.scale.y);
            }

        }

        ballOutOfBounds() {
          

            this.livesText.text = "lives: " + --this.lives;
            if (this.lives == 0)
            {
                this.bgm.stop();
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