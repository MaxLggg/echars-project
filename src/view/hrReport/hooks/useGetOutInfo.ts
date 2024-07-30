import { computed, ref } from "vue";
import { getOutInfo } from "../../../api/hrReport";
import { EchartsCardRef } from "../../../types/common/Index";
import { OutInfoListItem } from "../../../types/hrReport";
import http from "../../../utils/http";

export default function useGetOutInfo() {
  const outInfoTab = ref("PS");
  const outInfoData = ref<OutInfoListItem[]>([]);
  const outInfoRef = ref<EchartsCardRef>();
  const outInfoOption = computed<echarts.EChartsOption>(() => {
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
        data: ["离职人数", "流失人数"]
      },
      yAxis: {},
      xAxis: {
        type: "category",
        data: outInfoData.value.map(i => `${i.month}月`)
      },
      series: [
        {
          type: "bar",
          name: "离职人数",
          data: outInfoData.value.map(i => i.outNum)
        },
        {
          type: "bar",
          name: "流失人数",
          data: outInfoData.value.map(i => i.churnNum)
        },
      ]
    }
  })

  const getOutInfoData = async (year: number, deptName: string) => {
    const res = await http.get(getOutInfo, { params: { year, deptName } });
    outInfoData.value = res.data;
    outInfoRef.value?.updateChart(outInfoOption.value);
  }
  return { outInfoTab, getOutInfoData, outInfoRef, outInfoOption }
}