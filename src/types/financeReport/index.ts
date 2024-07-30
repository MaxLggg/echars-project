export interface IncomCostLitItem {
  rateChain: number;
  rateH1: number;
  rateH2: number;
  rateQ1: number;
  rateQ2: number;
  rateQ3: number;
  rateQ4: number;
  valueApril: number;
  valueAugust: number;
  valueDecember: number;
  valueFebruary: number;
  valueH1: number;
  valueH2: number;
  valueJanuary: number;
  valueJuly: number;
  valueJune: number;
  valueMarch: number;
  valueMay: number;
  valueNovember: number;
  valueQ1: number;
  valueQ2: number;
  valueQ3: number;
  valueQ4: number;
  valueSeptember: number;
  valueOctober: number;
  year: number;
}

export interface AvgCostListItem {
  averageCost: number | string;
  averageHC: number | string;
  averageIncome: number | string;
  deptName: string;
  dvalueCost: number | string;
  dvalueHC: number | string;
  dvalueIncome: number | string;
  hc: number | string;
  rateCost: number | string;
  rateHC: number | string;
  rateIncome: number | string;
  year: number;
}

export interface FinanceRateListItem {
  contribution: number;
  contributionDvaleRate: number;
  contributionDvaleValue: number;
  contributionRate: number;
  contributionRiseRate: number;
  costRate: number;
  costRiseRate: number;
  deptName: string;
  grossRate: number;
  grossRiseRate: number;
  year: number;
}

export interface BaseCompareListItem {
  baseValue: number;
  month: number;
  sumIncome: number;
}

export interface BUCostListItem {
  rateIncome: number;
  statisticsValue: string;
  sumIncome: number;
}
export interface OtherCostListItem {
  statisticsValue: string;
  sumIncome: number;
}

export interface OtherCostThreeItem {
  custom: string;
  rowNum: number;
  sumIncome: number;
  rankLastYear: string,
  rankCurYear: string,
  year: number;
}
export interface OtherCostFourItem {
  customType: string;
  cleanWay: string;
  businessType: string;
  customGroup: string;
  customName: string;
  bd: string;
  startCooperateTime: string;
  waitCost: string;
  planCleanOutTime: string;
  status: string;
  principal: string;
}

export interface MonthIncomeItem {
  statisticsValue: string;
  sumIncome: string;
}

export interface costByEstateItem {
  month: string
  valueBPO: string
  valueNumber: string
  valueITO: string
  rateBPO: string
  rateNumber: string
  rateITO: string
}

export interface financeCostItem {
  item: string
  cost: string
  costRate: string
}

export interface majorTermItem {
  item: string
  cost: string
  costRate: string
  curYearCost: string
  curYearCostRate: string
  lastYearCost: string
  lastYearCostRate: string
  sumCost: string
}

export interface costRateItem {
  baseLine: string
  cost: string
  costRate: string
  item: string
}

export interface capitaCostItem {
  month: string
  hc: string
  capitaCost: string
  riseRate: string
}

export interface perCostFinanceCostsItem {
  deptName: string;
  valueJanuary: string;
  valueFebruary: string;
  valueMarch: string;
  valueApril: string;
  valueMay: string;
  valueJune: string;
  valueJuly: string;
  valueAugust: string;
  valueSeptember: string;
  valueOctober: string;
  valueNovember: string;
  valueDecember: string;
}

export interface perExpenseItem {
  baseLine: string
  month: string
  valueCODE: string
  valueCS: string
  valueHWC: string
  valuePS: string
}

export interface expenseRiseItem {
  deptName: string
  riseRate: string
  riseValue: string
}

export interface shareCostItem {
  capitaApril: string
  capitaAugust: string
  capitaDecember: string
  capitaFebruary: string
  capitaJanuary: string
  capitaJuly: string
  capitaJune: string
  capitaMarch: string
  capitaMay: string
  capitaNovember: string
  capitaOctober: string
  capitaSeptember: string
  costApril: string
  costAugust: string
  costDecember: string
  costFebruary: string
  costJanuary: string
  costJuly: string
  costJune: string
  costMarch: string
  costMay: string
  costNovember: string
  costOctober: string
  costSeptember: string
  deptName: string
}

export interface FinanceBCListItem {
  deptName: string;
  grossRate: number;
  costRate: number;
  manageCostRate: number;
  salesCostRate: number;
  developCostRate: number;
  contributionRate: number;
  bgColor: string;
}





