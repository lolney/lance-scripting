'use strict';

import DynamicObject from 'lance/serialize/DynamicObject';
import Serializer from 'lance/serialize/Serializer';
import StaticActor from '../client/StaticActor.js';

export default class Avatar extends DynamicObject {

    static get netScheme() {
        return Object.assign({
            objectType: { type: Serializer.TYPES.STRING },
        }, super.netScheme);
    }

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        if (props && props.objectType)
            this.objectType = props.objectType;
        this.class = Avatar;
    };

    onAddToWorld(gameEngine) {
        if (gameEngine.renderer) {
            this.actor = new StaticActor(this, gameEngine.renderer, this.objectType);
        }
    }

    onRemoveFromWorld(gameEngine) {
        if (gameEngine.renderer) {
            this.actor.destroy(this.id, gameEngine.renderer);
        }
    }

}