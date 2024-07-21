export function findLastTrueIndex(arr) {
  if (arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === true) {
        return i;
      }
    }
  }
  return -1; // Return -1 if no true value is found
}
