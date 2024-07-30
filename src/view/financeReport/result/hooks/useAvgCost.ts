import { computed, onMounted, ref } from "vue";
import { getFinanceAverageCost } from "../../../../api/financeReport";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";
import { EchartsCardRef, LegendDataItem, TableColumnItem } from "../../../../types/common/Index";
import { AvgCostListItem } from "../../../../types/financeReport";
import http from "../../../../utils/http";

export default function useAvgCost() {
  // 默认当前月-1
  const avgCostMonth = ref(new Date().getMonth());
  const avgCostTableData = ref<AvgCostListItem[]>([]);

  let avgCostTableInitData: AvgCostListItem[] = [];

  const avgCostBarLineRef = ref<EchartsCardRef>()
  const legendData: LegendDataItem<AvgCostListItem>[] = [
    { label: "人均收入增长额", key: "dvalueIncome", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
    { label: "人均成本增长额", key: "dvalueCost", color: FINANCE_CHART_COLOR.GREEN, chartType: "bar" },
    { label: "人均收入增长率", key: "rateIncome", color: FINANCE_CHART_COLOR.BLUE, chartType: "line" },
    { label: "人本成本增长率", key: "rateCost", color: FINANCE_CHART_COLOR.GREEN, chartType: "line" },
  ]
  const avgCostOption = computed<echarts.EChartsOption>(() => {
    let chartData: AvgCostListItem[] = [];
    if (avgCostTableData.value.length > 0) {
      const year = avgCostTableData.value[0].year
      chartData = avgCostTableData.value.filter(item => item.year === year)
    }
    return {
      legend: {
        left: "center",
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
        }
      },
      xAxis: {
        type: "category",
        data: chartData.map(c => c.deptName),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        { type: 'value', name: '万元' },
        {
          type: 'value',
          axisLabel: {
            formatter: '{value} %'
          }
        }
      ],
      series: legendData.map(l => {
        return {
          name: l.label,
          type: l.chartType,
          yAxisIndex: l.chartType === "line" ? 1 : 0,
          tooltip: {
            valueFormatter: val => `${val} ${l.chartType === "bar" ? "万元" : "%"}`
          },
          itemStyle: {
            color: l.color
          },
          data: chartData.map(c => c[l.key])
        }
      })
    }
  });

  const allBUs = ["HWC", "CS", "CDCE", "PS"];

  const updateTableData = (data: AvgCostListItem[], year: number) => {
    avgCostTableInitData = [];
    const tempData = {
      averageCost: "--",
      averageHC: "--",
      averageIncome: "--",
      dvalueCost: "--",
      dvalueHC: "--",
      dvalueIncome: "--",
      hc: "--",
      rateCost: "--",
      rateHC: "--",
      rateIncome: "--"
    }
    allBUs.forEach(item => {
      avgCostTableInitData.push({ ...tempData, year, deptName: item })
      avgCostTableInitData.push({ ...tempData, year: year - 1, deptName: item })
    });
    avgCostTableData.value = avgCostTableInitData.map(item => {
      const temp = data.find(d => d.deptName === item.deptName && d.year === item.year);
      if (temp) {
        item = { ...temp };
      }
      return item;
    })
  }

  const getAvgCostData = async (year: number, month: number) => {
    const res = await http.get(getFinanceAverageCost, { params: { year, month } });
    updateTableData(res.data, year);
    avgCostBarLineRef.value?.updateChart(avgCostOption.value);
  }

  const avgTableColumns = computed<TableColumnItem<AvgCostListItem>[]>(
    () => {
      return [
        { label: "BU/BD", prop: "deptName", isPercent: false },
        { label: "年份", prop: "year", isPercent: false },
        { label: "累计月均HC", prop: "averageHC", isPercent: false },
        { label: `${avgCostMonth.value}月底HC`, prop: "hc", isPercent: false },
        { label: "HC增长额", prop: "dvalueHC", isPercent: false },
        { label: "HC增长率", prop: "rateHC", isPercent: true },
        { label: "累计人均收入", prop: "averageIncome", isPercent: false },
        { label: "人均收入增长额", prop: "dvalueIncome", isPercent: false },
        { label: "人均收入增长率", prop: "rateIncome", isPercent: true },
        { label: "累计人均成本", prop: "averageCost", isPercent: false },
        { label: "人均成本增长额", prop: "dvalueCost", isPercent: false },
        { label: "人均成本增长率", prop: "rateCost", isPercent: true },
      ]
    }
  )

  onMounted(() => {
    getAvgCostData(new Date().getFullYear(), avgCostMonth.value)
  })
  return {
    avgCostMonth,
    getAvgCostData,
    avgCostTableData,
    avgTableColumns,
    avgCostBarLineRef,
    avgCostOption
  }
}