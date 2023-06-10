import { getGitHubFilesInFolder, getRawGitHubContent } from '$lib/utils/githubUrlBuilder';
import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load = (async ({ params, fetch }) => {
	try {
		const githubUrl = getRawGitHubContent(`Artur-Galstyan/leaderboard`, `${params.db}/README.md`);

		const githubMarkdownTextReq = await fetch(githubUrl);
		const githubMarkdownText = await githubMarkdownTextReq.text();

		const htmlContent = marked.parse(githubMarkdownText, { mangle: false, headerIds: false });

		const rawFilesUrl = getGitHubFilesInFolder(`leaderboard`, `${params.db}`);
		const rawFilesReq = await fetch(rawFilesUrl);
		const rawFiles = await rawFilesReq.json();

		const files = rawFiles.map((file: { name: string }) => {
			file.name = file.name.replace('.md', '');
			return file.name == 'README' ? undefined : file.name;
		});

		return {
			content: htmlContent,
			files: files
		};
	} catch (e) {
		return {
			status: 404
		};
	}
}) satisfies PageLoad;
