<template lang="html">
  <el-button-group>
    <el-button
      plain
      type="success"
      size="mini"
      icon="el-icon-circle-plus"
      :class="{ active: selected === tools.pointType2 }"
      @click="handleToolSelect(tools.pointType2)"
    />
    <el-button
      plain
      type="primary"
      size="mini"
      icon="el-icon-remove"
      :class="{ active: selected === tools.pointType1 }"
      @click="handleToolSelect(tools.pointType1)"
    />
    <el-button
      plain
      type="warning"
      size="mini"
      icon="el-icon-circle-close"
      :class="{ active: selected === tools.pointType3 }"
      @click="handleToolSelect(tools.pointType3)"
    />
  </el-button-group>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import {
  TOOL_POINT_TYPE_1,
  TOOL_POINT_TYPE_2,
  TOOL_POINT_TYPE_3,
  DEFAULT_TOOL,
} from '../const';

@Component()
export default class Tools extends Vue {
  selected = DEFAULT_TOOL;
  tools = {
    pointType1: TOOL_POINT_TYPE_1,
    pointType2: TOOL_POINT_TYPE_2,
    pointType3: TOOL_POINT_TYPE_3,
  };

  handleToolSelect(toolName) {
    this.$emit('selectTool', toolName);
    this.selected = toolName;
  }
}
</script>

<style lang="scss">
.el-button--success.is-plain.active {
  background: #5daf34;
  border-color: #5daf34;
  color: #fff;
  outline: 0;
}

.el-button--primary.is-plain.active {
  background: #409EFF;
  border-color: #409EFF;
  color: #fff;
}

.el-button--warning.is-plain.active {
  background: #E6A23C;
  border-color: #E6A23C;
  color: #fff;
}
</style>
