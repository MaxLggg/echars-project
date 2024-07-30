import { ref } from "vue";
import { ITabDataItem } from "../../../types/common/Index";
import { PrjInfoItem } from "../../../types/projectReport";


export interface ITableColItem {
  label: string;
  prop?: string
  children?: ITableColItem[]
}

type PrjInfoItemKey = keyof PrjInfoItem;
interface KeyObj { prop: PrjInfoItemKey; label: string; }

export default function usePrjInfo() {
  const prjInfoTabs = ref<ITabDataItem[]>([
    { name: "1", label: "立项项目总览" },
    { name: "2", label: "PO签订概况" },
    { name: "3", label: "PO签回计划及当前进展" },
  ]);

  const prjInfoTable1 = ref<PrjInfoItem[]>([]);
  const prjInfoTable2 = ref<PrjInfoItem[]>([]);
  const prjInfoTable3 = ref<PrjInfoItem[]>([]);
  const prjInfoColumns1 = ref<ITableColItem[]>([]);
  const prjInfoColumns2 = ref<ITableColItem[]>([]);
  const prjInfoColumns3 = ref<ITableColItem[]>([]);

  // const currentMonth=

  const colLabel = (key: string, number: number) => {
    // frontValue sumValue curValue
    const tempKey = key.substring(number);
    if (!tempKey) {
      return "总计"
    };
    if (tempKey === "AA" || tempKey === "VV") {
      return tempKey.substring(1) + "`";
    }
    return tempKey;
  }

  const buildColKey = (
    data: PrjInfoItem[],
    mark: "cur" | "front" | "sum",
    number: number = 8
  ) => {
    const allKeys: KeyObj[] = [];
    const zeroObj: KeyObj = {
      label: "总计",
      prop: mark === "cur"
        ? "curValue"
        : mark === "front"
          ? "frontValue"
          : "sumValue"
    }
    if (data.length === 0) {
      return [zeroObj]
    }
    Object.keys(data[0])
      .filter(k => k.startsWith(mark))
      // @ts-ignore
      .forEach((k: PrjInfoItemKey) => {
        allKeys.push({
          prop: k,
          label: colLabel(k, number)
        })
      });

    // const result: KeyObj[] = [];
    const tempResult: KeyObj[] = [];
    allKeys.forEach(key => {
      if (data.some(d => d[key.prop] > 0)) {
        tempResult.push(key);
      }
    });
    // 如果数据全部为0 直接返回
    if (tempResult.length === 0) {
      return [zeroObj];
    };
    // 排序
    let tempObj: KeyObj = {} as KeyObj;
    tempResult.forEach(item => {
      if (item.label === "总计")
        tempObj = item;
    });
    const result = tempResult.filter(item => item.label !== "总计");
    result.push(tempObj);
    return result;
  }

  const buildPrjInfoColumn = (data: PrjInfoItem[], month: number, year: number) => {
    prjInfoTable1.value = data;
    if (month === 1) {
      prjInfoColumns1.value = [
        { label: "1月", children: buildColKey(data, "cur") },
      ];
      prjInfoColumns2.value = [
        {
          label: "1月", children: [
            { label: "待签合同", prop: "curValueWaiting" },
            { label: "特殊申请", prop: "curValueSpecial" },
            { label: "已签合同", prop: "curValueSign" },
            { label: "总计", prop: "curValue" },
          ]
        },
      ];
      prjInfoColumns3.value = [
        {
          label: `${year}年1月`, children: [
            {
              label: "进展（是否签回）", children: [
                { label: "否", prop: "noPoNum1", },
                { label: "是", prop: "poNum1", }
              ]
            },
            {
              label: "计划", children: [
                { label: "汇总", prop: "num", },
              ]
            },
          ]
        }
      ];
      return;
    }
    prjInfoColumns1.value = [
      { label: `1-${+month - 1}月`, children: buildColKey(data, "front", 10) },
      { label: `${month}月`, children: buildColKey(data, "cur") },
      { label: "汇总", children: buildColKey(data, "sum") },
    ];
    prjInfoColumns2.value = [
      {
        label: `1-${+month - 1}月`, children: [
          { label: "待签合同", prop: "frontValueWaiting" },
          { label: "特殊申请", prop: "frontValueSpecial" },
          { label: "已签合同", prop: "frontValueSign" },
          { label: "总计", prop: "frontValue" },
        ]
      },
      {
        label: `${month}月`, children: [
          { label: "待签合同", prop: "curValueWaiting" },
          { label: "特殊申请", prop: "curValueSpecial" },
          { label: "已签合同", prop: "curValueSign" },
          { label: "总计", prop: "curValue" },
        ]
      },
      {
        label: "汇总", children: [
          { label: "待签合同", prop: "sumValueWaiting" },
          { label: "特殊申请", prop: "sumValueSpecial" },
          { label: "已签合同", prop: "sumValueSign" },
          { label: "总计", prop: "sumValue" },
        ]
      },
    ];
    const tempResult = []
    for (let i = 1; i <= month; i++) {
      tempResult.push({
        label: `${year}年${i}月`, children: [
          {
            // @ts-ignore
            label: "进展（是否签回）", children: [
              { label: "否", prop: `noPoNum${i}`, },
              { label: "是", prop: `poNum${i}`, }
            ]
          },
          {
            label: "计划", children: [
              { label: "汇总", prop: `num${i}`, },
            ]
          },
        ]
      });
    };
    prjInfoColumns3.value = tempResult;
  }

  return {
    prjInfoTabs,
    prjInfoColumns1,
    prjInfoTable1,
    prjInfoColumns2,
    prjInfoColumns3,
    buildPrjInfoColumn
  }
}