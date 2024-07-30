import { computed, ref } from "vue"
import { getOutByType, } from "../../../api/hrReport"
import { EchartsCardRef } from "../../../types/common/Index";
import { PersonOutListItem } from "../../../types/hrReport"
import http from "../../../utils/http"

export default function useGetOut() {

  const outData = ref<PersonOutListItem[]>([]);
  const outRef = ref<EchartsCardRef>();
  const legendData = [
    { key: "beidongNum", value: "主动" },
    { key: "zhudongNum", value: "被动" },
  ]
  const outOption = computed<echarts.EChartsOption>(() => {
    return {
      tooltip: {
        show: true,
        trigger: "item",
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
        data: legendData.map(l => l.value)
      },
      xAxis: {
        type: "category",
        // data: legendData.map(l => l.value)
        data: outData.value.map(l => l.deptName)
      },
      yAxis: {},
      series: legendData.map(l => {
        return {
          name: l.value,
          type: "bar",
          // @ts-ignore
          data: outData.value.map(i => i[l.key]),
        }
      })
    }
  })
  const getoutData = async (year: number) => {
    const res = await http.get(getOutByType, { params: { year } });
    outData.value = res.data;
    outRef.value?.updateChart(outOption.value);
  }

  return { getoutData, outRef, outOption }
}