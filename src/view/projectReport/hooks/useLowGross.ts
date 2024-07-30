import { ref } from "vue";
import { EchartsCardRef, ITabDataItem, LegendDataItem } from "../../../types/common/Index";
import { LowGrossReasonItem } from "../../../types/projectReport";

export interface ITableDataItem {
  label: string;
  prop: keyof LowGrossReasonItem;
}

export default function useLowGross() {
  const lowGrossTabs = ref<ITabDataItem[]>([
    { name: "1", label: "BD/BU维度" },
    { name: "2", label: "PDU维度" },
    { name: "3", label: "地域维度" },
  ]);

  const lowGrossTableData = ref<LowGrossReasonItem[]>();
  const lowGrossOption = ref<echarts.EChartsOption>();
  const lowGrossRef = ref<EchartsCardRef>();


  const columnData = ref<ITableDataItem[]>();

  const buildColumn = (data: LowGrossReasonItem[]) => {
    const columns: ITableDataItem[] = [];
    const keys: Array<ITableDataItem> = [
      { label: "实际投入比计划多占比", prop: "rate1" },
      { label: "战略竞标项目占比", prop: "rate2" },
      { label: "客户压缩预算占比", prop: "rate3" },
      { label: "收入滞后占比", prop: "rate4" },
      { label: "TM入项损耗占比", prop: "rate5" },
      { label: "TS填写错误占比", prop: "rate6" },
      { label: "交付扣款占比", prop: "rate7" },
      { label: "PO合并看毛利正常占比", prop: "rate8" },
      { label: "其他占比", prop: "rate9" },
    ];
    keys.forEach(key => {
      if (data.some(d => d[key.prop] > 0)) {
        columns.push(key);
      }
    });
    return columns;
  }

  const updateLowGrossChart = (data: LowGrossReasonItem[], type: string) => {
    columnData.value = buildColumn(data);
    lowGrossTableData.value = data;
    const xAxisKey = type === "1" ? "deptName" : type === "2" ? "pdu" : "area";
    const legendData: LegendDataItem<LowGrossReasonItem>[] = [
      { label: "01-实际投入", key: "rate1", color: "#1890FF", chartType: "bar" },
      { label: "02-战略项目", key: "rate2", color: "#2FC25B", chartType: "bar" },
      { label: "03-客户压缩", key: "rate3", color: "#FACC14", chartType: "bar" },
    ]
    lowGrossOption.value = {
      title: { text: "原因分布占比" },
      legend: {
        data: legendData.map(l => l.label),
        left: "center",
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        },
        valueFormatter: val => `${val}%`
      },
      xAxis: {
        type: "category",
        data: data.map(d => d[xAxisKey]),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: "{value}%"
        }
      },
      series: legendData.map(l => ({
        name: l.label,
        type: "bar",
        // stack: "bar",
        // emphasis: {
        //   focus: "series"
        // },
        itemStyle: {
          color: l.color
        },
        data: data.map(d => d[l.key])
      }))
    };
    lowGrossRef.value?.updateChart(lowGrossOption.value);
  }

  return {
    columnData,
    lowGrossTabs,
    lowGrossTableData,
    lowGrossOption,
    lowGrossRef,
    updateLowGrossChart
  }
}