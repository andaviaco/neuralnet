<template lang="html">
  <svg
    class="area-chart"
    :width="svgWidth"
    :height="svgHeight"
    @mousemove="handleMousemove"
  >
    <g
      :style="{transform: `translate(${margin.left}px, ${margin.top}px)`}"
    >
      <path class="area" :d="paths.area" />
      <path class="line" :d="paths.line" />

      <g
        ref="yAxis"
        class="axis axis--y"
      >
        <text
          class="label"
          transform="rotate(-90)"
          dy="1em"
        >Error</text>
      </g>

      <g
        ref="xAxis"
        class="axis axis--x"
        :style="{transform: `translate(0, ${this.padded.height}px)`}"
      >
        <text
          class="label"
          y="-3"
          x="20"
        >Época</text>
      </g>

      <circle
        class="selector"
        v-if="hoverPoint.x !== null"
        :cx="hoverPoint.x"
        :cy="hoverPoint.y"
        r="5"
      >
      </circle>

      <text
        class="selector-label"
        :x="hoverPoint.x"
        :y="hoverPoint.y - 10"
      >E: {{ scaledHover.y }}</text>
    </g>
  </svg>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import * as d3 from 'd3';

import { euclideanDistance, round } from '../lib';

// import {
//   SVG_AREACHART_WIDTH,
//   SVG_AREACHART_HEIGHT,
//   SVG_CARTESIAN_PADDING,
//
// } from '../const';


@Component
export default class ErrorChart extends Vue {
  data = [
    { x: 1, y: 0.7 },
    { x: 2, y: 0.6 },
    { x: 3, y: 0.5 },
    { x: 4, y: 0.7 },
    { x: 5, y: 0.3 },
  ];

  points = [];

  svgWidth = 500;
  svgHeight = 150;

  ceil = 1.0;

  margin = {
    left: 30,
    right: 10,
    top: 10,
    bottom: 20,
  }

  paths = {
    area: '',
    line: '',
  }

  scales = {
    x: null,
    y: null,
  }

  hoverPoint = {
    x: null,
    y: null,
  }

  lastHoverPoint = {}

  createArea = d3.area().x(d => d.x).y0(d => d.max).y1(d => d.y)

  createLine = d3.line().x(d => d.x).y(d => d.y)

  get padded() {
    const width = this.svgWidth - this.margin.left - this.margin.right;
    const height = this.svgHeight - this.margin.top - this.margin.bottom;

    return { width, height };
  }

  get scaledHover() {
    let x;
    let y;

    if (this.scales.x) {
      x = round(this.scales.x.invert(this.hoverPoint.x), 3);
      y = round(this.scales.y.invert(this.hoverPoint.y), 3);
    }

    return { x, y };
  }

  mounted() {
    this.drawChart();
    this.update();
  }

  drawChart() {
    const { width, height } = this.padded;

    this.scales.x = d3.scaleLinear().range([0, width]);
    this.scales.y = d3.scaleLinear().range([height, 0]);
  }

  update() {
    this.scales.x.domain(d3.extent(this.data, d => d.x));
    this.scales.y.domain([0, this.ceil]);

    const xAxis = d3.axisBottom().scale(this.scales.x);
    const yAxis = d3.axisLeft().scale(this.scales.y);
    const yFloor = this.scales.y(0);

    this.points = this.data.map(d => ({
      x: this.scales.x(d.x),
      y: this.scales.y(d.y),
      max: yFloor,
    }));

    this.paths.area = this.createArea(this.points);
    this.paths.line = this.createLine(this.points);

    this.updateAxis(xAxis, yAxis);
  }

  updateAxis(xAxis, yAxis) {
    d3.select(this.$refs.xAxis).call(xAxis);
    d3.select(this.$refs.yAxis).call(yAxis);
  }

  handleMousemove({ offsetX, offsetY }) {
    if (this.points.length > 0) {
      const x = offsetX - this.margin.left;
      const y = offsetY - this.margin.top;
      const closestPoint = this.getClosestPoint(x, y);

      if (this.lastHoverPoint.index !== closestPoint.index) {
        this.hoverPoint.x = closestPoint.x;
        this.hoverPoint.y = closestPoint.y;

        this.lastHoverPoint = closestPoint;
      }
    }
  }

  getClosestPoint(x, y) {
    return this.points
      .map((point, index) => ({
        x: point.x,
        y: point.y,
        distance: euclideanDistance([x, y], [point.x, point.y]),
        index,
      }))
      .reduce((min, next) => (min.distance < next.distance ? min : next));
  }
}
</script>

<style lang="scss">
$highlight: #f56c6c;
$highlight-fill: rgba(245, 108, 108, .2);

.area {
  fill: $highlight-fill;
}

.axis {
  .label {
    fill: black;
  }
}

.line {
  stroke: $highlight;
  stroke-width: 1px;
  fill: none;
}

.selector {
  fill: $highlight;
}

.selector-label {
  text-anchor: middle;
}
</style>
