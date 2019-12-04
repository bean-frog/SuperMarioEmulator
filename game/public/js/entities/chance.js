import Entity, {Sides, Trait} from '../Entity.js';
import Block from '../traits/block.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadChance() {
    return loadSpriteSheet('chance')
    .then(createChanceFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
        this.empty=false;
    }

    /*collides(us, them) {
        var ttop=Math.floor(them.bounds.top);
        var tbot=Math.floor(them.bounds.bottom);
        var tleft=Math.floor(them.bounds.left);
        var tright=Math.floor(them.bounds.right);
        var utop=Math.floor(us.bounds.top);
        var ubot=Math.floor(us.bounds.bottom);
        var uleft=Math.floor(us.bounds.left);
        var uright=Math.floor(us.bounds.right);

        var condition1 = (tbot>=utop) ||
           (ttop<=ubot)  ;
        var condition2 = (tleft<=uright && tleft>=uleft) ||
           (tright<=uright && tright>=uleft);
        if(condition2){
            console.log('xcollide');
            if (them.vel.x > 0) {
                if (tright >= uleft) {
                    tright = uleft;
                    them.vel.x = 0;

                    them.obstruct(Sides.RIGHT);
                }
            } else if (them.vel.x < 0) {
                if (tleft <= uright) {
                    tleft = uright;
                    them.vel.x = 0;

                    them.obstruct(Sides.LEFT);
                }
            }
        }
        if(condition1){
            console.log("ylog");
            if (them.vel.y > 0) {
                if (tbot >= utop) {
                    tbot = utop;
                    them.vel.y = 0;

                    them.obstruct(Sides.TOP);
                }
            } else if (them.vel.y < 0) {
                if (ttop <= ubot) {
                    ttop = ubot;
                    them.vel.y = 0;

                    them.obstruct(Sides.BOTTOM);
                }
            }
        }
    }*/
    collides(us, them) {
        

        if (them.Blocker ) {
            if (them.vel.y > us.vel.y) {
                
            } else {

            }
        }
    }
}

function createChanceFactory(sprite) {
    const rotateAnim = sprite.animations.get('rotate');

    function routeAnim(chance) {
        return rotateAnim(chance.lifetime);
    }

    function drawChance(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createChance() {
        const chance = new Entity();
        chance.size.set(16, 16);

        chance.addTrait(new Behavior());
        chance.addTrait(new Block());

        chance.draw = drawChance;

        return chance;
    };
}