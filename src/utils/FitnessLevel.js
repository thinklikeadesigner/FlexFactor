// @ts-nocheck




/* eslint-disable @typescript-eslint/ban-ts-comment */

import stats from './stats.js'

// @ts-ignore

import NutritionCalculator from "./NutritionCalculator.js";
class FitnessLevel {


  /**
   * @param {string} sex
   */
  constructor(sex) {
    if (sex == "female"){
    this.stats = stats.femaleStats;
  } else if (sex == "male"){
    this.stats = stats.maleStats
  } else {
        console.log("invalid sex, using default male")
    this.stats = stats.maleStats
  }}

  // @ts-ignore
  _checkWeightClass(weight) {
    let weightClass;
    if (weight < 125) {
      weightClass = 0;
    } else if (weight >= 125 && weight <= 155) {
      weightClass = 1;
    } else {
      weightClass = 2;
    }
    return weightClass;
  }

  _checkExercise(str) {
    const regexbenchPress = /bench\s*press/i;
    const regexDeadlift = /deadlift/i;
    const regexSquat = /squat|barbell\s*squat|back\s*squat|front\s*squat/i;
    const regexPullups = /pull\s*-?\s*ups?/i;
    const regexHipThrust = /hip\s*thrust/i;
    console.log()
    switch (true) {
      case regexDeadlift.test(str):
      return "The string contains deadlift.";
      case   regexbenchPress.test(str):
      return 'benchPress';
      case regexSquat.test(str):
      return 'barbellSquat';
      case regexPullups.test(str):
      return 'pullups';
      case regexHipThrust.test(str):
        return 'hipThrust';
      default:
      return "The string does not contain any of the specified exercises.";
    }
    }

   // @ts-ignore
   getLevel(exercise, weight, oneRepMax) {
    let weightClass = this._checkWeightClass(weight)
    exercise = this._checkExercise(exercise)
    // @ts-ignore
    const section = this.stats[weightClass][exercise];
    if (!section) {
      return "invalid exercise";
    }
  
    const level = Object.keys(section).find((level) => {
      const [min, max] = section[level];
      return oneRepMax >= min && oneRepMax <= max;
    });
  
    return level ? level : "invalid weight";
  }

}


const macros = NutritionCalculator.calculateMacronutrients('calculateBMRWithBF1', 145, 64, 30,  'female',0.22, 'sedentary');

console.log(macros)

  const female = new FitnessLevel("female")
  const male = new FitnessLevel("male")



  export {female, male}



