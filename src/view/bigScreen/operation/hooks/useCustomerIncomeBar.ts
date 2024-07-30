import { ref } from "vue";
import { EchartsCardRef } from "../../../../types/common/Index";
import { CustomertIncomeData } from "../../../../types/operation/Index";

export default function useCustomerIncome() {
  const incomeCustomerBarOption = ref<echarts.EChartsOption>()
  const incomeCustomerBarRef = ref<EchartsCardRef>();

  const updateCustomerIncomeBar = (data: CustomertIncomeData[], year: number) => {
    const month = data.length > 0 ? data[0].month : new Date().getMonth() + 1;
    incomeCustomerBarOption.value = {
      title: {
        text: `收入占比分析(客户) {small|${year === new Date().getFullYear() ? `截止${year}年${month || '--'}月` : `${year}全年`}}`,
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
        left: "right"
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
        data: data.map(i => i.customerGroup),
        axisPointer: {
          type: "shadow"
        },
        axisLabel: {
          interval: 0
        }
      },
      yAxis: [
        { type: "value", name: "" },
        {
          type: "value", name: "", axisLabel: {
            formatter: "{value}%"
          }
        },
      ],
      series: [
        {
          type: "bar",
          name: "收入",
          data: data.map(i => i.income),
          itemStyle: {
            color: "#46C3D1"
          },
          tooltip: {
            valueFormatter: val => `${val} 万元`
          }
        },
        {
          type: "line",
          name: "收入占比",
          data: data.map(i => i.incomeRate),
          showSymbol: false,
          yAxisIndex: 1,
          itemStyle: {
            color: "#E2635E"
          },
          tooltip: {
            valueFormatter: val => `${val} %`
          }
        }
      ]
    }
    incomeCustomerBarRef.value?.updateChart(incomeCustomerBarOption.value);
  };

  return { incomeCustomerBarOption, incomeCustomerBarRef, updateCustomerIncomeBar }
}