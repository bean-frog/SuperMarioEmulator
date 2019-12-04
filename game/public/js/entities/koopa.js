import Entity, {Sides, Trait} from '../Entity.js';
import Killable from '../traits/Killable.js';
import PendulumMove from '../traits/PendulumWalk.js';
import {loadSpriteSheet} from '../loaders.js';
import Enemy from '../traits/enemy.js';


export function loadKoopa() {
    return loadSpriteSheet('koopa')
    .then(createKoopaFactory);
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

class Behavior extends Trait {
    constructor() {
        super('behavior');

        this.hideTime = 0;
        this.hideDuration = 5;

        this.walkSpeed = null;
        this.panicSpeed = 300;

        this.state = STATE_WALKING;
    }

    collides(us, them) {
        if (us.killable.dead) {
            return;
        }

        if (them.vel.y > us.vel.y) {
            this.handleStomp(us, them);
        } else {
            this.handleNudge(us, them);
            }
        
    }

    handleNudge(us, them) {
        if (this.state === STATE_WALKING && !them.enemy) {
            them.killable.kill();
        } else if (this.state === STATE_HIDING && !them.enemy) {
            this.panic(us, them);
        } else if (this.state === STATE_PANIC && !them.collectible) {
            const travelDir = Math.sign(us.vel.x);
            const impactDir = Math.sign(us.pos.x - them.pos.x);
            if (travelDir !== 0 && travelDir !== impactDir) {
                them.killable.kill();
            }
            if (them.enemy){
                them.pendulumMove.speed = 0;

            }
        }
    }

    handleStomp(us, them) {
        if (this.state === STATE_WALKING && !them.enemy) {
            this.hide(us);
        } else if (this.state === STATE_HIDING && !them.enemy) {
            us.killable.kill();
            us.vel.set(100, -200);
            us.canCollide = false;
        } else if (this.state === STATE_PANIC && !them.enemy) {
            this.hide(us);
        }
    }

    hide(us) {
        us.vel.x = 0;
        us.pendulumMove.enabled = false;
        if (this.walkSpeed === null) {
            this.walkSpeed = us.pendulumMove.speed;
        }
        this.hideTime = 0;
        this.state = STATE_HIDING
    }

    unhide(us) {
        us.pendulumMove.enabled = true;
        us.pendulumMove.speed = this.walkSpeed;
        this.state = STATE_WALKING;
    }

    panic(us, them) {
        us.pendulumMove.enabled = true;
        us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }

    update(us, deltaTime) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTime;
            if (this.hideTime > this.hideDuration) {
                this.unhide(us);
            }
        }
    }
}


function createKoopaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');
    const wakeAnim = sprite.animations.get('wake');

    function routeAnim(koopa) {
        if (koopa.behavior.state === STATE_HIDING) {
            if (koopa.behavior.hideTime > 3) {
                return wakeAnim(koopa.behavior.hideTime);
            }
            return 'hiding';
        }

        if (koopa.behavior.state === STATE_PANIC) {
            return 'hiding';
        }

        return walkAnim(koopa.lifetime);
    }

    function drawKoopa(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        const koopa = new Entity();
        koopa.size.set(16, 16);
        koopa.offset.y = 8;

        koopa.addTrait(new PendulumMove());
        koopa.addTrait(new Killable());
        koopa.addTrait(new Behavior());
        koopa.addTrait(new Enemy());


        koopa.draw = drawKoopa;

        return koopa;
    };
}
