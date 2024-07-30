import { computed, reactive, ref } from "vue";
import { getRecruitReport, getRecruitReportMonth, getRecruitReportYear } from "../../../../api/job";
import { EchartsCardRef } from "../../../../types/common/Index";
import { IJobAllocationInfoListItem, IJobCostInfoListItem, IJobTargetMonthItem, IJobTargetYearItem, JobMergeRes } from "../../../../types/job";
import http from "../../../../utils/http"

export default function useGetJobTarget() {

  const initData = {
    recruitTarget: 0,
    actualRecruit: 0,
    recruitValue: 0,
    recruitAdvanceRate: 0,
    recruitTimeRate: 0,
    netGrowthTarget: 0,
    actualNetGrowth: 0,
    growthValue: 0,
    growthAdvanceRate: 0,
    growthTimeRate: 0,
    month: 0,
  }
  const targetYear = reactive<IJobTargetYearItem>(initData);
  const targetMonth = ref<IJobTargetMonthItem[]>([]);
  const targetBarRef = ref<EchartsCardRef>();
  const legend = {
    left: "center",
    top: "5%"
  };
  const targetBarOption = computed<echarts.EChartsOption>(() => {
    return {
      title: {
        text: "招聘目标完成情况"
      },
      legend: { ...legend, data: ["目标", "实际招聘", "目标达成率"] },
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
        data: targetMonth.value.map(i => `${i.month}月`),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        {
          type: "value",
          name: "目标"
        },
        {
          type: "value",
          name: "目标达成率",
          axisLabel: {
            formatter: "{value}%"
          }
        }
      ],
      series: [
        {
          type: "bar",
          name: "目标",
          data: targetMonth.value.map(i => i.recruitTarget),
          itemStyle: {
            color: "#548AF8"
          }
        },
        {
          type: "bar",
          name: "实际招聘",
          data: targetMonth.value.map(i => i.actualRecruit),
          itemStyle: {
            color: "#46C3D1"
          }
        },
        {
          type: "line",
          name: "目标达成率",
          // symbol: "none",
          // showSymbol: false,
          data: targetMonth.value.map(i => i.recruitAdvanceRate),
          yAxisIndex: 1,
          itemStyle: {
            color: "#E2635E"
          },
          tooltip: {
            valueFormatter: val => `${val}%`
          }
        }
      ]
    }
  });

  const netGrowthTargetMonth = ref<IJobTargetYearItem[]>([]);
  const netIncreaseBarRef = ref<EchartsCardRef>();
  const netIncreaseBarOption = computed<echarts.EChartsOption>(() => {
    return {
      title: {
        text: "净增长"
      },
      legend: { ...legend, data: ["目标", "实际净增长", "净增长率"] },
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
        data: netGrowthTargetMonth.value.map(i => `${i.month}月`),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        {
          type: "value",
          name: "目标"
        },
        {
          type: "value",
          name: "净增长率",
          axisLabel: {
            formatter: "{value}%"
          }
        }
      ],
      series: [
        {
          type: "bar",
          name: "目标",
          data: netGrowthTargetMonth.value.map(i => i.netGrowthTarget),
          itemStyle: {
            color: "#548AF8"
          }
        },
        {
          type: "bar",
          name: "实际净增长",
          data: netGrowthTargetMonth.value.map(i => i.actualNetGrowth),
          itemStyle: {
            color: "#46C3D1"
          }
        },
        {
          type: "line",
          name: "净增长率",
          // symbol: "none",
          // showSymbol: false,
          data: netGrowthTargetMonth.value.map(i => i.growthAdvanceRate),
          yAxisIndex: 1,
          itemStyle: {
            color: "#E2635E"
          },
          tooltip: {
            valueFormatter: val => `${val}%`
          }
        }
      ]
    }
  });

  const updateTargetYear = (data: JobMergeRes) => {
    if (data.recruitReportYear) {
      targetYear.recruitTarget = data.recruitReportYear.recruitTarget || 0;
      targetYear.actualRecruit = data.recruitReportYear.actualRecruit || 0;
      targetYear.recruitValue = data.recruitReportYear.recruitValue || 0;
      targetYear.recruitAdvanceRate = data.recruitReportYear.recruitAdvanceRate || 0;
      targetYear.recruitTimeRate = data.recruitReportYear.recruitTimeRate || 0;
    } else {
      targetYear.recruitTarget = initData.recruitTarget;
      targetYear.actualRecruit = initData.actualRecruit;
      targetYear.recruitValue = initData.recruitValue;
      targetYear.recruitAdvanceRate = initData.recruitAdvanceRate;
      targetYear.recruitTimeRate = initData.recruitTimeRate;
    }

    if (data.netGrowthTargetYear) {
      targetYear.netGrowthTarget = data.netGrowthTargetYear.netGrowthTarget || 0;
      targetYear.actualNetGrowth = data.netGrowthTargetYear.actualNetGrowth || 0;
      targetYear.growthValue = data.netGrowthTargetYear.growthValue || 0;
      targetYear.growthAdvanceRate = data.netGrowthTargetYear.growthAdvanceRate || 0;
      targetYear.growthTimeRate = data.netGrowthTargetYear.growthTimeRate || 0;
    } else {
      targetYear.netGrowthTarget = initData.netGrowthTarget;
      targetYear.actualNetGrowth = initData.actualNetGrowth;
      targetYear.growthValue = initData.growthValue;
      targetYear.growthAdvanceRate = initData.growthAdvanceRate;
      targetYear.growthTimeRate = initData.growthTimeRate;
    }
  }

  const jobCostInfoData = ref<IJobCostInfoListItem[]>([]);
  const jobCostInfoRef = ref<EchartsCardRef>();
  const jobCostInfoOption = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "招聘成本分布" },
      legend: {
        left: "center",
        data: ["人工", "奖金", "渠道"]
      },
      tooltip: {
        show: true,
        trigger: "axis",
        valueFormatter: val => `${val}元`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        data: jobCostInfoData.value.map(i => `${i.month}月`),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {},
      series: [
        {
          name: "人工",
          type: "bar",
          stack: 'cost',
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: "#548AF8"
          },
          data: jobCostInfoData.value.map(i => i.artificialAverage)
        },
        {
          name: "奖金",
          type: "bar",
          stack: 'cost',
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: "#46C3D1"
          },
          data: jobCostInfoData.value.map(i => i.bonusAverage)
        },
        {
          name: "渠道",
          type: "bar",
          stack: 'cost',
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: "#E98E39"
          },
          data: jobCostInfoData.value.map(i => i.channelAverage)
        },
      ]

    }
  });
  const jobTotalCost = computed(() => {
    if (jobCostInfoData.value.length > 0) {
      return {
        artificial: jobCostInfoData.value[0].artificialTotal,
        bonus: jobCostInfoData.value[0].bonusTotal,
        channel: jobCostInfoData.value[0].channelTotal,
      }
    }
    return {
      artificial: 0,
      bonus: 0,
      channel: 0,
    }
  });

  const jobPersonCostRef = ref<EchartsCardRef>();
  const jobPersonCostOption = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "人均入职成本" },
      tooltip: {
        show: true,
        trigger: "axis",
        valueFormatter: val => `${val}元`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        data: jobCostInfoData.value.map(i => `${i.month}月`),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {},
      series: [{
        type: "line",
        areaStyle: {
          color: "rgba(97,103,240,0.3)"
        },
        data: jobCostInfoData.value.map(i => i.personCostAverage),
        itemStyle: {
          color: "#6167F0"
        }
      }]
    }
  });

  const jobResourcesData = ref<IJobAllocationInfoListItem[]>([]);
  const jobResourcesRef = ref<EchartsCardRef>();
  const jobResourcesOption = computed<echarts.EChartsOption>(() => {
    return {
      title: { text: "资源调配情况" },
      legend: {
        left: "center",
        data: ["调配率", "成功率"]
      },
      tooltip: {
        show: true,
        trigger: "axis",
        valueFormatter: val => `${val}%`,
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      xAxis: {
        type: "category",
        data: jobResourcesData.value.map(i => `${i.month}月`),
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {},
      series: [
        {
          type: "line",
          name: "调配率",
          itemStyle: {
            color: "#548AF8"
          },
          areaStyle: {
            color: "rgba(84,138,248,0.3)"
          },
          data: jobResourcesData.value.map(i => i.allocationRate)
        },
        {
          type: "line",
          name: "成功率",
          itemStyle: {
            color: "#58CA8B"
          },
          areaStyle: {
            color: "rgba(88,202,139,0.3)"
          },
          data: jobResourcesData.value.map(i => i.successRate)
        },
      ]
    }
  })

  const getJobTargetData = async (year: number, deptName: string, areaName: string) => {
    const res = await http.get<JobMergeRes>(getRecruitReport, {
      params: {
        json: { year, deptName, areaName }
      }
    });
    updateTargetYear(res.data);

    targetMonth.value = res.data.recruitReportMonth || [];
    targetBarRef.value?.updateChart(targetBarOption.value);
    netGrowthTargetMonth.value = res.data.netGrowthTargetMonth;
    netIncreaseBarRef.value?.updateChart(netIncreaseBarOption.value);

    jobCostInfoData.value = res.data.recruitCostInfoList || [];
    jobCostInfoRef.value?.updateChart(jobCostInfoOption.value);
    jobPersonCostRef.value?.updateChart(jobPersonCostOption.value);

    jobResourcesData.value = res.data.resourceAllocationInfoList || [];
    jobResourcesRef.value?.updateChart(jobResourcesOption.value);
  }

  return {
    getJobTargetData,
    targetYear,
    targetBarRef,
    targetBarOption,
    netIncreaseBarRef,
    netIncreaseBarOption,
    jobCostInfoRef,
    jobCostInfoOption,
    jobTotalCost,
    jobPersonCostOption,
    jobPersonCostRef,
    jobResourcesRef,
    jobResourcesOption
  }
}