import { ref } from "vue";
import { BidInfoItem, SalesContractItem } from "../../../types/businessOperationRt";
import { EchartsCardRef } from "../../../types/common/Index";

export default function useBidInfo() {
  const bidInfo = ref<BidInfoItem>({ bidNum: 0, bidRate: 0, sumNum: 0, });
  const bidInfoNumBarOption = ref<echarts.EChartsOption>();
  const bidInfoNumBarRef = ref<EchartsCardRef>();
  const bidInfoCostBarOption = ref<echarts.EChartsOption>();
  const bidInfoCostBarRef = ref<EchartsCardRef>();

  const buildOption = (data: SalesContractItem[], year: number, key: "sumCost" | "sumNum"): echarts.EChartsOption => {
    const legendData = [key === "sumNum" ? "投标情况" : "中标金额"];
    return {
      title: {
        text: legendData[0]
      },
      legend: {
        data: legendData,
        top: "8%",
        // left: "right"
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        data: data.map(i => `${i.month}月`),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: "value",
        name: key === "sumCost" ? "万元" : "个数"
      },
      series: [
        {
          type: "bar",
          name: legendData[0],
          data: data.map(i => i[key]),
          itemStyle: {
            color: "#548AF8"
          },
          tooltip: {
            valueFormatter: val => `${val}${key === "sumNum" ? "个" : "万元"}`
          }
        }
      ]
    }
  }
  const updateBidInfoBar = (data: [BidInfoItem, SalesContractItem[]], year: number) => {
    bidInfo.value = data[0] || { bidNum: 0, bidRate: 0, sumNum: 0, };
    bidInfoNumBarOption.value = buildOption(data[1], year, "sumNum");
    bidInfoNumBarRef.value?.updateChart(bidInfoNumBarOption.value);
    bidInfoCostBarOption.value = buildOption(data[1], year, "sumCost");
    bidInfoCostBarRef.value?.updateChart(bidInfoCostBarOption.value);
  }

  return {
    bidInfo,
    bidInfoNumBarOption,
    bidInfoNumBarRef,
    bidInfoCostBarOption,
    bidInfoCostBarRef,
    updateBidInfoBar,
  }
}