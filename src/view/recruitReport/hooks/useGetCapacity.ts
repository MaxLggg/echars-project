import { computed, onMounted, ref } from "vue";
import { getCapacityList } from "../../../api/recruitReport";
import { EchartsCardRef } from "../../../types/common/Index";
import { CapacityBarData, CapacityInnerItem, CapacityListItem } from "../../../types/recruitReport";
import http from "../../../utils/http";
import _ from "lodash";

export interface CapacityBarOption {
  legend: string;
  yAxisKey: string;
  color: string;
}

type CapacityBarDataKey = keyof CapacityBarData;



export default function useGetCapacity() {

  // const capacityDate = ref(["2021-09-01", "2021-09-01"]);
  const capacityDate = ref(["", ""]);
  const capacityListData = ref<CapacityListItem[]>([]);

  const capacityBarKeys: CapacityBarDataKey[] = ["pushNum", "waitEntryNum", "entryNum", "waitReviewNum", "waitTalkNum", "giveupNum"];

  const capacityBarRefs: { key: CapacityBarDataKey; value: EchartsCardRef; }[] = [];
  const setCapacityItemRef = (el: EchartsCardRef, key: CapacityBarDataKey) => {
    if (capacityBarRefs.some(item => item.key === key)) {
      return;
    }
    capacityBarRefs.push({ key, value: el });
  }

  const capacityBarList = computed<CapacityBarData>(() => {
    const obj: CapacityBarData = {
      pushNum: [],
      waitEntryNum: [],
      entryNum: [],
      waitReviewNum: [],
      waitTalkNum: [],
      giveupNum: [],
    }
    if (capacityListData.value.length > 0) {
      capacityListData.value.forEach(item => {
        obj.pushNum.push({ hrName: item.hrName, value: item.pushNum, label: "推送量", color: "#C4C87B" });
        obj.waitEntryNum.push({ hrName: item.hrName, value: item.waitEntryNum, label: "待入职", color: "#BACBA5" });
        obj.entryNum.push({ hrName: item.hrName, value: item.entryNum, label: "已入职", color: "#5A8783" });
        obj.waitReviewNum.push({ hrName: item.hrName, value: item.waitReviewNum, label: "待评审", color: "#B099AA" });
        obj.waitTalkNum.push({ hrName: item.hrName, value: item.waitTalkNum, label: "谈判中", color: "#A484CF" });
        obj.giveupNum.push({ hrName: item.hrName, value: item.giveupNum, label: "放弃入职", color: "#908A8A" });
      });
      // return obj;
    } else {
      obj.pushNum = [];
      obj.waitEntryNum = [];
      obj.entryNum = [];
      obj.waitReviewNum = [];
      obj.waitTalkNum = [];
      obj.giveupNum = [];
    };
    Object.keys(obj).forEach((key: string) => {
      // @ts-ignore
      obj[key] = _.sortBy(obj[key], function (item) {
        return item.value
      });
    });
    return obj
  })
  const buildOption = (data: any[], options: CapacityBarOption): echarts.EChartsOption => {
    return {
      legend: {
        data: [options.legend]
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
        valueFormatter: val => `${val} 人`
      },
      yAxis: {
        type: 'category',
        axisPointer: {
          type: "shadow"
        },
        data: data.map(d => d.hrName)
      },
      xAxis: {
        type: "value"
      },
      series: [
        {
          type: "bar",
          name: options.legend,
          itemStyle: {
            color: options.color
          },
          data: data.map(d => d[options.yAxisKey])
        },
      ]
    }
  }

  const buildOptions = (key: CapacityBarDataKey): echarts.EChartsOption => {
    let data: CapacityInnerItem[] = capacityBarList.value[key];
    if (data.length < 1) {
      return {};
    }
    return {
      legend: {
        data: [data[0].label]
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
        valueFormatter: val => `${val} 人`
      },
      yAxis: {
        type: 'category',
        axisPointer: {
          type: "shadow"
        },
        data: data.map(d => d.hrName)
      },
      xAxis: {
        type: "value"
      },
      series: [
        {
          type: "bar",
          name: data[0].label,
          itemStyle: {
            color: data[0].color
          },
          data: data.map(d => d.value)
        },
      ]
    }
  }


  const getCapacityListData = async (deptName: string, time: string[]) => {
    time = !time ? ["", ""] : time;
    const res = await http.get(getCapacityList,
      {
        params:
        {
          deptName,
          startTime: time[0],
          endTime: time[1]
        }
      });
    capacityListData.value = res.data;
    capacityBarRefs.forEach((ref) => {
      ref.value.updateChart(buildOptions(ref.key));
    })
  }

  // onMounted(() => {
  //   getCapacityListData("PS", capacityDate.value);
  // });
  return { getCapacityListData, capacityDate, setCapacityItemRef, buildOptions, capacityBarKeys }
}