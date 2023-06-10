<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { TabulatorFull as Tabulator } from 'tabulator-tables';

	let table: string | HTMLElement;
	onMount(() => {
		console.log($page.data.parsedTable);
		new Tabulator(table, {
			data: $page.data.parsedTable,
			layout: 'fitColumns', //fit columns to width of table (optional)
			height: '500', //height of table (optional)
			reactiveData: true, //enable data reactivity
			columns: [
				{
					title: 'Model / System',
					field: 'Model / System'
				},
				{
					title: 'Year',
					field: 'Year'
				},
				{
					title: 'Accuracy',
					field: 'Accuracy'
				},
				{
					title: 'Precision',
					field: 'Precision'
				},
				{
					title: 'Recall',
					field: 'Recall'
				},
				{
					title: 'F1',
					field: 'F1'
				},
				{
					title: 'Language',
					field: 'Language'
				},
				{
					title: 'Reported By',
					field: 'Reported By'
				}
			]
		});
	});
</script>

<main class="prose text-justify mx-auto">
	<h1>Dataset: {$page.data.prefaceData.name}</h1>
	<h4>Description: {$page.data.prefaceData.description}</h4>
	<h5>Dataset URL: <a href={$page.data.prefaceData.datasetUrl}>Link</a></h5>
</main>

<div bind:this={table} />

<svelte:head>
	<link
		href="https://unpkg.com/tabulator-tables@5.5.0/dist/css/tabulator_bootstrap5.min.css"
		rel="stylesheet"
	/>
</svelte:head>
