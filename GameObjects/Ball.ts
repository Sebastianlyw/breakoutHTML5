module GameTestSebLi{
    export enum BallState
    {
        OnPaddle,
        OffPaddle,
        OutOfBounds
    }

    export class Ball extends Phaser.Sprite {
        game: Phaser.Game;
        ballState: BallState;
        constructor(game: Phaser.Game, x: number, y: number) {
         
            super(game, x, y, "breakout", "ball_1.png");

            this.ballState = BallState.OnPaddle;
            this.game = game;
            this.anchor.set(0.5, 0.5);
            this.scale.setTo(defaultScale, defaultScale);

            this.checkWorldBounds = true;
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            //! ball should fall off the bottom border.
            this.game.physics.arcade.checkCollision.down = false;
            this.body.collideWorldBounds = true;
            this.body.bounce.set(1);

            this.game.input.onDown.add(this.releaseBall, this);
        }

        update() {

          

        }


        releaseBall() {

            if (this.ballState == BallState.OnPaddle) {
                this.ballState = BallState.OffPaddle;
            this.body.velocity.y = -300;
            this.body.velocity.x = -75;
          
            }

        }

      

    }

}