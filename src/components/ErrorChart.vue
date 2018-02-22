<template lang="html">
  <svg class="area-chart" :width="svgWidth" :height="svgHeight">
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
    </g>
  </svg>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import * as d3 from 'd3';

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

  createArea = d3.area().x(d => d.x).y0(d => d.max).y1(d => d.y)

  createLine = d3.line().x(d => d.x).y(d => d.y)

  get padded() {
    const width = this.svgWidth - this.margin.left - this.margin.right;
    const height = this.svgHeight - this.margin.top - this.margin.bottom;

    return { width, height };
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
}
</script>

<style lang="scss">
.area {
  fill: rgba(245, 108, 108, .2);
}

.axis {
  .label {
    fill: #000;
  }
}

.line {
  stroke: #f56c6c;
  stroke-width: 1px;
  fill: none;
}
</style>
