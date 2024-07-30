import { computed, onMounted, ref } from "vue";
import { getOfferChangeRate, getPDUAndHRList } from "../../../api/recruitReport";
import { EchartsCardRef } from "../../../types/common/Index";
import { ConverData, PDUAndHRListItem } from "../../../types/recruitReport";
import http from "../../../utils/http";

export default function useInterview() {
  const converType = ref<"A" | "B">("A");
  const publicColValue = ref("全部");
  const typeOptions = ref<PDUAndHRListItem[]>([]);
  const converFunnelData = ref<ConverData>({} as ConverData);
  // @ts-ignore
  const converFunnelOption = computed<echarts.EChartsOption>(() => {
    return {
      tooltip: {
        trigger: 'item',
        // formatter: '{b} : {c}人'
        formatter: function (params: any) {
          if (params.dataIndex > 0) {
            // @ts-ignore
            return `${params.name} ${params.value}人  转化率 ${params.data.rate}% `;
          }
          return `${params.name} ${params.value}人`;
        }
      },
      series: [
        {
          type: "funnel",
          left: '10%',
          top: 60,
          bottom: 60,
          width: '70%',
          sort: 'none',
          gap: 2,
          label: {
            show: true,
            formatter: function (params) {
              if (params.dataIndex > 0) {
                // @ts-ignore
                return `${params.name} ${params.value}人  转化率 ${params.data.rate}% `;
              }
              return `${params.name} ${params.value}人`;
            }
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1
          },
          emphasis: {
            label: {
              fontSize: 20
            }
          },
          data: [
            {
              name: "推送简历",
              value: converFunnelData.value.pushNum || 0,
              rate: (converFunnelData.value.pushRate * 100).toFixed(2) || 0
            },
            {
              name: "初面通过",
              value: converFunnelData.value.firstNum || 0,
              rate: (converFunnelData.value.firstRate * 100).toFixed(2) || 0
            },
            {
              name: "技面通过",
              value: converFunnelData.value.tecNum || 0,
              rate: (converFunnelData.value.tecRate * 100).toFixed(2) || 0
            },
            {
              name: "综面通过",
              value: converFunnelData.value.finalNum || 0,
              rate: (converFunnelData.value.finalRate * 100).toFixed(2) || 0
            },
            {
              name: "评审通过",
              value: converFunnelData.value.reviewNum || 0,
              rate: (converFunnelData.value.reviewRate * 100).toFixed(2) || 0
            },
            {
              name: "入职",
              value: converFunnelData.value.entryNum || 0,
              rate: (converFunnelData.value.entryRate * 100).toFixed(2) || 0
            },
            // { name: "推送简历", value: 6, rate: 100 },
            // { name: "初面通过", value: 5, rate: 20 },
            // { name: "技面通过", value: 4, rate: 19 },
            // { name: "综面通过", value: 3, rate: 18 },
            // { name: "评审通过", value: 2, rate: 22 },
            // { name: "入职", value: 1, rate: 30 },
          ]
        }
      ]
    }
  });

  const converFunnelRef = ref<EchartsCardRef>();

  const getTypeOptions = async (deptName: string, type: string, isChangeTab?: boolean) => {
    const res = await http.get<PDUAndHRListItem[]>(getPDUAndHRList, { params: { deptName, type } })
    typeOptions.value = res.data;
    if (isChangeTab) {
      getConverData(deptName, type, publicColValue.value);
    }
  }

  const getConverData = async (deptName: string, type: string, publicCol: string) => {
    const res = await http.get(getOfferChangeRate, {
      params: {
        deptName, type, publicCol
      }
    });
    converFunnelData.value = res.data;
    converFunnelRef.value?.updateChart(converFunnelOption.value);
  }

  // onMounted(() => {
  //   getTypeOptions("CDCE", converType.value);
  //   getConverData("CDCE", converType.value, publicColValue.value);
  // });

  return {
    typeOptions,
    publicColValue,
    converType,
    getTypeOptions,
    getConverData,
    converFunnelRef,
    converFunnelOption
  }
}