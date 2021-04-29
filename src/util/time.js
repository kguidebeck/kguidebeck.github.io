/**
 * generates difference in minutes between two times
 */
export const generateTime = (start, stop) => {
	const startArr = start.split(':');
	const startTime = parseInt(startArr[0]) * 60 + parseInt(startArr[1]);

	if (isNaN(startTime)) return null;

	const stopArr = stop.split(':');
	const stopTime = parseInt(stopArr[0]) * 60 + parseInt(stopArr[1]);

	if (isNaN(stopTime)) return null;

	return stopTime - startTime;
};

/**
 * formats time with AM/PM and converts to 12 hour day (vs 24)
 */
export const formatTimeString = (time) => {
	const timeArr = time.split(':');
	const min = timeArr[1];
	let hour = parseInt(timeArr[0]);
	let period = "AM";
  
	if (hour >= 12) {
	  period = "PM"
  
	  if (hour > 12) {
			hour = hour - 12;
	  }
	}
	
	return `${hour}:${min}${period}`;
};

/**
 * formats time into object of hours and minutes
 */
export const formatTime = (time) => {
	if (time === 0) return { hours: 0, minutes: 0 };

	let min = time % 60;
	let hour = 0;

	if (time > 59) {
		hour = (time - min) / 60;
	}

	return { hours: hour, minutes: min };
};

/**
 * compare time to reorder time item list
 */
export const compareTime = (itemA, itemB) => {
	const arrA = itemA.start.split(':');
	const arrB = itemB.start.split(':');

	let comparison = 0;
  if (arrA[0] > arrB[0]) {
    comparison = 1;
  } else if (arrA[0] === arrB[0] ) {
		if (arrA[1] > arrB[1]) {
			comparison = 1;
		} else {
			comparison = -1;
		}
	} else {
    comparison = -1;
  }
  return comparison;
};
