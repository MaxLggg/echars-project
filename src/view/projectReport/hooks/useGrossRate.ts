import { ref } from "vue";
import { EchartsCardRef, ITabDataItem } from "../../../types/common/Index";
import { GrossRateItem } from "../../../types/projectReport";

export default function useGrossRate() {
  const grossRateTabs = ref<ITabDataItem[]>([
    { name: "1", label: "BD/BU维度" },
    { name: "2", label: "PDU维度" },
    { name: "3", label: "地域维度" },
  ]);
  const grossRate1Option = ref<echarts.EChartsOption>();
  const grossRate1Ref = ref<EchartsCardRef>();
  const grossRate2Option = ref<echarts.EChartsOption>();
  const grossRate2Ref = ref<EchartsCardRef>();
  const grossRate3Option = ref<echarts.EChartsOption>();
  const grossRate3Ref = ref<EchartsCardRef>();
  const grossRate4Option = ref<echarts.EChartsOption>();
  const grossRate4Ref = ref<EchartsCardRef>();
  const grossRateTable = ref<GrossRateItem[]>();

  const buildPie = (data: GrossRateItem[]): echarts.EChartsOption => {
    const pieKeys: Array<{ name: string; key: keyof GrossRateItem }> = [
      { name: "不盈利占比", key: "rate0" },
      { name: "1%-10%占比", key: "rate1" },
      { name: "11%-15%占比", key: "rate2" },
      { name: "16%-20%占比", key: "rate3" },
      { name: "21%-28%占比", key: "rate4" },
      { name: "29%-32%占比", key: "rate5" },
      { name: "33%以上占比", key: "rate6" },
    ]
    const centers = [
      ['25%', '30%'],
      ['75%', '30%'],
      ['25%', '75%'],
      ['75%', '75%'],
    ];
    const titlePositions = [
      { left: "5%" },
      { left: "55%", },
      { left: "5%", top: "50%" },
      { left: "55%", top: "50%" },
    ]
    return {
      title: data.map((d, index) => ({
        ...titlePositions[index],
        subtext: d.deptName,
        subtextStyle: {
          fontWeight: "bold"
        }
      })),
      tooltip: {
        show: true,
        trigger: 'item',
        valueFormatter: val => `${val}%`
      },
      series: data.map((d, index) => {
        return {
          type: "pie",
          radius: "30%",
          data: pieKeys.map(p => ({ name: p.name, value: d[p.key] as number })),
          center: centers[index],
          label: { formatter: "{b}：{d}%" }
        }
      })
    }
  }

  const updateGrossRateChart = (data: GrossRateItem[], type: string) => {
    if (type === "1") {
      grossRate1Option.value = buildPie(data);
      grossRate1Ref.value?.updateChart(grossRate1Option.value);

      grossRate2Option.value = {
        title: { text: "低毛利项目占比" },
        legend: {
          data: ["33%以上项目个数", "32%以下项目个数", "32%以下项目占比"],
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
          // valueFormatter: val => `${val} 个数`
        },
        xAxis: {
          type: "category",
          data: data.map(d => d.deptName),
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: [
          {
            type: 'value',
            name: "个数"
          },
          {
            type: 'value',
            axisLabel: {
              formatter: "{value}%"
            }
          },
        ],
        series: [
          {
            type: "bar",
            name: "33%以上项目个数",
            stack: "bar",
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#1890FF"
            },
            data: data.map(d => d.num6),
            tooltip: {
              valueFormatter: val => `${val} 个`
            }
          },
          {
            type: "bar",
            name: "32%以下项目个数",
            itemStyle: {
              color: "#2FC25B"
            },
            stack: "bar",
            emphasis: {
              focus: "series"
            },
            data: data.map(d => d.num7),
            tooltip: {
              valueFormatter: val => `${val} 个`
            }
          },
          {
            type: "line",
            name: "32%以下项目占比",
            yAxisIndex: 1,
            itemStyle: {
              color: "#FACC14"
            },
            data: data.map(d => d.rate7),
            tooltip: {
              valueFormatter: val => `${val}%`
            }
          },
        ]
      }
      grossRate2Ref.value?.updateChart(grossRate2Option.value);

      grossRate3Option.value = {
        title: { text: '毛利未达标对利润影响金额' },
        legend: {
          data: ["影响金额",],
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
          data: data.map(d => d.deptName),
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: {
          type: 'value',
          name: "万元"
        },
        series: [{
          type: "bar",
          name: "影响金额",
          itemStyle: {
            color: "#1890FF"
          },
          data: data.map(d => d.influence)
        }]
      };
      grossRate3Ref.value?.updateChart(grossRate3Option.value);

    } else {
      grossRateTable.value = data;
      grossRate4Option.value = {
        title: { text: "低毛利项目占比" },
        legend: {
          data: ["毛利未达标对利润影响金额", "32%以下项目占比"],
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
          // valueFormatter: val => `${val} 个数`
        },
        xAxis: {
          type: "category",
          data: data.map(d => type === "2" ? d.pdu : d.area),
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: [
          {
            type: 'value',
            name: "万元"
          },
          {
            type: 'value',
            axisLabel: {
              formatter: "{value}%"
            }
          },
        ],
        series: [
          {
            type: "bar",
            name: "毛利未达标对利润影响金额",
            itemStyle: {
              color: "#1890FF"
            },
            data: data.map(d => d.influence),
            tooltip: {
              valueFormatter: val => `${val} 个`
            }
          },
          {
            type: "line",
            name: "32%以下项目占比",
            yAxisIndex: 1,
            itemStyle: {
              color: "#FACC14"
            },
            data: data.map(d => d.rate7),
            tooltip: {
              valueFormatter: val => `${val}%`
            }
          },
        ]
      };
      grossRate4Ref.value?.updateChart(grossRate4Option.value);
    }
  }
  return {
    grossRateTabs,
    grossRate1Option,
    grossRate1Ref,
    grossRate2Option,
    grossRate2Ref,
    grossRate3Option,
    grossRate3Ref,
    grossRate4Option,
    grossRate4Ref,
    grossRateTable,
    updateGrossRateChart,
  }
}