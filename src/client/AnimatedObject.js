let PIXI = null;

/**
 * Handles renderer-specific details for player
 */
export default class AnimatedObject {
    constructor(avatar, renderer, mainPlayer) {
        PIXI = require('pixi.js');
        // Create the sprite
        let frames = [];

        for (let i = 0; i < 3; i++) {
            frames.push(PIXI.Texture.fromFrame(i));
        }

        this.sprite = new PIXI.extras.AnimatedSprite(frames);
        this.sprite.anchor.set(0.5, 0.5);

        this.lastPosition = Object.assign({}, avatar.position);

        this.animate = false;
        this.sprite.animationSpeed = 0.25;
        this.mainPlayer = mainPlayer;

        // Store in the renderer and in PIXI's renderer
        renderer.sprites[avatar.id] = this.sprite;
        if (!mainPlayer) {
            this.sprite.x = avatar.position.x;
            this.sprite.y = avatar.position.y;
            renderer.camera.addChild(this.sprite);
        } else {
            this.sprite.x = renderer.viewportWidth / 2;
            this.sprite.y = renderer.viewportHeight / 2;
            renderer.layer1.addChild(this.sprite);
        }
    }

    handleDraw(position) {
        if (this.animate) {
            if (!this.moved(position)) {
                this.animate = false;
                this.sprite.gotoAndStop(0);
            }
        } else {
            if (this.moved(position)) {
                this.sprite.play();
                this.animate = true;
            }
        }
        this.lastPosition = Object.assign({}, position);
    }

    moved(position) {
        return (
            this.lastPosition.x != position.x ||
            this.lastPosition.y != position.y
        );
    }

    destroy(id, renderer) {
        if (this.sprite) {
            this.sprite.destroy();
            delete renderer.sprites[id];
        }
    }
}
