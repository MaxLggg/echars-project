import { ref } from "vue";
import { EchartsCardRef, ITabDataItem } from "../../../types/common/Index";
import { ChargebackMonthItem, ChargebackRemarkItem } from "../../../types/projectReport";

export default function useChargeback() {
  const chargebackTabs = ref<ITabDataItem[]>([
    { name: "1", label: "按扣款原因" },
    { name: "2", label: "按扣款月份" }
  ]);

  const chargebackBarOption = ref<echarts.EChartsOption>();
  const chargebackBarRef = ref<EchartsCardRef>();

  const updateChargebackBarChart = (
    data: ChargebackRemarkItem[] | ChargebackMonthItem[],
    type: string,
  ) => {
    let option: echarts.EChartsOption = {};
    if (type === "1") {
      const tempData = [...data] as ChargebackRemarkItem[];
      option = {
        legend: {
          data: ["日常违规", "违约金", "供应商测评"],
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
          data: tempData.map((d) => d.deptName),
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
            name: "日常违规",
            type: "bar",
            stack: "bar",
            data: tempData.map(d => d.dailyRegulation),
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#1890FF"
            }
          },
          {
            name: "违约金",
            type: "bar",
            stack: "bar",
            data: tempData.map(d => d.liquidatedDamages),
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#2FC25B"
            }
          },
          {
            name: "供应商测评",
            type: "bar",
            stack: "bar",
            data: tempData.map(d => d.supplierAssess),
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#FACC14"
            }
          },
        ]
      }
    } else {
      const tempData = [...data] as ChargebackMonthItem[];
      option = {
        legend: {
          data: ["PS", "CS", "CDCE"],
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

          data: tempData.map(d => `${d.chargebackMonth}月`),
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
            name: "PS",
            type: "bar",
            stack: "bar",
            data: tempData.map(d => d.psNum),
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#1890FF"
            }
          },
          {
            name: "CS",
            type: "bar",
            stack: "bar",
            data: tempData.map(d => d.csNum),
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#2FC25B"
            }
          },
          {
            name: "CDCE",
            type: "bar",
            stack: "bar",
            data: tempData.map(d => d.codeNum),
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#FACC14"
            }
          },
        ]
      }
    }
    chargebackBarOption.value = option;
    chargebackBarRef.value?.updateChart(option)
  }

  return {
    chargebackTabs,
    chargebackBarOption,
    chargebackBarRef,
    updateChargebackBarChart,
  }
}