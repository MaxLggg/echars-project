import { computed, onMounted, ref } from "vue";
import { EchartsCardRef, LegendDataItem } from "../../../../types/common/Index";
import { getFinanceCapitaCost } from "../../../../api/financeReport";
import { capitaCostItem } from "../../../../types/financeReport"
import http from "../../../../utils/http";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";

export default function useCostItem() {
  const currYear = new Date().getFullYear();
  const capitaCostType = ref('1');

  const capitaCostTabData = [
    { name: "1", label: "HWC" },
    { name: "2", label: "CS" },
    { name: "3", label: "PS" },
    { name: "4", label: "CDCE" }
  ];

  const legendData: LegendDataItem<capitaCostItem>[] = [
    { label: "实施人均成本", key: "capitaCost", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
    { label: "较1月增长率", key: "riseRate", color: FINANCE_CHART_COLOR.GREEN, chartType: "line" }
  ]

  const capitaCostData = ref<capitaCostItem[]>([])
  const capitaCostRef = ref<EchartsCardRef>();
  const capitaCostOption = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        left: "right",
        data: legendData.map(l => l.label)
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
      },
      xAxis: {
        type: "category",
        axisPointer: {
          type: "shadow"
        },
        data: capitaCostData.value.map(b => b.month + '月')
      },
      yAxis: [
        {
          type: "value",
          name: "万元"
        },
        {
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
      ],
      series: legendData.map(l => {
        return {
          name: l.label,
          type: l.chartType,
          itemStyle: {
            color: l.color
          },
          yAxisIndex: l.chartType === "line" ? 1 : 0,
          tooltip: {
            valueFormatter: val => `${val} ${l.chartType === "bar" ? "万元" : "%"}`
          },
          data: capitaCostData.value.map(b => b[l.key])
        }
      })
    }
  })

  const HCChartData = ref<capitaCostItem[]>([])
  const HCChartRef = ref<EchartsCardRef>();
  const HCChartOption = computed<echarts.EChartsOption>(() => {
    return {
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        },
      },
      xAxis: {
        type: "category",
        axisPointer: {
          type: "shadow"
        },
        data: capitaCostData.value.map(b => b.month + '月')
      },
      yAxis: {},
      series: {
        type: "bar",
        itemStyle: {
          color: FINANCE_CHART_COLOR.BLUE
        },
        data: capitaCostData.value.map(b => b.hc)
      }
    }
  })



  const getCapitaCostData = async (year: number, type: string) => {
    const res = await http.get(getFinanceCapitaCost, { params: { year, type } })
    capitaCostData.value = res.data;
    capitaCostRef.value?.updateChart(capitaCostOption.value);
    HCChartRef.value?.updateChart(HCChartOption.value);
  }

  // onMounted(() => {
  //   getCapitaCostData(currYear, capitaCostType.value)
  // })

  return {
    capitaCostData,
    capitaCostType,
    capitaCostRef,
    capitaCostOption,
    getCapitaCostData,
    capitaCostTabData,
    HCChartData,
    HCChartRef,
    HCChartOption
  }
}