import { computed, onMounted, ref } from "vue";
import { EchartsCardRef, LegendDataItem, TableColumnItem, MultilayerTableColumnItem } from "../../../../types/common/Index";
import { getFinanceCosts, getFinancePerCapitaExpenseRise } from "../../../../api/financeReport";
import { perCostFinanceCostsItem, perExpenseItem, expenseRiseItem, shareCostItem } from "../../../../types/financeReport"
import http from "../../../../utils/http";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";
import useGetYearMonth from "../../../../hooks/common/useGetYearMonth";
import { assertExportDefaultSpecifier } from "@babel/types";


export default function useCostItem() {
  const {
    currentYear,
    currentMonth
  } = useGetYearMonth()

  interface Month {
    EN: string;
    CH: string;
  }
  const MonthArr: Array<Month> = [
    { CH: "1月", EN: "January" },
    { CH: "2月", EN: "February" },
    { CH: "3月", EN: "March" },
    { CH: "4月", EN: "April" },
    { CH: "5月", EN: "May" },
    { CH: "6月", EN: "June" },
    { CH: "7月", EN: "July" },
    { CH: "8月", EN: "August" },
    { CH: "9月", EN: "September" },
    { CH: "10月", EN: "October" },
    { CH: "11月", EN: "November" },
    { CH: "12月", EN: "December" }
  ]

  const perCostTableColumns: TableColumnItem<perCostFinanceCostsItem>[] = [
    { label: "BU/BD", prop: "deptName", isPercent: false },
    ...MonthArr.map((el) => {
      return { label: el.CH, prop: `value${el.EN}`, isPercent: false } as TableColumnItem<perCostFinanceCostsItem>
    })
  ]

  const perExpenseLegendData: LegendDataItem<perExpenseItem>[] = [
    { label: "HWC", key: "valueHWC", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
    { label: "CS", key: "valueCS", color: FINANCE_CHART_COLOR.GREEN, chartType: "bar" },
    { label: "CDCE", key: "valueCODE", color: FINANCE_CHART_COLOR.YELLOW, chartType: "bar" },
    { label: "PS", key: "valuePS", color: FINANCE_CHART_COLOR.PURPLE, chartType: "bar" },
    { label: "人均基线", key: "baseLine", color: FINANCE_CHART_COLOR.PINK, chartType: "line" },
  ]

  const expenseRiseLegendData: LegendDataItem<expenseRiseItem>[] = [
    { label: "环比增长额", key: "riseValue", color: FINANCE_CHART_COLOR.BLUE, chartType: "bar" },
    { label: "环比增长率", key: "riseRate", color: FINANCE_CHART_COLOR.GREEN, chartType: "line" },
  ]

  const shareCostTableColumns: MultilayerTableColumnItem<shareCostItem>[] = [
    ...MonthArr.map((el) => {
      return {
        label: el.CH, isPercent: false, child: [
          {
            label: "成本(万元)", prop: `cost${el.EN}`, isPercent: false
          },
          {
            label: "人均(元)", prop: `capita${el.EN}`, isPercent: false
          }

        ]
      } as MultilayerTableColumnItem<shareCostItem>
    })
  ]

  // 成本率
  const costRateData = ref<perCostFinanceCostsItem[]>([]);
  // 人均报销
  const perExpenseData = ref<perExpenseItem[]>([]);
  const perExpenseRef = ref<EchartsCardRef>();
  const perExpenseOption = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        left: "right",
        data: perExpenseLegendData.map(b => b.label)
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
      },
      xAxis: {
        type: "category",
        axisPointer: {
          type: "shadow"
        },
        data: perExpenseData.value.map(b => b.month + '月')
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value} 元"
          }
        },
      ],
      series: perExpenseLegendData.map(l => {
        return {
          name: l.label,
          type: l.chartType,
          itemStyle: {
            color: l.color
          },
          tooltip: {
            valueFormatter: (val: any) => `${val}元`
          },
          data: perExpenseData.value.map(b => b[l.key])
        }
      })
    }
  });
  // 人均报销较上月环比
  const expenseRiseMonth = ref(currentMonth.value - 1)
  const expenseRiseData = ref<expenseRiseItem[]>([]);
  const expenseRiseRef = ref<EchartsCardRef>();
  const expenseRiseOption = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        left: "right",
        data: expenseRiseLegendData.map(b => b.label)
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
      },
      xAxis: {
        type: "category",
        axisPointer: {
          type: "shadow"
        },
        data: expenseRiseData.value.map(b => b.deptName)
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value} 元"
          }
        },
        {
          type: "value",
          axisLabel: {
            formatter: "{value} %"
          }
        },
      ],
      series: expenseRiseLegendData.map(l => {
        return {
          name: l.label,
          type: l.chartType,
          itemStyle: {
            color: l.color
          },
          tooltip: {
            // valueFormatter: (val: any) => `${val}${val} ${l.chartType === 'bar' ? '元' : '%'}}}`
            valueFormatter: val => `${val} ${l.chartType === 'bar' ? '元' : '%'}`
          },
          data: expenseRiseData.value.map(b => b[l.key])
        }
      })
    }
  })

  // 人均工位成本
  const perCostData = ref<perCostFinanceCostsItem[]>([]);
  // 中台分摊费用
  const shareCostData = ref<shareCostItem[]>([]);

  const getFinanceCostsData = async (year: number) => {
    const res = await http.get(getFinanceCosts, { params: { year } })
    costRateData.value = res.data.costRate;
    perExpenseData.value = res.data.perExpense;
    perExpenseRef.value?.updateChart(perExpenseOption.value);
    perCostData.value = res.data.perCost;
    shareCostData.value = res.data.shareCost;
  }

  const getFinancePerCapitaExpenseRiseData = async (year: number, month: number) => {
    const res = await http.get(getFinancePerCapitaExpenseRise, { params: { year, month } })
    expenseRiseData.value = res.data;
    expenseRiseRef.value?.updateChart(expenseRiseOption.value);
  }

  // onMounted(() => {
  //   getFinanceCostsData(currentYear.value)
  //   getFinancePerCapitaExpenseRiseData(currentYear.value, expenseRiseMonth.value)
  // })

  return {
    getFinanceCostsData,
    perCostTableColumns,
    costRateData,
    perExpenseRef,
    perExpenseOption,
    currentMonth,
    getFinancePerCapitaExpenseRiseData,
    expenseRiseMonth,
    expenseRiseData,
    expenseRiseRef,
    expenseRiseOption,
    perCostData,
    shareCostData,
    shareCostTableColumns
  }
}