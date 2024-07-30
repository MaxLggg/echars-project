import { computed, onMounted, ref } from "vue";
import { getFinanceCostByBu } from "../../../../api/financeReport";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";
import { EchartsCardRef } from "../../../../types/common/Index";
import { BUCostListItem } from "../../../../types/financeReport";
import http from "../../../../utils/http";

export default function useBUCost() {
  const buCostMonth = ref(new Date().getMonth());
  const buCostData = ref<BUCostListItem[]>([]);
  const buCostBarRef = ref<EchartsCardRef>();
  const buCostBarOption = computed<echarts.EChartsOption>(() => {
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
        valueFormatter: val => `${val} 万元`
      },
      xAxis: {
        type: "category",
        axisPointer: {
          type: "shadow"
        },
        data: buCostData.value.map(b => b.statisticsValue)
      },
      yAxis: {
        type: "value",
        name: "万元"
      },
      series: [
        {
          type: "bar",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          data: buCostData.value.map(b => b.sumIncome)
        }
      ]
    }
  })

  const getBUCostData = async (year: number, month: number) => {
    const res = await http.get(getFinanceCostByBu, { params: { year, month } });
    buCostData.value = res.data;
    buCostBarRef.value?.updateChart(buCostBarOption.value);
  }

  // onMounted(() => {
  //   getBUCostData(new Date().getFullYear(), buCostMonth.value);
  // })
  return {
    buCostMonth,
    buCostBarRef,
    buCostBarOption,
    getBUCostData
  }
}