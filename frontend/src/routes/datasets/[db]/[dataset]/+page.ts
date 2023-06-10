import { getGitHubFilesInFolder, getRawGitHubContent } from '$lib/utils/githubUrlBuilder';
import type { PageLoad } from './$types';
import matter from 'gray-matter';
// @ts-ignore
import * as htmlToJson from 'html-table-to-json';
import { marked } from 'marked';

export const load = (async ({ params, fetch }) => {
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

		return {
			parsedTable: structuredClone(parsedTable),
			prefaceData: prefaceData
		};
	} catch (e) {
		console.log('erorr', e);
		return {
			status: 404
		};
	}
}) satisfies PageLoad;
