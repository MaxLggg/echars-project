import { computed, onMounted, ref } from "vue";
import { EchartsCardRef, LegendDataItem } from "../../../../types/common/Index";
import { getFinanceCostRate } from "../../../../api/financeReport";
import { costRateItem } from "../../../../types/financeReport"
import http from "../../../../utils/http";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";

export default function useCostRate() {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth() - 1;
  const costRateType = ref('1');

  const costRateTabData = [
    { name: "1", label: "HWC" },
    { name: "2", label: "CS" },
    { name: "3", label: "PS" },
    { name: "4", label: "CDCE" }
  ];

  const costRateLegendData: LegendDataItem<costRateItem>[] = [
    { label: "基线", key: "baseLine", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
    { label: "费用率", key: "costRate", color: FINANCE_CHART_COLOR.GREEN, chartType: "bar" }
  ]

  const EChartsOption = computed(() => (data: costRateItem[]): echarts.EChartsOption => {
    return {
      legend: {
        left: "right",
        data: costRateLegendData.map(b => b.label)
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
        data: data.map((b: { item: string; }) => b.item)
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
      ],
      series: costRateLegendData.map(l => {
        return {
          name: l.label,
          type: l.chartType,
          itemStyle: {
            color: l.color
          },
          tooltip: {
            valueFormatter: (val: any) => `${val}%`
          },
          data: data.map((b: { [x: string]: any; }) => b[l.key])
        }
      })
    }
  });

  // 整体费用率
  const wholeData = ref<costRateItem[]>([])
  const wholeRef = ref<EchartsCardRef>();
  const wholeOption = EChartsOption.value(wholeData.value);

  // 管理费用率
  const manageData = ref<costRateItem[]>([])
  const manageRef = ref<EchartsCardRef>();
  const manageOption = EChartsOption.value(manageData.value);

  // 研发费用率
  const developData = ref<costRateItem[]>([])
  const developRef = ref<EchartsCardRef>();
  const developOption = EChartsOption.value(developData.value);
  // 销售费用率
  const saleData = ref<costRateItem[]>([])
  const saleRef = ref<EchartsCardRef>();
  const saleOption = EChartsOption.value(saleData.value);

  const getCostRateData = async (year: number, type: string, month: number) => {
    const res = await http.get(getFinanceCostRate, { params: { year, type, month } })
    wholeData.value = res.data.whole;
    wholeRef.value?.updateChart(EChartsOption.value(wholeData.value));
    manageData.value = res.data.manage;
    manageRef.value?.updateChart(EChartsOption.value(manageData.value));
    developData.value = res.data.develop;
    developRef.value?.updateChart(EChartsOption.value(developData.value));
    saleData.value = res.data.sale;
    saleRef.value?.updateChart(EChartsOption.value(saleData.value));
  }

  // onMounted(() => {
  //   getCostRateData(currYear, costRateType.value, currMonth)
  // })

  return {
    costRateType,
    getCostRateData,
    costRateTabData,
    wholeRef,
    wholeOption,
    manageRef,
    manageOption,
    developRef,
    developOption,
    saleRef,
    saleOption,
  }
}