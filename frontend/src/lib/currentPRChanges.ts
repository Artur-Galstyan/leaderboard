import { writable } from 'svelte/store';
import type { RowComponent } from 'tabulator-tables';

export type NewColumn = {
	dataset: string;
	column: string;
	numerical: boolean;
};

export type NewRow = {
	dataset: string;
	row: RowComponent;
};

export type NewPR = {
	newColumns: NewColumn[];
	newRows: NewRow[];
	lastChange: 'column' | 'row' | null;
};

export const currentPRChanges = writable<NewPR | null>(null);

export function initPRChanges() {
	return {
		newColumns: [],
		newRows: [],
		lastChange: null
	} as NewPR;
}
