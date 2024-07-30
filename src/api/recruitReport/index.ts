/**
 * 招聘进展列表（GET）
 * @param deptName PS、CDCE、CS
 * @param type  “A”:按pdu  “B”：按客户 “C”:按招聘顾问
 */
// export const getRecruitProcessList = "/api/recruit/getRecruitProcessList";
export const getRecruitProcessList = "/src/assets/json/recruitReport/getRecruitProcessList.json";


/**
 * 需求完成情况
 * @param deptName PS、CDCE、CS
 * @param type   A：PDU B:客户 C：地域
 * @param startTime  
 * @param endTime  
 */
// export const getRequirementsCompletionList = "/api/recruit/getRequirementsCompletionList";
export const getRequirementsCompletionList = "/src/assets/json/recruitReport/getRequirementsCompletionList.json";

/**
 * 招聘顾问产能
 * @param deptName PS、CDCE、CS
 * @param startTime  
 * @param endTime  
 */
// export const getCapacityList = "/api/recruit/getCapacityList";
export const getCapacityList = "/src/assets/json/recruitReport/getCapacityList.json";

/**
 * 获取PDU和招聘顾问下拉框
 * @param deptName PS、CDCE、CS
 * @param type  A：PDU列表 B：招聘顾问列表 
 */
// export const getPDUAndHRList = "/api/recruit/getPDUAndHRList";
export const getPDUAndHRList = "/src/assets/json/recruitReport/getPDUAndHRList.json";

/**
 * 获取PDU和招聘顾问下拉框
 * @param deptName PS、CDCE、CS
 * @param type  A：PDU列表 B：招聘顾问列表 
 * @param publicCol  A：PDU列表 B：招聘顾问列表 
 */
// export const getOfferChangeRate = "/api/recruit/getOfferChangeRate";
export const getOfferChangeRate = "/src/assets/json/recruitReport/getOfferChangeRate.json";


/**
 * 获取PDU和招聘顾问下拉框
 * @param deptName PS、CDCE、CS
 */
// export const getBaseline = "/api/recruit/getBaseline";
export const getBaseline = "/src/assets/json/recruitReport/getBaseline.json";

/**
 * 获取PDU和招聘顾问下拉框
 * @param deptName PS、CDCE、CS
 */
export const saveBaseline = "/api/recruit/saveBaseline";

/**
 * 获取PDU和招聘顾问下拉框
 * @param type 
 * @param deptName PS、CDCE、CS
 */
export const recruitExport = "/api/recruit/export";