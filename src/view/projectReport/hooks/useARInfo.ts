import { ref } from "vue";
import { EchartsCardRef, ITabDataItem, LegendDataItem } from "../../../types/common/Index";
import { ARInfoItem } from "../../../types/projectReport";

export default function useARInfo() {
  const arInfoTabs = ref<ITabDataItem[]>([
    { name: "1", label: "Billed AR" },
    { name: "2", label: "Unbilled AR" },
  ]);
  const arInfoTabName = ref("1");
  const arInfo1Option = ref<echarts.EChartsOption>();
  const arInfo1Ref = ref<EchartsCardRef>();
  const arInfo2Option = ref<echarts.EChartsOption>();
  const arInfo2Ref = ref<EchartsCardRef>();

  const buildOption = (
    data: ARInfoItem[],
    xAxisKey: "deptName" | "customName",
    title: string,
  ): echarts.EChartsOption => {
    const legendData: LegendDataItem<ARInfoItem>[] = arInfoTabName.value === "1"
      ? [
        { label: "未清项金额", key: "clearProjectCost", color: "#1890FF", chartType: "bar" },
        { label: "90天以上", key: "daysUp90", color: "#2FC25B", chartType: "bar" },
        { label: "180天以上", key: "daysUp180", color: "#FACC14", chartType: "bar" },
      ]
      : [
        { label: "未清项金额", key: "clearProjectCost", color: "#1890FF", chartType: "bar" },
        { label: "180天以上", key: "daysUp180", color: "#2FC25B", chartType: "bar" },
        { label: "一年以上", key: "daysUpYear", color: "#FACC14", chartType: "bar" },
      ]
    return {
      title: { text: title },
      legend: {
        data: legendData.map(l => l.label),
        left: "center",
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        },
        valueFormatter: val => `${val} 万元`
      },
      xAxis: {
        type: "category",
        data: data.map(d => d[xAxisKey]),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: 'value',
        name: '万元'
      },
      series: legendData.map(l => ({
        type: "bar",
        name: l.label,
        itemStyle: {
          color: l.color
        },
        data: data.map(d => d[l.key])
      }))
    }
  }

  const updateArInfoChart = (data: [ARInfoItem[], ARInfoItem[]]) => {
    arInfo1Option.value = buildOption(data[0], "deptName", "AR信息—BD/BU维度");
    arInfo1Ref.value?.updateChart(arInfo1Option.value);

    arInfo2Option.value = buildOption(data[1], "customName", "AR信息—客户维度");
    arInfo2Ref.value?.updateChart(arInfo2Option.value);
  }

  return {
    arInfoTabs,
    arInfoTabName,
    arInfo1Option,
    arInfo1Ref,
    arInfo2Option,
    arInfo2Ref,
    updateArInfoChart,
  }
}