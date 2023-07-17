<script lang="ts">
	import { currentPRChanges, initPRChanges } from '$lib/currentPRChanges';
	import { currentTabulator } from '$lib/currentTabulator';
	import { toggleDialog } from '$lib/dialogs/dialogUtils';
	import { notifySuccess } from '$lib/notifications';
	import { onMount } from 'svelte';
	import type { Tabulator } from 'tabulator-tables';

	export let dataset: string;

	let newRowName: string = '';
	let newRowNumerical: boolean = false;

	let currentColumns: any[] = [];

	currentTabulator.subscribe((tabulator) => {
		if (tabulator) {
			currentColumns = tabulator.getColumns();
		}
	});

	let currentColumnInputs: any[] = [];
</script>

<dialog id="add-new-row-{dataset}" class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">New Row</h3>
		<p class="py-4">
			Please enter the fields for the new row you want to add to the dataset <span
				class="text-primary">{dataset}</span
			>.
		</p>

		<div class="grid grid-cols-2 gap-x-4 gap-y-2">
			{#each currentColumns as column}
				<div class="text-xs">{column.getField()}</div>
				<input
					type="text"
					class="input input-primary input-sm w-full"
					placeholder={column.getField()}
					name="row-name-{column.getField()}"
					id="row-name-{column.getField()}"
					on:input={(e) => {
						currentColumnInputs[column.getField()] = e.target.value;
					}}
				/>
			{/each}
		</div>

		<div class="flex justify-center my-8">
			<button
				on:click|preventDefault={() => {
					toggleDialog(`are-you-sure-row-${dataset}`);
				}}
				class="btn btn-primary btn-sm">Add Row</button
			>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog id="are-you-sure-row-{dataset}" class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Are you sure?</h3>
		<p class="py-4">
			You are about to add a new row to the dataset <span class="text-primary">{dataset}</span> with
			the following fields:
		</p>
		<ul class="list-disc list-inside">
			{#each currentColumns as column}
				<li>
					{column.getField()}: {currentColumnInputs[column.getField()]}
				</li>
			{/each}
		</ul>

		<div class="flex justify-center space-x-4">
			<button
				on:click={() => {
					toggleDialog(`add-new-row-${dataset}`);
					toggleDialog(`are-you-sure-row-${dataset}`);
					let newRow = currentColumns.map((column) => {
						console.log(column.getField());
						return {
							key: column.getField(),
							value: currentColumnInputs[column.getField()]
						};
					});

					if (!$currentPRChanges) $currentPRChanges = initPRChanges();
					$currentPRChanges.rows.push({
						dataset: dataset,
						row: newRow
					});
					$currentPRChanges.lastChange = 'row';
					notifySuccess(
						'New row added successfully!',
						`Added row ${newRowName} to dataset ${dataset}`
					);
				}}
				class="btn btn-success btn-xs"
			>
				Yes
			</button>
			<button class="btn btn-error btn-xs"> No </button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
