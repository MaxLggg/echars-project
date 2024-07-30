import { computed, ref } from "vue";
import { getCertificationInfo } from "../../../api/hrReport";
import { EchartsCardRef } from "../../../types/common/Index";
import { CertificationInfoListItem } from "../../../types/hrReport";
import http from "../../../utils/http";

export default function useGetCertificationInfo() {
  const certificationInfoTab = ref("PS");
  const certificationInfoData = ref<CertificationInfoListItem[]>([]);

  const certificationInfoRef = ref<EchartsCardRef>();

  const legendData: { key: keyof CertificationInfoListItem, value: string }[] = [
    { key: "level1Num", value: "等级1" },
    { key: "level2Num", value: "等级2" },
    { key: "level3Num", value: "等级3" },
    { key: "level4Num", value: "等级4" },
    { key: "level5Num", value: "等级5" },
  ]
  const certificationInfoOption = computed<echarts.EChartsOption>(() => {
    return {
      tooltip: {
        show: true,
        trigger: "axis",
        axisPointer: {
          type: "cross",
          crossStyle: {
            color: "#4E576A"
          }
        },
        valueFormatter: val => `${val} 人`
      },
      legend: {
        left: "center",
        data: legendData.map(i => i.value)
      },
      yAxis: {},
      xAxis: {
        type: "category",
        data: certificationInfoData.value.map(i => i.role)
      },
      series: legendData.map(l => {
        return {
          type: "bar",
          name: l.value,
          stack: "total",
          data: certificationInfoData.value.map(i => i[l.key]),
          emphasis: {
            focus: "series"
          }
        }
      })
    }
  });


  const getCertificationInfoData = async (year: number, deptName: string) => {
    const res = await http.get(getCertificationInfo, { params: { year, deptName } });
    certificationInfoData.value = res.data;
    certificationInfoRef.value?.updateChart(certificationInfoOption.value);
  }
  return { certificationInfoTab, getCertificationInfoData, certificationInfoRef, certificationInfoOption }
}