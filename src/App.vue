<script setup lang="ts">
import useGetUrlToken from "./hooks/common/useGetUrlToken";
useGetUrlToken();
</script>

<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
