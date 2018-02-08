
export function randomNumberInRange(min, max) {
  return Math.random() * ((max - min) + min);
}

export function randomArray(size, upper, lower) {
  return Array.from({ length: size })
    .map(() => randomNumberInRange(lower, upper));
}
