import { ref } from "vue";
import { BigPrjData, OperateSimpleCardData } from "../../../../types/operation/Index";

/**
 * 处理SG&A科目大项 相关业务 * 
 */
export default function useBigPrj() {

  const bigPrjData = ref<OperateSimpleCardData[]>([]);

  const updateBigPrjData = (data: BigPrjData[]) => {
    let singleData = {
      saleCost: 0,
      saleRate: 0,
      manageCost: 0,
      manageRate: 0,
      developCost: 0,
      developRate: 0,
      total: 0
    };
    if (data.length > 0) {
      singleData = { ...data[0], total: 0 };
      singleData.total = singleData.saleCost + singleData.manageCost + singleData.developCost;
    }
    bigPrjData.value = [
      {
        label: "销售费用",
        value: singleData.saleCost,
        percent: singleData.saleRate,
        bgColor: "#548AF8",
        bgWidth: singleData.total > 0 ? Math.round(singleData.saleCost / singleData.total * 100) : 33
      },
      {
        label: "管理费用",
        value: singleData.manageCost,
        percent: singleData.manageRate,
        bgColor: "#46C3D1",
        bgWidth: singleData.total > 0 ? Math.round(singleData.manageCost / singleData.total * 100) : 33
      },
      {
        label: "研发费用",
        value: singleData.developCost,
        percent: singleData.developRate,
        bgColor: "#E2635E",
        bgWidth: singleData.total > 0 ? Math.round(singleData.developCost / singleData.total * 100) : 33
      },
    ];
  }
  return { bigPrjData, updateBigPrjData }
}