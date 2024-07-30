<template>
  <div :class="props.showLabel ? 'colNumBox' : 'colNumBox center'">
    <div>{{ props.labelNum }}</div>
    <div class="compareBox" v-if="props.showLabel">
      <span class="label">{{ props.label + " " }}</span>
      <span class="compareNum">
        {{ props.compareNum > 0 ? `+${props.compareNum}` : props.compareNum }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
export interface IColNumProps {
  label?: string;
  showLabel?: boolean;
  labelNum: number;
  compareNum: number;
}

const props = withDefaults(defineProps<IColNumProps>(), {
  label: "较昨日",
  showLabel: true
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
.colNumBox {
  height: 30px;
  line-height: 30px;
  text-align: center;
  .compareBox {
    font-size: 12px;
    .label {
      color: #ccc;
    }
    .compareNum {
      color: v-bind(color);
    }
  }
}
.center {
  position: relative;
  top: 16px;
}
</style>
