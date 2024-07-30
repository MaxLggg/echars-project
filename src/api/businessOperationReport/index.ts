/**
 * 获取商务运营合同数据
 * @param year 年份
 * @param type 类型（1：非华为  2：华为  3：百特  4：金蝶 5：烽火）
 */
export const getSalesContractList = "/api/report/operation/getSalesContractList";

/**
 * 根据年度获取合同开票信息
 * @param year 年份
 */
export const getContractInvoiceList = "/api/report/operation/getContractInvoiceList";

/**
 * 根据年度获取非华为业务回款信息 
 * @param year 年份
 */
export const getCollectionList = "/api/report/operation/getCollectionList";

/**
 * 根据年度获取非华为业务招投标信息  
 * @param year 年份
 */
export const getBidInfoList = "/api/report/operation/getBidInfoList";

/**
 * 根据年度获取非华为业务招投标汇总信息 
 * @param year 年份
 */
export const getBidInfo = "/api/report/operation/getBidInfo";

/**
 * 根据年度获取采购合同签约情况 
 * @param year 年份
 */
export const getPurchaseContractList = "/api/report/operation/getPurchaseContractList";

/**
 * 根据年度和类型获取采购合同签约情况 
 * @param year 年份
 * @param type 类型  （1：总计 2：合同 3：非合同）
 */
export const getPurchaseContractByType = "/api/report/operation/getPurchaseContractByType";