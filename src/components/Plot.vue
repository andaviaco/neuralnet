<template lang="html">
  <section>
    <Cartesian />
  </section>
</template>

<script>
import Component from 'vue-class-component';
import Cartesian from './Cartesian.vue';

@Component({
  components: {
    Cartesian,
  },
})
export default class Plot {

}
</script>

<style lang="scss">
</style>
