export interface IJobTargetYearItem {
  recruitTarget: number; //招聘目标
  actualRecruit: number; //实际招聘
  recruitValue: number; //招聘差值
  recruitAdvanceRate: number; //招聘进度
  recruitTimeRate: number; //招聘时间消耗
  netGrowthTarget: number; //净增长目标
  actualNetGrowth: number; //实际净增长
  growthValue: number; //增长差值
  growthAdvanceRate: number; //增长进度
  growthTimeRate: number; //增长时间消耗
  month: number; //
}

export interface IJobTargetMonthItem extends IJobTargetYearItem {
  month: number; //
}

export interface IJobCostInfoListItem {
  year: number; //
  month: number; //
  areaId: string;
  areaName: string;
  artificialAverage: number; //人工月度平均
  artificialTotal: number; //人工总额
  bonusAverage: number; //奖金月度平均
  bonusTotal: number; //奖金总额
  channelAverage: number; //渠道月度平均
  channelTotal: number; //渠道总额
  deptId: string;
  deptName: string;
  id: string;
  pdu: string;
  pduId: string;
  personCostAverage: number; //人均入职成本
  statisticsName: string;// 统计名称
}
export interface IJobAllocationInfoListItem {
  allocationRate: number;
  successRate: number; //
  month: number; //
  year: number; //
}

export interface JobMergeRes {
  recruitReportYear: IJobTargetYearItem;
  recruitReportMonth: IJobTargetMonthItem[];
  recruitCostInfoList: IJobCostInfoListItem[];
  resourceAllocationInfoList: IJobAllocationInfoListItem[];
  netGrowthTargetMonth: IJobTargetYearItem[];
  netGrowthTargetYear: IJobTargetYearItem;
}