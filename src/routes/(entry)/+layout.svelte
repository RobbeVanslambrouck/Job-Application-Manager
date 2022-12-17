<script lang="ts">
</script>

<div class="page">
	<header>
		<a href="/"><h1><span>j</span>ob <span>a</span>pp <span>m</span>anager</h1></a>
		<nav>
			<ul>
				<li><a href="/dashboard">dashboard</a></li>
				<li><a href="/about">about</a></li>
			</ul>
		</nav>
	</header>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.page {
		min-height: 100vh;
		background: linear-gradient(
			-45deg,
			rgba(var(--md-sys-color-background)),
			rgba(var(--md-sys-color-primary), 0.6),
			rgba(var(--md-sys-color-background))
		);
		background-size: 300% 300%;
		animation: gradient 60s ease infinite;
		display: grid;
		grid-template-rows: min-content auto;
	}

	@keyframes gradient {
		0% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0% 50%;
		}
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 1rem 1.2rem;
		background-color: rgba(var(--md-sys-color-primary-container), 0.6);
	}

	h1 {
		padding: 0;
		margin: 0;
		color: rgb(var(--md-sys-color-on-background));
		text-transform: capitalize;
		font-size: 1.4rem;
	}

	h1 span {
		font-size: 3rem;
	}

	a {
		text-decoration: none;
	}

	ul {
		padding: 0;
		margin: 0;
		display: flex;
		list-style: none;
		gap: 1rem;
	}

	nav a {
		color: rgb(var(--md-sys-color-on-background));
		text-transform: capitalize;
	}

	.content {
		padding: 0 1.2rem;
		display: grid;
	}
</style>
