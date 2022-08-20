import { format, parseISO } from "date-fns";

export function dateToString(date) {
  return format(parseISO(date), "yyyy-MM-dd");
}

export function getVolume(workouts) {
  const result = workouts.reduce(
    (totalVolume, set) => totalVolume + set.repetitions * set.weight,
    0
  );
  return result;
}

export function getWorkoutVolume(workouts) {
  const result = workouts.reduce((volumeArray, set) => {
    const date = dateToString(set.createdAt);
    const volume = Math.round(set.weight * set.repetitions);

    if (typeof volumeArray.find((obj) => obj.x === date) === "undefined") {
      volumeArray.push({ x: date, y: volume });
    } else {
      const index = volumeArray.findIndex((obj) => obj.x === date);
      volumeArray[index].y += volume;
    }

    return volumeArray;
  }, []);

  return result;
}

export function findNLastWorkouts(nDays, workouts) {
  const result = workouts.reduce((workoutDays, set) => {
    const date = dateToString(set.createdAt);
    if (
      typeof workoutDays.find(
        (arr) => dateToString(arr[0].createdAt) === date
      ) === "undefined"
    ) {
      workoutDays.push([set]);
    } else {
      const index = workoutDays.findIndex(
        (arr) => dateToString(arr[0].createdAt) === date
      );
      workoutDays[index].push(set);
    }

    return workoutDays;
  }, []);

  return nDays >= result.length ? result : result.slice(-nDays);
}
