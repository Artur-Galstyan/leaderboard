import { writable } from 'svelte/store';

export type NewColumn = {
	dataset: string;
	column: string;
	numerical: boolean;
};

export type NewRow = {
	dataset: string;
	row: {
		key: string;
		value: string;
	}[];
};

export type NewPR = {
	columns: NewColumn[];
	rows: NewRow[];
	lastChange: 'column' | 'row' | null;
};

export const currentPRChanges = writable<NewPR | null>(null);

export function initPRChanges() {
	return {
		columns: [],
		rows: [],
		lastChange: null
	} as NewPR;
}
