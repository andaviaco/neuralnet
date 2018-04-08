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

export function dsigmoid(value) {
  return sigmoid(value) * (1 - sigmoid(value));
}

export function range(start, end, step) {
  return _.range(start, end, step);
}

export function euclideanDistance([x1, y1], [x2, y2]) {
  const dx = (x2 - x1) ** 2;
  const dy = (y2 - y1) ** 2;

  return Math.sqrt(dx + dy);
}

export function round(x, precision = 0) {
  return _.round(x, precision);
}

export async function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
