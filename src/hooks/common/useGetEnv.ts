import { computed } from "vue";

export default function useGetEnv() {
  const isDev = computed(() => process.env.NODE_ENV === 'development');
  return { isDev }
}