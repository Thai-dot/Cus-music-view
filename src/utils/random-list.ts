function randomList(n: number): number[] {
  // Check if n is a valid input
  if (n < 1 || !Number.isInteger(n)) {
    throw new Error("Invalid input");
  }

  // Create an array of numbers from 1 to n
  let array: number[] = [];
  for (let i = 0; i < n; i++) {
    array.push(i);
  }

  // Shuffle the array using the Fisher-Yates algorithm
  for (let i = array.length - 1; i >= 0; i--) {
    // Pick a random index from 0 to i
    let j = Math.floor(Math.random() * (i + 1));

    // Swap array[i] and array[j]
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  // Return the shuffled array
  return array;
}

export default randomList;
