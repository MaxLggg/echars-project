<template>
  <div class="feeBox">
    <div>{{ props.label }}</div>
    <div>
      <CountTo
        :duration="2000"
        :startVal="0"
        :endVal="props.value"
        :decimals="2"
      />
      <span>元</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CountTo from "../common/CountTo.vue";
export interface IFeeCardProps {
  label: string;
  value: number;
  color?: string;
}
const props = defineProps<IFeeCardProps>();
const numColor = computed(() => props.color);
</script>
<style lang="less" scoped>
.feeBox {
  font-size: 12px;
  & > div:first-child {
    color: #7b818f;
  }
  & > div:last-child {
    span:first-child {
      color: v-bind(numColor);
      font-size: 24px;
      margin-right: 5px;
    }
  }
}
</style>
