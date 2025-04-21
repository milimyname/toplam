<!-- src/routes/+page.svelte -->
<script lang="ts">
	import GameContainer from '$lib/components/game-container.svelte';
</script>

<div class="container">
	<header>
		<h1>Toplam Simple Demo</h1>
		<p>A basic Phaser.js and SvelteKit integration</p>
	</header>

	<main>
		<GameContainer />
	</main>
</div>

<style>
	.container {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	header {
		text-align: center;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 2.5rem;
		color: #3949ab;
		margin-bottom: 0.5rem;
	}
</style>
