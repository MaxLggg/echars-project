export interface PersonDistributionListItem {
  deptName: string;//部门
  haiwaiNum: number;//海外
  huazhongNum: number;//华东
  xinanNum: number;//西南
  xibeiNum: number;//西北
  huabeiNum: number;//华北
  huadongNum: number;//华东
  huananNum: number;//华南
}

export interface PersonOutListItem {
  deptName: string;//部门
  beidongNum: number;
  zhudongNum: number;
}

export interface PersonRemarkListItem {
  num: number;//部门
  remark: string;
}

export interface PersonInOutListItem {
  inNum: number;
  outNum: number;
  month: number;
}

export interface PersonEncourageListItem {
  hwcMoney: number;
  psMoney: number;
  cdceMoney: number;
  csMoney: number;
  month: number;
}
export interface PersonEncourageUserListItem {
  user: string;
  money: number;
}
export interface CertificationInfoListItem {
  level1Num: number;
  level2Num: number;
  level3Num: number;
  level4Num: number;
  level5Num: number;
  role: string;
}
export interface PromoteInfoListItem {
  num: number;
  type: string;
}
export interface OutInfoListItem {
  churnNum: number;
  month: number;
  outNum: number;
}