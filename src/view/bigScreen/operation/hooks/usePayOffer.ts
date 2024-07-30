import { computed, onMounted, ref } from "vue";
import { getOperationSalaryQuotationList } from "../../../../api/operation";
import { EchartsCardRef } from "../../../../types/common/Index";
import { SalaryQuotationData } from "../../../../types/operation/Index";
import http from "../../../../utils/http";

export default function usePayOffer(props?: any) {
  const activeName = ref<"first" | "second">("first");

  const payOfferBarOption = ref<echarts.EChartsOption>();
  const payOfferBarRef = ref<EchartsCardRef>();
  const leftData = ref<SalaryQuotationData>();
  const isUnderMode = ref(false);
  const now = new Date();
  // 默认去当前月上一个月
  const currMonth = computed(() => (year: number) => {
    if (year === now.getFullYear()) {
      return now.getMonth();
    }
    return 12;
  });
  const payOfferMonth = ref(currMonth.value(now.getFullYear()));

  const updatePayOfferBarChart = (data: SalaryQuotationData[], year: number) => {
    if (activeName.value === "first") {
      leftData.value = data.find(d => d.dimension === "4");
      data = data.filter(d => d.dimension === "3");
    }
    payOfferBarOption.value = {
      legend: {
        data: ["薪酬报价比", "需管控人数占比"],
        left: "right",
        top: "5%"
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
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value}%"
          }
        }
      ],
      xAxis: {
        type: "category",
        data: data.map(i => i.category),
        axisPointer: {
          type: "shadow"
        },
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      },
      series: [
        {
          type: "bar",
          id: "1111",
          name: "薪酬报价比",
          data: data.map(i => i.salaryQuotationRate),
          tooltip: {
            valueFormatter: function (value) {
              return `${value}%`;
            }
          },
          itemStyle: {
            color: "#548AF8",
          },
          barWidth: 50
        },
        {
          type: "bar",
          id: "2222",
          name: "需管控人数占比",
          data: data.map(i => i.controlPersonRate),
          tooltip: {
            valueFormatter: function (value) {
              return `${value}%`;
            }
          },
          itemStyle: {
            color: "#E98E39"
          },
          barWidth: 50
        }
      ]
    };
    payOfferBarRef.value?.updateChart(payOfferBarOption.value)
    const chart = payOfferBarRef.value?.getEchartsInstance();
    if (chart && activeName.value === "first" && !isUnderMode.value) {
      chart.on("click", (params) => {
        getUderData(year, params.name)
        isUnderMode.value = true;
      })
    }
  }

  const getUderData = async (year: number, deptName: string) => {
    if (isUnderMode.value) {
      return;
    }
    const req = {
      json: {
        year,
        deptName,
        month: payOfferMonth.value,
        dimension: "1"
      }
    }
    const res = await http.get<SalaryQuotationData[]>(getOperationSalaryQuotationList, { params: req });
    payOfferBarOption.value = {
      legend: {
        data: ["薪酬报价比", "需管控人数占比"],
        left: "40%",
        top: "5%"
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
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value}%"
          }
        }
      ],
      xAxis: {
        type: "category",
        data: res.data.map(i => i.category),
        axisPointer: {
          type: "shadow"
        },
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      },
      series: [
        {
          type: "bar",
          id: "1111",
          name: "薪酬报价比",
          data: res.data.map(i => i.salaryQuotationRate),
          tooltip: {
            valueFormatter: function (value) {
              return `${value}%`;
            }
          },
          itemStyle: {
            color: "#548AF8",
          },
          // barWidth: 50
        },
        {
          type: "bar",
          id: "2222",
          name: "需管控人数占比",
          data: res.data.map(i => i.controlPersonRate),
          tooltip: {
            valueFormatter: function (value) {
              return `${value}%`;
            }
          },
          itemStyle: {
            color: "#E98E39"
          },
          // barWidth: 50
        }
      ]
    };
    payOfferBarRef.value?.updateChart(payOfferBarOption.value);
  }

  const getpayOfferBarData = async (year: number) => {
    isUnderMode.value = false;
    const req = {
      json: {
        year,
        month: payOfferMonth.value,
        dimension: activeName.value === "first" ? "3,4" : "2"
      }
    };
    const res = await http.get(getOperationSalaryQuotationList, { params: req });
    updatePayOfferBarChart(res.data, year);
  }

  return {
    activeName,
    payOfferBarOption,
    payOfferBarRef,
    payOfferMonth,
    currMonth,
    leftData,
    isUnderMode,
    getpayOfferBarData,
    updatePayOfferBarChart
  }
}