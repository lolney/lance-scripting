'use strict';

import DynamicObject from 'lance/serialize/DynamicObject';
import BaseTypes from 'lance/serialize/BaseTypes';
import StaticActor from '../client/StaticActor.js';
import { playerBase } from '../config';

export default class PlayerBaseAvatar extends DynamicObject {
    static get netScheme() {
        return Object.assign(
            { playerNumber: { type: BaseTypes.TYPES.INT32 } },
            super.netScheme
        );
    }

    static get name() {
        return 'PlayerBaseAvatar';
    }

    constructor(gameEngine, options, props) {
        super(gameEngine, options, props);
        if (props) {
            this.playerNumber = props.playerNumber;
            this.playerId = props.playerId;
        }
        this.class = PlayerBaseAvatar;
        this.width = playerBase.width;
        this.height = playerBase.height;
    }

    get blocks() {
        return false;
    }

    onAddToWorld(gameEngine) {
        if (gameEngine.renderer) {
            this.actor = new StaticActor(
                this,
                gameEngine.renderer,
                playerBase.name
            );
        }
    }

    onRemoveFromWorld(gameEngine) {
        if (gameEngine.renderer) {
            this.actor.destroy(this.id, gameEngine.renderer);
        }
    }
}
