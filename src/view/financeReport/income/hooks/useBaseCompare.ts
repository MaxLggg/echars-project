import { computed, onMounted, ref } from "vue";
import { getFinanceCostComparison } from "../../../../api/financeReport";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";
import { EchartsCardRef } from "../../../../types/common/Index";
import { BaseCompareListItem } from "../../../../types/financeReport";
import http from "../../../../utils/http";

export default function useBaseCompare() {
  // 1: HWC   2: CS   3：PS  4:CDCE
  const baseCompareTab = ref("1");

  const baseCompareTabData = [
    { name: "1", label: "HWC" },
    { name: "2", label: "CS" },
    { name: "3", label: "PS" },
    { name: "4", label: "CDCE" },
  ];

  const baseList = ref<BaseCompareListItem[]>([]);
  const baseCompareBarLineRef = ref<EchartsCardRef>();
  const baseCompareBarLineOption = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        left: "center",
        data: ["收入", "基线值"]
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
        axisPointer: {
          type: "shadow"
        },
        data: baseList.value.map(b => `${b.month}月`)
      },
      yAxis: [
        { type: "value", name: "万元" },
        { type: "value", name: "万元" },
      ],
      series: [
        {
          type: "bar",
          name: "收入",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          data: baseList.value.map(b => b.sumIncome)
        },
        {
          type: "line",
          name: "基线值",
          itemStyle: {
            color: FINANCE_CHART_COLOR.GREEN
          },
          data: baseList.value.map(b => b.baseValue)
        },
      ]
    }
  })

  const getBaseCompareData = async (year: number, type: string) => {
    const res = await http.get(getFinanceCostComparison, { params: { year, type } });
    baseList.value = res.data;
    baseCompareBarLineRef.value?.updateChart(baseCompareBarLineOption.value);
  }

  // onMounted(() => {
  //   getBaseCompareData(new Date().getFullYear(), baseCompareTab.value);
  // })

  return {
    baseCompareTab,
    baseCompareTabData,
    getBaseCompareData,
    baseCompareBarLineRef,
    baseCompareBarLineOption
  }
}