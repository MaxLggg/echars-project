<template>
  <template v-if="props.cardMode">
    <el-card shadow="hover">
      <div
        :id="props.chartName + 'Chart'"
        :style="`height:${props.height || 200}px`"
      ></div>
    </el-card>
  </template>
  <template v-else>
    <div
      :id="props.chartName + 'Chart'"
      :style="`height:${props.height}px`"
    ></div>
  </template>
</template>

<script setup lang="ts">
import { nextTick, onMounted, toRaw } from "vue";
import * as echarts from "echarts";

export interface IPieChartProps {
  chartName: string;
  option: any;
  height?: number;
  cardMode?: boolean;
}

const props = withDefaults(defineProps<IPieChartProps>(), {
  height: 200,
  cardMode: true,
  option: {
    tooltip: {
      show: true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#4E576A"
        }
      }
    }
  }
});

let chart: echarts.ECharts | null = null;

const updateChart = (option: echarts.EChartsOption) => {
  chart && chart.setOption(toRaw(option), true);
};

const getEchartsInstance = () => chart;

onMounted(() => {
  nextTick(() => {
    chart = echarts.init(document.getElementById(props.chartName + "Chart")!);
    chart.setOption(toRaw(props.option), true);
    // updateChart(props.option);
  });
});

defineExpose({ updateChart, getEchartsInstance });
</script>
