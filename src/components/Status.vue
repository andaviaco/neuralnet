<template lang="html">
  <div class="status-info">
    <el-tag type="info">Épocas: {{ neuronEpoch }}</el-tag>
    <el-tag :type="statusColorType">Estado: {{ neuronStatus }}</el-tag>
  </div>
</template>

<script>
import Component from 'vue-class-component';

import { statusColorMap } from '../const';

@Component
export default class Plot {
  get neuronStatus() {
    return this.$store.state.neuronStatus;
  }

  get neuronEpoch() {
    return this.$store.state.neuronEpoch;
  }

  get statusColorType() {
    return statusColorMap[this.neuronStatus];
  }
}
</script>

<style lang="scss">
.el-tag {
  margin-right: 0.5em;
}
</style>
