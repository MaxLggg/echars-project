<template>
  <el-scrollbar :height="scrollHeight">
    <!-- <el-scrollbar> -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :collapse-transition="true"
      router
      @open="handleOpen"
      @close="handleClose"
    >
      <SubMenuItem />
    </el-menu>
  </el-scrollbar>
  <div class="collapseBox" @click="collapseChange">
    <template v-if="isCollapse">
      <el-icon :size="24" class="collapseIcon"> <Expand /> </el-icon>
    </template>
    <template v-else>
      <el-icon :size="24" class="collapseIcon"> <Fold /></el-icon>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Fold,
  Expand
} from "@element-plus/icons-vue";
import SubMenuItem from "./SubMenuItem.vue";

export interface LeftMenuProps {
  collapse?: boolean;
}
const props = withDefaults(defineProps<LeftMenuProps>(), {
  collapse: false
});

const emit = defineEmits<{
  (e: "toogle", data: boolean): void;
}>();

const isCollapse = ref(false);
const duration = computed(() => (isCollapse.value ? "0.3s" : "0.9s"));
const collapseChange = () => {
  isCollapse.value = !isCollapse.value;
  // emit("toogle", isCollapse.value);
  // setTimeout(() => {
  //   emit("toogle", isCollapse.value);
  // }, 200);
  if (isCollapse.value) {
    emit("toogle", isCollapse.value);
  } else {
    setTimeout(() => {
      emit("toogle", isCollapse.value);
    }, 300);
  }
};
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const innerHeight = ref(window.innerHeight);
const scrollHeight = computed(() => innerHeight.value - 48);
const collapseBoxWidth = computed(() => (isCollapse.value ? "54px" : "190px"));

const onResize = () => {
  innerHeight.value = window.innerHeight;
};

onMounted(() => {
  window.addEventListener("resize", onResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", onResize);
});
</script>

<style lang="less" scoped>
.collapseBox {
  position: fixed;
  bottom: 0;
  left: 10px;
  cursor: pointer;
  width: v-bind(collapseBoxWidth);
  height: 48px;
  line-height: 48px;
  .collapseIcon:hover {
    color: var(--el-color-primary);
  }
}
</style>
