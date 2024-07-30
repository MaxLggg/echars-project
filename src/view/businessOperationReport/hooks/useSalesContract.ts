import { ref } from "vue";
import { CustomerTabName, SalesContractItem } from "../../../types/businessOperationRt";
import { EchartsCardRef } from "../../../types/common/Index";

export default function useSalesContract() {
  const salesContractList = ref<SalesContractItem[]>([]);

  const salesOption = ref<echarts.EChartsOption>()
  const salesBarChartRef = ref<EchartsCardRef>()
  const contractOption = ref<echarts.EChartsOption>()
  const contractBarChartRef = ref<EchartsCardRef>()

  const updateSalesContractData = (data: SalesContractItem[], year: number) => {
    const legendData = [(year - 1) + "", year + ""];
    contractOption.value = {
      title: {
        text: "合同签约数量"
      },
      legend: {
        data: legendData,
        top: "8%"
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
        name: "个数"
      },
      series: [
        {
          type: "bar",
          name: legendData[0],
          data: data.filter(i => i.year === year - 1).map(i => i.sumNum),
          itemStyle: {
            color: "#548AF8"
          },
          tooltip: {
            valueFormatter: val => `${val}个`
          }
        },
        {
          type: "bar",
          name: legendData[1],
          data: data.filter(i => i.year === year).map(i => i.sumNum),
          itemStyle: {
            color: "#46C3D1"
          },
          tooltip: {
            valueFormatter: val => `${val}个`
          }
        }
      ]
    }
    salesOption.value = {
      title: {
        text: "合同总金额"
      },
      legend: {
        data: legendData,
        top: "8%"
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
        name: "万元"
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
          },
        },
        {
          type: "bar",
          name: legendData[1],
          data: data.filter(i => i.year === year).map(i => i.sumCost),
          itemStyle: {
            color: "#46C3D1"
          },
          tooltip: {
            valueFormatter: val => `${val}万元`
          }
        }
      ]
    }
    contractBarChartRef.value?.updateChart(contractOption.value);
    salesBarChartRef.value?.updateChart(salesOption.value);
  }

  const poNumOption = ref<echarts.EChartsOption>();
  const poNumBarChartRef = ref<EchartsCardRef>();
  const poSalesOption = ref<echarts.EChartsOption>();
  const poSalesBarChartRef = ref<EchartsCardRef>();

  const buildSalesContractOption = (data: Array<SalesContractItem>, year: number, key: "sumCost" | "sumNum",): echarts.EChartsOption => {
    const legendData = [(year - 1) + "", year + ""];
    return {
      title: {
        text: key === "sumNum" ? "PO数量" : "PO金额"
      },
      legend: {
        data: legendData,
        top: "8%"
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
          },
        }
      ]
    }
  }

  const updatePoChart = (data: SalesContractItem[], year: number) => {
    poNumOption.value = buildSalesContractOption(data, year, "sumNum");
    poNumBarChartRef.value?.updateChart(poNumOption.value);
    poSalesOption.value = buildSalesContractOption(data, year, "sumCost");
    poSalesBarChartRef.value?.updateChart(poSalesOption.value);
  }

  const customerTabName = ref<CustomerTabName>("first")

  const buildCustomerOption = (data: SalesContractItem[], key: "sumCost" | "sumNum"): echarts.EChartsOption => {
    const legendName = key === "sumNum" ? "签约数量" : "签约金额";
    return {
      title: {
        text: key === "sumNum" ? "合同签约数量" : "合同金额"
      },
      legend: {
        data: [legendName],
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
        name: key === "sumNum" ? "个数" : "万元"
      },
      series: [
        {
          type: "bar",
          name: legendName,
          data: data.map(i => i[key]),
          itemStyle: {
            color: "#548AF8"
          },
          tooltip: {
            valueFormatter: val => `${val}${key === "sumNum" ? "个" : "万元"}`
          }
        },
      ]
    }
  }

  const customerNumBarOption = ref<echarts.EChartsOption>();
  const customerNumBarChartRef = ref<EchartsCardRef>();

  const customerCostBarOption = ref<echarts.EChartsOption>();
  const customerCostBarChartRef = ref<EchartsCardRef>();

  const updateTabChart = (data: SalesContractItem[]) => {
    customerNumBarOption.value = buildCustomerOption(data, "sumNum");
    customerNumBarChartRef.value?.updateChart(customerNumBarOption.value);
    customerCostBarOption.value = buildCustomerOption(data, "sumCost");
    customerCostBarChartRef.value?.updateChart(customerCostBarOption.value);
  }
  return {
    salesContractList,
    salesOption,
    contractOption,
    salesBarChartRef,
    contractBarChartRef,
    updateSalesContractData,
    buildSalesContractOption,
    customerTabName,
    buildCustomerOption,
    customerNumBarOption,
    customerNumBarChartRef,
    customerCostBarOption,
    customerCostBarChartRef,
    updateTabChart,
    updatePoChart,
    poNumOption,
    poNumBarChartRef,
    poSalesOption,
    poSalesBarChartRef
  }
}