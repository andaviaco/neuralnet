<template>
  <section>
    <h1>Redes Neuronales</h1>
    <el-row>
      <el-col :span="12">
        <Plot />
      </el-col>
      <el-col :span="12">
        <SetupForm />
      </el-col>
    </el-row>
  </section>
</template>

<script>
import Component from 'vue-class-component';
import SetupForm from './SetupForm.vue';
import Plot from './Plot.vue';

@Component({
  components: {
    SetupForm,
    Plot,
  },
})
export default class Main {

}

</script>

<style>

</style>
