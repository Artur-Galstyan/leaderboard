import { NUMERIC_FIELDS } from '$lib/constants';
import matter from 'gray-matter';
import { marked } from 'marked';
import { getRawGitHubContent } from '$lib/utils/githubUrlBuilder';

import * as htmlToJson from '$lib/utils/htmlToJson';

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
	console.log(objectKeys);
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

export function storeToLocalStorage(changes: any) {
	console.log('Storing changes in cookie!');
	console.log('new changes to store', changes);
	let changesToStore: any = {};
	changesToStore.newColumns = changes.newColumns;
	changesToStore.newRows = changes.newRows.map((row: any) => {
		return {
			dataset: row.dataset,
			row: row.row
		};
	});

	changesToStore.changedRows = changes.changedRows.map((row: any) => {
		return {
			dataset: row.dataset,
			row: row.row
		};
	});
	changesToStore.newLeaderboards = changes.newLeaderboards.map((lb: any) => {
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

export async function loadSystems() {
	try {
		const githubUrl = getRawGitHubContent(`Artur-Galstyan/leaderboard`, `systems.md`);
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

		const githubUrlInfo = getRawGitHubContent(`Artur-Galstyan/leaderboard`, `^systems.md`);
		const githubUrlInfoReq = await fetch(githubUrlInfo);
		const githubMarkdownTextInfo = await githubUrlInfoReq.text();
		const parsedInfo = matter(githubMarkdownTextInfo);
		const htmlContentInfo = marked.parse(parsedInfo.content, { mangle: false, headerIds: false });

		let htmlFooter = undefined;
		try {
			const githubUrlFooter = getRawGitHubContent(`Artur-Galstyan/leaderboard`, `$systems.md`);
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
		throw new Error(`Failed to load dataset systems.md, error ${e}`);
	}
}

export async function load(params: any) {
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
