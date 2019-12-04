import Entity, {Sides, Trait} from '../Entity.js';
import Collectible from '../traits/Collectible.js';
import {loadSpriteSheet} from '../loaders.js';

export function loadCoin() {
    return loadSpriteSheet('coin')
    .then(createCoinFactory);
}

class Behavior extends Trait {
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.collectible.dead) {
            return;
        }

        if (them.stomper ) {
            
                us.collectible.kill();
                them.stomper.collect+=0.5;
            
        }
    }
}

function createCoinFactory(sprite) {
    const rotateAnim = sprite.animations.get('rotate');

    function routeAnim(coin) {
        return rotateAnim(coin.lifetime);
    }

    function drawCoin(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createCoin() {
        const coin = new Entity();
        coin.size.set(16, 16);

        coin.addTrait(new Behavior());
        coin.addTrait(new Collectible());


        coin.draw = drawCoin;

        return coin;
    };
}