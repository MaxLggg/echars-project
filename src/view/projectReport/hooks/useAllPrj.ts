import { ref } from "vue";
import { EchartsCardRef, ITabDataItem, LegendDataItem } from "../../../types/common/Index";
import { PrjBasicListItem, PrjGrossProfitItem } from "../../../types/projectReport";

export default function useAllPrj() {
  const allProjectTabsData = ref<ITabDataItem[]>([
    { name: "1", label: "项目总计" },
    { name: "2", label: "FP类项目" },
    { name: "3", label: "非FP类实施项目" },
    { name: "4", label: "D类项目" }
  ]);
  const allPrjBarLineOption = ref<echarts.EChartsOption>();
  const allPrjBarLineRef = ref<EchartsCardRef>();
  const allPrjBarLineTab = ref("1");
  function buildBarLineOption<T>(
    legendData: LegendDataItem<T>[],
    chartData: T[],
    xAxisKey: keyof T,
  ): echarts.EChartsOption {
    return {
      legend: {
        data: legendData.map(i => i.label),
        left: "right",
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      // @ts-ignore
      xAxis: {
        type: "category",
        data: chartData.map(i => i[xAxisKey]),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '个数',
          // min: 0,
          // max: 250,
          // interval: 50,
          // axisLabel: {
          //   formatter: '{value} ml'
          // }
        },
        {
          type: 'value',
          // name: '占比',
          // min: 0,
          // max: 25,
          // interval: 20,
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: legendData.map(i => {
        if (i.chartType === "bar") {
          return {
            data: chartData.map(d => d[i.key]),
            name: i.label,
            type: i.chartType,
            stack: 'bar',
            emphasis: {
              focus: "series"
            },
            tooltip: {
              valueFormatter: val => `${val} 个`
            },
            itemStyle: {
              color: i.color
            }
          }
        }
        return {
          data: chartData.map(d => d[i.key]),
          name: i.label,
          type: i.chartType,
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: val => `${val} %`
          },
          itemStyle: {
            color: i.color
          }
        }
      })
    }
  }
  const updatePrjBarLineChart = (data: PrjBasicListItem[]) => {
    const legendData: LegendDataItem<PrjBasicListItem>[] = [
      { label: "待结项", key: "waitComplete", color: "#1890FF", chartType: "bar" },
      { label: "工作中", key: "working", color: "#2FC25B", chartType: "bar" },
      { label: "非正常终止", key: "notNormal", color: "#FACC14", chartType: "bar" },
      { label: "已结项", key: "completed", color: "#13C2C2", chartType: "bar" },
      { label: "应结项项目完成率", key: "completeRate", color: "#F04864", chartType: "line" },
      { label: "FP项目占比", key: "fpRate", color: "#8543E0", chartType: "line" },
    ]
    const legData = allPrjBarLineTab.value !== "1" ? legendData.filter(l => l.label !== "FP项目占比") : legendData;
    allPrjBarLineOption.value = buildBarLineOption<PrjBasicListItem>(legData, data, "deptName");
    allPrjBarLineRef.value?.updateChart(allPrjBarLineOption.value);
  }

  const prjGrossRateTabsData = ref<ITabDataItem[]>([
    { name: "1", label: "BD/BU维度" },
    { name: "2", label: "地域维度" },
    { name: "3", label: "PDU维度" }
  ]);

  const prjGrossRateBarLineOption = ref<echarts.EChartsOption>();
  const prjGrossRateBarLineRef = ref<EchartsCardRef>();

  const updatePrjGrossRateBarLineChart = (data: PrjGrossProfitItem[]) => {
    const legendData: LegendDataItem<PrjGrossProfitItem>[] = [
      { label: "0%-10%", key: "distribute10", color: "#1890FF", chartType: "bar" },
      { label: "10%-20%", key: "distribute20", color: "#2FC25B", chartType: "bar" },
      { label: "21%-29%", key: "distribute30", color: "#FACC14", chartType: "bar" },
      { label: "30%以上", key: "distribute40", color: "#13C2C2", chartType: "bar" },
      { label: "30%以下占比", key: "distributeRate", color: "#8543E0", chartType: "line" },
    ];
    prjGrossRateBarLineOption.value = buildBarLineOption(legendData, data, "deptName");
    prjGrossRateBarLineRef.value?.updateChart(prjGrossRateBarLineOption.value);
  }
  return {
    allPrjBarLineOption,
    allPrjBarLineRef,
    updatePrjBarLineChart,
    allProjectTabsData,
    prjGrossRateTabsData,
    prjGrossRateBarLineOption,
    prjGrossRateBarLineRef,
    updatePrjGrossRateBarLineChart,
    allPrjBarLineTab
  }
}