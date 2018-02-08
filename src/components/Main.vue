<template>
  <section>
    <h1>Redes Neuronales</h1>
    <el-row>
      <el-col :span="12">
        <Cartesian />
      </el-col>
      <el-col :span="12">
        <SetupForm />
      </el-col>
    </el-row>
  </section>
</template>

<script>
import Component from 'vue-class-component';
import SetupForm from './SetupForm.vue';
import Cartesian from './Cartesian.vue';

@Component({
  components: {
    SetupForm,
    Cartesian,
  },
})
export default class Main {

}

</script>

<style>

</style>
