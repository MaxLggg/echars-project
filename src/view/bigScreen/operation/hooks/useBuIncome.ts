import { ref } from "vue";
import { EchartsCardRef } from "../../../../types/common/Index";
import { BuIncomeData } from "../../../../types/operation/Index";

export default function useBuIncome() {
  const incomeBuBarOption = ref<echarts.EChartsOption>()
  const incomeBuBarRef = ref<EchartsCardRef>();

  const updateIncomeBuBar = (data: BuIncomeData[], year: number) => {
    const month = data.length > 0 ? data[0].month : new Date().getMonth() + 1;
    incomeBuBarOption.value = {
      title: {
        text: `收入占比分析(BU) {small|${year === new Date().getFullYear() ? `截止${year}年${month || '--'}月` : `${year}全年`}}`,
        left: "3%",
        textStyle: {
          fontSize: 24,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          color: "#000",
          rich: {
            small: {
              fontSize: 12,
              color: "#ccc"
            }
          }
        }
      },
      legend: {
        data: ["收入", "收入占比"],
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
        }
      },
      xAxis: {
        type: "category",
        data: data.map(i => i.deptName),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        { type: "value", name: "" },
        {
          type: "value", name: "",
          axisLabel: {
            formatter: "{value}%"
          }
        },
      ],
      series: [
        {
          type: "bar",
          name: "收入",
          data: data.map(i => i.cost),
          itemStyle: {
            color: "#548AF8"
          },
          tooltip: {
            valueFormatter: val => `${val} 万元`
          },
          barWidth: 50
        },
        {
          type: "line",
          name: "收入占比",
          data: data.map(i => i.costRate),
          yAxisIndex: 1,
          itemStyle: {
            color: "#46C3D1"
          },
          showSymbol: false,
          tooltip: {
            valueFormatter: val => `${val} %`
          },
        }
      ]
    }
    incomeBuBarRef.value?.updateChart(incomeBuBarOption.value);
  };

  return { incomeBuBarOption, incomeBuBarRef, updateIncomeBuBar }
}