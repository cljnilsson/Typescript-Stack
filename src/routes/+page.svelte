<script>
	import { request, gql } from 'graphql-request';
	import { onMount } from 'svelte';
	const query = gql`
        {
            getUsers { name }
        }
  `;
    onMount(async () => {

        console.log(":o");
        const data = await request('http://localhost:8000/graphql/', query);
        console.log(data);
        wop = data;
    });

    let wop;
</script>

{JSON.stringify(wop)}
