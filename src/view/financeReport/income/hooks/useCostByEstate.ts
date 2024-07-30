import { computed, onMounted, ref } from "vue";
import { EchartsCardRef, LegendDataItem } from "../../../../types/common/Index";
import { getFinanceCostByEstate } from "../../../../api/financeReport";
import { costByEstateItem } from "../../../../types/financeReport"
import http from "../../../../utils/http";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";

export default function useCostByEstate() {
  const currYear = new Date().getFullYear()
  const costByEstateType = ref('1');

  const costByEstateTabData = [
    { name: "1", label: "HWC" },
    { name: "2", label: "CS" },
    { name: "3", label: "PS" },
    { name: "4", label: "CDCE" },
  ];

  const legendData: LegendDataItem<costByEstateItem>[] = [
    { label: "BPO", key: "valueBPO", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
    { label: "数字服务", key: "valueNumber", color: FINANCE_CHART_COLOR.GREEN, chartType: "bar" },
    { label: "ITO", key: "valueITO", color: FINANCE_CHART_COLOR.YELLOW, chartType: "bar" },
    { label: "BPO收入占比", key: "rateBPO", color: FINANCE_CHART_COLOR.BLUE, chartType: "line" },
    { label: "数字服务占比", key: "rateNumber", color: FINANCE_CHART_COLOR.GREEN, chartType: "line" },
    { label: "ITO收入占比", key: "rateITO", color: FINANCE_CHART_COLOR.YELLOW, chartType: "line" },
  ]

  const costByEstateData = ref<costByEstateItem[]>([])
  const costByEstateRef = ref<EchartsCardRef>()
  const costByEstateOption = computed<echarts.EChartsOption>(() => {
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
        data: costByEstateData.value.map(b => b.month + '月')
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
          data: costByEstateData.value.map(b => b[l.key])
        }
      })
    }
  })

  const getCostByEstateData = async (year: number, type: string) => {
    const res = await http.get(getFinanceCostByEstate, { params: { year, type } })
    costByEstateData.value = res.data;
    costByEstateRef.value?.updateChart(costByEstateOption.value);
  }

  // onMounted(() => {
  //   getCostByEstateData(currYear, costByEstateType.value)
  // })

  return {
    costByEstateData,
    costByEstateType,
    costByEstateRef,
    costByEstateOption,
    getCostByEstateData,
    costByEstateTabData
  }
}