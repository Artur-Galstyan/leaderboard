<script lang="ts">
	import { page } from '$app/stores';
	import { getRawGitHubContent } from '$lib/utils/githubUrlBuilder';
	import matter from 'gray-matter';
	import * as htmlToJson from 'html-table-to-json';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { TabulatorFull as Tabulator } from 'tabulator-tables';

	let parsedTable: any;
	let prefaceData: any;

	async function load(params: any) {
		try {
			const githubUrl = getRawGitHubContent(
				`Artur-Galstyan/leaderboard`,
				`${params.db}/${params.dataset}.md`
			);
			const githubUrlReq = await fetch(githubUrl);
			const githubMarkdownText = await githubUrlReq.text();

			const parsed = matter(githubMarkdownText);
			const prefaceData = {
				name: parsed.data.name,
				description: parsed.data.description,
				datasetUrl: parsed.data.datasetUrl
			};
			const htmlContent = marked.parse(parsed.content, { mangle: false, headerIds: false });
			const parsedTable = htmlToJson.parse(htmlContent).results[0];

			return {
				parsedTable: structuredClone(parsedTable),
				prefaceData: prefaceData
			};
		} catch (e) {
			throw new Error(`Failed to load dataset ${params.dataset} from ${params.db}`);
		}
	}

	let table: string | HTMLElement;
	onMount(async () => {
		console.log('page', $page);
		const loadData = await load($page.params);
		parsedTable = loadData.parsedTable;
		prefaceData = loadData.prefaceData;

		console.log('parsedTable', parsedTable);
		console.log('prefaceData', prefaceData);

		console.log('table', parsedTable);

		new Tabulator(table, {
			data: parsedTable,
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

{#if prefaceData && parsedTable}
	<main class="prose text-justify mx-auto">
		<h1>Dataset: {prefaceData.name}</h1>
		<h4>Description: {prefaceData.description}</h4>
		<h5>Dataset URL: <a href={prefaceData.datasetUrl}>Link</a></h5>
	</main>
{/if}
<div bind:this={table} />
<svelte:head>
	<link
		href="https://unpkg.com/tabulator-tables@5.5.0/dist/css/tabulator_bootstrap5.min.css"
		rel="stylesheet"
	/>
</svelte:head>
