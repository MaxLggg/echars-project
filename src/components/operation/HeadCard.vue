<template>
  <el-card shadow="hover">
    <div class="cardBox">
      <div class="title">{{ props.data.statisticsName }}</div>
      <div class="data">
        <div class="left">
          <div class="label">
            {{
              props.year === currentYear
                ? `截止${props.data.month || "--"}月实际达成`
                : `${props.year}全年实际达成`
            }}
          </div>
          <CountTo
            v-if="hasData"
            :duration="2000"
            :startVal="0"
            :endVal="props.data.realityReach"
            :decimals="2"
            separator=","
          />
          <span v-else>--</span>
          <span class="unit">&nbsp;{{ props.data.unit || "万" }}</span>
        </div>
        <div class="right">
          <div class="label">年度目标</div>
          <CountTo
            v-if="hasData"
            :duration="2000"
            :startVal="0"
            :endVal="props.data.target"
            :decimals="2"
            separator=","
          />
          <span v-else>--</span>
          <span class="unit">&nbsp;{{ props.data.unit || "万" }}</span>
        </div>
      </div>
      <template v-if="props.showProgress">
        <div class="compare" v-if="isBuMode">
          <div>
            <span class="labelSpan">预测年底达成</span>
            <span v-if="hasData" class="compareValueSpan">
              <CountTo
                v-if="hasData"
                :duration="2000"
                :startVal="0"
                :endVal="props.data.calculateReach"
                :decimals="2"
                separator=","
              />
              {{ props.data.unit || "万" }}
            </span>
            <span v-else>--</span>
          </div>
          <div>
            <span class="labelSpan">差值</span>
            <span v-if="hasData" class="compareValueSpan dValue">
              <span>{{ props.data.dValue > 0 ? "+" : "" }}</span>
              <CountTo
                v-if="hasData"
                :duration="2000"
                :startVal="0"
                :endVal="props.data.dValue"
                :decimals="2"
                separator=","
              />
              {{ props.data.unit || "万" }}
            </span>
            <span v-else>--</span>
          </div>
        </div>
        <div class="progressBox">
          <commonProgress
            :value="hasData ? advanceRate : 0"
            :format="val => `${val}%`"
            :percentColor="percentColor"
          />
        </div>
      </template>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CountTo from "../common/CountTo.vue";
import commonProgress from "../../components/common/Progress2.vue";
import { OperateCardData } from "../../types/operation/Index";
import useGetYearMonth from "../../hooks/common/useGetYearMonth";

export interface ICardProps {
  title?: string;
  label?: string;
  data: OperateCardData;
  year: number;
  showProgress: boolean;
  isBuMode: boolean;
}

const props = withDefaults(defineProps<ICardProps>(), {
  showProgress: false,
  isBuMode: true
});

const { currentYear } = useGetYearMonth();
// const arrowColor = computed(() =>
//   props.data.isIncrease ? "#E2635E" : "#58CA8B"
// );
const progressBottom = computed(() => (props.showProgress ? "10px" : "0"));

const hasData = computed(() => !props.data.isNoData);

const dValueColor = computed(() =>
  props.data.dValue > 0 ? "#58CA8B" : "#E2635E"
);

const advanceRate = computed(() => {
  if (props.data.realityReach > props.data.target) {
    return +(
      Math.abs(props.data.realityReach / props.data.target) * 100
    ).toFixed(2);
  }
  return props.data.advanceRate;
});

const percentColor = computed(() =>
  advanceRate.value > 0 ? "#46C3D1" : "#E2635E"
);
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
      .unit {
        font-size: 12px;
      }
      .red {
        color: #e2635e;
        font-weight: bold;
      }
    }
  }
  .compare {
    font-size: 12px;
    color: @labelColor;
    background-color: #f6f7f8;
    margin-bottom: v-bind(progressBottom);
    width: 95%;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    height: 24px;
    line-height: 24px;
    .labelSpan {
      margin-right: 10px;
    }
    .compareValueSpan {
      span {
        font-size: 14px;
        font-weight: bold;
      }
    }
    .dValue {
      span {
        color: v-bind(dValueColor);
      }
    }
  }
}
</style>
