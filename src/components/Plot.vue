<template lang="html">
  <section>
    <Tools @selectTool="handleToolSelect"/>
    <Cartesian />

    <Status />
  </section>
</template>

<script>
import Component from 'vue-class-component';

import Cartesian from './Cartesian.vue';
import Tools from './Tools.vue';
import Status from './Status.vue';

import { UPDATE_SELECTED_TOOL } from '../store/index';

@Component({
  components: {
    Cartesian,
    Tools,
    Status,
  },
})
export default class Plot {
  handleToolSelect(selectedTool) {
    this.$store.commit(UPDATE_SELECTED_TOOL, { tool: selectedTool });
  }
}
</script>

<style lang="scss">
</style>
