export interface CardData1 {
  income: number;
  target: number;
  difference: number;
  rate: number;
  isIncrease: boolean;
  progress: number;
}

export interface ICardProps2 {
  title: string;
  label?: string;
  data: CardData1;
}

export interface DictItem {
  id?: string | number;
  value: string | number;
  label: string;
}

export interface EchartsCardRef {
  updateChart: (option: echarts.EChartsOption) => void;
  // chart: echarts.ECharts | null;
  getEchartsInstance: () => echarts.ECharts | null
}

export interface ITabDataItem {
  name: string;
  label: string;
  id?: string;
}

export interface LegendDataItem<T> {
  label: string;
  key: keyof T;
  color: string;
  chartType: "bar" | "line";
}


export interface UserInfo {
  username: string; //用户名
  password: string; //  密码
  number: string; //  工号
  name: string; //  姓名
  email: string; //
  phone: string; //
}

export interface EditUserInfo extends UserInfo {
  id: string; //
  status: string; //
}


export interface PageInfo {
  current: number;
  size: number;
  total: number;
  pages?: number
}

export interface ListResult<T> extends PageInfo {
  records: T[];
  hitCount: boolean;
  optimizeCountSql: boolean;
  searchCount: boolean;
}

export interface TableColumnItem<T> {
  label: string;
  prop: keyof T;
  isPercent?: boolean;
}

// 多级表头
export interface MultilayerTableColumnItem<T> {
  label: string;
  prop?: keyof T;
  isPercent?: boolean;
  child?: TableColumnItem<T>[]
}