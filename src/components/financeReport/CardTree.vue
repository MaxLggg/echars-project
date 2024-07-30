<template>
  <canvas :id="props.name" height="500" width="300"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { FinanceBCListItem } from "../../types/financeReport";

export interface ICardTreeProps {
  name: string;
  bgColor: string;
  data: FinanceBCListItem;
}

type LinePath = [x: number, y: number];
type RectPath = [x: number, y: number, width: number, height: number];
type TextProp = [text: string, x: number, y: number];

const props = defineProps<ICardTreeProps>();
const subtitleFont = "12px Arial";
const titleFont = "18px Arial";

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
  ctx.stroke();
};

/**
 * 画矩形
 * @param ctx
 * @param rect
 */
const drawRect = (ctx: CanvasRenderingContext2D, rect: RectPath) => {
  ctx.fillStyle = props.bgColor;
  ctx.fillRect(rect[0], rect[1], rect[2], rect[3]);
};

/**
 * 画文字
 * @param ctx
 * @param text
 * @param isTitle
 */
const drawText = (
  ctx: CanvasRenderingContext2D,
  text: TextProp,
  isTitle: boolean = false
) => {
  ctx.fillStyle = "#000";
  ctx.font = isTitle ? titleFont : subtitleFont;
  ctx.fillText(text[0], text[1], text[2]);
};

const initCanvas = () => {
  const canvas = document.getElementById(props.name)! as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 画线
  // 竖一
  drawLine(ctx, [150, 60], [150, 80]);
  // 竖二
  drawLine(ctx, [150, 130], [150, 310]);
  // 横一
  drawLine(ctx, [105, 180], [195, 180]);
  // 横二
  drawLine(ctx, [105, 260], [150, 260]);

  // 画矩形
  // 中一
  drawRect(ctx, [90, 10, 120, 50]);
  drawText(
    ctx,
    [props.data.deptName, props.data.deptName.length > 2 ? 125 : 142, 30],
    true
  );
  drawText(ctx, [`项目毛利：${props.data.grossRate}%`, 95, 50]);
  // 中二
  drawRect(ctx, [100, 80, 100, 50]);
  drawText(ctx, [`费用率：${props.data.costRate}%`, 105, 110]);
  // 左一
  drawRect(ctx, [5, 155, 100, 50]);
  drawText(ctx, ["管理费用率：", 20, 175]);
  drawText(ctx, [`${props.data.manageCostRate}%`, 30, 195]);
  // 右一
  drawRect(ctx, [195, 155, 100, 50]);
  drawText(ctx, ["销售费用率：", 210, 175]);
  drawText(ctx, [`${props.data.salesCostRate}%`, 225, 195]);
  // 左二
  drawRect(ctx, [5, 235, 100, 50]);
  drawText(ctx, ["研发费用率：", 20, 255]);
  drawText(ctx, [`${props.data.developCostRate}%`, 30, 275]);
  // 中三
  drawRect(ctx, [100, 310, 100, 50]);
  drawText(ctx, ["贡献利润率：", 120, 330]);
  drawText(ctx, [`${props.data.contributionRate}%`, 130, 350]);
};

const updateCardTree = () => {
  initCanvas();
};

onMounted(() => {
  if (props.data) {
    initCanvas();
  }
});

defineExpose({ updateCardTree });
</script>

<style></style>
