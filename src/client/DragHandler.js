import Router from './Router';
import { siegeItems } from '../config';

export default class DragHandler {
    constructor(canvas, gameEngine, renderer) {
        this.dragObject = null;
        this.gameEngine = gameEngine;
        this.renderer = renderer;

        canvas.addEventListener('dragover', (ev) => {
            ev.preventDefault();

            this.updateTempObject(ev);
        });

        canvas.addEventListener('dragleave', (ev) => {
            ev.preventDefault();

            this.removeTempObject();
        });

        canvas.addEventListener('drop', (ev) => {
            // Prevent opening a new tab on Firefox
            ev.preventDefault();

            this.updateTempObject(ev);
            let id = ev.dataTransfer.getData('text/plain');
            Router.makeDefence(id, this.dragObject.position);
            this.removeTempObject();
            /*
            this.dragObject.actor.getSprite().filters = [];
            this.dragObject = null;*/
        });
    }

    getId(ev) {
        let id = null;
        for (const candidate of siegeItems.map((elem) => elem.id)) {
            if (ev.dataTransfer.types.includes(candidate)) {
                id = candidate;
                break;
            }
        }
        if (id == null) {
            throw new Error('couldn\'t find id');
        }
        return id;
    }

    static snapToGrid(vec) {
        let out = vec.clone();
        out.x = Math.floor(out.x / 20) * 20;
        out.y = Math.floor(out.y / 20) * 20;
        return out;
    }

    updateTempObject(ev) {
        let position = this.renderer.canvasToWorldCoordinates(
            ev.clientX,
            ev.clientY
        );

        position = DragHandler.snapToGrid(position);

        let id = this.getId(ev);
        if (this.dragObject == null) {
            this.dragObject = this.gameEngine.makeDefence(id, position);
            let filter = new PIXI.filters.ColorMatrixFilter();
            this.dragObject.actor.getSprite().filters = [filter];
            filter.negative();
        } else {
            this.dragObject.position = position;
        }
    }

    removeTempObject() {
        let obj = this.dragObject;
        console.log('removing ', obj.dbId);

        this.gameEngine.removeObjectFromWorld(obj.id);
        this.dragObject = null;
    }
}
