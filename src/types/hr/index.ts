export interface HrCardItem {
  label: string;
  value: number;
  unit?: string;
}

export interface RankDataItem {
  I1: number;
  I2: number;
  I3: number;
  I4: number;
  I5: number;
  I6: number;
  I7: number;
  I8: number;
}

export interface HrPersonData {
  cadreCount: number;
  totalCount: number;
  turnoverRate: number;
  postDistribution: Object;
  rankDistribution: RankDataItem;
  skillDistribution: Object
}

export interface HrData {
  personData: HrPersonData
}

export interface HrCardDataItem {
  cadreCount: number;
  deptName?: string;
  id?: string;
  pdu?: string;
  pduId?: string;
  totalCount: number;
  turnoverRate: number;
  year?: number;
}

export interface HrCostSum {
  sumCost: number;
  subsidyCost: number;
  encourageCost: number;
}

export interface HrCostMonth extends HrCostSum {
  deptName: string;
  month: number;
  pduId: string;
  pdu: string;
}
export interface HrConstData {
  month: HrCostMonth[];
  sum: HrCostSum;
}

export interface HrSkillPieItem {
  pdu: string;
  pduId: string;
  skill: string;
  skillCount: string;
  skillProportion: number;
  year: number;
  value: number;
}

export interface HrPositionPieItem {
  pdu: string;
  pduId: string;
  post: string;
  postCount: string;
  postProportion: number;
  year: number;
  value: number;
}

export interface HrCadrePieItem {
  pdu: string;
  pduId: string;
  rank: string;
  rankCount: string;
  rankProportion: number;
  year: number;
  value: number;
}

export interface MergeResponse<T> {
  code: string;
  data: T;
  flag: string;
  message: string;
}

export interface HrPersonOutRateListItem {
  afterEntryNum: number;
  afterOutNum: number;
  curOnNum: number;
  deptName: string;
  id: string;
  month: number;
  newEntryNum: number;
  newOutNum: number;
  newOutRate: number;
  newOutRateBaseLine: number;
  outNum: number;
  outRate: number;
  outRateBaseLine: number;
  pdu: string;
  pduId: string;
  year: number;
}

export interface HrPersonEntryOutListItem {
  entryNum: number;
  outNum: number;
  newOutNum: number;
  month: number;
}

export interface HrLossRateListItem {
  churnRate: number;
  dateMonth: number;
  deptName: string;
  id: string;
  pdu: string;
  wastageRate: number;
  year: number;
}

export interface HrResponse {
  personCount: MergeResponse<HrCardDataItem[]>;
  personSkill: MergeResponse<HrSkillPieItem[]>;
  personDistribution: MergeResponse<HrCadrePieItem[]>;
  personPost: MergeResponse<HrPositionPieItem[]>;
  personOutRateList: MergeResponse<HrPersonOutRateListItem[]>;
  personEntryOutList: MergeResponse<HrPersonEntryOutListItem[]>;
  personCostPayInfo: MergeResponse<HrCardDataItem[]>;
}


