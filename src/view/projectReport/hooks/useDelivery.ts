import { onMounted, ref } from "vue";
import { DictItem, EchartsCardRef, ITabDataItem, LegendDataItem } from "../../../types/common/Index";
import { DeliveryLevel, ProjectDeliveryInfo } from "../../../types/projectReport";

export default function useDelivery() {
  const deliveryTableData = ref<ProjectDeliveryInfo[]>();
  const deliveryCurMonth = ref<number>(new Date().getMonth() + 1)

  const deliveryBarOption = ref<echarts.EChartsOption>();
  const deliveryBarRef = ref<EchartsCardRef>();

  const updateDeliveryBarChart = (data: ProjectDeliveryInfo[]) => {
    const tempData = data.filter(d => d.deviance != "总计");
    deliveryBarOption.value = {
      title: {
        text: "进度与成本偏差占比分布",
        left: "left"
      },
      // legend: {},
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        },
        valueFormatter: val => `${val} %`
      },
      xAxis: {
        type: "category",
        data: tempData.map(d => d.deviance),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: [
        {
          // name: "日常违规",
          type: "bar",
          data: tempData.map(d => d.levelRate),
          itemStyle: {
            color: "#1890FF"
          }
        }
      ]
    };
    deliveryBarRef.value?.updateChart(deliveryBarOption.value);
  }

  const deliveryTabs = ref<ITabDataItem[]>([
    { name: "1", label: "PDU维度" },
    { name: "2", label: "客户维度" }
  ]);
  const deliveryTabName = ref("1");
  const deliveryStackBarOption = ref<echarts.EChartsOption>();
  const deliveryStackBarRef = ref<EchartsCardRef>();

  const updateDeliveryStackBarChart = (data: DeliveryLevel[], type: string) => {
    const legendData: LegendDataItem<DeliveryLevel>[] = [
      { label: "-10%以下", key: "level1", color: "#1890FF", chartType: "bar" },
      { label: "-10%~-5%", key: "level2", color: "#2FC25B", chartType: "bar" },
      { label: "-5%~0%", key: "level3", color: "#FACC14", chartType: "bar" },
      { label: "0%~5%", key: "level4", color: "#13C2C2", chartType: "bar" },
      { label: "5%~10%", key: "level5", color: "#8543E0", chartType: "bar" },
      { label: "10%以上", key: "level6", color: "#F2647C", chartType: "bar" },
    ]
    const xAxisKey = type === "1" ? "pdu" : "customName";
    deliveryStackBarOption.value = {
      legend: {
        left: "center",
        data: legendData.map(l => l.label)
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
        valueFormatter: val => `${val} 个数`
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
        name: '个数',
      },
      series: legendData.map(l => ({
        name: l.label,
        type: "bar",
        stack: "bar",
        emphasis: {
          focus: "series"
        },
        itemStyle: {
          color: l.color
        },
        data: data.map(d => d[l.key])
      }))
    };
    deliveryStackBarRef.value?.updateChart(deliveryStackBarOption.value);
  }

  return {
    deliveryTableData,
    deliveryCurMonth,
    deliveryBarOption,
    deliveryBarRef,
    updateDeliveryBarChart,
    deliveryStackBarOption,
    deliveryStackBarRef,
    updateDeliveryStackBarChart,
    deliveryTabs,
    deliveryTabName
  }
}