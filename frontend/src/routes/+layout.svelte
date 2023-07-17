<script>
	import { currentPRChanges } from '$lib/currentPRChanges';
	import { fade } from 'svelte/transition';
	import '../app.postcss';
	import { toggleDialog } from '$lib/dialogs/dialogUtils';
	import CurrentChanges from '$lib/components/CurrentChanges.svelte';
	import 'animate.css';
	import { onMount } from 'svelte';

	onMount(() => {
		// check if "pr-changes" cookie exists and if yes store it
		const cookie = document.cookie.split('; ').find((row) => row.startsWith('pr-changes='));
		if (cookie) {
			const cookieValue = cookie.split('=')[1];
			let parsedData = JSON.parse(cookieValue);
			parsedData.lastChange = null;
			currentPRChanges.set(parsedData);
		}
	});
</script>

<div class="absolute top-10 right-10">
	{#if $currentPRChanges && ($currentPRChanges.columns.length > 0 || $currentPRChanges.rows.length > 0)}
		<button
			transition:fade
			on:click={() => {
				toggleDialog(`your-changes-dialog`);
			}}
			class="btn">Your Changes</button
		>
	{/if}
</div>

<slot />
<CurrentChanges />
