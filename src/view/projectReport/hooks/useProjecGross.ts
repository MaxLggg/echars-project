import { computed, onMounted, ref } from "vue";
import { DictItem, EchartsCardRef, ITabDataItem } from "../../../types/common/Index";
import { ProjecGrossItem } from "../../../types/projectReport";

export default function useProjecGross() {
  const grossTable1Data = ref<ProjecGrossItem[]>();
  const grossTable2Data = ref<ProjecGrossItem[]>();
  const grossTable3Data = ref<ProjecGrossItem[]>();
  // const grossTable1MonthOptions = ref<DictItem[]>([]);
  const grossTable1CurMonth = ref(new Date().getMonth() + 1)

  const grossTabs = ref<ITabDataItem[]>([
    { name: "1", label: "CS" },
    { name: "2", label: "PS" },
    { name: "3", label: "CDCE" },
  ]);

  const grossTabData = ref({
    month: grossTable1CurMonth.value,
    type: "1"
  });
  const isShowGrossTable2 = computed(() => grossTabData.value.type !== "3")

  const grossTable1Option = ref<echarts.EChartsOption>();
  const grossTable1Ref = ref<EchartsCardRef>();
  const grossTable2Option = ref<echarts.EChartsOption>();
  const grossTable2Ref = ref<EchartsCardRef>();
  const grossTable3Option = ref<echarts.EChartsOption>();
  const grossTable3Ref = ref<EchartsCardRef>();

  const buildOption = (
    data: ProjecGrossItem[],
    xAxisKey: "deptName" | "area" | "pdu"
  ): echarts.EChartsOption => {
    return {
      title: {
        text: "已签项目毛利情况"
      },
      legend: {
        data: ["毛利(万元)", "毛利率"],
        left: "right",
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
        // valueFormatter: val => `${val} 个数`
      },
      xAxis: {
        type: "category",
        data: data.map(d => d[xAxisKey]),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '万元'
        },
        {
          type: 'value',
          // name: '个数',
          axisLabel: {
            formatter: "{value}%"
          }
        },
      ],
      series: [
        {
          type: 'bar',
          name: '毛利(万元)',
          itemStyle: {
            color: "#1890FF"
          },
          data: data.map(d => d.gross),
          tooltip: {
            valueFormatter: val => `${val} 万元`
          }
        },
        {
          type: 'line',
          name: '毛利率',
          itemStyle: {
            color: "#2FC25B"
          },
          yAxisIndex: 1,
          data: data.map(d => d.grossRate),
          tooltip: {
            valueFormatter: val => `${val}%`
          }
        },
      ]
    }
  }

  /**
   * 刷新已签项目毛利情况chart
   * @param data [BD/BU维度盈利情况，各BU经营单位业务盈利情况，PDU维度]
   * @param type 
   */
  const updategrossTableChart = (
    data: [ProjecGrossItem[], ProjecGrossItem[], ProjecGrossItem[]],
    type: string
  ) => {
    grossTable1Option.value = buildOption(data[0], "deptName");
    grossTable1Ref.value?.updateChart(grossTable1Option.value);

    if (type !== "3") {
      grossTable2Option.value = buildOption(data[1], "area");
      grossTable2Ref.value?.updateChart(grossTable2Option.value);
    }

    grossTable3Option.value = buildOption(data[2], "pdu");
    grossTable3Ref.value?.updateChart(grossTable3Option.value);
  }

  return {
    grossTable1Data,
    grossTable2Data,
    grossTable3Data,
    grossTable1CurMonth,
    grossTabs,
    grossTabData,
    isShowGrossTable2,
    grossTable1Option,
    grossTable1Ref,
    grossTable2Option,
    grossTable2Ref,
    grossTable3Option,
    grossTable3Ref,
    updategrossTableChart,
  }
}