<template lang="html">
  <section>
    <Cartesian />

    <Tools @selectTool="handleToolSelect"/>
  </section>
</template>

<script>
import Component from 'vue-class-component';
import Cartesian from './Cartesian.vue';
import Tools from './Tools.vue';

@Component({
  components: {
    Cartesian,
    Tools,
  },
})
export default class Plot {
  handleToolSelect(selectedTool) {
    console.log(selectedTool, this.ok);
  }
}
</script>

<style lang="scss">
</style>
