import {Sides, Trait} from '../Entity.js';

export default class Blocker extends Trait {
    constructor() {
        super('blocker');
        
    }

    bounce(us, them, speed) {
        if(speed > 0){
            us.bounds.bottom = them.bounds.top;
            us.vel.y = speed;
            us.jump.ready=1;
        } else {
            us.bounds.top= them.bounds.bottom;
            us.vel.y = -speed;
            
        }
    }

    collides(us, them) {
        if (them.block){
            if(us.vel.y > them.vel.y) {
                this.bounce(us, them,1);
            }
            if(us.vel.y < them.vel.y) {
                this.bounce(us, them,-1);
            }
        }
    }
}
