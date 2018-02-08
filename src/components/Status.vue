<template lang="html">
  <div class="status-info">
    <el-tag type="info">Épocas: {{ perceptronEpoch }}</el-tag>
    <el-tag :type="statusColorType">Estado: {{ perceptronStatus }}</el-tag>
  </div>
</template>

<script>
import Component from 'vue-class-component';

import { statusColorMap } from '../const';

@Component
export default class Plot {
  get perceptronStatus() {
    return this.$store.state.perceptronStatus;
  }

  get perceptronEpoch() {
    return this.$store.state.perceptronEpoch;
  }

  get statusColorType() {
    return statusColorMap[this.perceptronStatus];
  }
}
</script>

<style lang="scss">
.el-tag {
  margin-right: 0.5em;
}
</style>
