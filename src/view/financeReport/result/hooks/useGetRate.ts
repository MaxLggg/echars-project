import { computed, onMounted, ref } from "vue";
import { getFinanceRate, getFinanceRiseRate } from "../../../../api/financeReport";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";
import { EchartsCardRef, LegendDataItem } from "../../../../types/common/Index";
import { FinanceRateListItem } from "../../../../types/financeReport";
import http from "../../../../utils/http";

export default function useGetRate() {
  // 默认当前月-1
  const rateMonth = ref(new Date().getMonth());
  const rateData = ref<FinanceRateListItem[]>([]);
  const currentYear = ref(new Date().getFullYear());
  // 毛利率
  const grossRateLineRef = ref<EchartsCardRef>();
  const grossRateLineOption = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "毛利率" },
      legend: {
        left: "center",
        data: [currentYear.value + "", currentYear.value - 1 + ""]
      },
      tooltip: {
        show: true,
        trigger: "axis",
        valueFormatter: val => `${val} %`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        data: rateData.value
          .filter(r => r.year === currentYear.value)
          .map(r => r.deptName),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} %"
        }
      },
      series: [
        {
          type: "line",
          name: currentYear.value + "",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          data: rateData.value
            .filter(r => r.year === currentYear.value)
            .map(r => r.grossRate)
        },
        {
          type: "line",
          name: currentYear.value - 1 + "",
          itemStyle: {
            color: FINANCE_CHART_COLOR.GREEN
          },
          data: rateData.value
            .filter(r => r.year === currentYear.value - 1)
            .map(r => r.grossRate)
        }
      ]
    }
  });
  // 费用率
  const costRateLineRef = ref<EchartsCardRef>();
  const costRateLineOption = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "费用率" },
      legend: {
        left: "center",
        data: [currentYear.value + "", currentYear.value - 1 + ""]
      },
      tooltip: {
        show: true,
        trigger: "axis",
        valueFormatter: val => `${val} %`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        data: rateData.value
          .filter(r => r.year === currentYear.value)
          .map(r => r.deptName),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} %"
        }
      },
      series: [
        {
          type: "line",
          name: currentYear.value + "",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          data: rateData.value
            .filter(r => r.year === currentYear.value)
            .map(r => r.costRate)
        },
        {
          type: "line",
          name: currentYear.value - 1 + "",
          itemStyle: {
            color: FINANCE_CHART_COLOR.GREEN
          },
          data: rateData.value
            .filter(r => r.year === currentYear.value - 1)
            .map(r => r.costRate)
        }
      ]
    }
  });
  // 贡献利润率
  const contributionRateLineRef = ref<EchartsCardRef>();
  const contributionRateLineOption = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "贡献利润率" },
      legend: {
        left: "center",
        data: [currentYear.value + "", currentYear.value - 1 + ""]
      },
      tooltip: {
        show: true,
        trigger: "axis",
        valueFormatter: val => `${val} %`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        data: rateData.value
          .filter(r => r.year === currentYear.value)
          .map(r => r.deptName),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} %"
        }
      },
      series: [
        {
          type: "line",
          name: currentYear.value + "",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          data: rateData.value
            .filter(r => r.year === currentYear.value)
            .map(r => r.contributionRate)
        },
        {
          type: "line",
          name: currentYear.value - 1 + "",
          itemStyle: {
            color: FINANCE_CHART_COLOR.GREEN
          },
          data: rateData.value
            .filter(r => r.year === currentYear.value - 1)
            .map(r => r.contributionRate)
        }
      ]
    }
  });
  // 增长率
  const riseRateLineRef = ref<EchartsCardRef>();

  const legendData: LegendDataItem<FinanceRateListItem>[] = [
    { label: "毛利率", key: "grossRiseRate", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
    { label: "费用率", key: "costRiseRate", color: FINANCE_CHART_COLOR.GREEN, chartType: "bar" },
    { label: "贡献利润率", key: "contributionRiseRate", color: FINANCE_CHART_COLOR.YELLOW, chartType: "bar" },
  ];
  // const labelPosition={
  //   bottom:{

  //   }
  // }
  const riseRateLineOption = computed<echarts.EChartsOption>(() => {
    // const data = rateData.value.filter(r => r.year === currentYear.value);
    return {
      title: { text: "增长率" },
      legend: {
        left: "center",
        data: legendData.map(l => l.label)
      },
      tooltip: {
        show: true,
        trigger: "axis",
        valueFormatter: val => `${val} %`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        data: contributionRseData.value.map(r => r.deptName),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} %"
        }
      },
      series: legendData.map(l => {
        return {
          type: l.chartType,
          name: l.label,
          itemStyle: {
            color: l.color
          },
          data: contributionRseData.value.map(r => r[l.key])
        }
      })
    }
  });



  const getRateData = async (year: number, month: number) => {
    const res = await http.get(getFinanceRate, { params: { year, month } });
    rateData.value = res.data;
    grossRateLineRef.value?.updateChart(grossRateLineOption.value);
    costRateLineRef.value?.updateChart(costRateLineOption.value);
    contributionRateLineRef.value?.updateChart(contributionRateLineOption.value);
  }

  const contributionMonth = ref(new Date().getMonth() + 1);
  const contributionRseData = ref<FinanceRateListItem[]>([]);
  const contributionBarRef = ref<EchartsCardRef>();
  const contributionBarOption = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "贡献利润" },
      legend: {
        left: "center",
        data: ["增长额", "增长率"]
      },
      tooltip: {
        show: true,
        trigger: "axis",
        // valueFormatter: val => `${val} %`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        axisPointer: {
          type: "shadow"
        },
        data: contributionRseData.value.map(c => c.deptName)
      },
      yAxis: [
        { type: "value", name: "万元" },
        {
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
      ],
      series: [
        {
          type: "bar",
          name: "增长额",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          tooltip: {
            valueFormatter: val => `${val} 万元`,
          },
          data: contributionRseData.value.map(c => c.contributionDvaleValue)
        },
        {
          type: "line",
          name: "增长率",
          itemStyle: {
            color: FINANCE_CHART_COLOR.GREEN
          },
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: val => `${val} %`,
          },
          // data: contributionRseData.value.map(c => c.contributionDvaleRate)
          // 增长额是正数，增长率是负数也应显示正数 增长额是负数，增长率是正数也应显示负数（以增长额为准）
          data: contributionRseData.value.map(c => c.contributionDvaleValue >= 0
            ? Math.abs(c.contributionDvaleRate)
            : -Math.abs(c.contributionDvaleRate)
          )
        },
      ]
    }
  });

  const getContributionData = async (year: number, month: number) => {
    const res = await http.get(getFinanceRiseRate, { params: { year, month } });
    contributionRseData.value = res.data;
    contributionBarRef.value?.updateChart(contributionBarOption.value);
    riseRateLineRef.value?.updateChart(riseRateLineOption.value);
  }

  const getAllRateData = (year: number, month: number) => {
    currentYear.value = year;
    getRateData(year, month);
    getContributionData(year, month);
  }

  // onMounted(() => {
  //   // getAllRateData(new Date().getFullYear(), rateMonth.value);
  // })
  return {
    rateMonth,
    getAllRateData,
    grossRateLineRef,
    grossRateLineOption,
    costRateLineRef,
    costRateLineOption,
    contributionRateLineRef,
    contributionRateLineOption,
    riseRateLineRef,
    riseRateLineOption,
    getContributionData,
    contributionMonth,
    contributionBarRef,
    contributionBarOption
  }
}