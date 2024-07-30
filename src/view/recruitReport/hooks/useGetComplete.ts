import { computed, onMounted, ref } from 'vue';
import { getRequirementsCompletionList } from '../../../api/recruitReport';
import { EchartsCardRef, LegendDataItem } from '../../../types/common/Index';
import {
  ActiveType,
  ICompleteData,
  RequirementListItem,
} from '../../../types/recruitReport';
import http from '../../../utils/http';
import { ElLoading } from 'element-plus';

const LightColor = {
  red: '#F04864',
  yellow: '#FACC14',
  green: '#2FC25B',
  blue: '#108EE9',
  gray: '#9A9B96',
};
export default function useGetComplete() {
  const completeData = ref<ICompleteData>();
  const completeTabType = ref<ActiveType>('A');
  const isLoading = ref(false);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  // const completeTime = ref([`${year}-${month}-01`, `${year}-${month}-${day}`]);
  const completeTime = ref(['', '']);
  // const completeTime = ref(['2022-5-01', '2022-5-27']);
  // console.log("[ completeTime :]", completeTime);

  const completeBarRef = ref<EchartsCardRef>();
  const legendData: LegendDataItem<RequirementListItem>[] = [
    { label: '需求人数', key: 'personNum', color: '#bac1bc', chartType: 'bar' },
    { label: '已完成', key: 'finishNum', color: '#c0d3a9', chartType: 'bar' },
    {
      label: '及时完成',
      key: 'timelyFinishNum',
      color: '#7fb470',
      chartType: 'bar',
    },
    { label: '需求完成度', key: 'finishRate', color: '', chartType: 'line' },
    {
      label: '及时完成率',
      key: 'timelyFinishRate',
      color: '',
      chartType: 'line',
    },
  ];
  const completeBarOption = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        data: legendData.map((l) => l.label),
        left: 'center',
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#4E576A',
          },
        },
        // valueFormatter: val => `${val} 万元`
      },
      xAxis: {
        type: 'category',
        data: completeData.value?.requirementList.map((r) => r.publicCol),
        axisPointer: {
          type: 'shadow',
        },
      },
      yAxis: [
        {
          type: 'value',
          name: '人数',
        },
        {
          type: 'value',
          name: '百分比',
          axisLabel: {
            formatter: '{value} %',
          },
        },
      ],
      series: legendData.map((l) => {
        if (l.chartType === 'bar') {
          return {
            type: l.chartType,
            name: l.label,
            data: completeData.value?.requirementList.map((r) => r[l.key]),
            itemStyle: {
              color: l.color,
            },
            tooltip: {
              valueFormatter: (val) => `${val} 人`,
            },
          };
        } else {
          return {
            type: l.chartType,
            name: l.label,
            yAxisIndex: 1,
            itemStyle: {
              color: l.color,
            },
            data: completeData.value?.requirementList.map((r) =>
              (+r[l.key] * 100).toFixed(2)
            ),
            tooltip: {
              valueFormatter: (val) => `${val} %`,
            },
          };
        }
      }),
    };
  });

  const restOption = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        data: ['剩余缺口', '管道中'],
        left: 'center',
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#4E576A',
          },
        },
        valueFormatter: (val) => `${val} 人`,
      },
      xAxis: {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        data: completeData.value?.requirementList.map((r) => r.publicCol),
      },
      yAxis: {
        type: 'value',
        name: '人数',
      },
      series: [
        {
          type: 'bar',
          name: '剩余缺口',
          itemStyle: {
            color: '#FF9845',
          },
          data: completeData.value?.requirementList.map((r) => r.gap),
        },
        {
          type: 'bar',
          name: '管道中',
          itemStyle: {
            color: '#F8B97F',
          },
          data: completeData.value?.requirementList.map((r) => r.pipeline),
        },
      ],
    };
  });
  const restBarRef = ref<EchartsCardRef>();
  const lightPieRef = ref<EchartsCardRef>();
  const lightBarRef = ref<EchartsCardRef>();
  const lightBarRef2 = ref<EchartsCardRef>();

  // const lightPieLegends=[]
  const lightPieOption = computed<echarts.EChartsOption>(() => {
    // TODO
    //   label 展示百分比  计算
    return {
      legend: {
        left: 'center',
        data: ['红灯', '黄灯', '绿灯', '管道阻塞', '关闭'],
      },
      tooltip: {
        trigger: 'item',
        valueFormatter: (val) => `${val} 个`,
      },
      series: [
        {
          type: 'pie',
          radius: ['20%', '40%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            formatter: '{b}: {d}%',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
            },
          },
          data: [
            {
              name: '红灯',
              value: completeData.value?.redNum || 0,
              itemStyle: {
                color: LightColor.red,
              },
            },
            {
              name: '黄灯',
              value: completeData.value?.yellowNum || 0,
              itemStyle: {
                color: LightColor.yellow,
              },
            },
            {
              name: '绿灯',
              value: completeData.value?.greenNum || 0,
              itemStyle: {
                color: LightColor.green,
              },
            },
            {
              name: '管道阻塞',
              value: completeData.value?.blockNum || 0,
              itemStyle: {
                color: LightColor.blue,
              },
            },
            {
              name: '关闭',
              value: completeData.value?.closeNum || 0,
              itemStyle: {
                color: LightColor.gray,
              },
            },
          ],
        },
      ],
    };
  });
  const lightBarOption = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        left: 'center',
        data: ['黄灯', '绿灯', '关闭'],
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#4E576A',
          },
        },
        valueFormatter: (val) => `${val} 个`,
      },
      xAxis: {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        data: completeData.value?.requirementList.map((r) => r.publicCol),
      },
      yAxis: {
        type: 'value',
        name: '点灯数',
      },
      series: [
        {
          type: 'bar',
          name: '黄灯',
          itemStyle: {
            color: LightColor.yellow,
          },
          data: completeData.value?.requirementList.map((r) => r.yellowNum),
        },
        {
          type: 'bar',
          name: '绿灯',
          itemStyle: {
            color: LightColor.green,
          },
          data: completeData.value?.requirementList.map((r) => r.greenNum),
        },
        {
          type: 'bar',
          name: '关闭',
          itemStyle: {
            color: LightColor.gray,
          },
          data: completeData.value?.requirementList.map((r) => r.closeNum),
        },
      ],
    };
  });

  // @ts-ignore
  const lightBar2Option = computed<echarts.EChartsOption>(() => {
    return {
      legend: {
        left: 'center',
        data: ['红灯', '管道阻塞'],
      },
      tooltip: {
        show: true,
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#4E576A',
          },
        },
        valueFormatter: (val) => `${val} 个`,
      },
      grid: {
        left: 120,
      },
      yAxis: {
        type: 'category',
        axisPointer: {
          type: 'shadow',
        },
        nameTextStyle: {
          overflow: 'break',
        },
        data: completeData.value?.requirementList.map((r) => r.publicCol),
      },
      xAxis: {
        type: 'value',
        name: '点灯数',
      },
      series: [
        {
          type: 'bar',
          name: '红灯',
          itemStyle: {
            color: LightColor.red,
          },
          data: completeData.value?.requirementList.map((r) => r.redNum),
        },
        {
          type: 'bar',
          name: '管道阻塞',
          itemStyle: {
            color: LightColor.blue,
          },
          data: completeData.value?.requirementList.map((r) => r.blockNum),
        },
      ],
    };
  });

  const getCompleteInitData = async (
    deptName: string,
    type: ActiveType,
    time: string[]
  ) => {
    const loading = ElLoading.service();
    try {
      isLoading.value = true;
      time = !time ? ['', ''] : time;
      const res = await http.get(getRequirementsCompletionList, {
        params: { deptName, type, startTime: time[0], endTime: time[1] },
      });
      completeData.value = res.data;
      isLoading.value = false;
      loading.close();
      completeBarRef.value?.updateChart(completeBarOption.value);
      restBarRef.value?.updateChart(restOption.value);
      lightPieRef.value?.updateChart(lightPieOption.value);
      lightBarRef.value?.updateChart(lightBarOption.value);
      lightBarRef2.value?.updateChart(lightBar2Option.value);
    } catch (error) {
      loading.close();
    }
  };

  // onMounted(() => {
  //   getCompleteInitData("CDCE", "A", completeTime.value)
  // })

  return {
    completeData,
    isLoading,
    completeTabType,
    completeTime,
    getCompleteInitData,
    completeBarOption,
    completeBarRef,
    restOption,
    restBarRef,
    lightPieRef,
    lightBarRef,
    lightBarRef2,
    lightPieOption,
    lightBarOption,
    lightBar2Option,
  };
}
