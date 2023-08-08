<form on:submit|preventDefault>
	<span>
		<slot name="title" />
	</span>
	<label>
		<span>name</span>
		<input name="name" type="text" min="1" required />
	</label>
	<button>
		<slot name="button" />
	</button>
</form>
