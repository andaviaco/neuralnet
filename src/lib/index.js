import _ from 'lodash';
import math from 'mathjs';
import nj from 'numjs';

import {
  CLASS_TYPE_1,
  CLASS_TYPE_2,
  POINT_TYPE_1,
  POINT_TYPE_2,
  POINT_TYPE_3,
} from '@/const';

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

export function rangePairs(from, to, step) {
  const a = range(from, to, step);

  return a.map(v => a.map(u => [v, u])).reduce((acc, t) => [...acc, ...t], []);
}

export function classToType(output) {
  if (_.isEqual(CLASS_TYPE_1, output)) {
    return POINT_TYPE_1;
  }

  if (_.isEqual(CLASS_TYPE_2, output)) {
    return POINT_TYPE_2;
  }

  return POINT_TYPE_3;
}

export function gaussian(v, center, spread) {
  const a = nj.array(v);
  const r = a.subtract(center);
  return Math.exp(-(r.pow(2).sum()) / (2 * (spread ** 2)));
}

export function euclideanDistanceNorm(x, y) {
  const xArray = nj.array(x);

  return math.norm(xArray.subtract(y).tolist());
}

export function minBy(...args) {
  return _.minBy(...args);
}

export function zip(...args) {
  return _.zip(...args);
}
