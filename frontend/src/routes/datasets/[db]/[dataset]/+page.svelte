<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import DatasetNavbar from '$lib/components/DatasetNavbar.svelte';
	import { NUMERIC_FIELDS } from '$lib/constants';
	import { currentPRChanges } from '$lib/currentPRChanges';
	import { currentTabulator } from '$lib/currentTabulator';
	import AddNewColumnDialog from '$lib/dialogs/AddNewColumnDialog.svelte';
	import AddNewRowDialog from '$lib/dialogs/AddNewRowDialog.svelte';
	import { toggleDialog } from '$lib/dialogs/dialogUtils';
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
	let parsedFooter: any;

	function setTableFilter(event: Event) {
		let filterString = (event.target as HTMLInputElement).value;
		if (filterString && $currentTabulator) {
			$currentTabulator.setFilter([
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
		} else if ($currentTabulator) {
			$currentTabulator.clearFilter(true);
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

			let htmlFooter = undefined;
			try {
				const githubUrlFooter = getRawGitHubContent(
					`Artur-Galstyan/leaderboard`,
					`${params.db}/$${params.dataset}.md`
				);
				const githubUrlFooterReq = await fetch(githubUrlFooter);
				if (githubUrlFooterReq.status == 404) {
					throw Error('Not found');
				}
				const githubMarkdownFooter = await githubUrlFooterReq.text();
				const parsedFooter = matter(githubMarkdownFooter);
				htmlFooter = marked.parse(parsedFooter.content, { mangle: false, headerIds: false });
			} catch (e) {
				console.log("No footer found, that's ok");
			}

			return {
				parsedTable: structuredClone(parsedTable),
				prefaceData: prefaceData,
				parsedInfo: htmlContentInfo,
				parsedFooter: htmlFooter
			};
		} catch (e) {
			throw new Error(`Failed to load dataset ${params.dataset} from ${params.db}, error ${e}`);
		}
	}

	let table: string | HTMLElement;
	let filter: HTMLInputElement;

	let loading = true;
	let fadeClass = '';

	onMount(async () => {
		const loadData = await load($page.params);
		parsedTable = loadData.parsedTable;
		prefaceData = loadData.prefaceData;
		parsedInfo = loadData.parsedInfo;
		parsedFooter = loadData.parsedFooter;

		fadeClass = 'fade-in';
		if (parsedTable) {
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
			columns = columns.filter((column) => objectKeys.includes(column.title));

			for (let i = 0; i < objectKeys.length; i++) {
				let currObjectKey = objectKeys[i];
				if (columns.some((column) => column.title == currObjectKey)) continue;
				if (NUMERIC_FIELDS.includes(currObjectKey)) {
					columns.push({
						title: currObjectKey,
						field: currObjectKey,
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
				} else {
					columns.push({
						title: currObjectKey,
						field: currObjectKey,
						resizable: true
					});
				}
			}

			$currentTabulator = new Tabulator(table, {
				data: parsedTable,
				layout: 'fitColumns', //fit columns to width of table (optional)
				height: '500', //height of table (optional)
				reactiveData: true, //enable data reactivity
				columns: columns as any,
				movableColumns: true
			});

			$currentTabulator.on('tableBuilt', () => {
				if ($currentPRChanges) {
					console.log('Applying changes from loaded PR');
					if ($currentPRChanges.columns.length > 0) {
						console.log('Applying columns');
						$currentPRChanges.columns.forEach((column) => {
							addNewColumnToTable(column);
						});
					}
					if ($currentPRChanges.rows.length > 0) {
						console.log('Applying rows');
						$currentPRChanges.rows.forEach((row) => {
							console.log('Adding row', row);
							addNewRowToTable(row);
						});
					}
					$currentTabulator?.redraw(true);
					$currentTabulator = $currentTabulator;
				}

				$currentTabulator = $currentTabulator;
			});
		} else {
			console.log('No table found');
		}
		loading = false;
	});

	function openNewColumnDialog() {
		toggleDialog(`add-new-column-${$page.params.db}/${$page.params.dataset}`);
	}

	function openNewRowDialog() {
		toggleDialog(`add-new-row-${$page.params.db}/${$page.params.dataset}`);
	}

	currentPRChanges.subscribe((changes) => {
		if (changes) {
			if (changes.lastChange === 'column') {
				let lastColumn = changes.columns[changes.columns.length - 1];
				console.log('Adding new column', lastColumn);
				addNewColumnToTable(lastColumn);
			} else if (changes.lastChange === 'row') {
				let lastRow = changes.rows[changes.rows.length - 1];
				console.log('Adding new row', lastRow);
				addNewRowToTable(lastRow);
			}
			// store this object as a cookie
			if (browser) {
				let cookie = {
					name: `pr-changes`,
					value: JSON.stringify(changes)
				};
				console.log('Setting cookie');
				document.cookie = `${cookie.name}=${cookie.value};path=/;SameSite=Lax`;
			}
		}
	});

	function addNewColumnToTable(newColumn: any) {
		if (newColumn.dataset != $page.params.db + '/' + $page.params.dataset) return;

		let columnTitle = newColumn.column;
		let columnType = newColumn.numerical;

		let column = {
			title: columnTitle,
			field: columnTitle,
			resizable: true
		};

		if (columnType) {
			column['sorter'] = function (
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
			};
		}
		$currentTabulator?.addColumn(column);

		// add default values to all rows for the new column
		let rows = $currentTabulator?.getRows();
		if (!rows) return;
		for (let i = 0; i < rows.length; i++) {
			let row = rows[i];
			row.update({ [columnTitle]: '-' });
		}

		$currentTabulator?.redraw(true);
		$currentTabulator = $currentTabulator;
	}

	function addNewRowToTable(newRow: any) {
		if (newRow.dataset != $page.params.db + '/' + $page.params.dataset) return;
		let row: any = {};
		for (let i = 0; i < newRow.row.length; i++) {
			let column = newRow.row[i];
			row[column.key] = column.value;
		}

		$currentTabulator?.addRow(row);
		$currentTabulator?.redraw(true);
		$currentTabulator = $currentTabulator;
	}
</script>

{#if loading}
	<div class="h-screen w-screen flex flex-col justify-center">
		<div class="flex justify-center">
			<span class="loading loading-infinity loading-lg text-primary" />
		</div>
	</div>
{:else}
	<div transition:fade|local class="">
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
	<div id="leaderboard-header" transition:fade|local class="flex justify-center my-4">
		<div class="font-bold my-auto mx-20 text-2xl">
			{#if parsedTable == null}
				No Leaderboard for this dataset yet

				<div class="flex justify-center">
					<button class="btn btn-accent btn-wide"> Submit a new leaderboard </button>
				</div>
			{:else}
				Leaderboard
			{/if}
		</div>
		<input
			class:hidden={parsedTable == null}
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
<div
	class:hidden={parsedTable == null}
	id="leaderboard-wrapper"
	class={`w-[80%] mx-auto ${fadeClass} flex`}
>
	<div class="overflow-x-scroll w-full">
		<div bind:this={table} />
	</div>
	<div class="mx-2 flex items-center justify-center bg-reg-400">
		<button on:click={openNewColumnDialog} class="btn btn-secondary h-full"> + </button>
	</div>
</div>
<div class:hidden={parsedTable == null} class={`my-2 w-[80%] mx-auto ${fadeClass}`}>
	<button on:click={openNewRowDialog} class="btn btn-primary w-full"> + </button>
</div>

<div class="prose text-justify mx-auto">
	{#if parsedFooter}
		{@html parsedFooter}
	{/if}
</div>
<div class="my-20" />
<svelte:head>
	<link
		href="https://unpkg.com/tabulator-tables@5.5.0/dist/css/tabulator_bootstrap5.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<AddNewColumnDialog dataset={$page.params.db + '/' + $page.params.dataset} />
<AddNewRowDialog dataset={$page.params.db + '/' + $page.params.dataset} />

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
