<template>
  <el-icon :color="props.color" :class="props.className" :size="props.size">
    <opportunity />
  </el-icon>
</template>

<script setup lang="ts">
export interface ILampIconProps {
  color?: string;
  size?: number;
  className?: string;
}
const props = defineProps<ILampIconProps>();
</script>
