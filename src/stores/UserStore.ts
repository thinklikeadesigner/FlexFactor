import { writable } from 'svelte/store';

const UserStore = writable({
	height: 64,
	currentWeight: 145,
	sex: 'female',
	age: 29,
	bf: 0.22,
	activityLevel: 'sedentary',
	fitnessLevel: 'intermediate',
	calorieSurplus: 5,
	exerciseName: 'benchPress',
	heightInInches: 64,
	oneRepMax: 105
});

export default UserStore;
