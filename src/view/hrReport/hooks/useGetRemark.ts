import { computed, ref } from "vue"
import { getOutByRemark } from "../../../api/hrReport"
import { EchartsCardRef } from "../../../types/common/Index";
import { PersonRemarkListItem } from "../../../types/hrReport"
import http from "../../../utils/http"

export default function useGetRemark() {
  const remarkTabType = ref("PS");
  const remarkData = ref<PersonRemarkListItem[]>([]);
  const remarkRef = ref<EchartsCardRef>();
  const remarkOption = computed<echarts.EChartsOption>(() => {
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
        // data: legendData.map(l => l.value)
      },
      yAxis: {
        type: "category",
        data: remarkData.value.map(d => d.remark)
      },
      xAxis: {},
      series: [
        {
          name: "",
          type: "bar",
          data: remarkData.value.map(d => d.num)
        }
      ]
    }
  })
  const getremarkData = async (year: number, deptName: string) => {
    const res = await http.get(getOutByRemark, { params: { year, deptName } });
    remarkData.value = res.data;
    remarkRef.value?.updateChart(remarkOption.value);
  }

  return { getremarkData, remarkRef, remarkOption, remarkTabType }
}