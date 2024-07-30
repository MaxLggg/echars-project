export interface OperateBase {
  deptName: string;
  year: string;
  id: string;
}
/**
 * 运营首页Card数据
 */
export interface OperateCardData extends OperateBase {
  statisticsName: string;
  calculateReach: number;
  target: number;
  dValue: number;
  advanceRate: number;
  isIncrease: boolean;
  lastYearRate: number;
  isNoData?: boolean;
  realityReach: number;
  unit?: string;
  month?: number;
}

export interface OperateCardDataRes {
  month: number;
  list: OperateCardData[]
}

/**
 * 统计类型 （0：预算  1：实际达成（未调整） 2：实际达成（已调整））
 */
export type StatisticsType = "0" | "1" | "2";

/**
 * 运营成本表格
 */
export interface CostTableItem extends OperateBase {
  income: number; //收入
  serviceCost: number; //服务成本
  grossProfitMargin: number; // 毛利率
  cost: number; //费用
  costRate: number;  //费用率
  manageRate: number; //管理费用率
  saleRate: number; //研发+销售费用率
  profitMargin: number; //净利率
  manageCashFlow: number; //现金流
  statisticsType: StatisticsType;
  month: number;
}

export interface BigPrjData extends OperateBase {
  developCost: number; //研发费用
  developRate: number; //研发费用占比
  manageCost: number; //管理费用
  manageRate: number; //管理费用占比
  saleCost: number; //销售费用
  saleRate: number; //销售费用占比
}

export interface OperateSimpleCardData {
  label: string;
  value: number;
  percent: number;
  bgWidth: number;
  bgColor: "#548AF8" | "#46C3D1" | "#E2635E";
}

export interface DSODataItem {
  month: number;
  value: number;
  isGrade: boolean;
  standardNum: number;
}

export interface DSOData extends OperateBase {
  dsoApril: number;
  dsoAugust: number;
  dsoDecember: number;
  dsoFebruary: number;
  dsoJanuary: number;
  dsoJuly: number;
  dsoJune: number;
  dsoMarch: number;
  dsoMay: number;
  dsoNovember: number;
  dsoNum: number;
  dsoOctober: number;
  dsoSeptember: number;
  standardNum: number;
}

/**
 * 统计维度(1:BU/PDU维度 2：大区维度)
 */
export type DimensionType = "1" | "2" | "3" | "4";

/**
 * 薪酬报价比
 */
export interface SalaryQuotationData extends OperateBase {
  dimension: DimensionType;
  category: string; //类别
  salaryQuotationRate: number; //薪酬报价比
  controlPersonRate: number; //管控人数占比
}

/**
 * BU收入占比
 */
export interface BuIncomeData extends OperateBase {
  statisticsName: string;// 统计名称
  calculateReach: number;// 现值
  target: number;// 预算
  cost: number;// 预算
  costRate: number;// 预算
  month: number;// 截止月份
}

/**
 * 客户收入占比分析
 */
export interface CustomertIncomeData extends OperateBase {
  customerGroup: string//客户组
  income: number//收入
  incomeRate: number// 收入占比
  month: number// 截止月份
}

export interface OperationData {
  cardData: OperateCardDataRes;
  costTableData: CostTableItem[];
  bigPrjData: BigPrjData[];
  dsoData: DSOData[];
  salaryQuotationList: SalaryQuotationData[];
  buIncomeList: BuIncomeData[];
  customertIncomeList: CustomertIncomeData[];
}


