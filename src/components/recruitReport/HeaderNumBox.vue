<template>
  <div class="container">
    <div>{{ props.label }}</div>
    <div class="num">{{ props.labelNum }}</div>
    <div class="compareBox" v-if="props.showCompare">
      <span>{{ props.compareLabel + " " }}</span>
      <span class="compareSpan">
        <span>
          {{ props.compareNum > 0 ? `+${props.compareNum}` : props.compareNum }}
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface IHeaderNunBoxProps {
  label?: string;
  compareLabel?: string;
  labelNum: number;
  compareNum: number;
  showCompare?: boolean;
}
const props = withDefaults(defineProps<IHeaderNunBoxProps>(), {
  label: "今日推送量",
  compareLabel: "较昨日",
  labelNum: 0,
  compareNum: 0,
  showCompare: true
});

const color = computed(() => {
  if (props.compareNum > 0) {
    return "#2FC25B";
  } else if (props.compareNum < 0) {
    return "#F04864";
  } else {
    return "#F09C0C";
  }
});
</script>
<style lang="less" scoped>
.container {
  & > div {
    margin-bottom: 5px;
    font-size: 12px;
  }
  .num {
    font-size: 24px;
  }
  .compareBox {
    color: #ccc;
    .compareSpan {
      color: v-bind(color);
    }
  }
}
</style>
