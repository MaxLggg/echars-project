import { computed, ref } from "vue";
import { getPromoteInfo } from "../../../api/hrReport"
import { EchartsCardRef } from "../../../types/common/Index";
import { PromoteInfoListItem } from "../../../types/hrReport";
import http from "../../../utils/http";

type PromoteInfoBase = {
  CDCE: PromoteInfoListItem[];
  CS: PromoteInfoListItem[];
  PS: PromoteInfoListItem[];
}

export default function useGetPromoteInfo() {

  const promoteInfoData = ref<PromoteInfoBase>({ CDCE: [], CS: [], PS: [], });
  const promoteInfoRef = ref<EchartsCardRef>();
  const promoteInfoOption = computed<echarts.EChartsOption>(() => {
    return {
      title: [
        {
          subtext: 'CDCE',
          left: '16.67%',
          // top: '75%',
          textAlign: 'center',
          subtextStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: "#000"
          }
        },
        {
          subtext: 'CS',
          left: '50%',
          // top: '75%',
          textAlign: 'center',
          subtextStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: "#000"
          }
        },
        {
          subtext: 'PS',
          left: '83.33%',
          // top: '75%',
          textAlign: 'center',
          subtextStyle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: "#000"
          }
        }
      ],
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          data: promoteInfoData.value.CS.map(i => ({ name: i.type, value: i.num })),
          label: {
            position: 'outer',
            alignTo: 'none',
            bleedMargin: 5,
            formatter: "{b}：{d}%"
          },
          left: 0,
          right: '66.6667%',
          top: 0,
          bottom: 0
        },
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          data: promoteInfoData.value.PS.map(i => ({ name: i.type, value: i.num })),
          label: {
            position: 'outer',
            alignTo: 'labelLine',
            bleedMargin: 5,
            formatter: "{b}：{d}%"
          },
          left: '33.3333%',
          right: '33.3333%',
          top: 0,
          bottom: 0
        },
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          data: promoteInfoData.value.CDCE.map(i => ({ name: i.type, value: i.num })),
          label: {
            position: 'outer',
            alignTo: 'edge',
            margin: 20,
            formatter: "{b}：{d}%"
          },
          left: '66.6667%',
          right: 0,
          top: 0,
          bottom: 0
        }
      ]
    }
  });
  const getPromoteInfoData = async (year: number) => {
    const res = await http.get(getPromoteInfo, { params: { year } });
    promoteInfoData.value = res.data;
    promoteInfoRef.value?.updateChart(promoteInfoOption.value);
  }

  return { getPromoteInfoData, promoteInfoRef, promoteInfoOption }
}