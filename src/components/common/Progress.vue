<template>
  <div class="progressBox">
    <el-progress
      :percentage="percentage"
      :stroke-width="props.strokeWidth"
      :color="props.color"
      :format="props.format"
    >
      <template v-if="!props.format">
        <CountTo
          :duration="props.duration"
          :startVal="0"
          :endVal="props.percent"
          :decimals="props.decimals"
        />{{ props.unit }}
      </template>
    </el-progress>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import CountTo from "./CountTo.vue";
export interface IProgressProps {
  title?: string;
  label?: string;
  percent: number;
  timeSpeed?: number;
  needAnimation?: boolean;
  decimals?: number;
  duration?: number;
  unit?: string;
  color?: string;
  strokeWidth?: number;
  textWidth?: number;
  format?: (percentage: number) => string;
  slotLabel?: boolean;
}
const props = withDefaults(defineProps<IProgressProps>(), {
  timeSpeed: 24,
  needAnimation: true,
  decimals: 2,
  duration: 2000,
  unit: "%",
  slotLabel: false
});
const percentage = ref(0);
const updatePercentage = () => {
  // 没有动画效果，直接赋值
  if (!props.needAnimation) {
    percentage.value = props.percent;
    return;
  }
  const maxPercent = props.percent >= 100 ? 100 : props.percent;
  const timerId = setInterval(() => {
    if (percentage.value < maxPercent) {
      percentage.value++;
    } else {
      clearInterval(timerId);
      percentage.value = maxPercent;
    }
  }, props.timeSpeed);
};

const textWidth = computed(() => `${props.textWidth}px`);

onMounted(() => {
  updatePercentage();
});
</script>

<style lang="less" scoped>
.progressBox {
  :deep(.el-el-progress__text) {
    width: v-bind(textWidth);
  }
}
</style>
