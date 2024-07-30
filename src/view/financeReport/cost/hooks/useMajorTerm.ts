import { computed, onMounted, ref } from "vue";
import { EchartsCardRef, LegendDataItem } from "../../../../types/common/Index";
import { getFinanceCostMajorTermMerge } from "../../../../api/financeReport";
import { majorTermItem } from "../../../../types/financeReport"
import http from "../../../../utils/http";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";

export default function useCostItem() {
  const currYear = new Date().getFullYear();
  const majorTermType = ref('1');

  const majorTermTabData = [
    { name: "1", label: "HWC" },
    { name: "2", label: "CS" },
    { name: "3", label: "PS" },
    { name: "4", label: "CDCE" }
  ];

  const majorTermLegendData = computed(() => (year: number): LegendDataItem<majorTermItem>[] => {
    return [
      { label: `${year - 1}费用`, key: "lastYearCost", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
      { label: `${year}费用`, key: "curYearCost", color: FINANCE_CHART_COLOR.GREEN, chartType: "bar" },
      { label: `${year - 1}费用率`, key: "lastYearCostRate", color: FINANCE_CHART_COLOR.BLUE, chartType: "line" },
      { label: `${year}费用率`, key: "curYearCostRate", color: FINANCE_CHART_COLOR.GREEN, chartType: "line" }
    ]
  })

  // const majorTermLegendData: LegendDataItem<majorTermItem>[] = [
  //   { label: "2021费用", key: "lastYearCost", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
  //   { label: "2022费用", key: "curYearCost", color: FINANCE_CHART_COLOR.GREEN, chartType: "bar" },
  //   { label: "2021费用率", key: "lastYearCostRate", color: FINANCE_CHART_COLOR.BLUE, chartType: "line" },
  //   { label: "2022费用率", key: "curYearCostRate", color: FINANCE_CHART_COLOR.GREEN, chartType: "line" }
  // ]

  const EChartsOption = computed(() => (data: majorTermItem[], year: number = currYear): echarts.EChartsOption => {
    const legendData = majorTermLegendData.value(year);
    return {
      legend: {
        left: "right",
        // data: new Map(Object.entries(majorTermData.value)).keys()
        data: legendData.map(b => b.label)
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
          yAxisIndex: l.chartType === "line" ? 1 : 0,
          itemStyle: {
            color: l.color
          },
          tooltip: {
            valueFormatter: (val: any) => `${val} ${l.chartType === "bar" ? "万元" : "%"}`
          },
          data: data.map((b: { [x: string]: any; }) => b[l.key])
        }
      })
    }
  });

  // 成本大项
  const majorTermData = ref<majorTermItem[]>([])
  const majorTermRef = ref<EchartsCardRef>();
  const majorTermOption = EChartsOption.value(majorTermData.value);

  // 人工成本
  const personData = ref<majorTermItem[]>([])
  const personRef = ref<EchartsCardRef>();
  const personOption = EChartsOption.value(personData.value);

  // 空间成本
  const spaceData = ref<majorTermItem[]>([])
  const spaceRef = ref<EchartsCardRef>();
  const spaceOption = EChartsOption.value(spaceData.value);
  // WIP
  const WIPData = ref<majorTermItem[]>([])
  const WIPRef = ref<EchartsCardRef>();
  const WIPOption = EChartsOption.value(WIPData.value);
  // 其他成本
  const otherData = ref<majorTermItem[]>([])
  const otherRef = ref<EchartsCardRef>();
  const otherOption = EChartsOption.value(otherData.value);

  const getMajorTermData = async (year: number, type: string, month: number) => {
    const res = await http.get(getFinanceCostMajorTermMerge, { params: { year, type, month } })
    majorTermData.value = res.data.big;
    majorTermRef.value?.updateChart(EChartsOption.value(majorTermData.value, year));
    personData.value = res.data.person;
    personRef.value?.updateChart(EChartsOption.value(personData.value, year));
    spaceData.value = res.data.space;
    spaceRef.value?.updateChart(EChartsOption.value(spaceData.value, year));
    WIPData.value = res.data.wip;
    WIPRef.value?.updateChart(EChartsOption.value(WIPData.value, year));
    otherData.value = res.data.other;
    otherRef.value?.updateChart(EChartsOption.value(otherData.value, year));
  }

  // onMounted(() => {
  //   getMajorTermData(currYear, majorTermType.value, currMonth)
  // })

  return {
    majorTermData,
    majorTermType,
    getMajorTermData,
    majorTermTabData,
    majorTermRef,
    majorTermOption,
    personRef,
    personOption,
    spaceRef,
    spaceOption,
    WIPRef,
    WIPOption,
    otherRef,
    otherOption,
  }
}