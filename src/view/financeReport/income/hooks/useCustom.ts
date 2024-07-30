import { onMounted, ref, computed } from "vue";
import { EchartsCardRef } from "../../../../types/common/Index";
import { FINANCE_CHART_COLOR } from "../../../../constants/financeReport";
import { getFinanceCustom } from "../../../../api/financeReport";
import { BUCostListItem, OtherCostFourItem, OtherCostThreeItem } from "../../../../types/financeReport";
import { ITabDataItem, TableColumnItem } from "../../../../types/common/Index";
import http from "../../../../utils/http";

export default function useCustom() {
  const curryearRankData = ref<BUCostListItem[]>([]);
  const lastyearRankData = ref<BUCostListItem[]>([]);
  // top5 排名
  const rankComparisonData = ref<OtherCostThreeItem[]>([]);
  const rankComparisonRef = ref<EchartsCardRef>();

  const rankComparisonOption = computed(() => (year: number): echarts.EChartsOption => {
    return {
      legend: {
        left: "right",
        data: [year + "年排名", year - 1 + "年排名"]
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
        data: rankComparisonData.value.map(b => b.custom)
      },
      yAxis: {
        type: "value",
        name: ""
      },
      series: [
        {
          name: year + "年排名",
          type: "bar",
          itemStyle: {
            color: FINANCE_CHART_COLOR.BLUE
          },
          data: rankComparisonData.value.map(l => l.rankCurYear)
        },
        {
          name: year - 1 + "年排名",
          type: "bar",
          itemStyle: {
            color: FINANCE_CHART_COLOR.GREEN
          },
          data: rankComparisonData.value.map(l => l.rankLastYear)
        },
      ]
    }
  })
  // 客户关闭计划
  const customerCloseData = ref<OtherCostFourItem[]>([]);
  const closePlanTableColumns: TableColumnItem<OtherCostFourItem>[] = [
    { label: "客户类型", prop: "customType", isPercent: false },
    { label: "清理方式", prop: "cleanWay", isPercent: false },
    { label: "业务类型", prop: "businessType", isPercent: false },
    { label: "客户组", prop: "customGroup", isPercent: false },
    { label: "客户名称", prop: "customName", isPercent: false },
    { label: "所属BD", prop: "bd", isPercent: false },
    { label: "开始合作日期", prop: "startCooperateTime", isPercent: false },
    { label: "等待回款金额", prop: "waitCost", isPercent: false },
    { label: "预计完成清理时间", prop: "planCleanOutTime", isPercent: false },
    { label: "状态", prop: "status", isPercent: false },
    { label: "责任人", prop: "principal", isPercent: false }
  ]

  const getCustomDaTa = async (year: number) => {
    const res = await http.get(getFinanceCustom, { params: { year } });
    curryearRankData.value = res.data.two;
    lastyearRankData.value = res.data.one;
    rankComparisonData.value = res.data.three;
    rankComparisonRef.value?.updateChart(rankComparisonOption.value(year));
    customerCloseData.value = res.data.four;
  }

  // onMounted(() => {
  //   getCustomDaTa(new Date().getFullYear());
  // });

  return {
    curryearRankData,
    lastyearRankData,
    rankComparisonData,
    customerCloseData,
    closePlanTableColumns,
    getCustomDaTa,
    rankComparisonRef,
    rankComparisonOption,
  }
}