<template>
  <div class="simpleCardBox">
    <div class="label">{{ props.data.label }}</div>
    <div class="value">
      <!-- <span>{{ props.data.value }}</span> -->
      <CountTo
        :duration="2000"
        :startVal="0"
        :endVal="props.data.value"
        :decimals="2"
        separator=","
      />
      <span>万</span>
    </div>
    <div class="progress" :style="`background-color:${props.data.bgColor}`">
      {{ props.data.percent }}%
    </div>
  </div>
</template>

<script setup lang="ts">
import CountTo from "../common/CountTo.vue";
import { computed } from "vue";
import { OperateSimpleCardData } from "../../types/operation/Index";

export interface ISimpleCardProps {
  data: OperateSimpleCardData;
}

const props = defineProps<ISimpleCardProps>();
const boxWidth = computed(() => {
  return `${props.data.bgWidth < 5 ? 5 : props.data.bgWidth}%`;
});
</script>

<style lang="less" scoped>
.simpleCardBox {
  margin-right: 5px;
  width: v-bind(boxWidth);
  .label {
    font-size: 12px;
    margin-bottom: 10px;
    color: #7b818f;
  }
  .value {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 10px;
    & > span:first-child {
      font-size: 24px;
      margin-right: 2px;
    }
    // & > span:last-child {
    //   color: #7b818f;
    // }
  }
  @keyframes progress {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  .progress {
    text-align: center;
    color: #fff;
    height: 24px;
    line-height: 24px;
    animation: progress 1s;
  }
}
</style>
