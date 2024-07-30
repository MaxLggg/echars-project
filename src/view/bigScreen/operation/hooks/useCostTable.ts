import { computed, ref } from "vue";
import { CostTableItem } from "../../../../types/operation/Index";

/**
 * 处理成本结构相关业务
 * ../../../..returns 
 */
export default function useCostTable() {

  const costTableData = ref<CostTableItem[]>([]);
  const costTableMonth = computed(() => {
    if (costTableData.value.length > 0) {
      return costTableData.value[0].month
    }
    return 0
  })

  const updateCostTable = (data: CostTableItem[]) => {
    costTableData.value = data;
  }

  const tableRowClassName = ({ row }: { row: CostTableItem }) => {
    switch (row.statisticsType) {
      case "0":
        return "budgetRow";
      case "1":
        return "actualUnadjustedRow";
      case "2":
        return "actualAdjustedRow";
      default:
        return "";
    }
  };

  return { costTableData, costTableMonth, updateCostTable, tableRowClassName }
}