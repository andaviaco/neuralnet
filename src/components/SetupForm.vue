<template lang="html">
  <el-form label-position="top">
    <el-form-item label="Learning Rate">
      <el-slider
        :value="learningRate"
        :min="0.001"
        :max="0.999"
        :step="0.01"
        @input="handleLearningRateUpdate"
        show-input
      >
      </el-slider>
    </el-form-item>

    <el-form-item label="Error deseado">
      <el-slider
        :value="desiredError"
        :min="0.0001"
        :max="0.9999"
        :step="0.01"
        @input="handleDesiredErrorUpdate"
        show-input
      >
      </el-slider>
    </el-form-item>

    <el-form-item label="Épocas Maximas">
      <el-input-number
        :value="maxEpoch"
        :min="1"
        @input="handleMaxEpoch"
      ></el-input-number>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onTrainPerceptron" plain>Train Perceptron</el-button>
      <el-button type="success" @click="onTrainAdaline" plain>Train Adaline</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

import {
  UPDATE_LEARNING_RATE,
  UPDATE_MAX_EPOCH,
  UPDATE_DESIRED_ERROR,
} from '../store/index';


@Component
export default class SetupForm extends Vue {
  get learningRate() {
    return this.$store.state.learningRate;
  }

  get maxEpoch() {
    return this.$store.state.maxEpoch;
  }

  get desiredError() {
    return this.$store.state.desiredError;
  }

  handleLearningRateUpdate(value) {
    // TODO: debounce update
    this.$store.commit(UPDATE_LEARNING_RATE, { learningRate: value });
  }

  handleMaxEpoch(value) {
    // TODO: debounce update
    this.$store.commit(UPDATE_MAX_EPOCH, { maxEpoch: value });
  }

  handleDesiredErrorUpdate(value) {
    // TODO: debounce update
    this.$store.commit(UPDATE_DESIRED_ERROR, { error: value });
  }

  onTrainPerceptron() {
    this.$emit('startPerceptronTraining');
  }

  onTrainAdaline() {
    this.$emit('startAdalineTraining');
  }
}
</script>

<style lang="css">
</style>
