<template>
  <div class="homeBox">
    <el-space :size="10" spacer="|">
      <span v-for="r in allRoutes" :key="r.name">
        <router-link :to="r.path">
          {{ r.meta && r.meta.name }}
        </router-link>
      </span>
    </el-space>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { HIDE_ROUTES } from "../../constants";
const router = useRouter();
const allRoutes = computed(() =>
  router.options.routes
    .filter(r => !HIDE_ROUTES.includes(r.path))
    .map(r => {
      if (r.path === "/login") {
        r.name = "Logout";
      }
      return r;
    })
);
</script>

<style lang="less" scoped>
.homeBox {
  margin-top: 15%;
  display: flex;
  justify-content: center;
}
</style>
