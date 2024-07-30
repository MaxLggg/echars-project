import { ref } from "vue";
import { EchartsCardRef, ITabDataItem, LegendDataItem } from "../../../types/common/Index";
import { ProjectNeedcompleteItem, ProjectNotcompleteItem } from "../../../types/projectReport";

export default function usePrjComplete() {
  const prjCompleteTabs = ref<ITabDataItem[]>([
    { name: "1", label: "超期未结项项目" },
    { name: "2", label: "需结项项目" }
  ]);

  const prjCompleteBarOption = ref<echarts.EChartsOption>();
  const prjCompleteBarRef = ref<EchartsCardRef>();

  const updatePrjCompleteBarChart = (
    data: ProjectNotcompleteItem[] | ProjectNeedcompleteItem[],
    type: string,
    month: number
  ) => {
    if (type === "1") {
      const tempData = [...data] as ProjectNotcompleteItem[];
      const legendData: LegendDataItem<ProjectNotcompleteItem>[] = [
        { label: "A", key: "typeA", color: "#1890FF", chartType: "bar" },
        { label: "A`", key: "typeAA", color: "#2FC25B", chartType: "bar" },
        { label: "V", key: "typeV", color: "#FACC14", chartType: "bar" },
        { label: "V`", key: "typeVV", color: "#13C2C2", chartType: "bar" },
        { label: "O", key: "typeO", color: "#8543E0", chartType: "bar" },
      ]
      prjCompleteBarOption.value = {
        title: {
          text: `${month}月超期未结项项目`
        },
        legend: {
          data: legendData.map(l => l.label),
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
          valueFormatter: val => `${val} 个数`
        },
        xAxis: {
          type: "category",
          data: tempData.map(t => t.deptName),
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: {
          type: 'value',
          name: '个数',
        },
        series: legendData.map(l => {
          return {
            data: tempData.map(t => t[l.key]),
            name: l.label,
            type: l.chartType,
            stack: 'bar',
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: l.color
            }
          }
        })
      }
    } else {
      const tempData = [...data] as ProjectNeedcompleteItem[];
      prjCompleteBarOption.value = {
        title: {
          text: `${month}月超期未结项项目`
        },
        legend: {
          data: ["待结项", "非正常终止", "已结项"],
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
          valueFormatter: val => `${val} 个数`
        },
        xAxis: {
          type: "category",
          data: tempData.map(t => t.deptName),
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: {
          type: 'value',
          name: '个数',
        },
        series: [
          {
            type: "bar",
            name: "待结项",
            data: tempData.map(t => t.waitComplete),
            stack: 'bar',
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#1890FF"
            }
          },
          {
            type: "bar",
            name: "非正常终止",
            data: tempData.map(t => t.notNormal),
            stack: 'bar',
            emphasis: {
              focus: "series"
            },
            itemStyle: {
              color: "#2FC25B"
            }
          },
          {
            type: "bar",
            name: "已结项",
            data: tempData.map(t => t.completed),
            stack: 'bar',
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
    prjCompleteBarRef.value?.updateChart(prjCompleteBarOption.value);
  }

  return {
    prjCompleteTabs,
    prjCompleteBarOption,
    prjCompleteBarRef,
    updatePrjCompleteBarChart,
  }
}