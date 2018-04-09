<template>
  <section>
    <h1>Redes Neuronales: Adeline</h1>

    <el-row>
      <el-col :span="12">
        <Plot />
      </el-col>

      <el-col :span="12">
        <SetupForm
          @startPerceptronTraining="handlePerceptronTrainingStart"
          @startAdalineTraining="handleAdalineTrainingStart"
          @startMlnTraining="handleMlnTrainingStart"
        />
      </el-col>
    </el-row>
  </section>
</template>

<script>
import Component from 'vue-class-component';
import SetupForm from './SetupForm.vue';
import Plot from './Plot.vue';
import { rangePairs } from '../lib';

import {
  ACTIVATE_LOADING,
  DEACTIVATE_LOADING,
  CLEAR_TRAINING,
  UPPER_SCALE_DOMAIN,
  LOWER_SCALE_DOMAIN,
} from '../store';

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

    this.$store.commit(CLEAR_TRAINING);

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

    this.$store.commit(ACTIVATE_LOADING);
    this.$store.commit(CLEAR_TRAINING);

    this.$store.dispatch('setAdaline', {
      learningRate,
      maxEpoch,
      desiredError,
    });

    const isTrained = await this.$store.dispatch('trainAdaline', {
      inputs: pointAsArrays,
    });

    this.$store.commit(DEACTIVATE_LOADING);

    if (!isTrained) {
      this.notifyTrainingFailure();
    }
  }

  async handleMlnTrainingStart() {
    const {
      learningRate,
      maxEpoch,
      desiredError,
      mlnHiddenLayers,
      mlnLayerNeurones,
    } = this.$store.state;
    const { discretePointAsArrays } = this.$store.getters;

    this.$store.commit(CLEAR_TRAINING);

    this.$store.dispatch('setMLN', {
      hiddenLayers: mlnHiddenLayers,
      layerNeurones: mlnLayerNeurones,
    });

    const isTrained = await this.$store.dispatch('trainMLN', {
      inputs: discretePointAsArrays,
      learningRate,
      maxEpoch,
      desiredError,
    });

    console.log('isTrained', isTrained);

    if (isTrained) {
      const pairs = rangePairs(UPPER_SCALE_DOMAIN, LOWER_SCALE_DOMAIN, -0.25);

      this.$store.dispatch('fillClassifiedArea', pairs);
    } else {
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
