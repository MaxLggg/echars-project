import { computed, onMounted, ref } from "vue";
import { EchartsCardRef, LegendDataItem } from "../../../../types/common/Index";
import { getFinanceCostItem } from "../../../../api/financeReport";
import { financeCostItem } from "../../../../types/financeReport"
import http from "../../../../utils/http";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";

export default function useCostItem() {
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth() - 1;
  const financeCostType = ref('1');

  const financeCostTabData = [
    { name: "1", label: "HWC" },
    { name: "2", label: "CS" },
    { name: "3", label: "PS" },
    { name: "4", label: "CDCE" },
  ];

  const legendData: LegendDataItem<financeCostItem>[] = [
    { label: "费用金额", key: "cost", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
    // { label: "费用率", key: "costRate", color: FINANCE_CHART_COLOR.GREEN, chartType: "line" }
  ]

  const financeCostData = ref<financeCostItem[]>([])
  const financeCostRef = ref<EchartsCardRef>();
  const financeCostItem = ref<"1" | "2" | "3" | "4">("1");
  const financeCostItemName = ref("");
  const isDrilldownMode = computed(() => financeCostItem.value !== "1");

  // @ts-ignore
  const financeCostOption = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: financeCostItemName.value, triggerEvent: true },
      legend: {
        left: "right",
        data: legendData.map(l => l.label)
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
        formatter: function (params: any[]) {
          return `<div>
            <span style="            
              display: inline-block;
              margin-right: 5px;
              background-color: ${params[0].color};
              width: 10px;
              height: 10px;
              border-radius: 50%;
            "></span>
            <span>费用金额 </span>
            <span style="font-weight: bold; margin-right: 5px;">${params[0].value}万元</span>
            <span>费用率 </span>
            <span style="font-weight: bold; margin-right: 5px;">${params[0].data.rate}%</span>
          </div>`
        }
      },
      xAxis: {
        type: "category",
        axisPointer: {
          type: "shadow"
        },
        data: financeCostData.value.map(b => b.item)
      },
      yAxis: [
        {
          type: "value",
          name: "万元"
        },
        {
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
      ],
      series: legendData.map(l => {
        return {
          name: l.label,
          type: l.chartType,
          itemStyle: {
            color: l.color
          },
          yAxisIndex: l.chartType === "line" ? 1 : 0,
          // data: financeCostData.value.map(b => b[l.key])
          data: financeCostData.value.map(b => ({ value: b[l.key], rate: b.costRate }))
        }
      })
    }
  });


  const getfinanceCostChildData = async (year: number, type: string, month: number, name: string) => {
    if (name.includes("实施")) {
      financeCostItem.value = "2";
    }
    if (name.includes("管理")) {
      financeCostItem.value = "3";
    }
    if (name.includes("研发")) {
      financeCostItem.value = "4";
    }
    // switch (name) {
    //   case "实施人工":
    //     item = "2";
    //     break;
    //   case "管理费用":
    //     item = "3";
    //     break;
    //   case "研发+销售费用":
    //     item = "4";
    //     break;
    //   default:
    //     break;
    // }
    const res = await http.get(getFinanceCostItem, { params: { year, type, month, item: financeCostItem.value } });
    financeCostData.value = res.data;
    financeCostRef.value?.updateChart(financeCostOption.value);
  }

  const getfinanceCostData = async (year: number, type: string, month: number) => {
    financeCostItem.value = "1";
    financeCostItemName.value = ""
    const res = await http.get(getFinanceCostItem, { params: { year, type, month, item: financeCostItem.value } })
    financeCostData.value = res.data;
    financeCostRef.value?.updateChart(financeCostOption.value);
    financeCostRef.value?.getEchartsInstance()?.on("click", (params) => {
      if (params && params.name && !isDrilldownMode.value) {
        financeCostItemName.value = "<-- " + params.name
        getfinanceCostChildData(year, type, month, params.name);
      }
      if (params && params.componentType === "title") {
        financeCostItem.value = "1";
        financeCostItemName.value = ""
        getfinanceCostData(year, type, month);
      }
    })
  }
  // onMounted(() => {
  //   getfinanceCostData(currYear, financeCostType.value, currMonth)
  // })

  return {
    financeCostData,
    financeCostType,
    financeCostRef,
    financeCostOption,
    getfinanceCostData,
    financeCostTabData
  }
}