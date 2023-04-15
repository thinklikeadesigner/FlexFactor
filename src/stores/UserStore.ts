import { persisted } from 'svelte-local-storage-store';

// First param `UserStore` is the local storage key.
// Second param is the initial value.
export const UserStore = persisted('UserStore', {
	height: 64,
	currentWeight: 146,
	sex: 'female',
	age: 29,
	bf: 0.22,
	activityLevel: 'sedentary',
	fitnessLevel: 'intermediate',
	calorieSurplus: 5,
	exerciseName: 'benchPress',
	heightInInches: 64,
	oneRepMax: 105,
	desiredMuscleGain: 3,
	pRatio: 0.58
});

export default UserStore;
