<template>
  <div class="hrBox">
    <!-- 卡片展示 -->
    <div class="cardBox">
      <el-row :gutter="2">
        <el-col :span="8" v-for="(item, index) in cardData" :key="index">
          <HrCard
            :label="item.label"
            :value="item.value"
            :unit="item.unit"
            :decimals="index === 2 ? 2 : 0"
          />
        </el-col>
      </el-row>
    </div>
    <!-- pie box -->
    <div class="pieBox">
      <el-row :gutter="2">
        <el-col :span="8">
          <!-- 人员职级分布 -->
          <EchartsCard
            chartName="cadrePie"
            ref="cadrePieRef"
            :option="cadreOption"
          />
        </el-col>
        <el-col :span="8">
          <!-- 人员技能分布 -->
          <EchartsCard
            chartName="skillPie"
            ref="skillPieRef"
            :option="skillOption"
          />
        </el-col>
        <el-col :span="8">
          <!-- 干部人员占比 -->
          <EchartsCard
            chartName="positionPie"
            ref="positionPieRef"
            :option="positionOption"
          />
        </el-col>
      </el-row>
    </div>
    <div class="employmentBox">
      <el-row :gutter="2">
        <el-col :span="12">
          <!-- 人员入离职分析 -->
          <EchartsCard
            chartName="personEntryOut"
            ref="personEntryOutRef"
            :height="300"
            :option="personEntryOutOption"
          />
        </el-col>
        <el-col :span="12">
          <!-- 员工流失率 -->
          <EchartsCard
            chartName="lossRate"
            ref="lossRateRef"
            :height="300"
            :option="lossRateOption"
          />
        </el-col>
      </el-row>
    </div>
    <!-- 离职率分析 -->
    <div>
      <EchartsCard
        chartName="personOutRate"
        ref="personOutRateRef"
        :height="300"
        :option="personOutRateOption"
      />
    </div>
    <!-- 费用支出 -->
    <div class="expensesBox">
      <div class="titleBox">
        <div>费用支出</div>
        <div>
          <FeeCard
            label="总费用"
            :value="costSumData.sumCost"
            color="#46C3D1"
          />
          <FeeCard
            label="津贴费用"
            :value="costSumData.subsidyCost"
            color="#548AF8"
          />
          <FeeCard
            label="激励费用"
            :value="costSumData.encourageCost"
            color="#E98E39"
          />
        </div>
      </div>
      <EchartsCard
        chartName="costMonthBar"
        ref="costMonthBarRef"
        :cardMode="false"
        :height="300"
        :option="costMonthBarOption"
      />
    </div>
    <!-- 项目分布pie图 -->
    <div>
      <el-row :gutter="2">
        <el-col :span="8">
          <!-- 人员职级分布 -->
          <!-- <EchartsCard chartName="MSPSkillPie" :option="positionOption" /> -->
        </el-col>
        <el-col :span="8">
          <!-- 人员技能分布 -->
          <!-- <EchartsCard chartName="jindiePie" :option="skillOption" /> -->
        </el-col>
        <el-col :span="8">
          <!-- 干部人员占比 -->
          <!-- <EchartsCard chartName="mingyuanPie" :option="cadreOption" /> -->
        </el-col>
      </el-row>
    </div>
    <!-- 认证人数分析 -->
    <div class="authenticationBarBox">
      <!-- <EchartsCard
        chartName="authenticationBar"
        :height="300"
        :option="authenticationOption"
      /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import HrCard from "../../../components/hr/SimpleCard.vue";
import EchartsCard from "../../../components/common/EchartsCard.vue";
import FeeCard from "../../../components/hr/FeeCard.vue";
import * as echarts from "echarts";
import useGetPersonData from "./hooks/useGetPersonData";
import useGetCost from "./hooks/useGetCost";
import useGetLossrate from "./hooks/useGetLossrate";

export interface IHrDataProps {
  year: number;
  deptName: string[];
}
// const props = withDefaults(defineProps<IHrDataProps>(), {});
const props = defineProps<IHrDataProps>();

const {
  cardData,
  positionOption,
  positionPieRef,
  skillOption,
  skillPieRef,
  cadreOption,
  cadrePieRef,
  getMergeData,
  personOutRateRef,
  personOutRateOption,
  personEntryOutRef,
  personEntryOutOption
} = useGetPersonData();

const { costSumData, getCostData, costMonthBarRef, costMonthBarOption } =
  useGetCost();

const { lossRateRef, lossRateOption, getLossRateData } = useGetLossrate();

const authenticationData: { type: string; num: number }[] = [
  { type: "HCIA", num: 32 },
  { type: "HCIP", num: 7 },
  { type: "HCIE", num: 15 },
  { type: "PMP", num: 28 },
  { type: "阿里ACP", num: 8 }
];

const authenticationOption = ref<echarts.EChartsOption>({
  title: {
    text: "认证人数分析"
  },
  legend: {
    data: ["认证类型"],
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
    data: authenticationData.map(i => i.type),
    type: "category",
    axisPointer: {
      type: "shadow"
    }
  },
  yAxis: {},
  series: [
    {
      type: "bar",
      data: authenticationData.map(i => i.num),
      name: "认证类型",
      itemStyle: {
        color: "#548AF8"
      }
    }
  ]
});

const getInitData = () => {
  const puduId = props.deptName.length > 1 ? props.deptName[1] : "";
  getMergeData(props.year, props.deptName[0], puduId);
  getCostData(props.year, props.deptName[0], puduId);
  getLossRateData(props.year, props.deptName[0], puduId);
};

onMounted(() => {
  getInitData();
});

defineExpose({ getInitData });
</script>

<style lang="less" scoped>
.hrBox {
  background-color: #f3f5f9;
  padding: 20px 10px;
  // .cardBox {
  //   margin-bottom: 10px;
  // }
  & > div {
    margin-bottom: 10px;
  }
  .expensesBox {
    background-color: #fff;
    .titleBox {
      padding: 20px;
      & > div:first-child {
        font-weight: bold;
        font-size: 24px;
      }
      & > div:last-child {
        display: flex;
        justify-content: space-evenly;
        padding: 5px 30%;
      }
    }
  }
  .authenticationBarBox {
    background-color: #fff;
  }
}
</style>
