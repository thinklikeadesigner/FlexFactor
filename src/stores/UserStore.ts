import { persisted } from 'svelte-local-storage-store';

// First param `UserStore` is the local storage key.
// Second param is the initial value.
export const UserStore = persisted('UserStore', {
	currentWeight: 145,
	sex: 'female',
	age: 29,
	bf: 0.22,
	activityLevel: 'sedentary',
	fitnessLevel: 'intermediate',
	calorieSurplus: 5,
	exerciseName: 'benchPress',
	heightInInches: 64,
	oneRepMax: 105,
	desiredGains: 5,
	pratio: 0.55
});

export default UserStore;
