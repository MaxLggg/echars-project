<template>
  <div class="jobBox">
    <div>
      <el-row :gutter="5">
        <el-col :span="12">
          <JobCard :data="leftData" target-color="#E2635E" />
        </el-col>
        <el-col :span="12">
          <JobCard :data="rightData" target-color="#58CA8B" />
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="5">
        <el-col :span="12">
          <div>
            <EchartsCard
              chart-name="targetBar"
              ref="targetBarRef"
              :height="300"
              :option="targetBarOption"
            />
          </div>
        </el-col>
        <el-col :span="12">
          <EchartsCard
            chart-name="netIncreaseBar"
            ref="netIncreaseBarRef"
            :height="300"
            :option="netIncreaseBarOption"
          />
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-card shadow="hover">
            <div class="totalCostBox">
              <div>
                <div class="title">人工</div>
                <div class="valueBox">
                  <span class="blue">{{ jobTotalCost.artificial }}</span> 万
                </div>
              </div>
              <div>
                <div>奖金</div>
                <div class="valueBox">
                  <span class="green">{{ jobTotalCost.bonus }}</span> 万
                </div>
              </div>
              <div>
                <div>渠道</div>
                <div class="valueBox">
                  <span class="yellow">{{ jobTotalCost.channel }}</span> 万
                </div>
              </div>
            </div>
            <div>
              <EchartsCard
                chart-name="jobCostInfo"
                ref="jobCostInfoRef"
                :height="300"
                :option="jobCostInfoOption"
                :card-mode="false"
              />
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover">
            <EchartsCard
              chart-name="jobPersonCost"
              ref="jobPersonCostRef"
              :height="372"
              :option="jobPersonCostOption"
              :card-mode="false"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div>
      <EchartsCard
        chart-name="jobResources"
        ref="jobResourcesRef"
        :height="300"
        :option="jobResourcesOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import JobCard, { JobCardData } from "../../../components/job/Card.vue";
import EchartsCard from "../../../components/common/EchartsCard.vue";
import useGetJobTarget from "./hooks/useGetTarget";

export interface IJobDataProps {
  year: number;
  deptName: string[];
  areaName: string;
}

const props = defineProps<IJobDataProps>();

const {
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
} = useGetJobTarget();

const leftData = computed<JobCardData>(() => ({
  label1: "招聘目标",
  label2: "实际招聘",
  label3: "距目标差值",
  value1: targetYear.recruitTarget,
  value2: targetYear.actualRecruit,
  value3: targetYear.recruitValue,
  percent1: targetYear.recruitAdvanceRate,
  percent2: targetYear.recruitTimeRate
}));
const rightData = computed<JobCardData>(() => ({
  label1: "净增长目标",
  label2: "实际净增长",
  label3: "距目标差值",
  value1: targetYear.netGrowthTarget,
  value2: targetYear.actualNetGrowth,
  value3: targetYear.growthValue,
  percent1: targetYear.growthAdvanceRate,
  percent2: targetYear.growthTimeRate
}));

const barData: {
  month: number;
  value: number;
  actualNum: number;
  percent: number;
}[] = [];
const getBarLineData = () => {
  for (let i = 1; i < 8; i++) {
    barData.push({
      month: i,
      value: 140 + Math.round(Math.random() * i * 10),
      actualNum: 150 + Math.round(Math.random() * i * 5),
      percent: 40 + i
    });
  }
};
getBarLineData();

const getJobInitData = () => {
  // const pdu = props.deptName.length > 1 ? props.deptName[1] : "";
  getJobTargetData(props.year, props.deptName[0], props.areaName);
};

onMounted(() => {
  getJobInitData();
});

defineExpose({ getJobInitData });
</script>

<style lang="less" scoped>
.jobBox {
  padding: 20px 10px;
  background-color: #f3f5f9;
  & > div {
    margin: 0 0 10px 0;
    // background-color: #fff;
    .digitBox {
      display: flex;
      justify-content: space-around;
    }
    .progressBox {
      & > div {
        margin-bottom: 10px;
      }
      :deep(.progressLabel2) {
        bottom: 15px;
      }
    }
    .totalCostBox {
      display: flex;
      justify-content: space-around;
      color: #7b818f;
      .valueBox {
        font-weight: bold;
        margin: 10px 0;
        .blue {
          color: #548af8;
          font-size: 24px;
        }
        .green {
          color: #46c3d1;
          font-size: 24px;
        }
        .yellow {
          color: #e98e39;
          font-size: 24px;
        }
      }
    }
  }
}
</style>
