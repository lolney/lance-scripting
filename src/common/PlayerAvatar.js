'use strict';

import DynamicObject from 'lance/serialize/DynamicObject';
import AnimatedActor from '../client/AnimatedActor.js';

export default class PlayerAvatar extends DynamicObject {

    static get netScheme() {
        return Object.assign({
            // add serializable properties here
        }, super.netScheme);
    }

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        if (props && props.playerId) {
            this.playerId = props.playerId;
        }
        this.class = PlayerAvatar;
    };

    onAddToWorld(gameEngine) {
        if (gameEngine.renderer) {
            this.actor = new AnimatedActor(this, gameEngine.renderer);
        }
    }

    onRemoveFromWorld(gameEngine) {
        console.log(`removing player ${this.id}`);
        if (gameEngine.renderer) {
            this.actor.destroy(this.id, gameEngine.renderer);
        }
    }

}
