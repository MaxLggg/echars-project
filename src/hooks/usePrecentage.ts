import { ref, onMounted } from "vue";

export function usePrecentage() {
  const percentage = ref(0);
  // const updatePercentage = (isNeedAnimation: boolean = true) => {
  //   // 没有动画效果，直接赋值
  //   if (!isNeedAnimation) {
  //     percentage.value = props.percent;
  //     return;
  //   }
  //   const maxPercent = props.percent >= 100 ? 100 : props.percent;
  //   const timerId = setInterval(() => {
  //     if (percentage.value < maxPercent) {
  //       percentage.value++;
  //     } else {
  //       clearInterval(timerId);
  //       percentage.value = maxPercent;
  //     }
  //   }, props.timeSpeed);
  // };

  onMounted(() => {
    // updatePercentage();
  });
  return { percentage }
}