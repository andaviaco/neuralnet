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
import {
  ADD_LINE,
} from '../store/index';

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
    const untrainedLine = {
      point1: [10, perceptron.lineFn(10)],
      point2: [-10, perceptron.lineFn(-10)],
      type: 'untrained',
    };
    this.$store.commit(ADD_LINE, untrainedLine);

    const isTrained = await perceptron.startTraining(pointAsArrays, (epoch) => {
      console.log('progress', epoch);
    });

    console.log('result', isTrained);

    if (isTrained) {
      const trainedLine = {
        point1: [10, perceptron.lineFn(10)],
        point2: [-10, perceptron.lineFn(-10)],
        type: 'trained',
      };
      this.$store.commit(ADD_LINE, trainedLine);
      console.log('f(10)', trainedLine);
    }
  }
}

</script>

<style>

</style>
