<template lang="html">
  <svg class="cartesian" :width="svgWidth" :height="svgHeight" @click="clickCoord">
    <g
      :id="xAxisId"
      class="axis axis--x"
      :transform="xAxisTransform"
    />

    <g
      :id="yAxisId"
      class="axis axis--y"
      :transform="yAxisTransform"
    />

    <circle
      v-for="(p, index) in points"
      :key="index"
      :cx="p.x"
      :cy="p.y"
      r="5"
      fill="purple"
    />

    <line x1="250" y1="250" x2="40" y2="40" stroke="gray" stroke-width="3" stroke-opacity="0.2" />
  </svg>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import * as d3 from 'd3';

import {
  SVG_CARTESIAN_WIDTH,
  SVG_CARTESIAN_HEIGHT,
  SVG_CARTESIAN_PADDING,
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,
} from '../const';


@Component
export default class Cartesian extends Vue {
  svgWidth = SVG_CARTESIAN_WIDTH;
  svgHeight = SVG_CARTESIAN_HEIGHT;
  svgPadding = SVG_CARTESIAN_PADDING;
  svgUpperDomain = UPPER_SCALE_DOMAIN;
  svgLowerDomain = LOWER_SCALE_DOMAIN;

  xAxisTransform = '';
  yAxisTransform = '';
  xScale = null;
  yScale = null;
  xAxisId = 'xAxis';
  yAxisId = 'yAxis';

  points = [];

  mounted() {
    this.drawPlain();
  }

  clickCoord({ offsetX, offsetY }) {
    this.points.push({ x: offsetX, y: offsetY });

    console.log('X:', offsetX, this.xScale.invert(offsetX));
    console.log('Y:', offsetY, this.yScale.invert(offsetY));
  }

  getScales() {
    const xScale = d3.scaleLinear()
      .domain([this.svgUpperDomain, this.svgLowerDomain])
      .range([this.svgWidth - this.svgPadding, this.svgPadding]);

    const yScale = d3.scaleLinear()
      .domain([this.svgLowerDomain, this.svgUpperDomain])
      .range([this.svgHeight - this.svgPadding, this.svgPadding]);

    return [xScale, yScale];
  }

  drawPlain() {
    const [xScale, yScale] = this.getScales();

    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    this.xScale = xScale;
    this.yScale = yScale;

    this.xAxisTransform = `translate(0, ${this.svgHeight / 2})`;
    this.yAxisTransform = `translate(${this.svgWidth / 2}, 0)`;

    this.drawAxisGrid(xAxis, yAxis);
  }

  drawAxisGrid(xAxis, yAxis) {
    const xAxisPlot = d3.select(`#${this.xAxisId}`).call(xAxis);
    const yAxisPlot = d3.select(`#${this.yAxisId}`).call(yAxis);

    const lineSize = (this.svgWidth - (2 * this.svgPadding)) / 2;
    const lineTop = lineSize;
    const lineBottom = -lineSize;

    xAxisPlot.selectAll('.tick line')
      .attr('y1', lineBottom)
      .attr('y2', lineTop);

    yAxisPlot.selectAll('.tick line')
      .attr('x1', lineBottom)
      .attr('x2', lineTop);
  }
}
</script>

<style lang="scss">

.axis path,
.axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}

.axis text {
  font-family: sans-serif;
  font-size: 11px;
}

.cartesian {
  cursor: crosshair;
}

.tick line {
  stroke: #59ADEB;
  opacity: 0.5;
}

g path.domain {
  stroke: #4F4F4F;
}
</style>
