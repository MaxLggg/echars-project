import { onMounted, ref } from "vue";
import { getFinanceCost } from "../../../../api/financeReport";
import { ITabDataItem, TableColumnItem } from "../../../../types/common/Index";
import { IncomCostLitItem } from "../../../../types/financeReport";
import http from "../../../../utils/http";


export default function useIncome() {
  const inComeTabData = ref<ITabDataItem[]>([
    { name: "1", label: "HWC" },
    { name: "2", label: "CS" },
    { name: "3", label: "PS" },
    { name: "4", label: "CDCE" },
  ]);

  const inComeTab = ref("1");
  const inComeTableData = ref<IncomCostLitItem[]>([]);
  const getIncomeData = async (year: number, month: number, type: string) => {
    const res = await http.get(getFinanceCost, { params: { year, month, type } });
    inComeTableData.value = res.data;
  }

  const tableColumns: TableColumnItem<IncomCostLitItem>[] = [
    { label: "年份", prop: "year", isPercent: false },
    { label: "1月", prop: "valueJanuary", isPercent: false },
    { label: "2月", prop: "valueFebruary", isPercent: false },
    { label: "3月", prop: "valueMarch", isPercent: false },
    { label: "4月", prop: "valueApril", isPercent: false },
    { label: "5月", prop: "valueMay", isPercent: false },
    { label: "6月", prop: "valueJune", isPercent: false },
    { label: "7月", prop: "valueJuly", isPercent: false },
    { label: "8月", prop: "valueAugust", isPercent: false },
    { label: "9月", prop: "valueSeptember", isPercent: false },
    { label: "10月", prop: "valueOctober", isPercent: false },
    { label: "11月", prop: "valueNovember", isPercent: false },
    { label: "12月", prop: "valueDecember", isPercent: false },
    { label: "环比", prop: "rateChain", isPercent: true },
    { label: "Q1", prop: "valueQ1", isPercent: false },
    { label: "Q2", prop: "valueQ2", isPercent: false },
    { label: "Q3", prop: "valueQ3", isPercent: false },
    { label: "Q4", prop: "valueQ4", isPercent: false },
    { label: "H1", prop: "valueH1", isPercent: false },
    { label: "H2", prop: "valueH2", isPercent: false },
    { label: "Q1同比%", prop: "rateQ1", isPercent: true },
    { label: "Q2同比%", prop: "rateQ2", isPercent: true },
    { label: "Q3同比%", prop: "rateQ3", isPercent: true },
    { label: "Q4同比%", prop: "rateQ4", isPercent: true },
    { label: "H1同比%", prop: "rateH1", isPercent: true },
    { label: "H2同比%", prop: "rateH2", isPercent: true },
  ]

  onMounted(() => {
    getIncomeData(new Date().getFullYear(), 4, inComeTab.value);
  })

  return { inComeTabData, inComeTab, getIncomeData, inComeTableData, tableColumns }
}