<template>
  <section>
    <h1>Redes Neuronales: Perceptrón</h1>

    <el-row>
      <el-col :span="12">
        <Plot />
      </el-col>

      <el-col :span="12">
        <SetupForm
          @startPerceptronTraining="handlePerceptronTrainingStart"
          @startAdalineTraining="handleAdalineTrainingStart"
        />
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
  async handlePerceptronTrainingStart() {
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
      this.notifyTrainingFailure();
    }
  }

  async handleAdalineTrainingStart() {
    const { learningRate, maxEpoch, desiredError } = this.$store.state;
    const { pointAsArrays } = this.$store.getters;

    this.$store.dispatch('setAdaline', {
      learningRate,
      maxEpoch,
      desiredError,
    });

    const isTrained = await this.$store.dispatch('trainAdaline', {
      inputs: pointAsArrays,
    });

    if (!isTrained) {
      this.notifyTrainingFailure();
    }
  }

  notifyTrainingFailure() {
    this.$message({
      message: 'No se encontró separación lineal.',
      type: 'warning',
    });
  }
}

</script>

<style>

</style>
