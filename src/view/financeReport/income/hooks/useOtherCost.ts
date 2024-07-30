import { computed, onMounted, ref } from "vue";
import { getFinanceCostMerge } from "../../../../api/financeReport"
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";
import { EchartsCardRef } from "../../../../types/common/Index";
import { OtherCostListItem } from "../../../../types/financeReport";
import http from "../../../../utils/http"

export default function useOtherCost() {
  const otherCostMonth = ref(new Date().getMonth());
  // 1: CS   2：PS  3:CDCE
  const otherTab = ref("1");

  const otherCostList1 = ref<OtherCostListItem[]>([]);
  const otherCostList2 = ref<OtherCostListItem[]>([]);

  const otherCostBar1Ref = ref<EchartsCardRef>();
  const otherCostBar2Ref = ref<EchartsCardRef>();

  // PDU/CU维度
  const otherCostBarOption1 = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "PDU/CU维度" },
      legend: {
        left: "center",
        data: ["收入"]
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
        data: otherCostList1.value.map(b => b.statisticsValue)
      },
      yAxis: {
        type: "value",
        name: "万元"
      },
      series: [
        {
          name: "收入",
          type: "bar",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          tooltip: {
            valueFormatter: val => `${val}"万元"`
          },
          data: otherCostList1.value.map(b => b.sumIncome)
        }
      ]
    }
  });
  // 业务线
  const otherCostBarOption2 = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "业务线维度" },
      legend: {
        left: "center",
        data: ["收入"]
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
        data: otherCostList2.value.map(b => b.statisticsValue)
      },
      yAxis: {
        type: "value",
        name: "万元"
      },
      series: [
        {
          name: "收入",
          type: "bar",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          tooltip: {
            valueFormatter: val => `${val}万元`
          },
          data: otherCostList2.value.map(b => b.sumIncome)
        }
      ]
    }
  })

  /**
   * PDU/CU/业务线	
   * @param year 年
   * @param month 月
   * @param type 1: CS   2：PS  3:CDCE
   */
  const getOtherCostData = async (year: number, month: number, type: string,) => {
    const res = await http.get(getFinanceCostMerge, { params: { year, month, type, } });
    otherCostList1.value = res.data.pdu;
    otherCostBar1Ref.value?.updateChart(otherCostBarOption1.value);

    otherCostList2.value = res.data.business;
    otherCostBar2Ref.value?.updateChart(otherCostBarOption2.value);

  }

  // onMounted(() => {
  //   getOtherCostData(new Date().getFullYear(), otherCostMonth.value, otherTab.value);
  // })

  return {
    getOtherCostData,
    otherTab,
    otherCostMonth,
    otherCostBar1Ref,
    otherCostBar2Ref,
    otherCostBarOption1,
    otherCostBarOption2,
  }
}