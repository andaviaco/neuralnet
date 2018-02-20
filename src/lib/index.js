
export function randomNumberInRange(min, max) {
  return Math.random() * ((max - min) + min);
}

export function randomArray(size, upper, lower) {
  return Array.from({ length: size })
    .map(() => randomNumberInRange(lower, upper));
}

export function sigmoid(value) {
  return 1 / (1 + Math.exp(-1 * value));
}
