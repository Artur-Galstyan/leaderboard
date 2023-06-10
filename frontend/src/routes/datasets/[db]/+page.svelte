<script lang="ts">

    import {page} from "$app/stores"
	
    console.log($page.url)
</script>

<article class="prose text-justify mx-auto my-8">

    {@html $page.data.content}

</article>


<div class="flex justify-center">

    <ul class="list list-decimal">
        {#each $page.data.files as file}
            {#if file}
                <li>
                    <a href={$page.url.pathname + "/"  + file}>{file}</a>
                </li>
            {/if}
        {/each} 
    </ul>
</div>