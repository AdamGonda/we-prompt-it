<footer class="footer">
	<p class="open-beta">Open beta</p>
	<div>
		<a href="/terms-of-service">Terms of service</a>
		<a href="/privacy-policy">Privacy policy</a>
	</div>
	<span class="created-by">Created by 
		<a href="https://www.linkedin.com/in/adam-gonda/" target="_blank">
			Adam Gonda
		</a>
	</span>
</footer>

<style>
	.footer {
		color: var(--white);
		background-color: var(--black);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
    padding: var(--s-6) 0;
		margin-top: var(--s-5);
		position: relative;
	}

  div {
    display: flex;
    gap: var(--s-6);
    justify-content: center;
  }

	a {
		color: var(--white);
    text-decoration: none;
		
	}

	.open-beta {
		margin: 0;
		margin-bottom: var(--s-5);
		font-size: var(--fs-1);
		border: 1PX solid var(--white);
		padding: var(--s-1) var(--s-2);
	}

	.created-by {
		margin-top: var(--s-5);
		font-size: var(--fs-0);
	}

	.created-by a {
		text-decoration: underline;
	}
</style>
