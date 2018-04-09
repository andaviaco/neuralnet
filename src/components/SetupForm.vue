<template lang="html">
  <el-form label-position="top">
    <el-form-item label="Modelo">
      <el-form-item>
        <el-radio
          border
          label="perceptron"
          v-model="selectedModel"
        >Perceptrón</el-radio>

        <el-radio
          border
          label="adaline"
          v-model="selectedModel"
        >Adaline</el-radio>

        <el-radio
          border
          label="mln"
          v-model="selectedModel"
        >MLN</el-radio>
      </el-form-item>
    </el-form-item>

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

    <el-form-item label="Error deseado" v-if="showField('adaline', 'mln')">
      <el-slider
        :value="desiredError"
        :min="0.0001"
        :max="0.9999"
        :step="0.001"
        @input="handleDesiredErrorUpdate"
        show-input
      >
      </el-slider>
    </el-form-item>

    <el-form-item label="Épocas Maximas">
      <el-input-number
        :value="maxEpoch"
        :min="1"
        @change="handleMaxEpoch"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="Arquitectura" v-if="showField('mln')">
      <el-tooltip
        effect="dark"
        content="Capas ocultas"
        placement="bottom"
      >
        <el-input-number
          controls-position="right"
          :value="mlnHiddenLayers"
          :min="1"
          @change="handleHiddenLayers"
        ></el-input-number>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        content="Neuronas por capa"
        placement="bottom"
      >
        <el-input-number
          controls-position="right"
          :value="mlnLayerNeurones"
          :min="1"
          @change="handleLayerNeurones"
        ></el-input-number>
      </el-tooltip>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :loading="isLoading"
        @click="onTrainModel"
      >Entrenar</el-button>
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
  UPDATE_MLN_HIDDEN_LAYERS,
  UPDATE_MLN_LAYER_NEURONES,
} from '../store/index';

const FIELD_UPDATE_ACTION = {
  learningRate: UPDATE_LEARNING_RATE,
  maxEpoch: UPDATE_MAX_EPOCH,
  error: UPDATE_DESIRED_ERROR,
  mlnHiddenLayers: UPDATE_MLN_HIDDEN_LAYERS,
  mlnLayerNeurones: UPDATE_MLN_LAYER_NEURONES,
};

const MODEL_START_EVENT = {
  adaline: 'startAdalineTraining',
  perceptron: 'startPerceptronTraining',
  mln: 'startMlnTraining',
};


@Component
export default class SetupForm extends Vue {
  selectedModel = 'mln';

  get learningRate() {
    return this.$store.state.learningRate;
  }

  get maxEpoch() {
    return this.$store.state.maxEpoch;
  }

  get desiredError() {
    return this.$store.state.desiredError;
  }

  get mlnHiddenLayers() {
    return this.$store.state.mlnHiddenLayers;
  }

  get mlnLayerNeurones() {
    return this.$store.state.mlnLayerNeurones;
  }

  get isLoading() {
    return this.$store.state.loading;
  }

  handleUpdate(field, value) {
    // TODO: debounce update
    this.$store.commit(FIELD_UPDATE_ACTION[field], value);
  }

  handleLearningRateUpdate(value) {
    this.handleUpdate('learningRate', value);
  }

  handleMaxEpoch(value) {
    this.handleUpdate('maxEpoch', value);
  }

  handleDesiredErrorUpdate(value) {
    this.handleUpdate('error', value);
  }

  handleHiddenLayers(value) {
    this.handleUpdate('mlnHiddenLayers', value);
  }


  handleLayerNeurones(value) {
    this.handleUpdate('mlnLayerNeurones', value);
  }

  showField(...allowed) {
    return allowed.includes(this.selectedModel);
  }

  onTrainModel() {
    this.$emit(MODEL_START_EVENT[this.selectedModel]);
  }
}
</script>

<style lang="css">
</style>
