<template>
  <el-card shadow="hover">
    <div class="cardBox">
      <div class="title">{{ props.data.statisticsName }}</div>
      <div class="label">预测达成</div>
      <div class="data">
        <div class="left">
          <CountTo
            v-if="hasData"
            :duration="2000"
            :startVal="0"
            :endVal="props.data.calculateReach"
            :decimals="2"
            separator=","
          />
          <span v-else>--</span>
          <span class="unit">&nbsp;{{ props.data.unit || "万" }}</span>
        </div>
        <div class="right">
          <div class="target">
            <span>目标：</span>
            <CountTo
              v-if="hasData"
              :duration="2000"
              :startVal="0"
              :endVal="props.data.target"
              :decimals="2"
              separator=","
            />
            <span v-else>--</span>
            <span>&nbsp;{{ props.data.unit || "万" }}</span>
          </div>
          <div>
            <span>差值：</span>
            <CountTo
              v-if="hasData"
              :duration="2000"
              :startVal="0"
              :endVal="props.data.dValue"
              :decimals="2"
              separator=","
              class="red"
            />
            <span v-else>--</span>
            <span class="red">&nbsp;{{ props.data.unit || "万" }}</span>
          </div>
        </div>
      </div>
      <div class="compare">
        <span>同比去年</span>
        <span v-if="hasData">
          {{ props.data.lastYearRate }}%
          <el-icon class="arrow">
            <top v-if="props.data.isIncrease" />
            <bottom v-else />
          </el-icon>
        </span>
        <span v-else>--</span>
      </div>
      <div class="progressBox" v-if="props.showProgress">
        <commonProgress
          :value="hasData ? props.data.advanceRate : 0"
          :format="val => `${val}%`"
        />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CountTo from "../common/CountTo.vue";
import commonProgress from "../../components/common/Progress2.vue";
import { OperateCardData } from "../../types/operation/Index";

export interface ICardProps {
  title?: string;
  label?: string;
  data: OperateCardData;
  showProgress: boolean;
}

const props = withDefaults(defineProps<ICardProps>(), {
  showProgress: false
});
const arrowColor = computed(() =>
  props.data.isIncrease ? "#E2635E" : "#58CA8B"
);
const progressBottom = computed(() => (props.showProgress ? "10px" : "0"));

const hasData = computed(() => !props.data.isNoData);

const compareBoxWitdth = computed(() => {
  const len = (props.data.lastYearRate + "").length;
  if (len > 4) {
    return "160px";
  }
  return "150px";
});
</script>

<style lang="less" scoped>
@marginBottom: 10px;
@labelColor: #7b818f;
.cardBox {
  background-color: #fff;
  .title {
    font-size: 24px;
    margin-bottom: @marginBottom;
  }
  .label {
    color: @labelColor;
    font-size: 12px;
    margin-bottom: @marginBottom;
  }
  .data {
    font-size: 24px;
    margin-bottom: @marginBottom;
    display: flex;
    justify-content: space-between;
    align-content: stretch;
    align-items: center;
    .left {
      .unit {
        font-size: 12px;
      }
    }
    .right {
      font-size: 12px;
      color: @labelColor;
      & > div {
        span:nth-of-type(2) {
          font-weight: bold;
        }
        span:nth-of-type(3) {
          font-weight: bold;
        }
      }
      .target {
        margin-bottom: 5px;
        span:nth-of-type(2) {
          color: #000;
        }
        span:nth-of-type(3) {
          color: #000;
        }
      }
      .red {
        color: #e2635e;
        font-weight: bold;
      }
    }
  }
  .compare {
    color: @labelColor;
    background-color: #f6f7f8;
    margin-bottom: v-bind(progressBottom);
    width: v-bind(compareBoxWitdth);
    padding: 5px;
    & > span:nth-of-type(1) {
      margin-right: 5px;
    }
    & > span:nth-of-type(2) {
      color: v-bind(arrowColor);
      .arrow {
        top: 2px;
      }
    }
  }
}
</style>
