<script lang="ts">
	import { page } from '$app/stores';
	import { getRawGitHubContent } from '$lib/utils/githubUrlBuilder';
	import matter from 'gray-matter';
	import * as htmlToJson from "$lib/utils/htmlToJson"
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { TabulatorFull as Tabulator } from 'tabulator-tables';

	let parsedTable: any;
	let prefaceData: any;

	function setTableFilter(event: Event) {
		let filterString = (event.target as HTMLInputElement).value;
		if (filterString && tabulator) {
			tabulator.setFilter([
				[],
				[
					{ field: 'Model / System', type: 'like', value: filterString },
					{ field: 'Year', type: 'like', value: filterString },
					{ field: 'Accuracy', type: 'like', value: filterString },
					{ field: 'Precision', type: 'like', value: filterString },
					{ field: 'Recall', type: 'like', value: filterString },
					{ field: 'F1', type: 'like', value: filterString },
					{ field: 'Language', type: 'like', value: filterString },
					{ field: 'Reported By', type: 'like', value: filterString }
				]
			]);
		} else if (tabulator) {
			tabulator.clearFilter(true);
		} else {
			console.error('Tabulator not initialized');
		}
	}

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
			throw new Error(`Failed to load dataset ${params.dataset} from ${params.db}, error ${e}`);
		}
	}

	let table: string | HTMLElement;
	let tabulator: Tabulator;
	let filter: HTMLInputElement;
	onMount(async () => {
		const loadData = await load($page.params);
		parsedTable = loadData.parsedTable;
        console.log(parsedTable); 
        let columns = [
				{
					title: 'Model / System',
					field: 'Model / System'
				},
				{
					title: 'Year',
					field: 'Year'
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
					title: 'Reported by',
					field: 'Reported by',
                    formatter: 'html',
                    class: 'link'
                    
				}
        ]

        let objectKeys = Object.keys(parsedTable[0]);

        if (objectKeys.includes('Gold Entity')) {
            columns.push({
                title: 'Gold Entity',
                field: 'Gold Entity'
            })   
        }
        if (objectKeys.includes("Accuracy")) {
            columns.push({
                title: 'Accuracy',
                field: 'Accuracy',
                sorter: function (a:any, b: any, aRow:any, bRow:any, column:any, dir:any, sorterParams:any) {
                    if (a == '-') a = 0;
                    if (b == '-') b = 0;
                    return a - b;
                }
            })

        }

		prefaceData = loadData.prefaceData;
		tabulator = new Tabulator(table, {
			data: parsedTable,
			layout: 'fitColumns', //fit columns to width of table (optional)
			height: '500', //height of table (optional)
			reactiveData: true, //enable data reactivity
			columns: columns
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
<div class="flex justify-center my-4">
	<input
		type="text"
		class="input input-primary input-sm w-96"
		placeholder="Filter 🔎"
		name="filter"
		id="filter"
		bind:this={filter}
		on:input={setTableFilter}
	/>
</div>
<div bind:this={table} />
<svelte:head>
	<link
		href="https://unpkg.com/tabulator-tables@5.5.0/dist/css/tabulator_bootstrap5.min.css"
		rel="stylesheet"
	/>
</svelte:head>

