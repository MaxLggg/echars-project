import { computed } from "vue";
import { FIRST_YEAR } from "../../constants";

export default function useGetYearMonth() {
  const now = new Date();

  const currentYear = computed(() => now.getFullYear());
  const currentMonth = computed(() => now.getMonth() + 1);

  const yearOptions = computed(() => {
    const length = currentYear.value - FIRST_YEAR;
    const arr = [];
    for (let i = 0; i <= length; i++) {
      arr.push({
        id: now.getTime() + i,
        value: currentYear.value - i,
        label: `${currentYear.value - i}年`
      })
    }
    return arr;
  });

  const monthOptions = computed(() => (year: number | string, length?: number) => {
    let len = length || currentMonth.value;
    if (+year < currentYear.value) {
      len = 12;
    }
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push({
        id: now.getTime() + i,
        value: i + 1,
        label: `${i + 1}月`
      })
    }
    return arr;
  })
  return { yearOptions, monthOptions, currentYear, currentMonth }
}