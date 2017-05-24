module GameTestSebLi {

    
    
    export class Paddle extends Phaser.Sprite {
        game: Phaser.Game;
   
        constructor(game: Phaser.Game, x: number, y: number) {
           

            super(game, x, y, "breakout", "paddle_big.png");

            this.game = game;
            //!Move origin pint of sprit to center
            this.anchor.set(0.5, 0.5);
            this.scale.setTo(defaultScale, defaultScale);
            //!set colloision detection attributes.
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.collideWorldBounds = true;
            this.body.bounce.set(1);
            this.body.immovable = true;
        }

        update() {

            //!Paddle position will follow mouse cursor's x.
            this.x = this.game.input.x;

            const halfWidth = this.width / 2;
            if (this.x < halfWidth) {
                this.x = halfWidth;
            }
            else if (this.x > this.game.width - halfWidth) {
                this.x = this.game.width - halfWidth;
            }


          
        }

    }

}