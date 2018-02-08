<template>
  <section>
    <h1>Redes Neuronales: Perceptrón</h1>

    <el-row>
      <el-col :span="12">
        <Plot />
      </el-col>
      <el-col :span="12">
        <SetupForm @startTraining="handleTrainingStart"/>
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
  async handleTrainingStart() {
    const { learningRate, maxEpoch } = this.$store.state;
    const { pointAsArrays } = this.$store.getters;

    this.$store.dispatch('setPerceptron', {
      learningRate,
      maxEpoch,
    });

    const isTrained = await this.$store.dispatch('trainPerceptron', {
      inputs: pointAsArrays,
    });

    if (!isTrained) {
      this.$message({
        message: 'No se encontró separación lineal.',
        type: 'warning',
      });
    }
  }
}

</script>

<style>

</style>
