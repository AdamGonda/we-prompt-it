<script>
	export let height = 'calc(100vh - 330px)'
	export let scale = '1'
	export let color = '#333'
</script>

<div class="loading-container" style={`height: ${height}; transform: scale(${scale})`}>
	<div class="loader">
		<div style={`background: ${color}`} />
		<div style={`background: ${color}`} />
		<div style={`background: ${color}`} />
	</div>
</div>

<style>
	.loading-container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 14px;
	}

	.loader {
		display: flex;
		justify-content: space-between;
		width: 60px;
    margin-bottom: -16px;
	}

	.loader div {
		width: 15px;
		height: 15px;
    border-radius: 8px;
		background: #333;
		animation: loader 0.5s infinite alternate cubic-bezier(0.2, 1, 0.8, 1);
	}

	.loader div:nth-child(2) {
		animation-delay: 0.2s;
	}

	.loader div:nth-child(3) {
		animation-delay: 0.4s;
	}

	@keyframes loader {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-15px);
		}
	}
</style>
