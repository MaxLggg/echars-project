import { onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { PAGE_ID, TOKEN } from "../../constants/sessionStorageKeys";

export default function useGetUrlToken(isNeedBack?: boolean) {
  const router = useRouter();
  const route = useRoute();
  const token = route.query.token;
  // console.log("[useGetUrlToken token :]", token);
  const pageId = route.query.pageId;
  const code = route.query.code;
  if (token) {
    window.sessionStorage.setItem(TOKEN, token as string);
    window.sessionStorage.setItem(PAGE_ID, pageId as string);
  }

  if (!token && isNeedBack) {
    router.back();
  }

  // const getMsgData = (e: Event) => {
  //   console.log("[getMsgData e  ]", e);
  // }

  // window.top!.addEventListener("message", getMsgData, false);
  // window.addEventListener("message", getMsgData, false);
  // onMounted(() => {
  //   // window.addEventListener("message", getMsgData, false);
  // })

  // onUnmounted(() => {
  //   window.removeEventListener("message", getMsgData, false);
  // })
  return { token, pageId, code }
}