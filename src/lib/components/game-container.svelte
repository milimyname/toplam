<script lang="ts">
	import { browser } from '$app/environment';
	import gameInstance from '$lib/game/game.svelte';

	// Game container ID
	let containerId = 'phaser-game-container';

	$effect(() => {
		if (browser) {
			setTimeout(() => {
				gameInstance.init(containerId);
			}, 100);
		}

		return () => {
			if (browser) {
				// Clean up game when component is destroyed
				gameInstance.destroy();
			}
		};
	});
</script>

<div class="game-wrapper">
	<div id={containerId} class="game-container"></div>
	<div class="controls-info">
		<p>Use arrow keys to move the red rectangle</p>
	</div>
</div>

<style>
	.game-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}

	.game-container {
		width: 100%;
		height: 600px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		overflow: hidden;
	}

	.controls-info {
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		background-color: #f8f9fa;
		border-radius: 4px;
		text-align: center;
	}
</style>
