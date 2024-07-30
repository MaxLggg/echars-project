import { computed, ref } from "vue"
import { getPersonDistribution } from "../../../api/hrReport"
import { EchartsCardRef } from "../../../types/common/Index";
import { PersonDistributionListItem } from "../../../types/hrReport"
import http from "../../../utils/http"

export default function useGetDistribution() {

  const distributionData = ref<PersonDistributionListItem[]>([]);
  const distributionRef = ref<EchartsCardRef>();
  const legendData = [
    { key: "haiwaiNum", value: "海外" },
    { key: "huazhongNum", value: "华中" },
    { key: "xinanNum", value: "西南" },
    { key: "xibeiNum", value: "西北" },
    { key: "huabeiNum", value: "华北" },
    { key: "huadongNum", value: "华东" },
    { key: "huananNum", value: "华南" },
  ]
  const distributionOption = computed<echarts.EChartsOption>(() => {
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
        data: legendData.map(l => l.value)
      },
      xAxis: {
        type: "category",
        data: distributionData.value.map(d => d.deptName)
      },
      yAxis: {},
      series: legendData.map(l => {
        return {
          type: "bar",
          name: l.value,
          // @ts-ignore
          data: distributionData.value.map(d => d[l.key])
        }
      })
    }
  })
  const getDistributionData = async () => {
    const res = await http.get(getPersonDistribution);
    distributionData.value = res.data;
    distributionRef.value?.updateChart(distributionOption.value);
  }

  return { getDistributionData, distributionRef, distributionOption }
}