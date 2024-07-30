import { ref } from "vue";
import { getFinanceBC } from "../../../../api/financeReport";
import { FinanceBCListItem } from "../../../../types/financeReport";
import http from "../../../../utils/http";

export default function useGetCardTree() {
  const cardTreeData = ref<FinanceBCListItem[]>([]);

  const cardTreeMonth = ref(new Date().getMonth());

  const getCardTreeData = async (year: number, month: number) => {
    const res = await http.get<FinanceBCListItem[]>(getFinanceBC, { params: { year, month } });
    cardTreeData.value = res.data.map(item => {
      switch (item.deptName) {
        case "HWC":
          item.bgColor = "#98B9FB"
          break;
        case "CS":
          item.bgColor = "#FCE589"
          break;
        case "CDCE":
          item.bgColor = "#93ECE6"
          break;
        case "PS":
          item.bgColor = "#97E1AD"
          break;
        default:
          break;
      }
      return item
    });
  }

  return {
    cardTreeData,
    cardTreeMonth,
    getCardTreeData
  }
}