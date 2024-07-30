export interface IProcessListItem {
  publicCol: string;// 第一个字段
  pushNum: number;// 今日推送量
  pushNumAdd: number;//  推送量较昨日
  firstNum: number;//  今日初面量
  firstNumAdd: number;//  初面量较昨日
  waitFirstNum: number;//  待初面
  waitFirstNumAdd: number;//  待初面较昨日
  waitTecNum: number;//  待技面
  waitTecNumAdd: number;//  待技面较昨日
  waitFinalNum: number;// 待综面
  waitFinalNumAdd: number;//  待综面较昨日
  waitReviewNum: number;//  待评审
  waitReviewNumAdd: number;//  待评审较昨日
  waitEntryNum: number;//  待入职
  waitEntryNumAdd: number;// 待入职较昨日
  entryNum: number;// 已入职
  entryNumAdd: number;// 已入职较昨日
}

export interface IProcessData {
  pushNumSum: number;//推送量
  pushNumAddSum: number;// 推送量同比昨天合计
  firstNumSum: number;// 初面合计
  firstNumAddSum: number;// 初面同比昨天合计
  waitFirstNumSum: number;// 待初面合计
  waitFirstNumAddSum: number;//待初面合计
  waitTecNumSum: number;//待技面合计
  waitTecNumAddSum: number;//待技面同比昨天合计
  waitFinalNumSum: number;//待综面合计
  waitFinalNumAddSum: number;// 待综面同比昨天
  waitReviewNumSum: number;//待评审合计
  waitReviewNumAddSum: number;//待评审同比昨天合计
  waitEntryNumSum: number;// 待入职合计
  waitEntryNumAddSum: number;//待入职同比昨天合计
  entryNumAddSum: number;//  待
  entryNumSum: number;//
  processList: IProcessListItem[]
}

export type ActiveType = "A" | "B" | "C";


export interface RequirementListItem {
  publicCol: string//(type=A时为PDU，=B时为项目经理，C时为城市名称）
  personNum: number;//需求数
  finishNum: number;//已完成
  timelyFinishNum: number;//及时完成
  finishRate: number;//需求完成率
  timelyFinishRate: number;//及时完成率
  pipeline: number;//管道中
  gap: number;//剩余缺口
  redNum: number; //红灯数量
  greenNum: number; //绿灯数量
  yellowNum: number; //黄灯数量
  blockNum: number; //阻塞数量
  closeNum: number; //关闭数量
  avgInit: number; //
  avgPush: number; //
  avgFirst: number; //
  avgTec: number; //
  avgFinal: number; //
  avgFirstToFinal: number; //
}

export interface RankCardListItem {
  requireName: string;// 需求名称
  remaindays: number;// 剩余天数
  residualgap: number;//需求缺口
}

export interface ICompleteData {
  personNumBU: number; //需求总人数
  finishNumBU: number; //已完成总数
  timelyFinishNumBU: number; //及时完成总数
  finishRateBU: number; //需求完成率
  timelyFinishRateBU: number; //及时完成率
  pipelineBU: number; //管道中
  gapBU: number; //剩余缺口
  redNum: number; //红灯数量（合计）
  greenNum: number; //绿灯数量（合计）
  yellowNum: number; //黄灯数量（合计）
  blockNum: number; //阻塞数量（合计）
  closeNum: number; //关闭数量（合计）
  avgPush: number; //关闭数量（合计）
  avgFirst: number; //关闭数量（合计）
  avgTec: number; //关闭数量（合计）
  avgFinal: number; //关闭数量（合计）
  avgFirstToFinal: number; //关闭数量（合计）
  requirementList: RequirementListItem[];
  redList: RankCardListItem[];
  blockList: RankCardListItem[];
}

export interface PDUAndHRListItem {
  buName: string;
  hrName: string;
  pduFid: string;
  pduName: string;
  publicCol: string;
}

export interface StageListItem {
  consumingDay: number;
  deptName?: string;
  id?: string;
  round?: number;
  sort: number;
  stageName: string;// "推送---初面"
}

export interface BaseLineItem {
  deptName: string;
  id: string;
  round: number;
  stageList: StageListItem[]
}
export interface BaseLineForm {
  deptName: string;
  round: number;
  stageList: StageListItem[]
}

export interface ConverData {
  entryRate: number;
  entryNum: number;
  finalRate: number;
  finalNum: number;
  firstRate: number;
  firstNum: number;  //初面通过人数
  hrName: string;
  pduName: string;
  publicCol: string;
  pushNum: number; //推送简历
  pushRate: number;
  reviewRate: number;
  reviewNum: number;
  tecNum: number; //技面通过人数
  tecRate: number;
}

export interface CapacityListItem {
  hrName: string;
  pushNum: number;
  waitEntryNum: number;
  entryNum: number;
  waitReviewNum: number;
  waitTalkNum: number;
  giveupNum: number;
}

export interface CapacityInnerItem {
  hrName: string;
  value: number;
  label: string;
  color: string;
}

export interface CapacityBarData {
  pushNum: CapacityInnerItem[];
  waitEntryNum: CapacityInnerItem[];
  entryNum: CapacityInnerItem[];
  waitReviewNum: CapacityInnerItem[];
  waitTalkNum: CapacityInnerItem[];
  giveupNum: CapacityInnerItem[];
}

export interface CircleData {
  num: number;
  num1: number;
  num2: number;
}
export interface CircleRef {
  updateCircle: (data?: CircleData) => void;
}