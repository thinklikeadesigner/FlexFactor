<script lang="ts">
	import UserStore from '../stores/UserStore';
	import { SlideToggle, RadioGroup, RadioItem, RangeSlider } from '@skeletonlabs/skeleton';
	import { getFitnessLevel } from '../utils/FitnessLevel';
	import { onMount } from 'svelte';

	let age: number;
	let sex: string = 'male';
	let currentWeight: number;
	let heightInInches: number = 60;
	let exerciseName: string = 'benchPress';
	let oneRepMax: number;
	$: fitnessLevel = '';

	onMount(() => {
		sex = $UserStore.sex;
		age = $UserStore.age;
		currentWeight = $UserStore.currentWeight;
		heightInInches = $UserStore.heightInInches;
		exerciseName = $UserStore.exerciseName;
		oneRepMax = $UserStore.oneRepMax;
	});

	const handleSubmit = () => {
		if (!age || !currentWeight || !oneRepMax) return;
		fitnessLevel = getFitnessLevel(sex, exerciseName, currentWeight, oneRepMax);
		console.log({ age, sex, currentWeight, exerciseName, oneRepMax, fitnessLevel });
		console.log(fitnessLevel);
		UserStore.update((data) => {
			data.fitnessLevel = fitnessLevel;
			data.sex = sex;
			data.age = age;
			data.currentWeight = currentWeight;
			data.exerciseName = exerciseName;
			data.heightInInches = heightInInches;
			data.oneRepMax = oneRepMax;
			return data;
		});
	};

	const toggleSex = () => {
		if (sex === 'male') {
			sex = 'female';
			UserStore.update((data) => {
				data.sex = sex;
				return data;
			});
		} else if (sex === 'female') {
			sex = 'male';
			UserStore.update((data) => {
				data.sex = sex;
				return data;
			});
		}
	};

	$: heightInFeetInches = convertInchestoFeet(heightInInches);

	const convertInchestoFeet = (heightInInches: number) => {
		if (heightInInches < 48) return;
		if (heightInInches % 12 === 0) return `${heightInInches / 12} ft`;
		else return `${Math.trunc(heightInInches / 12)}ft, ${heightInInches % 12}in`;
	};

	$: sexLabel = `${sex.charAt(0).toUpperCase()}${sex.slice(1)}`;
</script>

<svelte:head>
	<title>Flex Factor</title>
	<meta name="description" content="Science-based Gains Calculator" />
</svelte:head>

<h1 class="text-center">Flex Factor 💪🏼</h1>

<form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-3 mt-12 max-w-xl m-auto">
	<label for="age" class="flex justify-between items-center"
		>Age
		<input
			type="number"
			id="age"
			bind:value={age}
			class="input w-3/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			required
		/>
	</label>

	<label for="sex" class="flex justify-between items-center"
		>Sex
		<div class="w-3/5">
			<SlideToggle name="sex" on:change={toggleSex}>{sexLabel}</SlideToggle>
		</div></label
	>

	<label for="weight" class="flex justify-between items-center"
		>Current Weight (lbs)
		<input
			type="number"
			id="weight"
			bind:value={currentWeight}
			class="input w-3/5 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			required
		/>
	</label>

	<label for="height" class="flex justify-between items-center"
		>Height
		<div class="w-3/5 self-left">
			<RangeSlider
				name="height"
				bind:value={heightInInches}
				min={48}
				max={96}
				step={1}
				class="w-auto"
			>
				<div class="text-sm">{heightInFeetInches}</div>
			</RangeSlider>
		</div>
	</label>

	<h4>Let's determine your fitness level</h4>
	<RadioGroup>
		<RadioItem bind:group={exerciseName} name="justify" value={'benchPress'}>Bench Press</RadioItem>
		<RadioItem bind:group={exerciseName} name="justify" value={'barbellSquat'}
			>Barbell Squat</RadioItem
		>
		<RadioItem bind:group={exerciseName} name="justify" value={'pullups'}>Pull-ups</RadioItem>
		<RadioItem bind:group={exerciseName} name="justify" value={'hipThrust'}>Hip Thrust</RadioItem>
	</RadioGroup>

	<label for="age" class="flex justify-between items-center">
		{#if exerciseName === 'pullups'}
			Max number of reps:
		{:else}
			Max weight for 1 repetition (lbs):
		{/if}
		<input
			type="number"
			id="age"
			bind:value={oneRepMax}
			class="input w-1/4 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			required
		/>
	</label>

	<button type="submit" class="btn variant-filled px-8 w-auto mt-8 self-center"
		>Check My Fitness Level</button
	>
</form>

<h4 class="text-center">
	{#if fitnessLevel === 'invalid weight'}
		Your fitness level cannot be determined
	{:else if fitnessLevel !== ''}
		Your fitness level is {fitnessLevel.toUpperCase()}
	{/if}
</h4>

<style>
</style>
