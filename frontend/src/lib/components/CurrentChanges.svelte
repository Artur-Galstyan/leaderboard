<script lang="ts">
	import { currentPRChanges } from '$lib/currentPRChanges';
	import { toggleDialog } from '$lib/dialogs/dialogUtils';
	import { fade } from 'svelte/transition';
	import Swal from 'sweetalert2';

	let dialogElement: HTMLDialogElement;
</script>

<dialog bind:this={dialogElement} id="your-changes-dialog" class="modal">
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-lg">Your Changes</h3>
		<div>
			{#if $currentPRChanges}
				<div>
					New Rows:
					<ul>
						{#each $currentPRChanges.rows as row}
							<li>
								{row.dataset} -
								<button
									on:click|preventDefault={async () => {
										await Swal.fire({
											title: 'Row',
											html: `<div class="grid grid-cols-2">${row.row.map((field) => {
												return `<div>${field.key}</div> <div>${field.value}</div>`;
											})}</div>`.replace(/,/g, ''),
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
									class="btn btn-info btn-xs">Expand</button
								>
							</li>
						{/each}
					</ul>
				</div>
				<div>
					New Columns:
					<ul>
						{#each $currentPRChanges.columns as column}
							<li>
								{column.dataset} - {column.column} - {column.numerical
									? 'Numerical'
									: 'Non-Numerical'}
							</li>
						{/each}
					</ul>
				</div>
			{/if}
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
