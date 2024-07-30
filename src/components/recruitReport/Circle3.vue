<template>
  <div class="circleContainer">
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
        <div></div>
        <div>及时完成</div>
      </div>
    </div>
    <canvas
      ref="canvasRef"
      :width="canvasWidth"
      :height="canvasHeight"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";

export interface ICircleProps {
  width?: number;
  height?: number;
  radius?: number;
  data: {
    num: number;
    num1: number;
    num2: number;
  };
}
export interface CircleProps {
  left: number;
  top: number;
  radius: number;
}

type LinePath = [x: number, y: number];
type TextProp = [text: string, x: number, y: number];
const CircleColor = {
  radius1: "#bac1bc",
  radius2: "#c0d3a9",
  radius3: "#7fb470"
};
const props = withDefaults(defineProps<ICircleProps>(), {
  width: 200,
  height: 200,
  radius: 200
});

const canvasWidth = computed(() => props.width + props.radius + 100);
const canvasHeight = computed(() => props.width + props.radius);

const radius1 = computed(() => {
  const radius = props.data.num || 1;
  return Math.round(props.radius * Math.sqrt(props.data.num1 / radius));
});
const radius2 = computed(() => {
  const radius = props.data.num || 1;
  return Math.round(props.radius * Math.sqrt(props.data.num2 / radius));
});

const canvasRef = ref<HTMLCanvasElement>();

const drawCircle = (
  ctx: CanvasRenderingContext2D,
  data: CircleProps,
  color: string
) => {
  ctx.beginPath();
  ctx.arc(data.left, data.top, data.radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

/**
 * 画线
 * @param ctx
 * @param start 开始坐标
 * @param end 结束坐标
 */
const drawLine = (
  ctx: CanvasRenderingContext2D,
  start: LinePath,
  end: LinePath
) => {
  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.lineTo(end[0], end[1]);
  ctx.strokeStyle = "#999";
  ctx.stroke();
};

/**
 * 画文字
 * @param ctx
 * @param text
 */
const drawText = (ctx: CanvasRenderingContext2D, text: TextProp) => {
  ctx.fillStyle = "#999";
  ctx.font = "12px Arial";
  ctx.fillText(text[0], text[1], text[2]);
};

const updateCircle = () => {
  try {
    if (props.data.num === 0) {
      return;
    }
    const ctx = canvasRef.value!.getContext("2d")!;
    ctx.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);
    const top1 = props.radius;

    let top2 = top1 + props.radius - radius1.value;
    const top3 = top2 + radius1.value - radius2.value;
    if (props.data.num1 === props.data.num2) {
      top2 = top2 - 24;
    }
    const topMargin = props.radius / 10 > 15 ? 15 : props.radius / 10;
    // 第一个圆
    drawCircle(
      ctx,
      {
        left: props.radius,
        top: top1,
        radius: props.radius
      },
      CircleColor.radius1
    );
    drawLine(ctx, [props.radius, topMargin], [props.radius * 2, topMargin]);
    drawText(ctx, [
      `需求人数：${props.data.num}`,
      props.radius * 2 + 2,
      topMargin + 5
    ]);

    // 第二个圆
    const topMargin2 = radius1.value / 10 > 10 ? 10 : radius1.value / 10;
    if (radius1.value > 0) {
      drawCircle(
        ctx,
        {
          left: props.radius,
          top: top2,
          radius: radius1.value
        },
        CircleColor.radius2
      );
    }
    drawLine(
      ctx,
      [props.radius, top2 - radius1.value + topMargin2],
      [props.radius * 2, top2 - radius1.value + topMargin2]
    );
    drawText(ctx, [
      `已完成：${props.data.num1}`,
      props.radius * 2 + 2,
      top2 - radius1.value + topMargin2
    ]);
    drawText(ctx, [
      `占比：${((props.data.num1 / props.data.num) * 100).toFixed(2)}%`,
      props.radius * 2 + 2,
      top2 - radius1.value + topMargin2 + 12
    ]);

    // 第三个圆
    const topMargin3 = radius2.value / 10 > 5 ? 10 : radius2.value / 10;
    if (radius2.value > 0) {
      drawCircle(
        ctx,
        {
          left: props.radius,
          top: top3,
          radius: radius2.value
        },
        CircleColor.radius3
      );
    }
    drawLine(
      ctx,
      [props.radius, top3 - radius2.value + topMargin3],
      [props.radius * 2, top3 - radius2.value + topMargin3]
    );
    drawText(ctx, [
      `及时完成：${props.data.num2}`,
      props.radius * 2 + 2,
      top3 - radius2.value + topMargin3
    ]);
    drawText(ctx, [
      `占比：${((props.data.num2 / props.data.num) * 100).toFixed(2)}%`,
      props.radius * 2 + 2,
      top3 - radius2.value + topMargin3 + 12
    ]);
  } catch (error) {
    console.error("[ error :]", error);
  }
};

onMounted(() => {
  updateCircle();
});

defineExpose({ updateCircle });
</script>

<style lang="less" scoped>
@circle1Color: #bac1bc;
@circle2Color: #c0d3a9;
@circle3Color: #7fb470;
.circleContainer {
  margin: 0 0 0 45px;
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
}
</style>
