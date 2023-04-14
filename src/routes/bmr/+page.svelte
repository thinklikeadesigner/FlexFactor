<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import GainsCalculator from '$lib/components/gainsCalculator.svelte';
	import type { ActionData, PageData } from './$types';
	import UserStore from '../../stores/UserStore';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;
	let error = false;

	const addFitnessLevel: SubmitFunction = (input) => {
		loading = true;
		console.log(input);
		return async ({ update }) => {
			loading = false;
			console.log(loading);
			await update();
		};
	};
</script>

<!-- svelte-ignore missing-declaration -->
<pre>	{JSON.stringify($UserStore)}</pre>
<div class="py-10">
	<div class="card p-4">
		<ul class="list">
			{#each data.fitnessLevels as fitnessLevel}
				<li class="">
					<span class="flex-auto capitalize">
						{fitnessLevel.text}
					</span>
					<form action="?/removeFitnessLevel" method="POST" use:enhance>
						<input class="input" type="hidden" name="id" value={fitnessLevel.id} />
						<button
							type="submit"
							class="btn variant-ghost-error text-error-400 m-0 bg-none border-none">DELETE</button
						>
					</form>
				</li>
			{/each}
		</ul>

		<form action="?/addFitnessLevel" method="POST" use:enhance={addFitnessLevel}>
			{#if form?.missing}
				<div class="flex flex-row justify-between">
					<label class="label" for="weight">
						<span>weight</span>
						<input class="input w-1/2" type="text" name="weight" />
					</label>
					<label class="label" for="height"
						><span>height</span><input class="input w-1/2" type="text" name="height" /></label
					>
					<label class="label" for="age"
						><span>age</span>
						<input class="input w-1/2" type="text" name="age" />
					</label>
					<label class="label" for="sex"
						><span>sex</span>
						<input class="input w-1/2" type="text" name="sex" />
					</label>
					<label class="label" for="bf"
						><span>bf</span>
						<input class="input w-1/2" type="text" name="bf" />
					</label>
					<label class="label" for="activityLevel"
						><span>activityLevel</span>
						<input class="input w-1/2" type="text" name="activityLevel" />
					</label>
					<button class="btn" type="submit"> + Add fitnessLevel </button>
					<button type="submit" formaction="?/clearFitnessLevels" class="btn"> clear</button>
				</div>
				<p class="text-error-400">This field is required</p>
			{:else}
				<div class="flex flex-row justify-between">
					<label class="label" for="bf"
						><span>bf</span>
						<input class="input input-error w-1/2" type="text" name="bf" />
					</label>
					<label class="label" for="activityLevel"
						><span>activityLevel</span>
						<input class="input input-error w-1/2" type="text" name="activityLevel" />
					</label>
					<button class="btn" type="submit"> + Add fitnessLevel </button>
					<button type="submit" formaction="?/clearFitnessLevels" class="btn"> clear</button>
				</div>
			{/if}
		</form>

		{#if form?.success}
			<p>Added fitnessLevel!</p>
		{/if}
	</div>
</div>

<GainsCalculator />
