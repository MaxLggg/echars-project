
/**
 * 经营结果分析 - 收入
 * @param year 年
 * @param month 月
 * @param type 1: HWC   2: CS   3：PS  4:CDCE
 */
export const getFinanceCost = "/api/report/operation/getFinanceCost";

/**
 * 经营结果分析 - 收入
 * @param year 年
 * @param month 月
 */
export const getFinanceAverageCost = "/api/report/operation/getFinanceAverageCost";

/**
 * 经营结果分析 - 毛利率/费用率/贡献利润率
 * @param year 年
 * @param month 月
 */
export const getFinanceRate = "/api/report/operation/getFinanceRate";

/**
 * 经营结果分析 - 贡献利润
 * @param year 年
 * @param month 月
 */
export const getFinanceRiseRate = "/api/report/operation/getFinanceRiseRate";


/**
 * 收入结构分析 - 收入较基线值数据比对
 * @param year 年
 * @param type 1: HWC   2: CS   3：PS  4:CDCE
 */
export const getFinanceCostComparison = "/api/report/operation/getFinanceCostComparison";

/**
 * 收入结构分析 - BU 维度
 * @param year 年
 * @param month 月
 */
export const getFinanceCostByBu = "/api/report/operation/getFinanceCostByBu";

/**
 * 收入结构分析 - PDU/CU/业务线	
 * @param year 年
 * @param month 月
 * @param type 1: CS   2：PS  3:CDCE
 * @param dimension 1: PDU/CU维度   2: 业务线
 */
export const getFinanceCostByOther = "/api/report/operation/getFinanceCostByOther";

/**
 * 收入结构分析 - PDU/CU/业务线	
 * @param year 年
 * @param month 月
 * @param type 1: CS   2：PS  3:CDCE
 */
export const getFinanceCostMerge = "/api/report/operation/getFinanceCostMerge";

/**
 * 收入结构分析 - 客户维度 TOP 排名(当年，上一年) 排名比对 客户关闭计划
 * @param year 年
 */
export const getFinanceCustom = "/api/report/operation/getFinanceCustom";

/**
 * 收入结构分析 - 收入客户维度
 * @param year 年
 * @param month 月	
 */
export const getFinanceCostByCustom = "/api/report/operation/getFinanceCostByCustom";

/**
 * 收入结构分析 -关闭计划
 */
export const getFinanceClosePlan = "/api/report/operation/getFinanceClosePlan";

/**
 * 收入结构分析 -产品维度
 * @param year 年
 * @param type 1: HWC   2: CS   3：PS  4:CDCE
 */
export const getFinanceCostByEstate = "/api/report/operation/getFinanceCostByEstate";
/**
 * 成本结构分析 -成本子项
 * @param year 年
 * @param month 月
 * @param type 1: HWC   2: CS   3：PS  4:CDCE
 */

export const getFinanceCostItem = "/api/report/operation/getFinanceCostItem";
/**
 * 成本结构分析 -成本大项
 * @param year 年
 * @param month 月
 * @param type 1: HWC   2: CS   3：PS  4:CDCE
 */
export const getFinanceCostMajorTermMerge = "/api/report/operation/getFinanceCostMajorTermMerge";

/**
 * 成本结构分析 -费用率分析
 * @param year 年
 * @param month 月
 * @param type 1: HWC   2: CS   3：PS  4:CDCE
 */
export const getFinanceCostRate = "/api/report/operation/getFinanceCostRate";

/**
 * 实施人均成本 -人均成本 HC
 * @param year 年
 * @param type 1: HWC   2: CS   3：PS  4:CDCE
 */
export const getFinanceCapitaCost = "/api/report/operation/getFinanceCapitaCost";

/**
 * 实施人均成本 -成本率
 * @param year 年
 */
export const getFinanceCosts = "/api/report/operation/getFinanceCosts";
/**
 * 实施人均成本 -人均报销较上月环比
 * @param year 年
 * @param month 月
 */
export const getFinancePerCapitaExpenseRise = "/api/report/operation/getFinancePerCapitaExpenseRise";

/**
 * 财务BC报表数据
 * @param year 年
 * @param month 月
 */
export const getFinanceBC = "/api/report/operation/getFinanceBC";