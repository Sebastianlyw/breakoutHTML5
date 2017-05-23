module GameTestSebLi {

    export class Brick extends Phaser.Sprite {
        game: Phaser.Game;

        constructor(game: Phaser.Game, x: number, y: number, brickSprite: string) {


            super(game, x, y, "breakout", brickSprite);

            this.game = game;
            //!Move origin pint of sprit to center
            this.anchor.set(0.5, 0.5);
            //!set colloision detection attributes.
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.bounce.set(1);
            this.body.immovable = true;
        }
    }
}