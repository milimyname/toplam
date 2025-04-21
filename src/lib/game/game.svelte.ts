import { browser } from '$app/environment';
import Phaser from 'phaser';

export class Game {
	private game: Phaser.Game | null = null;

	init(containerId: string): Phaser.Game {
		// Clean up existing game instance if it exists
		if (this.game && !browser) {
			this.game.destroy(true);
			this.game = null;
		}

		// Create the game configuration
		const config: Phaser.Types.Core.GameConfig = {
			type: Phaser.AUTO,
			parent: containerId,
			backgroundColor: '#4b7bec',
			width: 800,
			height: 600,
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 0, x: 0 }
				}
			},
			scene: {
				preload: this.preload,
				create: this.create,
				update: this.update
			}
		};

		// Create and return the game instance
		this.game = new Phaser.Game(config);
		return this.game;
	}

	destroy() {
		if (this.game) {
			this.game.destroy(true);
			this.game = null;
		}
	}

	preload(this: Phaser.Scene) {
		// Nothing to preload for this simple demo
	}

	create(this: Phaser.Scene) {
		// Add a simple rectangle player
		const rectangle = this.add.rectangle(400, 300, 50, 50, 0xff0000);

		// Enable physics on the rectangle
		this.physics.add.existing(rectangle);

		// Store rectangle and create cursor keys
		this.data.set('rectangle', rectangle);
		this.data.set('cursors', this.input.keyboard?.createCursorKeys());
	}

	update(this: Phaser.Scene) {
		const rectangle = this.data.get('rectangle') as Phaser.GameObjects.Rectangle & {
			body: Phaser.Physics.Arcade.Body;
		};
		const cursors = this.data.get('cursors') as Phaser.Types.Input.Keyboard.CursorKeys;

		if (!rectangle || !cursors) return;

		// Reset velocity
		rectangle.body.setVelocity(0);

		// Set movement speed
		const speed = 200;

		// Handle movement based on cursor keys
		if (cursors.left?.isDown) {
			rectangle.body.setVelocityX(-speed);
		} else if (cursors.right?.isDown) {
			rectangle.body.setVelocityX(speed);
		}

		if (cursors.up?.isDown) {
			rectangle.body.setVelocityY(-speed);
		} else if (cursors.down?.isDown) {
			rectangle.body.setVelocityY(speed);
		}
	}
}

// Create singleton instance
const gameInstance = new Game();
export default gameInstance;
