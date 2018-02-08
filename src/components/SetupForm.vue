<template lang="html">
  <el-form label-position="top">
    <el-form-item label="Learning Rate">
      <el-slider
        :value="learningRate"
        :min="0.01"
        :max="0.99"
        :step="0.01"
        @input="handleLearningRateUpdate"
        show-input
      >
      </el-slider>
    </el-form-item>

    <el-form-item label="Épocas Maximas">
      <el-input-number
        :value="maxEpoch"
        :min="1"
        :max="500"
        @input="handleMaxEpoch"
      ></el-input-number>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Entrenar</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

// import { DEFAULT_MAX_EPOCH, DEFAULT_LEARNING_RATE } from '../const';
import { UPDATE_LEARNING_RATE, UPDATE_MAX_EPOCH } from '../store/index';


@Component
export default class SetupForm extends Vue {
  get learningRate() {
    return this.$store.state.learningRate;
  }

  get maxEpoch() {
    return this.$store.state.maxEpoch;
  }

  handleLearningRateUpdate(value) {
    // TODO: debounce update
    this.$store.commit(UPDATE_LEARNING_RATE, { learningRate: value });
  }

  handleMaxEpoch(value) {
    // TODO: debounce update
    this.$store.commit(UPDATE_MAX_EPOCH, { maxEpoch: value });
  }

  onSubmit() {
    console.log(this.maxEpoch, 'startTraining');
  }
}
</script>

<style lang="css">
</style>
