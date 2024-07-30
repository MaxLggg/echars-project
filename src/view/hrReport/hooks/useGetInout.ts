import { computed, ref } from "vue"
import { getInOutList } from "../../../api/hrReport"
import { EchartsCardRef } from "../../../types/common/Index";
import { PersonInOutListItem } from "../../../types/hrReport"
import http from "../../../utils/http"

export default function useGetInout() {
  const inoutTabType = ref("PS");
  const inoutData = ref<PersonInOutListItem[]>([]);
  const inoutRef = ref<EchartsCardRef>();
  const inoutOption = computed<echarts.EChartsOption>(() => {
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
        valueFormatter: val => `${val} 人`
      },
      legend: {
        left: "center",
        data: ["转入", "转出"]
      },
      xAxis: {
        type: "category",
        data: inoutData.value.map(d => `${d.month} 月`),
      },
      yAxis: {},
      series: [
        {
          name: "转入",
          type: "bar",
          data: inoutData.value.map(d => d.inNum)
        },
        {
          name: "转出",
          type: "bar",
          data: inoutData.value.map(d => d.outNum)
        },
      ]
    }
  })
  const getinoutData = async (year: number, deptName: string) => {
    const res = await http.get(getInOutList, { params: { year, deptName } });
    inoutData.value = res.data;
    inoutRef.value?.updateChart(inoutOption.value);
  }

  return { getinoutData, inoutRef, inoutOption, inoutTabType }
}