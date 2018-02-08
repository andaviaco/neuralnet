<template lang="html">
  <div class="status-info">
    <el-tag type="info">Epocas: 0</el-tag>
    <el-tag type="success">Estado: {{ perceptronStatus }}</el-tag>
  </div>
</template>

<script>
import Component from 'vue-class-component';

@Component
export default class Plot {
  get perceptronStatus() {
    return this.$store.state.perceptronStatus;
  }
}
</script>

<style lang="scss">
.el-tag {
  margin-right: 0.5em;
}
</style>
