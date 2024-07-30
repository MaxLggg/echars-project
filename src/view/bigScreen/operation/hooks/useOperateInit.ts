import { ElLoading } from "element-plus";
import { ref } from "vue";
import { getOperationBuIncomeList, getOperationCostList, getOperationCustomertIncomeList, getOperationList, getOperationReturnDsoList, getOperationSalaryQuotationList, getOperationSgaList } from "../../../../api/operation";
import useGetYearMonth from "../../../../hooks/common/useGetYearMonth";
import { OperationData } from "../../../../types/operation/Index";
import http from "../../../../utils/http";
import useBigPrj from "./useBigPrj";
import useBuIncome from "./useBuIncome";
import useCard from "./useCard";
import useCostTable from "./useCostTable";
import useCustomerIncome from "./useCustomerIncomeBar";
import useDSO from "./useDSO";
import usePayOffer from "./usePayOffer";

export default function useOperateInit() {
  const { currentMonth } = useGetYearMonth();
  const { updateCardData } = useCard();
  const { updateCostTable } = useCostTable();
  const { updateBigPrjData } = useBigPrj();
  const { updateDSOData } = useDSO();
  const { updatePayOfferBarChart, payOfferMonth } = usePayOffer();
  const { updateIncomeBuBar } = useBuIncome();
  const { updateCustomerIncomeBar } = useCustomerIncome();

  const operationData = ref<OperationData>({
    cardData: {
      month: currentMonth.value,
      list: []
    },
    costTableData: [],
    bigPrjData: [],
    dsoData: [],
    salaryQuotationList: [],
    buIncomeList: [],
    customertIncomeList: []
  });
  const getOperationData = async (year: number, deptName: string[]) => {
    const loading = ElLoading.service();
    try {
      const req = {
        json: deptName.length === 1
          ? {
            year: year,
            deptName: deptName[0]
          }
          : {
            year: year,
            deptName: deptName[0],
            managerId: deptName[1]
          }
      };
      const [
        cardData,
        costList,
        sgaList,
        dsoList,
        salaryQuotationList,
        buIncomeList,
        customertIncomeList
      ] = await Promise.all([
        http.get(getOperationList, { params: req }),
        http.get(getOperationCostList, { params: req }),
        http.get(getOperationSgaList, { params: req }),
        http.get(getOperationReturnDsoList, { params: req }),
        http.get(getOperationSalaryQuotationList, {
          params: { json: { year, month: payOfferMonth.value, dimension: "3,4" } }
        }),
        http.get(getOperationBuIncomeList, {
          params: { json: { ...req.json, deptName: deptName[0] } }
        }),
        http.get(getOperationCustomertIncomeList, {
          params: { json: { year } }
        })
      ]);
      loading.close();
      // operationData.value.cardData = cardData.data;
      // operationData.value.costTableData = costList.data;
      // operationData.value.bigPrjData = sgaList.data;
      // operationData.value.dsoData = dsoList.data;
      // operationData.value.salaryQuotationList = salaryQuotationList.data;
      // operationData.value.buIncomeList = buIncomeList.data;
      // operationData.value.customertIncomeList = customertIncomeList.data;
      updateCardData(cardData.data);
      updateCostTable(costList.data);
      updateBigPrjData(sgaList.data);
      updateDSOData(dsoList.data);
      updatePayOfferBarChart(salaryQuotationList.data, year);
      updateIncomeBuBar(buIncomeList.data, year);
      updateCustomerIncomeBar(customertIncomeList.data, year);
    } catch (error) {
      loading.close();
    }
  }
  return { getOperationData, operationData }
}