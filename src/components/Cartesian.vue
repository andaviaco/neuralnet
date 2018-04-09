<template lang="html">
  <svg class="cartesian" :width="svgWidth" :height="svgHeight" @click="clickCoord">
    <line
      v-for="(l, index) in lines"
      :key="index + l"
      :x1="l.x1"
      :y1="l.y1"
      :x2="l.x2"
      :y2="l.y2"
      :stroke="l.color"
      stroke-width="3"
      stroke-opacity="0.4"
    />

    <g
      ref="xAxis"
      class="axis axis--x"
      :style="{transform: `translate(0, ${svgHeight / 2}px)`}"
    />

    <g
      ref="yAxis"
      class="axis axis--y"
      :style="{transform: `translate(${svgWidth / 2}px, 0)`}"
    />

    <circle
      v-for="(p, index) in points"
      :key="index"
      :cx="p.x"
      :cy="p.y"
      :fill="p.color"
      r="5"
    />
  </svg>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';
import * as d3 from 'd3';

import { ADD_POINT } from '../store/index';
import {
  SVG_CARTESIAN_WIDTH,
  SVG_CARTESIAN_HEIGHT,
  SVG_CARTESIAN_PADDING,
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,
  TOOL_POINT_TYPE_1,
  TOOL_POINT_TYPE_2,
  TOOL_POINT_TYPE_3,
  pointTypeColorMap,
  toolPointTypeMap,
  lineTypecolorMap,
  NEURON_STATUS_TRAINED,
} from '../const';

const validPoints = [
  TOOL_POINT_TYPE_1,
  TOOL_POINT_TYPE_2,
  TOOL_POINT_TYPE_3,
];


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

  mounted() {
    this.drawPlain();
  }

  get points() {
    const { points } = this.$store.state;

    return points.map(p => ({
      x: this.xScale(p.x),
      y: this.yScale(p.y),
      color: pointTypeColorMap[p.type],
    }));
  }

  get lines() {
    const { lines } = this.$store.state;

    return lines.map(({ point1, point2, type }) => {
      const [x1, y1] = point1;
      const [x2, y2] = point2;

      return {
        x1: this.xScale(x1),
        y1: this.yScale(y1),
        x2: this.xScale(x2),
        y2: this.yScale(y2),
        color: lineTypecolorMap[type],
      };
    });
  }

  clickCoord({ offsetX, offsetY }) {
    const { selectedTool, neuronStatus } = this.$store.state;

    if (validPoints.includes(selectedTool)) {
      if (neuronStatus === NEURON_STATUS_TRAINED) {
        this.$store.dispatch('addUnclassifiedPoint', this.formatPoint(offsetX, offsetY));
      } else {
        this.storePoint(offsetX, offsetY, toolPointTypeMap[selectedTool]);
      }
    }
  }

  formatPoint(offsetX, offsetY, type) {
    return {
      x: this.xScale.invert(offsetX),
      y: this.yScale.invert(offsetY),
      type,
    };
  }

  storePoint(offsetX, offsetY, type) {
    const point = this.formatPoint(offsetX, offsetY, type);

    this.$store.commit(ADD_POINT, point);
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

    this.drawAxisGrid(xAxis, yAxis);
  }

  drawAxisGrid(xAxis, yAxis) {
    const xAxisPlot = d3.select(this.$refs.xAxis).call(xAxis);
    const yAxisPlot = d3.select(this.$refs.yAxis).call(yAxis);

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
