import _ from "lodash";
import { ref } from "vue";
import { OperateCardData, OperateCardDataRes } from "../../../../types/operation/Index";

/**
 * 处理card 相关业务
 * ../../../..returns 
 */
export default function useCard() {

  const titles = ["收入", "回款", "经营现金流", "贡献利润",
    "人均收入", "人均成本", "毛利率", "贡献利润率"
  ];
  const unitTitls = ["毛利率", "贡献利润率"];
  const cardArray: OperateCardData[] = titles.map(t => {
    if (unitTitls.includes(t)) {
      return {
        statisticsName: t,
        calculateReach: 0,
        target: 0,
        dValue: 0,
        advanceRate: 0,
        isIncrease: false,
        lastYearRate: 0,
        realityReach: 0,
        deptName: "",
        year: "",
        id: "",
        isNoData: true,
        unit: "%"
      }
    }
    return {
      statisticsName: t,
      calculateReach: 0,
      target: 0,
      dValue: 0,
      advanceRate: 0,
      isIncrease: false,
      lastYearRate: 0,
      realityReach: 0,
      deptName: "",
      year: "",
      id: "",
      isNoData: true,
    }
  });
  const endMonth = ref(new Date().getMonth() + 1);

  const cardData = ref<OperateCardData[]>(cardArray);

  const updateCardData = (data: OperateCardDataRes) => {
    endMonth.value = data.month;
    let obj: OperateCardData | undefined;
    const arr: OperateCardData[] = cardArray.map(c => {
      c.month = data.month;
      obj = data.list.find(d => d.statisticsName === c.statisticsName);
      if (obj) {
        if (unitTitls.includes(obj.statisticsName)) {
          obj.unit = "%"
        }
        obj.month = data.month;
        return obj
      }
      return c
    });
    cardData.value = arr;
  }
  return { cardData, updateCardData, endMonth }
}