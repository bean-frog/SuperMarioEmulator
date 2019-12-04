import {loadMario} from './entities/Mario.js';
import {loadGoomba} from './entities/Goomba.js';
import {loadKoopa} from './entities/Koopa.js';
import {loadCoin} from './entities/Coin.js'
import {loadChance} from './entities/chance.js'


export function loadEntities() {
    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }


    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
        loadCoin().then(addAs('coin')),
        loadChance().then(addAs('chance'))
    ])
    .then(() => entityFactories);
}