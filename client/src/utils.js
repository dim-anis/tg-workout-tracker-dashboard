import { format, parseISO } from "date-fns";

export function getTodaysWorkout(lastWorkout, sequence) {
  let getTodaysWorkout;
  if (sequence.indexOf(lastWorkout) + 1 === sequence.length) {
    getTodaysWorkout = sequence[0];
  } else {
    getTodaysWorkout = sequence[sequence.indexOf(lastWorkout) + 1];
  }
  return getTodaysWorkout;
}

export function volumeMonth(workouts) {
  if (workouts !== undefined) {
    let volume = 0;
    for (let i = 0; i < workouts.length; i++) {
      let set_volume = workouts[i].weight * workouts[i].repetitions;
      volume += set_volume;
    }
    return `${volume.toLocaleString()} kgs`;
  }
}

export function dateToString(date) {
  return format(parseISO(date), "yyyy-MM-dd");
}

export function getWorkoutsVolume(workouts) {
  if (workouts !== undefined) {
    let workoutVolumes = [];
    let workoutObject = {};
    // starting with the first object in the array of sets
    workoutObject.date = dateToString(workouts[0].createdAt);
    workoutObject.volume = null;
    for (let i = 0; i < workouts.length; i++) {
      if (dateToString(workouts[i].createdAt) === workoutObject.date) {
        workoutObject.volume += workouts[i].repetitions * workouts[i].weight;
      } else {
        workoutVolumes.push(workoutObject);
        workoutObject = {};
        workoutObject.date = dateToString(workouts[i].createdAt);
        workoutObject.volume = workouts[i].repetitions * workouts[i].weight;
      }
    }
    workoutVolumes.push(workoutObject);
    return workoutVolumes;
  }
}

//above function rewritten with .reduce() Array method

export function reduceWorkoutsVolume(workouts) {
  if (workouts !== undefined) {
    const result = workouts.reduce((workoutVolume, set) => {
      const date = dateToString(set.createdAt);
      const volume = set.weight * set.repetitions;
      if (workoutVolume[date] == null) {
        workoutVolume[date] = [];
        workoutVolume[date].push({ date: date, volume: volume });
      } else {
        workoutVolume[date][0].volume += volume;
      }
      return workoutVolume;
    }, []);
    /*
      result is an array of arrays each of which include one single object
      unpacking result into an array of just the objects for Chart component
    */
    return Object.values(result).map((obj) => obj[0]);
  }
}
