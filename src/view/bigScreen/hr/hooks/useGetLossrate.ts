import { computed, ref } from "vue";
import { getChurnRate } from "../../../../api/hr";
import { EchartsCardRef } from "../../../../types/common/Index";
import { HrLossRateListItem } from "../../../../types/hr";
import http from "../../../../utils/http";

export default function useGetLossrate() {
  const lossRateData = ref<HrLossRateListItem[]>([]);
  const lossRateRef = ref<EchartsCardRef>();
  const lossRateOption = computed<echarts.EChartsOption>(() => {
    return {
      title: {
        text: "员工流失率",
        textStyle: {
          fontSize: 24,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          color: "#000",
        }
      },
      legend: {
        data: ["骨干流失率", "全员流失率"],
        top: "5%",
        left: "center"
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
        valueFormatter: value => `${value}%`
      },
      xAxis: {
        data: lossRateData.value.map(i => `${i.dateMonth}月`),
        type: "category",
        boundaryGap: false,
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value}%"
          }
        }
      ],
      series: [
        {
          data: lossRateData.value.map(i => i.wastageRate * 100),
          type: "line",
          name: "骨干流失率",
          // symbol: "none",
          showSymbol: false,
          areaStyle: {},
          itemStyle: {
            color: "#548AF8"
          }
        },
        {
          data: lossRateData.value.map(i => i.churnRate * 100),
          type: "line",
          name: "全员流失率",
          // symbol: "none",
          showSymbol: false,
          areaStyle: {},
          itemStyle: {
            color: "#E2635E"
          }
        }
      ]
    }
  });

  const getLossRateData = async (year: number, deptName: string, pdu?: string) => {
    const res = await http.get(getChurnRate, {
      params: {
        json: { year, deptName, pdu: pdu || "all_pdu" }
      }
    });
    lossRateData.value = res.data;
    lossRateRef.value?.updateChart(lossRateOption.value);
  }

  return { lossRateRef, lossRateOption, getLossRateData }
}