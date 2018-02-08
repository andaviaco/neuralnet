<template>
  <section>
    <h1>Redes Neuronales</h1>
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

import Perceptron from '../models/Perceptron';

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
    const perceptron = new Perceptron(learningRate, maxEpoch);

    const isTrained = await perceptron.startTraining(pointAsArrays, (epoch) => {
      console.log('progress', epoch);
    });

    console.log('result', isTrained);

    if (isTrained) {
      console.log('f(10)', perceptron.lineFn(10));
      console.log('f(-10)', perceptron.lineFn(-10));
    }
  }
}

</script>

<style>

</style>
