import { computed, onMounted, reactive, ref } from "vue";
import { getPersonCount, getPersonData, getRankDistribution } from "../../../../api/hr";
import { EchartsCardRef } from "../../../../types/common/Index";
import { HrCadrePieItem, HrCardDataItem, HrCardItem, HrPersonData, HrPersonEntryOutListItem, HrPersonOutRateListItem, HrPositionPieItem, HrResponse, HrSkillPieItem } from "../../../../types/hr";
import http from "../../../../utils/http";

export interface OptionItem {
  value: number;
  name: string;
}

export default function useGetPersonData() {
  // const personData = ref<HrPersonData>();
  const cardDataRes = reactive({
    cadreCount: 0,
    totalCount: 0,
    turnoverRate: 0,
  });
  const cardData = computed<HrCardItem[]>(() => (
    [
      { label: "人员总数", value: cardDataRes.totalCount },
      { label: "干部总人数", value: cardDataRes.cadreCount },
      { label: "离职率", value: cardDataRes.turnoverRate * 100, unit: "%" }
    ]
  ));
  const positionPieRef = ref<EchartsCardRef>();
  const positionPieData = ref<HrPositionPieItem[]>([]);
  const positionOption = computed<echarts.EChartsOption>(() => {
    let total = 0;
    positionPieData.value.forEach(p => {
      p.value = +p.postCount;
      total += p.value;
    });
    if (total) {
      total = 1;
    }

    return {
      title: {
        text: "干部人员占比",
        textStyle: {
          fontSize: 24,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          color: "#000",
        }
      },
      legend: {
        right: "1%",
        // width: "50px",
        type: 'scroll',
        orient: 'vertical',
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: ["40%", "70%"],
          right: "30%",
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "12",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          },
          data: positionPieData.value.map(i => ({
            value: i.value,
            name: `${i.post} ${(i.postProportion * 100).toFixed(2)}%(${i.value}人)`
          }))
        }
      ]
    }
  });

  const skillPieRef = ref<EchartsCardRef>();
  const skillPieData = ref<HrSkillPieItem[]>([]);
  const skillOption = computed<echarts.EChartsOption>(() => {
    let total = 0;
    skillPieData.value.forEach(s => {
      s.value = +s.skillCount;
      total += s.value;
    });
    if (total) {
      total = 1;
    }

    return {
      title: {
        text: "人员技能分布",
        textStyle: {
          fontSize: 24,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          color: "#000",
        }
      },
      legend: {
        right: "1%",
        // width: "50px",
        type: 'scroll',
        orient: 'vertical',
      },
      series: [{
        name: "",
        type: "pie",
        radius: ["40%", "70%"],
        right: "50%",
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "12",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: skillPieData.value.map(i => ({
          value: i.value,
          name: `${i.skill} ${(i.skillProportion * 100).toFixed(2)}%(${i.value}人)`
        }))
      }]
    }
  })

  const cadrePieRef = ref<EchartsCardRef>();
  const cadrePieData = ref<HrCadrePieItem[]>([]);
  const cadreOption = computed<echarts.EChartsOption>(() => {
    let total = 0;
    cadrePieData.value.forEach(c => {
      c.value = +c.rankCount;
      total += c.value;
    });
    if (total) {
      total = 1;
    }
    return {
      title: {
        text: "人员职级分布", textStyle: {
          fontSize: 24,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          color: "#000",
        }
      },
      legend: {
        right: "1%",
        // width: "50px",
        type: 'scroll',
        orient: 'vertical',
      },
      series: [{
        name: "",
        type: "pie",
        radius: ["40%", "70%"],
        right: "50%",
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "12",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        },
        data: cadrePieData.value.map(i => ({
          value: i.value,
          name: `${i.rank} ${(i.rankProportion * 100).toFixed(2)}%(${i.value}人)`
        }))
      }]
    }
  })

  const updatePersonPie = () => {
    positionPieRef.value?.updateChart(positionOption.value);
    skillPieRef.value?.updateChart(skillOption.value);
    cadrePieRef.value?.updateChart(cadreOption.value);
  }

  const updatePersonCardData = (data: HrCardDataItem[]) => {
    const personCount = data.length > 0 ? data[0] : {
      cadreCount: 0,
      totalCount: 0,
      turnoverRate: 0,
    };
    cardDataRes.cadreCount = personCount.cadreCount;
    cardDataRes.totalCount = personCount.totalCount;
    cardDataRes.turnoverRate = personCount.turnoverRate;
  }

  const personOutRateList = ref<HrPersonOutRateListItem[]>([]);
  const personOutRateRef = ref<EchartsCardRef>();
  const personOutRateOption = computed<echarts.EChartsOption>(() => {
    return {
      title: {
        text: "离职率分析",
        textStyle: {
          fontSize: 24,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          color: "#000",
        }
      },
      legend: {
        data: ["离职率", "离职率基线", "新员工离职率", "新员工离职率基线"],
        top: "5%",
        left: "center"
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
        valueFormatter: value => `${value}%`
      },
      xAxis: {
        data: personOutRateList.value.map(i => `${i.month}月`),
        type: "category",
        // boundaryGap: false,
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: "{value}%"
          }
        }
      ],
      series: [
        {
          data: personOutRateList.value.map(i => i.outRate),
          type: "line",
          name: "离职率",
          symbol: "circle",
          // showSymbol: false,
          itemStyle: {
            color: "#46C3D1"
          }
        },
        {
          data: personOutRateList.value.map(i => i.outRateBaseLine),
          type: "line",
          name: "离职率基线",
          symbol: "circle",
          // showSymbol: false,
          itemStyle: {
            color: "#D3D5DA"
          }
        },
        {
          data: personOutRateList.value.map(i => i.newOutRate),
          type: "line",
          name: "新员工离职率",
          symbol: "circle",
          // showSymbol: false,
          itemStyle: {
            color: "#E98E39"
          }
        },
        {
          data: personOutRateList.value.map(i => i.newOutRateBaseLine),
          type: "line",
          name: "新员工离职率基线",
          symbol: "circle",
          // showSymbol: false,
          itemStyle: {
            color: "#A7ABB5"
          }
        }
      ]
    }
  })

  const personEntryOutList = ref<HrPersonEntryOutListItem[]>([]);
  const personEntryOutRef = ref<EchartsCardRef>();
  const personEntryOutOption = computed<echarts.EChartsOption>(() => {
    return {
      title: {
        text: "人员入离职分析",
        textStyle: {
          fontSize: 24,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          color: "#000",
        }
      },
      legend: {
        data: ["入职人数", "离职人数", "新员工离职人数"],
        top: "5%",
        left: "center"
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
        data: personEntryOutList.value.map(i => `${i.month}月`),
        type: "category",
        axisPointer: {
          type: "shadow"
        }
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          name: "入职人数",
          data: personEntryOutList.value.map(i => i.entryNum),
          itemStyle: {
            color: "#548AF8"
          }
        },
        {
          type: "bar",
          name: "离职人数",
          data: personEntryOutList.value.map(i => i.outNum),
          itemStyle: {
            color: "#46C3D1"
          }
        },
        {
          type: "bar",
          name: "新员工离职人数",
          data: personEntryOutList.value.map(i => i.newOutNum),
          itemStyle: {
            color: "#E98E39"
          }
        }
      ]
    }
  })

  const getMergeData = async (year: number, deptName: string, pduId?: string) => {
    const res = await http.get<HrResponse>(getPersonData, { params: { json: { year, deptName, pduId } } });
    // 更新统计数据
    updatePersonCardData(res.data.personCount.data);
    // 三个pie图表
    skillPieData.value = res.data.personSkill.data;
    positionPieData.value = res.data.personPost.data;
    cadrePieData.value = res.data.personDistribution.data;
    updatePersonPie();
    // 离职率分析 
    personOutRateList.value = res.data.personOutRateList.data;
    personOutRateRef.value?.updateChart(personOutRateOption.value);
    // 人员入离职分析
    personEntryOutList.value = res.data.personEntryOutList.data;
    personEntryOutRef.value?.updateChart(personEntryOutOption.value);
  }


  const getPersonCardData = async (year: number, deptName: string, pduId?: string) => {
    const res = await http.get<HrResponse>(getPersonData, { params: { json: { year, deptName, pduId } } });
    // const res = await http.get<HrCardDataItem[]>(getPersonCount, {
    //   params: { json: { year, deptName, pduId } }
    // })
    const personCount = res.data.personCount.data.length > 0 ? res.data.personCount.data[0] : {
      cadreCount: 0,
      totalCount: 0,
      turnoverRate: 0,
    };
    cardDataRes.cadreCount = personCount.cadreCount;
    cardDataRes.totalCount = personCount.totalCount;
    cardDataRes.turnoverRate = personCount.turnoverRate;
    updatePersonPie();
  }

  const getCardPieData = async (year: number, deptName: string, pduId?: string) => {
    const req = {
      json: { year, deptName, pduId }
    }
    const [one] = await Promise.all([
      http.get(getRankDistribution, { params: req })
    ]);
  }

  return {
    cardData,
    positionOption,
    positionPieRef,
    skillOption,
    skillPieRef,
    cadreOption,
    cadrePieRef,
    updatePersonPie,
    getCardPieData,
    getMergeData,
    personOutRateRef,
    personOutRateOption,
    personEntryOutRef,
    personEntryOutOption,
  }
}