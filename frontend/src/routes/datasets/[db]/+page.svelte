<script lang="ts">
	import { page } from '$app/stores';
	import { getGitHubFilesInFolder, getRawGitHubContent } from '$lib/utils/githubUrlBuilder';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	let content: string | undefined;
	let files: string[];

	async function load(params: any) {
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
	}

	onMount(async () => {
		const loadData = await load($page.params);
		content = loadData.content;
		files = loadData.files;
	});
</script>

{#if content}
	<article class="prose text-justify mx-auto my-8">
		{@html content}
	</article>
{/if}

{#if files}
	<div class="flex justify-center">
		<ul class="list list-decimal">
			{#each files as file}
				{#if file}
					<li>
						<a href={$page.url.pathname + '/' + file}>{file}</a>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
{/if}
