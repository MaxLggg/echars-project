import { ref, onMounted, computed } from "vue";
import { DSOData, DSODataItem } from "../../../../types/operation/Index";
import * as echarts from "echarts";
import { EchartsCardRef } from "../../../../types/common/Index";
/**
 * 处理DSO回款 相关业务
 * ../../../..returns 
 */
export default function useDSO(props?: DSOData[]) {
  const dsoData = ref<DSODataItem[]>([]);
  const dsoLineOption = ref<echarts.EChartsOption>();
  const dsoLineRef = ref<EchartsCardRef>();

  const formatValue = (obj: DSOData, index: number): number => {
    switch (index) {
      case 1:
        return obj.dsoJanuary;
      case 2:
        return obj.dsoFebruary;
      case 3:
        return obj.dsoMarch;
      case 4:
        return obj.dsoApril;
      case 5:
        return obj.dsoMay;
      case 6:
        return obj.dsoJune;
      case 7:
        return obj.dsoJuly;
      case 8:
        return obj.dsoAugust;
      case 9:
        return obj.dsoSeptember;
      case 10:
        return obj.dsoOctober;
      case 11:
        return obj.dsoNovember;
      case 12:
        return obj.dsoDecember;
      default:
        return 0;
    }
  }

  const updateDSOData = (data: DSOData[]) => {
    const tempData: DSODataItem[] = [];
    const length = data.length;
    for (let i = 1; i < 13; i++) {
      tempData.push({
        month: i,
        // @ts-ignore
        value: length > 0 ? formatValue(data[0], i) : "--",
        isGrade: false,
        standardNum: length > 0 ? data[0].standardNum : 0
      });
    };
    dsoData.value = tempData.map(i => {
      i.isGrade = i.value > i.standardNum;
      return i;
    });
    dsoLineOption.value = {
      title: {
        text: "回款DSO预警",
        textStyle: {
          fontSize: 24,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          color: "#000",
        }
      },
      legend: {
        data: ["DSO因数值", "基准值"],
        top: "8%"
      },
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#999"
          }
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dsoData.value.map(i => `${i.month}月`)
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: length > 0 ? dsoData.value.map(i => i.value) : [],
          type: "line",
          name: "DSO因数值",
          // symbol: "none",
          showSymbol: false,
          areaStyle: {}
        },
        {
          data: length > 0 ? dsoData.value.map(i => i.standardNum) : [],
          name: "基准值",
          type: "line",
          symbol: "none",
          // areaStyle: {}
          itemStyle: {
            color: "red"
          }
        }
      ]
    };
    dsoLineRef.value?.updateChart(dsoLineOption.value);
  }

  const dsoLampColor = {
    red: "#e2635e",
    yellow: "#E98E39",
    green: "#58ca8b"
  };

  const dsoColLampColor = computed(
    () => (data: { value: number; standardNum: number }) => {
      if (data.value < data.standardNum) {
        return dsoLampColor.green;
      } else if (data.value > data.standardNum + 0.5) {
        return dsoLampColor.red;
      } else {
        return dsoLampColor.yellow;
      }
    }
  );
  return {
    dsoData,
    updateDSOData,
    dsoLineOption,
    dsoLineRef,
    dsoLampColor,
    dsoColLampColor
  }
}