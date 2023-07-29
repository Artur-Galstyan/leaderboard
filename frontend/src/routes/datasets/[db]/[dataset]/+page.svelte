<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import DatasetNavbar from '$lib/components/DatasetNavbar.svelte';
	import { NUMERIC_FIELDS } from '$lib/constants';
	import { currentPRChanges, initPRChanges } from '$lib/currentPRChanges';
	import { currentTabulator } from '$lib/currentTabulator';
	import AddNewColumnDialog from '$lib/dialogs/AddNewColumnDialog.svelte';
	import AddNewLeaderboard from '$lib/dialogs/AddNewLeaderboard.svelte';
	import AddNewRowDialog from '$lib/dialogs/AddNewRowDialog.svelte';
	import AreYouSureDeleteLbDialog from '$lib/dialogs/AreYouSureDeleteLBDialog.svelte';
	import ShowRowDialog from '$lib/dialogs/ShowRowDialog.svelte';
	import { toggleDialog } from '$lib/dialogs/dialogUtils';
	import { notifyError, notifySuccess } from '$lib/notifications';
	import { currentNewTabulatorRows } from '$lib/states/currentNewTabulatorRows';
	import { currentlySelectedRow } from '$lib/states/currentlySelectedRow';
	import { getRawGitHubContent } from '$lib/utils/githubUrlBuilder';
	import * as htmlToJson from '$lib/utils/htmlToJson';
	import { extendColumnsByParsedTable, getBaseColumns } from '$lib/utils/utils';
	import matter from 'gray-matter';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { type Formatter, TabulatorFull as Tabulator } from 'tabulator-tables';

	let parsedTable: any;
	let prefaceData: any;
	let parsedInfo: any;
	let parsedFooter: any;

	let tableBuilding = false;
	let tableBuilt = false;

	function setTableFilter(event: Event) {
		let filterString = (event.target as HTMLInputElement).value;
		let fields = $currentTabulator?.getColumns().map((column) => column.getField());
		if (filterString && $currentTabulator) {
			$currentTabulator.setFilter([
				[],
				[
					fields?.map((field) => {
						return { field: field, type: 'like', value: filterString };
					}) as any
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

	function setEventListeners() {
		if (!$currentTabulator) {
			notifyError('Tabulator not initialized', 'Failed to set event listeners');
			return;
		}
		$currentTabulator.on('tableBuilding', () => {
			tableBuilding = true;
			tableBuilt = false;
			console.log('Table building');
		});
		$currentTabulator.on('tableBuilt', async () => {
			tableBuilt = true;
			tableBuilding = false;
			console.log('Table built');
			if ($currentPRChanges) {
				console.log('Applying changes from loaded PR');
				if ($currentPRChanges.newColumns.length > 0) {
					console.log('Applying columns');
					$currentPRChanges.newColumns.forEach((column) => {
						addNewColumnToTable(column);
					});
				}
				if ($currentPRChanges.newRows.length > 0) {
					console.log('Applying rows');
					$currentPRChanges.newRows.forEach(async (row) => {
						if (row.dataset != $page.params.db + '/' + $page.params.dataset) return;
						console.log('Adding row', row.row);
						let newRow = await $currentTabulator?.addRow(row.row);
						if (newRow) {
							let doesAlreadyExist = $currentNewTabulatorRows.find(
								(newTabulatorRow) => newTabulatorRow.getIndex() == newRow?.getIndex()
							);
							if (doesAlreadyExist) return;
							else $currentNewTabulatorRows.push(newRow);
						}
						$currentTabulator?.redraw(true);
						$currentTabulator = $currentTabulator;
					});
				}
				if ($currentPRChanges.changedRows && $currentPRChanges?.changedRows.length > 0) {
					$currentPRChanges.changedRows.forEach((row) => {
						if (row.dataset != $page.params.db + '/' + $page.params.dataset) return;
						console.log('Applying changed cells');
						$currentTabulator?.getRows().forEach(async (tableRow) => {
							if (tableRow.getIndex() == row.row['id']) {
								await tableRow.update(row.row);
								row.row = tableRow.getData();
							}
						});
						$currentTabulator?.redraw(true);
						$currentTabulator = $currentTabulator;
					});
				}
			}

			$currentTabulator = $currentTabulator;
		});
		$currentTabulator.on('rowDblClick', (e, row) => {
			$currentlySelectedRow = row;
			toggleDialog('show-row-dialog');
		});
		$currentTabulator.on('cellEdited', function (cell) {
			if (!$currentPRChanges) {
				$currentPRChanges = initPRChanges();
			}
			if ($currentPRChanges.changedRows == null) {
				$currentPRChanges.changedRows = [];
			}
			console.log("Adding row to 'changedRows'", cell.getRow());

			// check if row is already in changedRows
			let rowAlreadyInChanges = $currentPRChanges.changedRows.find((row) => {
				return row.row['id'] == cell.getRow().getIndex();
			});

			if (rowAlreadyInChanges) {
				console.log('Row already in changes, updating');
				// update the row
				rowAlreadyInChanges.row = cell.getRow().getData();
				$currentPRChanges.lastChange = 'cell';

				return;
			} else {
				// add the row
				console.log('Row not in changes, adding');
				$currentPRChanges.changedRows.push({
					dataset: $page.params.db + '/' + $page.params.dataset,
					row: cell.getRow().getData()
				});
				$currentPRChanges.lastChange = 'cell';
			}
		});
		$currentTabulator.on('headerContext', async function (e, column) {
			e.preventDefault();
			let amongNewColumns = $currentPRChanges?.newColumns.find((col) => {
				return col.column == column.getField();
			});
			if (!amongNewColumns) {
				// column was not user created, therefore cannot be deleted
				return;
			}
			let deleteButton = document.createElement('button');
			deleteButton.id = 'delete-column-button';
			deleteButton.innerHTML = 'Delete column';
			deleteButton.classList.add('btn', 'btn-error', 'absolute');
			deleteButton.style.top = e.clientY + window.scrollY + 'px';
			deleteButton.style.left = e.clientX + window.scrollX + 'px';
			deleteButton.onclick = async () => {
				// delete column
				if (!$currentPRChanges) {
					notifyError("Couldn't delete column", 'No PR changes found');
					deleteButton.remove();
					return;
				} else {
					$currentTabulator?.hideColumn(column.getField());
					await column.delete();
					$currentPRChanges.lastChange = null;
					$currentPRChanges.newColumns = $currentPRChanges.newColumns.filter((col) => {
						return col.column != column.getField();
					});

					notifySuccess('Column deleted', 'Column deleted successfully');
					deleteButton.remove();
				}
			};
			document.body.appendChild(deleteButton);
		});
	}

	let table: string | HTMLElement;
	let filter: HTMLInputElement;

	let loading = true;
	let fadeClass = '';

	onMount(async () => {
		document.body.onclick = (event: MouseEvent) => {
			document.getElementById('delete-column-button')?.remove();
		};
		$currentTabulator = null;
		const loadData = await load($page.params);
		parsedTable = loadData.parsedTable;
		prefaceData = loadData.prefaceData;
		parsedInfo = loadData.parsedInfo;
		parsedFooter = loadData.parsedFooter;

		fadeClass = 'fade-in';
		if (parsedTable) {
			let columns = getBaseColumns();
			columns = extendColumnsByParsedTable(parsedTable, columns);
			try {
				$currentTabulator = new Tabulator(table, {
					data: parsedTable,
					layout: 'fitColumns', //fit columns to width of table (optional)
					height: '500', //height of table (optional)
					reactiveData: true, //enable data reactivity
					columns: columns as any,
					movableColumns: true
				});
				setEventListeners();
			} catch (e) {
				console.log("some error occured while loading table's data; likely got cancelled");
				$currentTabulator = null;
			}
		} else {
			// check cookie for table data
			if ($currentPRChanges) {
				let changes = $currentPRChanges;
				let doesLeaderboardExist = changes.newLeaderboards.find((lb) => {
					return lb.dataset == $page.params.db + '/' + $page.params.dataset;
				});
				if (!doesLeaderboardExist) {
					notifyError('No leaderboard found', 'There is no leaderboard for this dataset');
					loading = false;
					tableBuilding = false;
					tableBuilt = false;
					return;
				} else {
					console.log('Leaderboard found in pr changes cookie');
				}
				const htmlContent = marked.parse(
					changes.newLeaderboards[changes.newLeaderboards.length - 1].data,
					{ mangle: false, headerIds: false }
				);
				parsedTable = htmlToJson.parse(htmlContent).results[0];
				if (parsedTable != null) {
					console.log('Table found in pr changes cookie');
					let columns = getBaseColumns();
					columns = extendColumnsByParsedTable(parsedTable, columns);
					try {
						$currentTabulator = new Tabulator(table, {
							data: parsedTable,
							layout: 'fitColumns', //fit columns to width of table (optional)
							height: '500', //height of table (optional)
							reactiveData: true, //enable data reactivity
							columns: columns as any,
							movableColumns: true
						});
						setEventListeners();
					} catch (e) {
						console.log("some error occured while loading table's data; likely got cancelled");
						$currentTabulator = null;
					}
				} else {
					console.log('No table found');
				}
				loading = false;
			} else console.log('No table found');
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
				let lastColumn = changes.newColumns[changes.newColumns.length - 1];
				console.log('Adding new column', lastColumn);
				addNewColumnToTable(lastColumn);
			} else if (changes.lastChange === 'leaderboard') {
				const htmlContent = marked.parse(
					changes.newLeaderboards[changes.newLeaderboards.length - 1].data,
					{ mangle: false, headerIds: false }
				);
				parsedTable = htmlToJson.parse(htmlContent).results[0];
				if (parsedTable) {
					let columns = getBaseColumns();
					columns = extendColumnsByParsedTable(parsedTable, columns);
					try {
						$currentTabulator = new Tabulator(table, {
							data: parsedTable,
							layout: 'fitColumns', //fit columns to width of table (optional)
							height: '500', //height of table (optional)
							reactiveData: true, //enable data reactivity
							columns: columns as any,
							movableColumns: true
						});
						setEventListeners();
					} catch (e) {
						console.log("some error occured while loading table's data; likely got cancelled");
						$currentTabulator = null;
					}
				} else {
					console.log('No table found - from currentPRChanges subscription');
				}
				loading = false;
			}
			// store this object as a cookie
			if (browser && changes.lastChange !== null) {
				console.log('Storing changes in cookie!');
				console.log('new changes to store', changes);
				let changesToStore: any = {};
				changesToStore.newColumns = changes.newColumns;
				changesToStore.newRows = changes.newRows.map((row) => {
					return {
						dataset: row.dataset,
						row: row.row
					};
				});

				changesToStore.changedRows = changes.changedRows.map((row) => {
					return {
						dataset: row.dataset,
						row: row.row
					};
				});
				changesToStore.newLeaderboards = changes.newLeaderboards.map((lb) => {
					return {
						dataset: lb.dataset,
						data: lb.data
					};
				});
				let cookie = {
					name: `pr-changes`,
					value: JSON.stringify(changesToStore)
				};
				localStorage.setItem(cookie.name, cookie.value);
			}
			if (tableBuilt && !tableBuilding) $currentTabulator?.redraw(true);
			$currentTabulator = $currentTabulator;
		}
	});

	function addNewColumnToTable(newColumn: any) {
		if (newColumn == undefined) {
			console.log('no column provided, likely due to column deletion. Not adding column to table');
			return;
		}

		if (newColumn.dataset != $page.params.db + '/' + $page.params.dataset) return;

		let columnTitle = newColumn.column;
		let columnType = newColumn.numerical;

		let column = {
			title: columnTitle,
			field: columnTitle,
			resizable: true,
			editor: 'input'
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
					<button
						on:click={() => {
							toggleDialog(`add-new-leaderboard-${$page.params.db}/${$page.params.dataset}`);
						}}
						class="btn btn-accent btn-wide"
					>
						Submit a new leaderboard
					</button>
				</div>
			{:else}
				Leaderboard
			{/if}
		</div>
		{#if $currentPRChanges && $currentPRChanges.newLeaderboards.find((lb) => lb.dataset === `${$page.params.db}/${$page.params.dataset}`) != undefined}
			<div class="my-auto mx-4">
				<button
					on:click={() => {
						toggleDialog('delete-new-leaderboard-' + $page.params.db + '/' + $page.params.dataset);
					}}
					class="btn btn-warning"
				>
					Delete
				</button>
			</div>
		{/if}
		<input
			class:hidden={parsedTable == null}
			type="text"
			class="input input-primary input-sm w-60 my-auto"
			placeholder="Filter 🔎"
			name="filter"
			id="filter"
			bind:this={filter}
			on:input={setTableFilter}
		/>
		{#if $currentPRChanges && $currentPRChanges.newColumns.find((col) => col.dataset === `${$page.params.db}/${$page.params.dataset}`) != undefined}
			<div class="mx-4 italic text-xs my-auto text-gray-400">
				Right click on your new column to delete it
			</div>
		{/if}
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
<AddNewLeaderboard dataset={$page.params.db + '/' + $page.params.dataset} />
<AreYouSureDeleteLbDialog dataset={$page.params.db + '/' + $page.params.dataset} />
<ShowRowDialog />

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
