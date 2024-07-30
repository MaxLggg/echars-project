import { ref } from "vue";
import { SalesContractItem } from "../../../types/businessOperationRt";
import { EchartsCardRef } from "../../../types/common/Index";

export default function useInvoice() {
  const invoiceNumBarOption = ref<echarts.EChartsOption>();
  const invoiceNumBarRef = ref<EchartsCardRef>();
  const invoiceCostBarOption = ref<echarts.EChartsOption>();
  const invoiceCostBarRef = ref<EchartsCardRef>();

  const buildOption = (data: SalesContractItem[], year: number, key: "sumCost" | "sumNum"): echarts.EChartsOption => {
    const legendData = [(year - 1) + "", year + ""];
    return {
      title: {
        text: key === "sumNum" ? "开票数量" : "开票金额"
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
          data: data.filter(i => i.year === year - 1).map(i => i[key]),
          itemStyle: {
            color: "#548AF8"
          },
          tooltip: {
            valueFormatter: val => `${val}${key === "sumNum" ? "个" : "万元"}`
          },
        },
        {
          type: "bar",
          name: legendData[1],
          data: data.filter(i => i.year === year).map(i => i[key]),
          itemStyle: {
            color: "#46C3D1"
          },
          tooltip: {
            valueFormatter: val => `${val}${key === "sumNum" ? "个" : "万元"}`
          }
        }
      ]
    }
  }
  const updateInvoiceBar = (data: SalesContractItem[], year: number) => {
    invoiceNumBarOption.value = buildOption(data, year, "sumNum");
    invoiceNumBarRef.value?.updateChart(invoiceNumBarOption.value);
    invoiceCostBarOption.value = buildOption(data, year, "sumCost");
    invoiceCostBarRef.value?.updateChart(invoiceCostBarOption.value);
  }

  return {
    invoiceNumBarOption,
    invoiceNumBarRef,
    invoiceCostBarOption,
    invoiceCostBarRef,
    updateInvoiceBar
  }
}