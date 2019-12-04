import {Sides, Trait} from '../Entity.js';

export default class Collectible extends Trait {
    constructor() {
        super('collectible');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 0;
    }

    kill() {
        this.queue(() =>this.dead = true);
    }

    revive() {
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity, deltaTime, level) {
        if (this.dead) {
            this.deadTime += deltaTime;
            if (this.deadTime > this.removeAfter) {
                this.queue(() =>{
                    level.entities.delete(entity);
            
                });
            }    
        }
        
    }
}
