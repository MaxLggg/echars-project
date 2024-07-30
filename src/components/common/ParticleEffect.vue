<template>
  <div class="particleEffectBox">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { useRequestAnimationFrame } from "../../utils/requestAnimationFrame";
import { hex2Rgba } from "../../utils/particleUtil";
import _ from "lodash";
export interface IWarea {
  x: number;
  y: number;
  xa: number;
  ya: number;
  max: number;
}

export interface IParticleProps {
  max?: number;
  color?: string;
  bgColor?: string;
}

const props = withDefaults(defineProps<IParticleProps>(), {
  max: 5000,
  color: "#000000",
  bgColor: "#ffffff"
});
const rgba = computed(() => (ratio: number) => {
  const _rgba = hex2Rgba(props.color, ratio + 0.2);
  return `${_rgba.rgba}`;
});

const bgColor = computed(() => props.bgColor);

const { requestAnimationFrame } = useRequestAnimationFrame();
const canvas = ref<HTMLCanvasElement>();

// x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
const warea: IWarea = { x: 0, y: 0, max: 20000, ya: 0, xa: 0 };
const dots: IWarea[] = [];

const clearCanvas = () => {
  const ctx = canvas.value?.getContext("2d");
  ctx && ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
};

const animate = () => {
  const ctx = canvas.value?.getContext("2d") as CanvasRenderingContext2D;
  clearCanvas();
  // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
  const ndots = [warea].concat(dots);
  if (canvas.value) {
    dots.forEach(dot => {
      // 粒子位移
      dot.x += dot.xa;
      dot.y += dot.ya;
      // 遇到边界将加速度反向
      dot.xa *= dot.x > canvas.value!.width || dot.x < 0 ? -1 : 1;
      dot.ya *= dot.y > canvas.value!.height || dot.y < 0 ? -1 : 1;

      // 绘制点
      ctx?.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);

      // 循环比对粒子间的距离
      const length = ndots.length;
      for (let i = 0; i < length; i++) {
        const d2 = ndots[i];
        if (dot === d2 || d2.x === null || d2.y === null) {
          continue;
        }
        const xc = dot.x - d2.x;
        const yc = dot.y - d2.y;
        // 两个粒子之间的距离
        const dis = xc * xc + yc * yc;
        // 距离比
        let ratio;
        // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
        if (dis < d2.max) {
          // 如果是鼠标，则让粒子向鼠标的位置移动
          if (d2 === warea && dis > d2.max / 2) {
            dot.x -= xc * 0.03;
            dot.y -= yc * 0.03;
          }
          // 计算距离比
          ratio = (d2.max - dis) / d2.max;
          // 画线
          ctx.beginPath();
          ctx.lineWidth = ratio / 2;
          ctx.strokeStyle = rgba.value(ratio);
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(d2.x, d2.y);
          ctx.stroke();
        }
      }
      // 将已经计算过的粒子从数组中删除
      ndots.splice(ndots.indexOf(dot), 1);
    });
    requestAnimationFrame(animate);
  }
};

const resize = () => {
  canvas.value!.width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  canvas.value!.height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
};

const _resize = _.debounce(resize, 300);

const _mousemove = (e: MouseEvent) => {
  e = e || window.event;
  warea.x = e.clientX;
  warea.y = e.clientY;
};

const _mouseout = () => {
  warea.x = 0;
  warea.y = 0;
};

const initListener = () => {
  window.addEventListener("resize", _resize);
  window.addEventListener("mousemove", _mousemove);
  window.addEventListener("mouseout", _mouseout);
};

const removeListener = () => {
  window.removeEventListener("resize", _resize);
  window.removeEventListener("mousemove", _mousemove);
  window.removeEventListener("mouseout", _mouseout);
};

const addParticle = () => {
  // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
  for (let i = 0; i < 300; i++) {
    dots.push({
      x: Math.random() * canvas.value!.width,
      y: Math.random() * canvas.value!.height,
      xa: Math.random() * 2 - 1,
      ya: Math.random() * 2 - 1,
      max: props.max
    });
  }
};
const init = () => {
  resize();
  initListener();
  addParticle();
};

onMounted(() => {
  init();
  nextTick(() => {
    animate();
  });
});

onUnmounted(() => {
  removeListener();
});
</script>
<style lang="less" scoped>
.particleEffectBox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: v-bind(bgColor);
}
</style>
