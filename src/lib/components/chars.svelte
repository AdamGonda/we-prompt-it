<script>
	const rChar = () => {
		const alphabet = 'abcdefghijklmnopqrstuvwxyz';
		return alphabet[Math.floor(Math.random() * alphabet.length)];
	};

	let chars = [...Array(2000).keys()].map(rChar);
</script>

<div class="chars">
	{#each chars as c}
		<span>{c}</span>
	{/each}
</div>

<style>
	.chars {
		position: absolute;
		padding-left: 16px;
		left: 0;
		top: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
		width: 100vw;
		height: 100vh;
		gap: 40px;
		z-index: -10;
		overflow: hidden;
	}
</style>
