/**
 * 人力分布
 */
export const getPersonDistribution = "/api/report/person/getPersonDistribution";

/**
 * 各离职类型的人数分布
 * @param year
 */
export const getOutByType = "/api/report/person/getOutByType";

/**
 * 各离职原因分类的人数分布
 * @param year
 * @param deptName
 */
export const getOutByRemark = "/api/report/person/getOutByRemark";

/**
 * 各BU转入转出人数
 * @param year
 * @param deptName
 */
export const getInOutList = "/api/report/person/getInOutList";

/**
 * 各BU在各激励类型上总金额
 * @param year
 * @param type FP项目激励，多元化激励，骨干激励，绩效奖金，客户支付奖金，年终奖，其他及时激励，PDU主管岗位激励，PM岗位津贴，导师津贴
 */
export const getEncourageMoney = "/api/report/person/getEncourageMoney";

/**
 * 激励金额在前10
 * @param year
 */
export const getEncourageUser = "/api/report/person/getEncourageUser";

/**
 * 各类型认证角色及等级的人数
 * @param year
 * @param deptName
 */
export const getCertificationInfo = "/api/report/person/getCertificationInfo";

/**
 * 种晋升类型的人数分布
 * @param year
 */
export const getPromoteInfo = "/api/report/person/getPromoteInfo";

/**
 * 各调薪类型上总金额
 * @param year
 * @param type TM框架调薪，TM调级调薪，降薪，年度调薪
 */
export const getSalaryInfo = "/api/report/person/getSalaryInfo";

/**
 * 各各月离职人数/流失人数
 * @param year
 * @param deptName 
 */
export const getOutInfo = "/api/report/person/getOutInfo";