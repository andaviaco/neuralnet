<template lang="html">
  <el-form :model="config" label-position="top">
    <el-form-item label="Learning Rate">
      <el-slider
        v-model="config.learingRate"
        :min="0.01"
        :max="0.99"
        :step="0.01"
        show-input
      >
      </el-slider>
    </el-form-item>

    <el-form-item label="Épocas Maximas">
      <el-input-number
        v-model="config.maxEpoch"
        :min="1"
        :max="500"
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

import { DEFAULT_MAX_EPOCH, DEFAULT_LEARNING_RATE } from '../const';


@Component
export default class SetupForm extends Vue {
  config = {
    maxEpoch: DEFAULT_MAX_EPOCH,
    learingRate: DEFAULT_LEARNING_RATE,
  };

  onSubmit() {
    console.log(this.config);
  }
}
</script>

<style lang="css">
</style>
