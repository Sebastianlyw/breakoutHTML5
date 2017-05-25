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
        emitter:  Phaser.Particles.Arcade.Emitter;
        index: number;
        isAlive : boolean;
        static ballCounter:number = 0;

        constructor(game: Phaser.Game, x: number, y: number) {
         
            super(game, x, y, "breakout", "ball_1.png");

            //! this index is also the position it is in BallGroup array. 
            this.index = Ball.ballCounter;
            ++Ball.ballCounter;
            this.isAlive = true;

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


            this.emitter = this.game.add.emitter(x,y, 400);//!maxparticle number.
            this.emitter.makeParticles( [ 'flare1', 'flare2', 'flare3' ] );
            this.emitter.gravity = 200;
            this.emitter.setAlpha(1, 0, 2000);
            this.emitter.setScale(0.4, 0, 0.4, 0, 2000);
            console.log("new ball index : " + this.index);
            this.game.input.onDown.add(this.releaseBall, this);
            if(this.index != 0){
                this.releaseBall();
            }
          
           

        }

        update() {
             this.emitter.emitX = this.x;
             this.emitter.emitY = this.y;
          

        }


        releaseBall() {

            if (this.ballState == BallState.OnPaddle) {
                this.ballState = BallState.OffPaddle;
                this.body.velocity.y = -350;
                this.body.velocity.x = (Math.random() > 0.5) ? 80 : -80;
                this.emitter.on = true;
                this.emitter.start(false, 2000, 5);  //!start(explode, lifespan, frequency,...)
            }

        }

      

    }

}