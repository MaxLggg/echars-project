import { computed, ref } from "vue";
import { getEncourageUser } from "../../../api/hrReport"
import { EchartsCardRef } from "../../../types/common/Index";
import { PersonEncourageUserListItem } from "../../../types/hrReport";
import http from "../../../utils/http"

type EncourageUserBase = {
  CDCE: PersonEncourageUserListItem[];
  CS: PersonEncourageUserListItem[];
  PS: PersonEncourageUserListItem[];
}

export default function useGetEncourageUser() {

  const encourageUserData = ref<EncourageUserBase>({ CDCE: [], CS: [], PS: [], });
  const encourageUserCSRef = ref<EchartsCardRef>();
  const encourageUserCDCERef = ref<EchartsCardRef>();
  const encourageUserPSRef = ref<EchartsCardRef>();

  const buildEncourageUserOption = computed(() => (type: "CDCE" | "PS" | "CS"): echarts.EChartsOption => {
    const data = encourageUserData.value[type];
    return {
      title: { text: type, left: "center" },
      grid: {
        left: 150
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
        valueFormatter: val => `${val} 元`
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: data.map(i => i.user),
      },
      series: [
        { type: "bar", data: data.map(i => i.money) }
      ]
    }
  })
  const getEncourageUserData = async (year: number) => {
    const res = await http.get(getEncourageUser, { params: { year } });
    encourageUserData.value = res.data;
    encourageUserCSRef.value?.updateChart(buildEncourageUserOption.value("CS"));
    encourageUserCDCERef.value?.updateChart(buildEncourageUserOption.value("CDCE"));
    encourageUserPSRef.value?.updateChart(buildEncourageUserOption.value("PS"));
  };

  return {
    getEncourageUserData,
    encourageUserCSRef,
    encourageUserCDCERef,
    encourageUserPSRef,
    buildEncourageUserOption
  }
}