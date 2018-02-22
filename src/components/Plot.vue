<template lang="html">
  <section>
    <el-row>
      <el-col :span="24">
        <Tools @selectTool="handleToolSelect"/>
      </el-col>
    </el-row>

    <el-row justify="center" type="flex">
      <Cartesian />
    </el-row>

    <el-row>
      <el-col :span="24">
        <Status />
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <section class="chart-container">
          <h3>Mean Square Error</h3>
          <ErrorChart :data="errorPoints"/>
        </section>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import Component from 'vue-class-component';

import Cartesian from './Cartesian.vue';
import ErrorChart from './ErrorChart.vue';
import Tools from './Tools.vue';
import Status from './Status.vue';

import { UPDATE_SELECTED_TOOL } from '../store/index';

@Component({
  components: {
    Cartesian,
    Tools,
    Status,
    ErrorChart,
  },
})
export default class Plot {
  handleToolSelect(selectedTool) {
    this.$store.commit(UPDATE_SELECTED_TOOL, { tool: selectedTool });
  }

  get errorPoints() {
    const { errorLog } = this.$store.state;

    return errorLog.map(e => ({ x: e.epoch, y: e.error }));
  }
}
</script>

<style lang="scss">
.chart-container {
  margin-top: 1em;

  h3 {
    margin-bottom: 0;
  }
}
</style>
