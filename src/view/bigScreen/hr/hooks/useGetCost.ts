import { computed, onMounted, reactive, ref } from "vue";
import { getPersonCostPayInfo } from "../../../../api/hr";
import { EchartsCardRef } from "../../../../types/common/Index";
import { HrConstData, HrCostMonth, HrCostSum } from "../../../../types/hr";
import http from "../../../../utils/http";

export default function useGetCost() {

  const costSumData = reactive<HrCostSum>({
    sumCost: 0,
    subsidyCost: 0,
    encourageCost: 0,
  });
  const costMonthData = ref<HrCostMonth[]>([]);
  const costMonthBarRef = ref<EchartsCardRef>();
  const costMonthBarOption = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        data: ["津贴费用", "激励费用"],
        top: "5%",
        left: "center"
      },
      tooltip: {
        show: true,
        trigger: "axis",
        valueFormatter: val => `${val}元`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        data: costMonthData.value.map(i => `${i.month}月`),
        type: "category",
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          name: "津贴费用",
          stack: "cost",
          data: costMonthData.value.map(i => i.subsidyCost),
          emphasis: {
            focus: "series"
          },
          itemStyle: {
            color: "#548AF8"
          },
          barWidth: 50
        },
        {
          type: "bar",
          name: "激励费用",
          stack: "cost",
          data: costMonthData.value.map(i => i.encourageCost),
          emphasis: {
            focus: "series"
          },
          itemStyle: {
            color: "#E98E39"
          },
          barWidth: 50
        }
      ]
    }
  })
  const getCostData = async (
    year: number,
    deptName: string,
    pduId: string = ""
  ) => {
    const res = await http.get<HrConstData>(getPersonCostPayInfo, {
      params: { json: { year, deptName, pduId } }
    });
    costSumData.sumCost = res.data.sum.sumCost;
    costSumData.subsidyCost = res.data.sum.subsidyCost;
    costSumData.encourageCost = res.data.sum.encourageCost;
    costMonthData.value = res.data.month;
    costMonthBarRef.value?.updateChart(costMonthBarOption.value);
  }

  return {
    costSumData,
    costMonthData,
    getCostData,
    costMonthBarRef,
    costMonthBarOption
  }
}