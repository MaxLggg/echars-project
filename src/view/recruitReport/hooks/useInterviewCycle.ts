import { FormInstance, FormRules, ElLoading } from "element-plus";
import { computed, onMounted, reactive, ref, toRaw } from "vue";
import { getBaseline, getRequirementsCompletionList, saveBaseline } from "../../../api/recruitReport";
import { EchartsCardRef } from "../../../types/common/Index";
import { ActiveType, BaseLineForm, BaseLineItem, RequirementListItem, StageListItem } from "../../../types/recruitReport";
import http from "../../../utils/http";

interface StageListTypesItem {
  label: string;
  value: number;
  number: number;
  key: keyof RequirementListItem;
  color: string;
}

interface PreRoundData extends BaseLineForm {
  id: string;
}

export default function useInterviewCycle() {
  const baseLineDialog = ref(false);
  // @ts-ignore
  const baseLineData = ref<BaseLineItem>({ stageList: [] });
  let preRoundData: PreRoundData = {
    stageList: [],
    round: 2,
    id: "",
    deptName: ""
  };
  const baseLineForm = reactive<BaseLineForm>({
    deptName: "PS",
    round: 2,
    stageList: []
  });

  const baseLineFormRef = ref<FormInstance>();
  const baseLineFormRules = reactive<FormRules>(({
    deptName: [
      { required: true, message: "请选择BU", trigger: "change" }
    ],
    round: [
      { required: true, message: "请选择面试轮数", trigger: "change" }
    ]
  }));

  const getBaselineData = async (deptName: string) => {
    return await http.get<BaseLineItem>(getBaseline, { params: { deptName } })
  }

  const updateBaseline = async () => {
    const loding = ElLoading.service();
    try {
      const valid = await baseLineFormRef.value!.validate();
      if (valid) {
        const req = { ...toRaw(baseLineForm), id: baseLineData.value.id };
        await http.post(saveBaseline, req);
        baseLineDialog.value = false;
        loding.close();
        getInterviewInitData(baseLineForm.deptName, baseLineForm.round, interviewCycleTabName.value);
      }
    } catch (error) {
      loding.close();
    }
  }

  const roundData = {
    2: [
      { stageName: "推送---初面", consumingDay: 1, sort: 1 },
      { stageName: "初面---综面", consumingDay: 1, sort: 2 }
    ],
    3: [
      { stageName: "推送---初面", consumingDay: 1, sort: 1 },
      { stageName: "初面---技面", consumingDay: 1, sort: 2 },
      { stageName: "技面---综面", consumingDay: 1, sort: 3 },
    ],
    4: [
      { stageName: "推送---初面", consumingDay: 1, sort: 1 },
      { stageName: "初面---技面", consumingDay: 1, sort: 2 },
      { stageName: "技面---综面", consumingDay: 1, sort: 3 },
      { stageName: "综面---评审", consumingDay: 1, sort: 4 },
    ]
  };

  /**
   * 基线维护切换查询数据
   * @param val 
   * @param type 1 切换BU 2切换面试轮数
   */
  const baselineFormChange = async (val: number | string, type: "1" | "2") => {
    // @ts-ignore
    const deptName: string = type === "1" ? val : baseLineForm.deptName;
    // @ts-ignore
    const round: number = type === "1" ? baseLineForm.round : val;
    // const res = await getBaselineData(deptName);
    // if (res.data && res.data.stageList && res.data.stageList.length > 0) {
    //   baseLineForm.stageList = res.data.stageList;
    //   baseLineData.value.id = res.data.id;
    // } else {
    //   // @ts-ignore
    //   const stageList = roundData[round + ''].map(i => {
    //     i.round = round;
    //     i.deptName = deptName;
    //     return i;
    //   })
    //   baseLineData.value = {
    //     deptName: deptName,
    //     id: "",
    //     round: round,
    //     stageList: stageList
    //   }
    //   baseLineForm.stageList = stageList;
    // }

    if (round === preRoundData.round) {
      baseLineForm.stageList = preRoundData.stageList;
    } else {
      // @ts-ignore
      const stageList = roundData[round + ''].map(i => {
        i.round = round;
        i.deptName = deptName;
        return i;
      })
      baseLineData.value = {
        deptName: deptName,
        id: "",
        round: round,
        stageList: stageList
      }
      baseLineForm.stageList = stageList;
    }
  }

  const openBaselineDialog = async () => {
    const res = await getBaselineData(baseLineForm.deptName);
    if (!res.data) {
      res.data = {
        deptName: baseLineForm.deptName,
        id: "",
        round: baseLineForm.round,
        // @ts-ignore
        stageList: roundData[baseLineForm.round + ""].map(r => {
          r.round = baseLineForm.round;
          r.deptName = baseLineForm.deptName;
          return r;
        })
      };
    }
    baseLineData.value = res.data;
    baseLineForm.deptName = baseLineData.value.deptName;
    baseLineForm.round = baseLineData.value.round;
    preRoundData.id = res.data.id;
    preRoundData.round = res.data.round;
    preRoundData.stageList = res.data.stageList;
    baseLineForm.stageList = res.data.stageList.sort(s => s.sort);
    baseLineDialog.value = true;
  }

  const interviewCycleTabName = ref<ActiveType>("A");

  const stageColors = {
    avgInit: "#5470C6",
    avgPush: "#91CC75",
    avgFirst: "#FAC858",
    avgTec: "#EE6666",
    avgFinal: "#73C0DE",
  }
  const stageListTypes = computed(() => {
    let arr: StageListTypesItem[] = [];
    if (!baseLineData.value.stageList) {
      arr = [
        { label: "推送", value: 0, number: 0, key: "avgInit", color: stageColors.avgInit },
        { label: "初面", value: 0, number: 0, key: "avgPush", color: stageColors.avgPush },
        { label: "综面", value: 0, number: 0, key: "avgFirst", color: stageColors.avgFirst },
      ]
      return arr;
    };
    switch (baseLineData.value.stageList.length) {
      case 2:
        arr = [
          { label: "推送", value: 0, number: 0, key: "avgInit", color: stageColors.avgInit },
          {
            label: "初面",
            number: baseLineData.value.stageList[0].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay,
            key: "avgPush",
            color: stageColors.avgPush
          },
          {
            label: "综面",
            number: baseLineData.value.stageList[1].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay
              + baseLineData.value.stageList[1].consumingDay,
            key: "avgFirst", color: stageColors.avgFirst
          },
        ]
        break;
      case 3:
        arr = [
          { label: "推送", value: 0, number: 0, key: "avgInit", color: stageColors.avgInit },
          {
            label: "初面",
            number: baseLineData.value.stageList[0].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay,
            key: "avgPush",
            color: stageColors.avgPush
          },
          {
            label: "技面",
            number: baseLineData.value.stageList[1].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay
              + baseLineData.value.stageList[1].consumingDay,
            key: "avgFirst",
            color: stageColors.avgFirst
          },
          {
            label: "综面",
            number: baseLineData.value.stageList[2].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay
              + baseLineData.value.stageList[1].consumingDay
              + baseLineData.value.stageList[2].consumingDay,
            key: "avgTec",
            color: stageColors.avgTec
          },
        ]
        break;
      case 4:
        arr = [
          { label: "推送", number: 0, value: 0, key: "avgInit", color: stageColors.avgInit },
          {
            label: "初面",
            number: baseLineData.value.stageList[0].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay,
            key: "avgPush",
            color: stageColors.avgPush
          },
          {
            label: "技面",
            number: baseLineData.value.stageList[1].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay
              + baseLineData.value.stageList[1].consumingDay,
            key: "avgFirst",
            color: stageColors.avgFirst
          },
          {
            label: "综面",
            number: baseLineData.value.stageList[2].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay
              + baseLineData.value.stageList[1].consumingDay
              + baseLineData.value.stageList[2].consumingDay,
            key: "avgTec",
            color: stageColors.avgTec
          },
          {
            label: "评审",
            number: baseLineData.value.stageList[3].consumingDay,
            value: baseLineData.value.stageList[0].consumingDay
              + baseLineData.value.stageList[1].consumingDay
              + baseLineData.value.stageList[2].consumingDay
              + baseLineData.value.stageList[3].consumingDay,
            key: "avgFinal",
            color: stageColors.avgFinal
          },
        ]
        break;
      default:
        break;
    };
    return arr;
  });

  const interviewCycleData = ref<RequirementListItem[]>([]);
  const interviewCycleRef = ref<EchartsCardRef>();

  // @ts-ignore
  const interviewCycleOption = computed<echarts.EChartsOption>(() => {
    return {
      tooltip: {
        show: true,
        trigger: "item",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        }
      },
      grid: {
        left: 130
      },
      xAxis: [
        {
          type: 'value',
          boundaryGap: false
        },
        {
          type: 'value',
          boundaryGap: false,
          interval: 1,
          offset: 20,
          axisLabel: {
            formatter: function (val: number) {
              const stage = stageListTypes.value.find(s => s.value === val);
              if (stage) {
                return stage.number === 0 ? stage.label : `${stage.label}-${stage.number}天`;
              }
              return ""
            }
          },
        },
      ],
      yAxis: {
        type: 'category',
        interval: 1,
        data: interviewCycleData.value.map(i => i.publicCol),
        boundaryGap: false,
        axisLabel: {
          // rotate: -30
          // formatter: function (val) {
          //   // const length = val.length;
          //   const splitLength = 8;
          //   const len = Math.ceil(val.length % splitLength);
          //   let str = "";
          //   for (let i = 0; i <= len + 1; i++) {
          //     str += `${val.substring(i * splitLength, (i + 1) * splitLength)}\n`
          //   }
          //   return str;
          // },
          // verticalAlign:"middle"
          width: 120,
          overflow: "truncate",
          ellipsis: "..."
        }
      },
      series: [
        ...stageListTypes.value.map(s => {
          return {
            type: "line",
            symbol: "none",
            xAxisIndex: 1,
            data: interviewCycleData.value.map(i => s.value),
            name: s.label,
            tooltip: {
              show: false,
            },
            itemStyle: {
              color: s.color
            }
          }
        }),
        ...stageListTypes.value.map(s => {
          return {
            type: 'bar',
            stack: 'publicCol',
            emphasis: {
              focus: 'series'
            },
            barMaxWidth: 30,
            xAxisIndex: 1,
            data: interviewCycleData.value.map(i => {
              if (s.key === "avgInit") {
                return 0;
              }
              return i[s.key]
            }),
            tooltip: {
              show: true,
              formatter: `{b} ${s.label}：{c}天`
            },
            itemStyle: {
              color: s.color
            }
          }
        })
      ]
    }
  });

  const getInterviewCycleData = async (type: ActiveType, deptName: string,) => {
    const res = await http.get(getRequirementsCompletionList, { params: { type, deptName, startTime: "", endTime: "" } });
    if (res.data.requirementList && res.data.requirementList.length > 0) {
      interviewCycleData.value = res.data.requirementList;
    } else {
      interviewCycleData.value = [];
    }
    interviewCycleRef.value?.updateChart(interviewCycleOption.value);
  }

  const getInterviewInitData = async (deptName: string, round: number, type: ActiveType) => {
    const res = await getBaselineData(deptName);
    baseLineData.value = res.data;
    baseLineForm.round = res.data.round;
    getInterviewCycleData(type, deptName);
  }

  // onMounted(() => {
  //   getInitData();
  // })
  return {
    baseLineDialog,
    openBaselineDialog,
    baseLineForm,
    baseLineFormRef,
    baseLineFormRules,
    updateBaseline,
    baselineFormChange,
    baseLineData,
    interviewCycleTabName,
    getInterviewCycleData,
    stageListTypes,
    interviewCycleRef,
    interviewCycleOption,
    getInterviewInitData
  }
}