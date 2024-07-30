export interface PrjBaseItem {
  year: number;
  month: number;
}

export interface PrjBasicListItem extends PrjBaseItem {
  deptName: string; //部门名称
  waitComplete: number; // 待结项
  working: number; // 工作中
  notNormal: number; // 非正常终止
  completed: number; // 已结项
  completeRate: number; //结项完成率
  fpRate: number; // FP项目占比
}

export interface PrjGrossProfitItem {
  deptName: string; //部门
  pdu: string; //  pdu
  city: string; //  地域
  distribute10: number; //分布0%-10%
  distribute20: number; //  分布10%-20%
  distribute30: number; // 分布20%-30%
  distribute40: number; //  分布30%以上
  distributeRate: number; // 分布30%以下占比
}

export interface WIPInfoDataItem {
  deptName: string; //部门
  lastMonth12: number;//上年12月
  curMonth: number;// 当月
  lastYearFloat: number;// 较上年底浮动
}


export interface WIPCustomerDataItem {
  customName: string;// 客户
  monthRemaind: number;// 本月余额
  accountAge: number;// 长账龄
  delayDays: number;// 延期天数
}

export interface ProjectNotcompleteItem {
  deptName: string;
  typeA: number;
  typeAA: number;
  typeO: number;
  typeV: number;
  typeVV: number;
}

export interface ProjectNeedcompleteItem {
  completeRate: number;
  completed: number;
  deptName: string;
  fpRate: number;
  month: number;
  notNormal: number;
  waitComplete: number;
  working: number;
  year: number;
}

export interface ChargebackRemarkItem {
  dailyRegulation: number;// 日常违规数
  liquidatedDamages: number// 违约金数
  supplierAssess: number//供应商测评
  deptName: string
}

export interface ChargebackMonthItem {
  chargebackMonth: string;// 
  codeNum: number;// 
  csNum: number;//
  psNum: number;
}


export interface ProjectDeliveryInfo {
  deviance: string;//  偏差度
  levelNum: number//  个数
  levelRate: number; //分布占比
  riskLevel: string;//风险等级
  riskRemark: string// 风险备注
}

export interface DeliveryLevel {
  pdu: string;
  customName: string; //客户
  level1: number; //10%以下个数
  level2: number;//  （-）10%~（-）5%个数
  level3: number; //（-）5%~0%个数
  level4: number; // 0%~5%个数
  level5: number;  //5%~10%个数
  level6: number; //10%以上个数
}

export interface ProjecGrossItem {
  area: string; //地域&客户
  cost: number;//项目成本
  deptName: string;//部门
  gross: number;//毛利
  grossRate: number;//毛利率
  pdu: string;//pdu
  revenue: number;//收入
  salestax: number;//税金影响
}

export interface ARInfoItem {
  clearProjectCost: number;//未清项金额
  customName: string; // 客户
  daysUp90: number;//90天以上
  daysUp180: number;//180天以上
  daysUpYear: number;//1年以上
  deptName: string; // 部门
}

export interface LowGrossReasonItem {
  area: string; //地域
  deptName: string; //部门
  pdu: string; //pdu
  rate1: number; //实际投入比计划多占比
  rate2: number; //战略竞标项目占比
  rate3: number; //客户压缩预算占比
  rate4: number; //收入滞后占比
  rate5: number; //TM入项损耗占比
  rate6: number; //TS填写错误占比
  rate7: number; //交付扣款占比
  rate8: number; //PO合并看毛利正常占比
  rate9: number; //其他占比
}

export interface GrossRateItem {
  area: string; //地域
  deptName: string; //部门
  influence: number; //毛利未达标对利润影响金额（以32%为基线,单位：万元
  num6: number; //33%以上个数
  num7: number; //32%以下个数
  pdu: string; //pdu
  rate0: number; //不盈利占比
  rate1: number; //1%-10%占比
  rate2: number; //11%-15%占比
  rate3: number; //16%-20%占比
  rate4: number; //21%-28%占比
  rate5: number; //29%-32%占比
  rate6: number; //33%以上占比
  rate7: number; //32%以下占比
}

export interface PrjInfoItem {
  curValue: number;
  curValueA: number;
  curValueA1: number;
  curValueA2: number;
  curValueAA: number;
  curValueB: number;
  curValueC: number;
  curValueD: number;
  curValueE: number;
  curValueG: number;
  curValueK: number;
  curValueN: number;
  curValueS: number;
  curValueV: number;
  curValueVV: number;
  deptName: number;
  frontValue: number;
  frontValueA: number;
  frontValueA1: number;
  frontValueA2: number;
  frontValueAA: number;
  frontValueB: number;
  frontValueC: number;
  frontValueD: number;
  frontValueE: number;
  frontValueG: number;
  frontValueK: number;
  frontValueN: number;
  frontValueS: number;
  frontValueV: number;
  frontValueVV: number;
  sumValue: number;
  sumValueA: number;
  sumValueA1: number;
  sumValueA2: number;
  sumValueAA: number;
  sumValueB: number;
  sumValueC: number;
  sumValueD: number;
  sumValueE: number;
  sumValueG: number;
  sumValueK: number;
  sumValueN: number;
  sumValueS: number;
  sumValueV: number;
  sumValueVV: number;
}