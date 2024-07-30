import { computed, ref } from "vue";
import { getEncourageMoney } from "../../../api/hrReport";
import { EchartsCardRef } from "../../../types/common/Index";
import { PersonEncourageListItem } from "../../../types/hrReport";
import http from "../../../utils/http";

export default function useEncourageMoney() {
  const encourageTypes: string[] = ["FP项目激励", "多元化激励", "骨干激励", "绩效奖金", "客户支付奖金",
    "年终奖", "其他及时激励", "PDU主管岗位激励", "PM岗位津贴", "导师津贴"];
  const encourageType = ref("FP项目激励");
  const encourageData = ref<PersonEncourageListItem[]>([]);
  const encourageMoneyRef = ref<EchartsCardRef>();
  const legendData = [
    { key: "hwcMoney", value: "HWC" },
    { key: "psMoney", value: "PS" },
    { key: "cdceMoney", value: "CDCE" },
    { key: "csMoney", value: "CS" },
  ]
  const encourageMoneyOption = computed<echarts.EChartsOption>(() => {
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
        valueFormatter: val => `${val} 元`
      },
      legend: {
        left: "center",
        data: legendData.map(l => l.value)
      },
      xAxis: {
        type: "category",
        data: encourageData.value.map(d => `${d.month}月`)
      },
      yAxis: {},
      series: legendData.map(l => {
        return {
          name: l.value,
          type: "bar",
          // @ts-ignore
          data: encourageData.value.map(d => d[l.key])
        }
      })
    }
  })
  const getEncourageMoneyData = async (year: number, type: string) => {
    const res = await http.get(getEncourageMoney, {
      params: { year, type }
    });
    encourageData.value = res.data;
    encourageMoneyRef.value?.updateChart(encourageMoneyOption.value);
  }

  return { encourageTypes, encourageType, encourageMoneyRef, encourageMoneyOption, getEncourageMoneyData }
}