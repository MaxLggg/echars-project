export interface SalesContractItem {
  month: number;
  sumCost: number;
  sumNum: number;
  year: number;
}

export type CustomerTabName = "first" | "second" | "third";

export interface BidInfoItem {
  bidNum: number;
  bidRate: number;
  sumNum: number;
}

export interface PurchaseTypeItem {
  purchaseType: string;
  sumCost: number;
  sumNum: number;
}