<script lang="ts">
	import { page } from '$app/stores';
	import DatasetNavbar from '$lib/components/DatasetNavbar.svelte';
	import { getRawGitHubContent } from '$lib/utils/githubUrlBuilder';
	import * as htmlToJson from '$lib/utils/htmlToJson';
	import matter from 'gray-matter';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { type Formatter, TabulatorFull as Tabulator } from 'tabulator-tables';

	let parsedTable: any;
	let prefaceData: any;
	let parsedInfo: any;

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

			const githubUrlInfo = getRawGitHubContent(
				`Artur-Galstyan/leaderboard`,
				`${params.db}/^${params.dataset}.md`
			);
			const githubUrlInfoReq = await fetch(githubUrlInfo);
			const githubMarkdownTextInfo = await githubUrlInfoReq.text();
			const parsedInfo = matter(githubMarkdownTextInfo);

			const htmlContentInfo = marked.parse(parsedInfo.content, { mangle: false, headerIds: false });

			return {
				parsedTable: structuredClone(parsedTable),
				prefaceData: prefaceData,
				parsedInfo: htmlContentInfo
			};
		} catch (e) {
			throw new Error(`Failed to load dataset ${params.dataset} from ${params.db}, error ${e}`);
		}
	}

	let table: string | HTMLElement;
	let tabulator: Tabulator;
	let filter: HTMLInputElement;

	let loading = true;
	let fadeClass = '';

	onMount(async () => {
		const loadData = await load($page.params);
		parsedTable = loadData.parsedTable;
		let columns = [
			{
				title: 'Model / System',
				field: 'Model / System',
				resizable: true
			},
			{
				title: 'Year',
				field: 'Year',
				resizable: true
			},
			{
				title: 'Precision',
				field: 'Precision',
				resizable: true
			},
			{
				title: 'Recall',
				field: 'Recall',
				resizable: true
			},
			{
				title: 'F1',
				field: 'F1',
				resizable: true
			},
			{
				title: 'Language',
				field: 'Language',
				resizable: true
			},
			{
				title: 'Reported by',
				field: 'Reported by',
				formatter: 'html',
				resizable: true
			}
		];

		let objectKeys = Object.keys(parsedTable[0]);

		if (objectKeys.includes('Gold Entity')) {
			columns.push({
				title: 'Gold Entity',
				field: 'Gold Entity',
				resizable: true
			});
		}
		if (objectKeys.includes('Accuracy')) {
			columns.push({
				title: 'Accuracy',
				field: 'Accuracy',
				sorter: function (
					a: any,
					b: any,
					aRow: any,
					bRow: any,
					column: any,
					dir: any,
					sorterParams: any
				) {
					if (a == '-') a = 0;
					if (b == '-') b = 0;
					return a - b;
				}
			});
		}

		prefaceData = loadData.prefaceData;
		parsedInfo = loadData.parsedInfo;
		tabulator = new Tabulator(table, {
			data: parsedTable,
			layout: 'fitColumns', //fit columns to width of table (optional)
			height: '500', //height of table (optional)
			reactiveData: true, //enable data reactivity
			columns: columns as any,
			movableColumns: true
		});
		loading = false;
		fadeClass = 'fade-in';
	});
</script>

{#if loading}
	<div class="h-screen w-screen flex flex-col justify-center">
		<div class="flex justify-center">
			<span class="loading loading-infinity loading-lg text-primary" />
		</div>
	</div>
{:else}
	<div transition:fade>
		<DatasetNavbar datasetName={$page.params.db} />
		{#if prefaceData && parsedTable}
			<main class="prose text-justify mx-auto mt-16">
				<h1>Dataset: {prefaceData.name}</h1>
				<h5>Dataset URL: <a href={prefaceData.datasetUrl}>Link</a></h5>
			</main>
		{/if}
		<div class="divider w-[50%] mx-auto" />
		<div class="prose text-justify mx-auto">
			{#if parsedInfo}
				{@html parsedInfo}
			{/if}
		</div>
	</div>
	<div class="divider w-[50%] mx-auto" />
	<div transition:fade class="flex justify-center my-4">
		<div class="font-bold my-auto mx-20 text-2xl">Leaderboard</div>
		<input
			type="text"
			class="input input-primary input-sm w-60"
			placeholder="Filter 🔎"
			name="filter"
			id="filter"
			bind:this={filter}
			on:input={setTableFilter}
		/>
	</div>
{/if}
<div class={`w-[80%] mx-auto overflow-x-scroll ${fadeClass}`}>
	<div bind:this={table} />
</div>
<svelte:head>
	<link
		href="https://unpkg.com/tabulator-tables@5.5.0/dist/css/tabulator_bootstrap5.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<style>
	.fade-in {
		animation: fadein 2s;
	}

	@keyframes fadein {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.w-80 {
		opacity: 0;
	}
</style>
