<template>
  <el-card shadow="hover">
    <div class="cardBox">
      <div class="cardLabel">{{ props.label }}</div>
      <div class="cardValue">
        <CountTo
          :duration="2000"
          :startVal="0"
          :endVal="props.value"
          :decimals="props.decimals"
        />
        <span>{{ props.unit }}</span>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import CountTo from "../common/CountTo.vue";
export interface ISimpleProps {
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
}
const props = withDefaults(defineProps<ISimpleProps>(), {
  decimals: 0,
  unit: "人"
});
</script>

<style lang="less" scoped>
.cardBox {
  // padding: 10px;
  font-size: 12px;
  background-color: #fff;
  .cardLabel {
    // font-size: 12px;
    color: #7b818f;
    margin-bottom: 10px;
  }
  .cardValue {
    & > span:first-child {
      font-size: 24px;
      margin-right: 5px;
    }
  }
}
</style>
