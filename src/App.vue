<template>
  <div id="app">
    <el-container>
      <el-main>
        <Main/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Main from './components/Main.vue';

export default {
  name: 'app',
  components: {
    Main,
  },
};
</script>

<style>

</style>
