import { ref } from "vue";
import { SalesContractItem } from "../../../types/businessOperationRt";
import { EchartsCardRef } from "../../../types/common/Index";

export default function useCollection() {
  // const collectionNumBarOption = ref<echarts.EChartsOption>();
  // const collectionNumBarRef = ref<EchartsCardRef>();
  const collectionCostBarOption = ref<echarts.EChartsOption>();
  const collectionCostBarRef = ref<EchartsCardRef>();

  const buildOption = (data: SalesContractItem[], year: number, key: "sumCost" | "sumNum" = "sumCost"): echarts.EChartsOption => {
    const legendData = [(year - 1) + "", year + ""];
    // const dataKey=year
    return {
      // title: {
      //   text: key === "sumNum" ? "开票数量" : "开票金额"
      // },
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
        data: data.filter(i => i.year === year).map(i => `${i.month}月`),
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
          data: data.filter(i => i.year === year - 1).map(i => i.sumCost),
          itemStyle: {
            color: "#548AF8"
          },
          tooltip: {
            valueFormatter: val => `${val}万元`
          }
        },
        {
          type: "bar",
          name: legendData[1],
          data: data.filter(i => i.year === year).map(i => i.sumCost),
          tooltip: {
            valueFormatter: val => `${val}万元`
          },
          itemStyle: {
            color: "#46C3D1"
          }
        }
      ]
    }
  }
  const updateCollectionBar = (data: SalesContractItem[], year: number) => {
    // collectionNumBarOption.value = buildOption(data, year, "sumNum");
    // collectionNumBarRef.value?.updateChart(collectionNumBarOption.value);
    collectionCostBarOption.value = buildOption(data, year);
    collectionCostBarRef.value?.updateChart(collectionCostBarOption.value);
  }

  return {
    // collectionNumBarOption,
    // collectionNumBarRef,
    collectionCostBarOption,
    collectionCostBarRef,
    updateCollectionBar
  }
}