<template>
  <div class="circleBox">
    <div class="titleBox">
      <div class="labelBox color1">
        <div></div>
        <div>需求人数</div>
      </div>
      <div class="labelBox color2">
        <div></div>
        <div>已完成</div>
      </div>
      <div class="labelBox color3">
        ·
        <div></div>
        <div>及时完成</div>
      </div>
    </div>
    <div class="circle1">
      <div class="circleLbale1">
        <div class="line1"></div>
        <div>需求人数 {{ props.data.num }}</div>
      </div>
      <div class="circle2" v-if="isShowInnerCircle">
        <div class="circleLbale2">
          <div></div>
          <div class="line2"></div>
          <div>
            <div>已完成：{{ props.data.num1 }}</div>
            <div>
              占比：
              {{ ((props.data.num1 / props.data.num) * 100).toFixed(2) }}%
            </div>
          </div>
        </div>
        <div class="circle3">
          <div class="circleLbale3">
            <div class="line3"></div>
            <div>
              <div>及时完成：{{ props.data.num2 }}</div>
              <div>
                占比：{{
                  ((props.data.num2 / props.data.num) * 100).toFixed(2)
                }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
export interface ICircleProps {
  radius?: number;
  color?: string;
  label?: string;
  data: {
    num: number;
    num1: number;
    num2: number;
  };
}
const props = withDefaults(defineProps<ICircleProps>(), {
  radius: 200,
  color: "red"
});

const isShowInnerCircle = computed(() => props.data.num > 0);

const radius1 = computed(() =>
  Math.round(props.radius * Math.sqrt(props.data.num1 / props.data.num))
);
const radius2 = computed(() =>
  Math.round(props.radius * Math.sqrt(props.data.num2 / props.data.num))
);

const width = computed(() => `${props.radius * 2}px`);
const width1 = computed(() => `${radius1.value * 2}px`);
const width2 = computed(() => `${radius2.value * 2}px`);

const left1 = computed(() => `${props.radius - radius1.value}px`);
const left2 = computed(() => `${radius1.value - radius2.value}px`);
const top1 = computed(() => {
  if (props.data.num1 === 0) {
    return 0;
  }
  return `${(props.radius - radius1.value) * 2}px`;
});
const top2 = computed(() => {
  if (radius2.value === 0) {
    return `${radius1.value / 2}px`;
  }
  return `${(radius1.value - radius2.value) * 2}px`;
});

const bottom3 = computed(() => {
  console.log("[ radius2 :]", radius2.value);
  if (radius2.value === 0) {
    return width2.value;
  }
  return `${radius2.value}px`;
});

const labelLeft1 = computed(() => `${props.radius}px`);
const labelLeft2 = computed(() => `${radius1.value}px`);
const labelLeft3 = computed(() => `${radius2.value}px`);

// const color = computed(() => props.color);
const labelRight = computed(() => `-${props.radius + 20}px`);
const labelLineRight = computed(() => `${props.radius / 2 + 10}px`);
const labelLineWidth = computed(() => `${props.radius / 2}px`);

// const circleLbale3Bottom = computed(() => `${props.radius})
</script>

<style lang="less" scoped>
@circle1Color: #bac1bc;
@circle2Color: #c0d3a9;
@circle3Color: #7fb470;
@lineColor: #999;
.circleBox {
  .titleBox {
    display: flex;
    justify-content: space-evenly;
    width: v-bind(width);
    padding: 10px 0;
    .labelBox {
      text-align: center;
      display: flex;
      font-size: 14px;
      & > div:first-child {
        margin-right: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        position: relative;
        top: 6px;
      }
    }
    .color1 {
      color: #333;
      & > div:first-child {
        background-color: @circle1Color;
      }
    }
    .color2 {
      color: #333;
      & > div:first-child {
        background-color: @circle2Color;
      }
    }
    .color3 {
      color: #333;
      & > div:first-child {
        background-color: @circle3Color;
      }
    }
  }
  .circle1 {
    width: v-bind(width);
    height: v-bind(width);
    border-radius: 50%;
    background-color: @circle1Color;
    color: @lineColor;
    font-size: 12px;
    .circleLbale1 {
      float: left;
      display: flex;
      position: relative;
      left: v-bind(labelLeft1);
      .line1 {
        border-top: 1px solid;
        width: v-bind(labelLeft1);
        position: relative;
        top: 10px;
        margin-right: 10px;
      }
    }
    .circle2 {
      width: v-bind(width1);
      height: v-bind(width1);
      border-radius: 50%;
      color: @lineColor;
      font-size: 12px;
      background-color: @circle2Color;
      position: relative;
      left: v-bind(left1);
      top: v-bind(top1);
      .circleLbale2 {
        float: left;
        display: flex;
        position: relative;
        left: v-bind(labelLeft2);
        & > div:first-child {
          z-index: 10;
        }
        & > div:last-child {
          width: 100px;
        }
        .line2 {
          border-top: 1px solid;
          width: v-bind(labelLeft1);
          position: relative;
          top: 10px;
          margin-right: 10px;
        }
      }
      .circle3 {
        width: v-bind(width2);
        height: v-bind(width2);
        border-radius: 50%;
        background-color: @circle3Color;
        position: relative;
        left: v-bind(left2);
        top: v-bind(top2);
        .circleLbale3 {
          float: left;
          display: flex;
          position: relative;
          color: @lineColor;
          font-size: 12px;
          left: v-bind(labelLeft3);
          // bottom: v-bind(bottom3);
          & > div:last-child {
            width: 100px;
          }
          .line3 {
            border-top: 1px solid;
            width: v-bind(labelLeft1);
            position: relative;
            top: 10px;
            margin-right: 10px;
          }
        }
      }
    }
    .label {
      position: relative;
      right: v-bind(labelRight);
      top: 20px;
      .line {
        height: 1px;
        width: v-bind(labelLineWidth);
        background-color: #000;
        position: relative;
        top: -10px;
        right: v-bind(labelLineRight);
      }
    }
  }
}
</style>
