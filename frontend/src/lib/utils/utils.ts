import { NUMERIC_FIELDS } from '$lib/constants';

export function generateRandomHash() {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function getBaseColumns() {
	let columns = [
		{
			title: 'Model / System',
			field: 'Model / System',
			resizable: true,
			editor: 'input',
			visible: true
		},
		{
			title: 'Year',
			field: 'Year',
			resizable: true,
			editor: 'input',
			visible: true
		},
		{
			title: 'Precision',
			field: 'Precision',
			resizable: true,
			editor: 'input',
			visible: true
		},
		{
			title: 'Recall',
			field: 'Recall',
			resizable: true,
			editor: 'input',
			visible: true
		},
		{
			title: 'F1',
			field: 'F1',
			resizable: true,
			editor: 'input',
			visible: true
		},
		{
			title: 'Language',
			field: 'Language',
			resizable: true,
			editor: 'input',
			visible: true
		},
		{
			title: 'Reported by',
			field: 'Reported by',
			formatter: 'html',
			resizable: true,
			editor: 'input',
			visible: true
		},
		{
			title: 'id',
			field: 'id',
			visible: true,
			resizable: false,
			editor: 'input'
		}
	];

	return columns;
}

export function extendColumnsByParsedTable(parsedTable: any, columns: any) {
	for (let i = 0; i < parsedTable.length; i++) {
		parsedTable[i].id = i;
	}
	let objectKeys = Object.keys(parsedTable[0]);
	columns = columns.filter((column: { title: string }) => objectKeys.includes(column.title));

	for (let i = 0; i < objectKeys.length; i++) {
		let currObjectKey = objectKeys[i];
		if (columns.some((column: { title: string }) => column.title == currObjectKey)) continue;
		if (NUMERIC_FIELDS.includes(currObjectKey)) {
			columns.push({
				title: currObjectKey,
				field: currObjectKey,
				resizable: true,
				editor: 'input',
				visible: true,
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
				resizable: true,
				editor: 'input',
				visible: true
			});
		}
	}

	return columns;
}
