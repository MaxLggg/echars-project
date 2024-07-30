<template>
  <div class="circleBox">
    <div class="label" v-if="props.label">
      <span>46.7%</span>
      <div class="line"></div>
      <span>{{ props.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
export interface ICircleProps {
  radius?: number;
  color?: string;
  label?: string;
}
const props = withDefaults(defineProps<ICircleProps>(), {
  radius: 200,
  color: "red"
});

const radius = computed(() => `${props.radius}px`);
const color = computed(() => props.color);
const labelRight = computed(() => `-${props.radius + 20}px`);
const labelLineRight = computed(() => `${props.radius / 2 + 10}px`);
const labelLineWidth = computed(() => `${props.radius / 2}px`);
</script>

<style lang="less" scoped>
.circleBox {
  width: v-bind(radius);
  height: v-bind(radius);
  border-radius: 50%;
  background-color: v-bind(color);
  .label {
    position: relative;
    right: v-bind(labelRight);
    top: 20px;
    .line {
      height: 1px;
      width: v-bind(labelLineWidth);
      background-color: #000;
      position: relative;
      top: -10px;
      right: v-bind(labelLineRight);
    }
  }
}
</style>
