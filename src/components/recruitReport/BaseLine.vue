<template>
  <div class="baseLineBox">
    <div v-for="(item, index) in props.data" :key="index" class="baseBox">
      <div class="itemBox">
        <div class="dayBox">{{ item.consumingDay }}</div>
        <div class="arrowBox"></div>
        <div class="lineBox"></div>
        <div class="labelBox">
          {{ item.stageName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StageListItem } from "../../types/recruitReport";

export interface IBaseLineProps {
  data: StageListItem[];
}

const props = defineProps<IBaseLineProps>();
</script>
<style lang="less" scoped>
.baseLineBox {
  display: flex;
  .baseBox {
    .itemBox {
      .dayBox {
        text-align: center;
      }
    }
  }
}
</style>
