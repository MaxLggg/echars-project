<template>
  <el-card shadow="hover">
    <div class="digitBox">
      <div>
        <div class="labelBox">{{ props.data.label1 }}</div>
        <div class="countBox">
          <CountTo
            :duration="2000"
            :startVal="0"
            :endVal="props.data.value1"
            separator=","
          />
          <span>人</span>
        </div>
      </div>
      <div>
        <div class="labelBox">{{ props.data.label2 }}</div>
        <div class="countBox">
          <CountTo
            :duration="2000"
            :startVal="0"
            :endVal="props.data.value2"
            separator=","
          />
          <span>人</span>
        </div>
      </div>
      <div>
        <div class="labelBox">{{ props.data.label3 }}</div>
        <div class="targetBox">
          <CountTo
            :duration="2000"
            :startVal="0"
            :endVal="props.data.value3"
            separator=","
          />
          <span>人</span>
        </div>
      </div>
    </div>
    <div class="progressBox">
      <commonProgress
        :value="props.data.percent1"
        :label-width="100"
        :format="val => `${val}%`"
        :percentColor="percentColor(props.data.percent1)"
      />
      <commonProgress
        label-class="progressLabel2"
        :value="props.data.percent2"
        :label-width="100"
        :format="val => `时间消耗${val}%`"
        :percentColor="percentColor(props.data.percent2)"
      />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import CountTo from "../common/CountTo.vue";
import commonProgress from "../../components/common/Progress2.vue";
import { computed } from "vue";

export interface JobCardData {
  label1: string;
  label2: string;
  label3: string;
  value1: number;
  value2: number;
  value3: number;
  percent1: number;
  percent2: number;
}
export interface JobCardProps {
  data: JobCardData;
  targetColor: string;
}
const props = defineProps<JobCardProps>();

const countColor = computed(() => props.targetColor);

const percentColor = computed(() => (val: number) => {
  return val > 0 ? "#46C3D1" : "#E2635E";
});
</script>

<style lang="less" scoped>
.digitBox {
  display: flex;
  justify-content: space-around;
  .labelBox {
    color: #7b818f;
    margin-bottom: 10px;
  }
  .countBox {
    & > span:first-child {
      font-size: 24px;
      margin-right: 5px;
    }
  }
  .targetBox {
    & > span:first-child {
      color: v-bind(countColor);
      font-size: 24px;
    }
  }
}
.progressBox {
  margin-top: 20px;
  & > div {
    margin-bottom: 20px;
  }
  :deep(.progressLabel2) {
    bottom: 5px;
  }
}
</style>
