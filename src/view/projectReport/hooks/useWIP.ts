import { ref } from "vue";
import { EchartsCardRef, ITabDataItem } from "../../../types/common/Index";
import { WIPCustomerDataItem, WIPInfoDataItem } from "../../../types/projectReport";

export default function useWIP() {
  const wipInfoTabs = ref<ITabDataItem[]>([
    { name: "1", label: "存量整体情况" },
    { name: "2", label: "非终验法存量情况" },
    { name: "3", label: "终验法存量情况" }
  ]);

  const wipRemainBarLineOption = ref<echarts.EChartsOption>();
  const wipRemainBarLineRef = ref<EchartsCardRef>();

  const wipAccountAgeBarLineOption = ref<echarts.EChartsOption>();
  const winAccountAgeBarLineRef = ref<EchartsCardRef>();

  function buildWipInfoOption(data: WIPInfoDataItem[], month: number, title: string): echarts.EChartsOption {
    const legendData = ["上年12月", `${month}月`, "较上年底浮动"]
    return {
      title: { text: title },
      legend: {
        data: legendData,
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
        valueFormatter: val => `${val} 万元`
      },
      xAxis: {
        type: "category",
        data: data.map(i => i.deptName),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '万元',
        },
        {
          type: 'value',
          name: '万元',
        },
      ],
      series: [
        {
          type: 'bar',
          name: legendData[0],
          data: data.map(i => i.lastMonth12),
          itemStyle: {
            color: "#1890FF"
          }
        },
        {
          type: 'bar',
          name: legendData[1],
          data: data.map(i => i.curMonth),
          itemStyle: {
            color: "#2FC25B"
          }
        },
        {
          type: 'line',
          name: legendData[2],
          data: data.map(i => i.lastYearFloat),
          yAxisIndex: 1,
          itemStyle: {
            color: "#FACC14"
          }
        },
      ]
    }
  }

  /**
   * 更新chart数据
   * @param data data[0] 余额数据  data[1] 长账龄数据
   * @param month 
   * @param type 1 WIP余额  2长账龄
   */
  const updateWipBarLineChart = (data: [WIPInfoDataItem[], WIPInfoDataItem[]], month: number) => {
    wipRemainBarLineOption.value = buildWipInfoOption(data[0], month, "WIP余额");
    wipRemainBarLineRef.value?.updateChart(wipRemainBarLineOption.value);

    wipAccountAgeBarLineOption.value = buildWipInfoOption(data[1], month, "WIP长账龄");
    winAccountAgeBarLineRef.value?.updateChart(wipAccountAgeBarLineOption.value);
  }

  const wipInfoCustomerTabs = ref<ITabDataItem[]>([
    { name: "1", label: "非终验法存量情况" },
    { name: "2", label: "终验法存量情况" }
  ]);

  const wipCustomerBarOption = ref<echarts.EChartsOption>();
  const wipCustomerBarRef = ref<EchartsCardRef>();

  const updateWipCustomerBarChart = (data: WIPCustomerDataItem[]) => {
    wipCustomerBarOption.value = {
      legend: {
        data: ["本月余额", "长账龄"],
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
        valueFormatter: val => `${val} 万元`
      },
      xAxis: {
        data: data.map(i => i.customName),
        type: "category",
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {
        type: 'value',
        name: '万元',
      },
      series: [
        {
          type: "bar",
          name: "本月余额",
          data: data.map(i => i.monthRemaind),
          itemStyle: {
            color: "#1890FF"
          }
        },
        {
          type: "bar",
          name: "长账龄",
          data: data.map(i => i.accountAge),
          itemStyle: {
            color: "#2FC25B"
          }
        }
      ]
    };
    wipCustomerBarRef.value?.updateChart(wipCustomerBarOption.value);
  }

  const wipDelayBarOption = ref<echarts.EChartsOption>();
  const wipDelayBarRef = ref<EchartsCardRef>();

  const updateWipDelayBarChart = (data: WIPCustomerDataItem[]) => {
    wipDelayBarOption.value = {
      title: {
        text: "客户组项目签订延期周期统计"
      },
      legend: {
        data: ["延期天数"]
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
        valueFormatter: val => `${val} 天`
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: 'category',
        data: data.map(i => i.customName),
        axisPointer: {
          type: "shadow"
        }
      },
      series: [{
        name: '延期天数',
        type: 'bar',
        data: data.map(i => i.delayDays),
        itemStyle: {
          color: "#1890FF"
        }
      }]
    }
    wipDelayBarRef.value?.updateChart(wipDelayBarOption.value);
  }

  return {
    wipInfoTabs,
    wipRemainBarLineOption,
    wipRemainBarLineRef,
    wipAccountAgeBarLineOption,
    winAccountAgeBarLineRef,
    updateWipBarLineChart,
    wipInfoCustomerTabs,
    wipCustomerBarOption,
    wipCustomerBarRef,
    updateWipCustomerBarChart,
    wipDelayBarOption,
    wipDelayBarRef,
    updateWipDelayBarChart,
  }
}