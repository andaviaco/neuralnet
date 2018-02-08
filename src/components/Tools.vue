<template lang="html">
  <el-button-group>
    <el-button
      type="success"
      icon="el-icon-circle-plus-outline"
      :disabled="selected === tools.pointType2"
      @click="handleToolSelect(tools.pointType2)"
    />
    <el-button
      type="primary"
      icon="el-icon-remove-outline"
      :disabled="selected === tools.pointType1"
      @click="handleToolSelect(tools.pointType1)"
    />
  </el-button-group>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import {
  TOOL_POINT_TYPE_1,
  TOOL_POINT_TYPE_2,
  DEFAULT_TOOL,
} from '../const';

@Component()
export default class Tools extends Vue {
  selected = DEFAULT_TOOL;
  tools = {
    pointType1: TOOL_POINT_TYPE_1,
    pointType2: TOOL_POINT_TYPE_2,
  };

  handleToolSelect(toolName) {
    this.$emit('selectTool', toolName);
    this.selected = toolName;
  }
}
</script>

<style lang="scss">
</style>
