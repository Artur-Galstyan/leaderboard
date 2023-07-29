<script lang="ts">
	import { currentPRChanges } from '$lib/currentPRChanges';
	import { toggleDialog } from '$lib/dialogs/dialogUtils';
	import { notifyError } from '$lib/notifications';
	import { stringify } from 'gray-matter';
	import { fade } from 'svelte/transition';
	import Swal from 'sweetalert2';

	let dialogElement: HTMLDialogElement;

	let serializedPR: any;

	async function showRow(row: any) {
		let tempRow = JSON.parse(JSON.stringify(row));
		let keys = Object.keys(tempRow);
		let htmlContent = '';
		keys.forEach((key) => {
			if (key !== 'id') htmlContent += `<div>${key}</div> <div>${tempRow[key]}</div>`;
		});
		await Swal.fire({
			title: 'Row',
			html: `<div class="grid grid-cols-2">
												${htmlContent}</div>`.replace(/,/g, ''),
			target: dialogElement,
			showClass: {
				popup: 'animate__animated animate__fadeIn animate__faster'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOut animate__faster'
			},
			position: 'top'
		});
	}
</script>

<dialog bind:this={dialogElement} id="your-changes-dialog" class="modal">
	<form method="dialog" class="modal-box">
		<div class="flex justify-between">
			<h3 class="font-bold text-lg">Your Changes</h3>

			<button
				on:click|preventDefault={() => {
					toggleDialog('are-you-sure-discard');
				}}
				class="btn btn-warning btn-sm"
			>
				Discard all changes
			</button>
		</div>
		<div>
			{#if $currentPRChanges}
				{#if $currentPRChanges.newRows.length > 0}
					<div class="my-10">
						New Rows:
						<ul>
							{#each $currentPRChanges.newRows as row}
								<li>
									{row.dataset} -
									<button
										on:click|preventDefault={async () => {
											showRow(row.row);
										}}
										class="btn btn-info btn-xs">Expand</button
									>
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if $currentPRChanges.newColumns.length > 0}
					<div class="my-10">
						New Columns:
						<ul>
							{#each $currentPRChanges.newColumns as column}
								<li>
									{column.dataset} - {column.column} - {column.numerical
										? 'Numerical'
										: 'Non-Numerical'}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if $currentPRChanges.changedRows.length > 0}
					<div class="my-10">
						Changed Rows:
						<ul>
							{#each $currentPRChanges.changedRows as changedRow}
								<li>
									{changedRow.dataset} -
									<button
										on:click|preventDefault={async () => {
											showRow(changedRow.row);
										}}
										class="btn btn-info btn-xs">Expand</button
									>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if $currentPRChanges.newLeaderboards.length > 0}
					<div class="my-10">
						New Leaderboards:
						<ul>
							{#each $currentPRChanges.newLeaderboards as lb}
								<li>
									{lb.dataset} -
									<button
										on:click|preventDefault={async () => {
											await Swal.fire({
												title: 'New Table',
												html: `<div> ${lb.data} </div>`,
												target: dialogElement,
												showClass: {
													popup: 'animate__animated animate__fadeIn animate__faster'
												},
												hideClass: {
													popup: 'animate__animated animate__fadeOut animate__faster'
												},
												position: 'top'
											});
										}}
										class="btn btn-xs btn-info">Raw Table Data</button
									>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			{/if}
		</div>
		<div class="flex justify-center">
			<button
				class="btn btn-primary"
				on:click={async () => {
					serializedPR = {};
					serializedPR['newColumns'] = $currentPRChanges?.newColumns;
					serializedPR['newLeaderboards'] = $currentPRChanges?.newLeaderboards;
					serializedPR['newRows'] = [];
					serializedPR['changedRows'] = [];
					$currentPRChanges?.newRows?.forEach((row) => {
						console.log(row.row);
						serializedPR['newRows'].push({
							dataset: row.dataset,
							row: row.row
						});
					});
					$currentPRChanges?.changedRows?.forEach((row) => {
						console.log(row.row);
						serializedPR['changedRows'].push({
							dataset: row.dataset,
							row: row.row
						});
					});

					let req = await fetch('http://localhost:8000/make_pull_request', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							newColumns: serializedPR['newColumns'],
							newRows: serializedPR['newRows'],
							changedRows: serializedPR['changedRows'],
							newLeaderboards: serializedPR['newLeaderboards']
						})
					});
					let res = await req.json();
					console.log(res);
				}}
			>
				Submit
			</button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog id="are-you-sure-discard" class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Are you sure?</h3>
		<p class="py-4">Do you want to discard <b>all</b> your changes? This cannot be undone.</p>
		<div class="flex justify-evenly">
			<button
				on:click={() => {
					localStorage.removeItem('pr-changes');
					window.location.reload();
				}}
				class="btn btn-sm btn-error"
			>
				Yes
			</button>
			<button class="btn btn-sm btn-secondary"> No </button>
		</div>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<style>
	:root {
		--animate-duration: 0.1s;
	}
</style>
