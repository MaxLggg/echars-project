import { computed, onMounted, ref } from "vue";
import { EchartsCardRef } from "../../../../types/common/Index";
import { getFinanceCostByCustom } from "../../../../api/financeReport";
import { MonthIncomeItem } from "../../../../types/financeReport"
import http from "../../../../utils/http";

export default function useMonthIncome() {
  const incomeMonth = ref(new Date().getMonth());
  const monthIncomeData = ref<MonthIncomeItem[]>([]);
  const monthIncomeRef = ref<EchartsCardRef>();
  const monthIncomeOption = computed<echarts.EChartsOption>(() => {
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
        axisLabel: {
          interval: 0,
          rotate: 30
        },
        data: monthIncomeData.value.map(b => b.statisticsValue)
      },
      yAxis: {
        type: "value",
        name: "万元",
      },
      series: {
        type: 'bar',
        tooltip: {
          valueFormatter: val => `${val}万元`
        },
        data: monthIncomeData.value.map(b => b.sumIncome)
      }
    }
  });

  const getFinanceCostByCustomData = async (year: number, month: number) => {
    const res = await http.get(getFinanceCostByCustom, { params: { year, month } })
    monthIncomeData.value = res.data
    monthIncomeRef.value?.updateChart(monthIncomeOption.value);
  }

  // onMounted(() => {
  //   getFinanceCostByCustomData(new Date().getFullYear(), incomeMonth.value);
  // })


  return {
    getFinanceCostByCustomData,
    monthIncomeRef,
    monthIncomeOption,
    incomeMonth
  }
}