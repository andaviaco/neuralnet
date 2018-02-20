import _ from 'lodash';

export function randomNumberInRange(min, max) {
  return _.random(min, max, true);
}

export function randomArray(size, upper, lower) {
  return Array.from({ length: size })
    .map(() => randomNumberInRange(lower, upper));
}

export function sigmoid(value) {
  return 1 / (1 + Math.exp(-1 * value));
}

export function range(start, end, step) {
  return _.range(start, end, step);
}
