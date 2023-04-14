<script lang="ts">
	import { RangeSlider } from '@skeletonlabs/skeleton';
	import { determinePRatio } from '../../utils/PRatioDeterminer';
	import GainsCalculator from '$lib/components/gainsCalculator.svelte';
	import UserStore from '../../stores/UserStore';

	let sex = $UserStore.sex;
	let calorieSurplus = 10;
	let calorieSurplusRange = [2.5, 5, 10, 15, 25];
	let bodyFat: number;
	let bodyFatMin: number;
	let bodyFatMax: number;

	if (sex === 'male') {
		bodyFat = 10;
		bodyFatMin = 4;
		bodyFatMax = 20;
	} else {
		bodyFat = 22;
		bodyFatMin = 12;
		bodyFatMax = 40;
	}

	let values: { bodyFat: number; calorieSurplus: number };

	$: values = { bodyFat, calorieSurplus };

	let pRatio = 1;
	$: {
		pRatio = determinePRatio($UserStore.sex, calorieSurplus, bodyFat, $UserStore.fitnessLevel);
		UserStore.update((data) => {
			data.bf = bodyFat;
			data.calorieSurplus = calorieSurplus;
			return data;
		});
	}
</script>

<pre>{JSON.stringify($UserStore, null, 2)}</pre>

<form class="flex flex-col gap-3 mt-12 max-w-xl m-auto" action="">
	<h2>Calculate p-ratio</h2>
	<RangeSlider name="range-slider" bind:value={bodyFat} min={bodyFatMin} max={bodyFatMax} step={1}>
		<div class="flex justify-between items-center">
			<h4>BodyFat %</h4>
			<div class="text-xs">{bodyFat} / {bodyFatMax}</div>
		</div>
	</RangeSlider>

	<h4>Calorie Surplus</h4>
	<div class="flex items-center">
		{#each calorieSurplusRange as value}
			<label class="flex justify-between items-center"
				><input type="radio" {value} bind:group={calorieSurplus} name="" id="" />{value}%</label
			>
		{/each}
	</div>
</form>

<GainsCalculator />
