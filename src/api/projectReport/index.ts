/**
 * 根据年度获取项目整体概况
 * @param year 年份
 * @param month 月份
 * @param type （1：项目总计  2：FP项目  3：非FP  4：D类）
 */
export const getProjectBasicList = "/api/report/operation/getProjectBasicList";

/**
 * 立项项目毛利分布
 * @param year 年份
 * @param month 月份
 * @param type （ 1：部门维度  2：地域维度  3：PDU维度）
 */
export const getProjectGrossRate = "/api/report/operation/getProjectGrossRate";
/**
 * 获取WIP余额
 * @param year 年份
 * @param month 月份
 * @param type （（ 1：存量整体情况  2：非终验法存量情况  3：终验法存量情况）
 */
export const getWIPRemain = "/api/report/operation/getWIPRemain";
/**
 * 获取WIP长账龄
 * @param year 年份
 * @param month 月份
 * @param type （ 1：部门维度  2：地域维度  3：PDU维度）
 */
export const getWIPAccountAge = "/api/report/operation/getWIPAccountAge";
/**
 * 立项项目毛利分布
 * @param year 年份
 * @param month 月份
 * @param type （ 1：非终验法存量情况  2：终验法存量情况）
 */
export const getWIPcustomStock = "/api/report/operation/getWIPcustomStock";

/**
 * 立项项目毛利分布
 * @param year 年份
 * @param month 月份
 */
export const getWIPcustomDelayDays = "/api/report/operation/getWIPcustomDelayDays";

/**
 * 获取超期未结项项目
 * @param year 年份
 * @param month 月份
 */
export const getProjectNotcomplete = "/api/report/operation/getProjectNotcomplete";

/**
 * 获取需结项项目
 * @param year 年份
 * @param month 月份
 */
export const getProjectNeedcomplete = "/api/report/operation/getProjectNeedcomplete";

/**
 * 扣款分析 按原因
 * @param year 年份
 */
export const getChargebackByRemark = "/api/report/operation/getChargebackByRemark";

/**
 * 扣款分析 按月份
 * @param year 年份
 */
export const getChargebackByMonth = "/api/report/operation/getChargebackByMonth";

/**
 * 进度与成本偏差信息
 * @param year 年份
 * @param month 月份
 */
export const getProjectDeliveryInfo = "/api/report/operation/getProjectDeliveryInfo";

/**
 * 进度与成本偏差占比分析
 * @param year 年份
 * @param month 月份
 */
export const getDeliveryLevel = "/api/report/operation/getDeliveryLevel";

/**
 * 项目毛利分析 BD/BU
 * @param year 年份
 * @param month 月份
 */
export const getProjectGross = "/api/report/operation/getProjectGross";

/**
 * 项目毛利分析  地域/客户维度
 * @param year 年份
 * @param month 月份
 * @param type 1: CS 地域维度  2：PS 客户维度
 */
export const getProjectGrossByArea = "/api/report/operation/getProjectGrossByArea";

/**
 * 项目毛利分析  PDU维度
 * @param year 年份
 * @param month 月份
 * @param type  1: CS   2：PS  3:CDCE
 */
export const getProjectGrossByPdu = "/api/report/operation/getProjectGrossByPdu";

/**
 * 项目毛利分析  PDU维度获取AR信息
 * @param year 年份
 * @param month 月份1
 * @param type  (1：Billed AR信息—BD/BU维度  2：Billed AR信息—客户维度 3:Unbilled AR—BD/BU维度 4:Unbilled AR—客户维度)
 */
export const getARInfo = "/api/report/operation/getARInfo";

/**
 * 低毛利原因分布情况
 * @param year 年份
 * @param month 月份
 * @param type   1: BD/BU维度   2  PDU维度  3：地域维度
 */
export const getGrossReasonDistribution = "/api/report/operation/getGrossReasonDistribution";

/**
 * 毛利分布占比情况
 * @param year 年份
 * @param month 月份
 * @param type   1: BD/BU维度 2 PDU维度  3 地域维度
 */
export const getGrossDistributionRatio = "/api/report/operation/getGrossDistributionRatio";

/**
 * PO签回计划及当前进展
 * @param year 年份
 * @param month 月份
 */
export const getProjectSignPO = "/api/report/operation/getProjectSignPO";

/**
 * PO签订概况
 * @param year 年份
 * @param month 月份
 */
export const getProjectProgressPO = "/api/report/operation/getProjectProgressPO";

/**
 * 立项项目总览
 * @param year 年份
 * @param month 月份
 */
export const getProjectOverview = "/api/report/operation/getProjectOverview";
