<template>
  <div class="progressBox">
    <div class="progressOuter">
      <div class="progressInner"></div>
    </div>
    <div :class="`progressLabel ${props.labelClass}`">{{ content }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface IProgressProps {
  value: number;
  bgColor?: string;
  percentColor?: string;
  height?: number;
  labelWidth?: number;
  labelClass?: string;
  format?: (value: number) => string;
}
const props = withDefaults(defineProps<IProgressProps>(), {
  bgColor: "#EFF9FB",
  percentColor: "#46C3D1",
  height: 12,
  labelWidth: 50
});

const content = computed(() => {
  if (props.format) {
    return props.format(props.value);
  }
  return props.value;
});

const outerColor = computed(() => props.bgColor);
const innerColor = computed(() => props.percentColor);
const innerWidth = computed(
  () => `${Math.abs(props.value) < 100 ? Math.abs(props.value) : 100}%`
);
const pgHeight = computed(() => `${props.height}px`);
const radius = computed(() => `${props.height * 0.5}px`);
const labelWidth = computed(() => `${props.labelWidth}px`);
const progressInnerFloat = computed(
  () => `${props.value > 0 ? "left" : "right"}`
);
</script>

<style lang="less" scoped>
.progressBox {
  display: flex;
  .progressOuter {
    background-color: v-bind(outerColor);
    width: 100%;
    height: v-bind(pgHeight);
    border-radius: v-bind(radius);
    .progressInner {
      background-color: v-bind(innerColor);
      width: v-bind(innerWidth);
      height: v-bind(pgHeight);
      border-radius: v-bind(radius);
      animation: progress 1s;
      float: v-bind(progressInnerFloat);
    }
    @keyframes progress {
      from {
        width: 0;
      }
      to {
        width: v-bind(innerWidth);
      }
    }
  }
  .progressLabel {
    height: v-bind(pgHeight);
    line-height: v-bind(pgHeight);
    width: v-bind(labelWidth);
    font-size: v-bind(pgHeight);
    margin-left: 5px;
    position: relative;
  }
}
</style>
