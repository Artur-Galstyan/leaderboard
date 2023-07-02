<script lang="ts">
	import { page } from '$app/stores';
	import { getRawGitHubContent } from '$lib/utils/githubUrlBuilder';
	import matter from 'gray-matter';
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let prefaceData: any;

	async function load() {
		try {
			const githubUrl = getRawGitHubContent(`Artur-Galstyan/leaderboard/`, 'README.md');

			const githubMarkdownTextReq = await fetch(githubUrl);
			const githubMarkdownText = await githubMarkdownTextReq.text();

			const parsed = matter(githubMarkdownText);

			const prefaceData = {
				knowledgeGraphs: parsed.data.knowledgeGraphs
			};

			return {
				prefaceData: prefaceData
			};
		} catch (e) {
			throw new Error(`Failed to load, error ${e}`);
		}
	}

	onMount(async () => {
		const loadedData = await load();
		prefaceData = loadedData.prefaceData;
	});
</script>

<div class="text-center my-12 text-5xl">KGQA Leaderboard</div>

{#if prefaceData}
	<div transition:fade|local class="flex justify-center">
		<ul class="list list-decimal">
			{#each prefaceData.knowledgeGraphs as kg}
				{#if kg}
					<li>
						<a href={$page.url.origin + '/datasets/' + kg.toLowerCase()}>{kg}</a>
					</li>
				{/if}
			{/each}
		</ul>
	</div>
{/if}
