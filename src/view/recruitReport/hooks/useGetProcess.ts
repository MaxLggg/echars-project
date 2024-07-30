import { onMounted, ref } from "vue";
import { getRecruitProcessList } from "../../../api/recruitReport";
import { IProcessData } from "../../../types/recruitReport";
import http from "../../../utils/http";

export default function useGetProcess() {

  const processData = ref<IProcessData>({} as IProcessData)
  const getProcessData = async (deptName: string, type: string) => {
    const res = await http.get<IProcessData>(getRecruitProcessList, {
      params: { deptName, type }
    });
    processData.value = res.data;
  }

  // onMounted(() => {
  //   getProcessData("CDCE", "A");
  // });

  return {
    getProcessData,
    processData
  }
}