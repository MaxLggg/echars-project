import { ref } from "vue";
import { CustomerTabName, PurchaseTypeItem, SalesContractItem } from "../../../types/businessOperationRt";
import { EchartsCardRef } from "../../../types/common/Index";

export default function usePurchaseContract() {
  const purchaseNumBarOption = ref<echarts.EChartsOption>();
  const purchaseNumBarRef = ref<EchartsCardRef>();
  const purchaseCostBarOption = ref<echarts.EChartsOption>();
  const purchaseCostBarRef = ref<EchartsCardRef>();

  const buildOption = (data: SalesContractItem[], key: "sumCost" | "sumNum"): echarts.EChartsOption => {
    const title = key === "sumNum" ? "合同签约数量" : "合同金额";
    return {
      title: {
        text: title
      },
      legend: {
        data: [title],
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
          name: title,
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
  const updatePurchaseBar = (data: SalesContractItem[]) => {
    purchaseNumBarOption.value = buildOption(data, "sumNum");
    purchaseNumBarRef.value?.updateChart(purchaseNumBarOption.value);
    purchaseCostBarOption.value = buildOption(data, "sumCost");
    purchaseCostBarRef.value?.updateChart(purchaseCostBarOption.value);
  }

  const purchaseTabName = ref<"1" | "2" | "3">("1");

  const buildPurchaseOption = (data: PurchaseTypeItem[], key: "sumCost" | "sumNum"): echarts.EChartsOption => {
    const title = key === "sumNum" ? "签约数量" : "合同金额";
    return {
      title: {
        text: title
      },
      legend: {
        data: [title],
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
        data: data.map(i => i.purchaseType),
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
          name: title,
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

  const purchaseTypeNumBarOption = ref<echarts.EChartsOption>();
  const purchaseTypeNumBarRef = ref<EchartsCardRef>();
  const purchaseCostTypeBarOption = ref<echarts.EChartsOption>();
  const purchaseCostTypeBarRef = ref<EchartsCardRef>();

  const updatePurchaseTabChart = (data: PurchaseTypeItem[]) => {
    purchaseTypeNumBarOption.value = buildPurchaseOption(data, "sumNum");
    purchaseTypeNumBarRef.value?.updateChart(purchaseTypeNumBarOption.value);
    purchaseCostTypeBarOption.value = buildPurchaseOption(data, "sumCost");
    purchaseCostTypeBarRef.value?.updateChart(purchaseCostTypeBarOption.value);
  }

  return {
    purchaseNumBarOption,
    purchaseNumBarRef,
    purchaseCostBarOption,
    purchaseCostBarRef,
    updatePurchaseBar,
    purchaseTabName,
    purchaseTypeNumBarOption,
    purchaseTypeNumBarRef,
    purchaseCostTypeBarOption,
    purchaseCostTypeBarRef,
    updatePurchaseTabChart
  }
}