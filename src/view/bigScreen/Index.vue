<script setup lang="ts">
import { ref, reactive, onMounted, toRaw, computed } from "vue";
import Operation from "./operation/Index.vue";
import Hr from "./hr/Index.vue";
import Job from "./job/Index.vue";
import http from "../../utils/http";
import {
  getOperationBuIncomeList,
  getOperationCostList,
  getOperationCustomertIncomeList,
  getOperationList,
  getOperationReturnDsoList,
  getOperationSalaryQuotationList,
  getOperationSgaList,
  getOperatePduList
} from "../../api/operation";
import { CascaderOption, CascaderProps, ElLoading } from "element-plus";
import { OperationData } from "../../types/operation/Index";
import { TOKEN } from "../../constants/sessionStorageKeys";
import { useRouter, useRoute } from "vue-router";
import { delCode } from "../../api/common";
import useGetEnv from "../../hooks/common/useGetEnv";
import useGetYearMonth from "../../hooks/common/useGetYearMonth";
import { getAreaList } from "../../api/job";
import _ from "lodash";
export type ActiveName = "first" | "second" | "third";
export interface DeptOption {
  value: string;
  label: string;
  id: string;
  disabled?: boolean;
  children?: DeptOption[];
}

export interface AreaOption {
  value: string;
  areaName: string;
  label: string;
  id: string;
}

export interface PDUListItem {
  deptName: string;
  managerId: string;
  managerName: string;
  pdu: string;
  pduId: string;
}

const router = useRouter();
const route = useRoute();
const activeName = ref<ActiveName>("first");

const { yearOptions, currentYear, currentMonth } = useGetYearMonth();

const cascaderProps: CascaderProps = {
  checkStrictly: true,
  // @ts-ignore
  expandTrigger: "hover"
};
const deptData = ref<DeptOption[]>([]);
// @ts-ignore
const deptOptions = computed<CascaderOption[]>(() => {
  if (activeName.value === "first") {
    return deptData.value;
  }
  // const data = JSON.parse(
  //   JSON.stringify(toRaw(deptData.value))
  // ) as DeptOption[];
  const data = _.cloneDeep<DeptOption[]>(toRaw(deptData.value)).concat([
    {
      value: "OM",
      label: "OM",
      id: "OM"
    }
  ]);
  return data.map(d => {
    d.children = [];
    return d;
  });
});

const getDeptData = async () => {
  const res = await http.get<PDUListItem[]>(getOperatePduList);
  const parents = [...new Set(res.data.map(d => d.deptName))];
  let obj: DeptOption = {} as DeptOption;
  const option = parents.map(p => {
    const managers: DeptOption[] = [];
    res.data
      .filter(d => d.deptName === p && d.managerId)
      .forEach(d => {
        managers.push({
          value: d.managerId,
          label: d.managerName,
          id: d.managerId
        });
      });
    const children = [...new Set(managers.map(c => c.id))].map(c => {
      obj = managers.find(item => item.id === c)!;
      obj.children = res.data
        .filter(item => item.managerId === c)
        .map(pdu => ({
          value: pdu.pduId,
          label: pdu.pdu,
          id: pdu.pduId,
          disabled: true
        }));
      return obj;
    });
    return {
      value: p,
      id: p,
      label: p,
      children: children
    };
  });
  deptData.value = option;
};
const formModel = reactive({
  year: currentYear.value,
  deptName: ["HWC"],
  areaName: ""
});
const isBuMode = computed(() => formModel.deptName.length === 1);

const operationData = ref<OperationData>({
  cardData: {
    month: currentMonth.value,
    list: []
  },
  costTableData: [],
  bigPrjData: [],
  dsoData: [],
  salaryQuotationList: [],
  buIncomeList: [],
  customertIncomeList: []
});

const operationRef = ref<InstanceType<typeof Operation>>();

const yearChange = () => {
  const month =
    formModel.year === currentYear.value ? currentMonth.value - 1 : 12;
  // @ts-ignore
  operationRef.value?.updateMonth(month);
};

const getOperationData = async () => {
  const loading = ElLoading.service();
  try {
    const req = {
      json: isBuMode.value
        ? {
            year: formModel.year,
            deptName: formModel.deptName[0]
          }
        : {
            year: formModel.year,
            deptName: formModel.deptName[0],
            managerId: formModel.deptName[1]
          }
    };
    let [
      cardData,
      costList,
      sgaList,
      dsoList,
      salaryQuotationList,
      buIncomeList,
      customertIncomeList
    ] = await Promise.all([
      http.get(getOperationList, {
        params: req
      }),
      http.get(getOperationCostList, {
        params: req
      }),
      http.get(getOperationSgaList, {
        params: req
      }),
      http.get(getOperationReturnDsoList, {
        params: req
      }),
      http.get(getOperationSalaryQuotationList, {
        params: {
          json: {
            year: formModel.year,
            dimension: "3,4",
            month:
              // @ts-ignore
              operationRef.value?.getPayOfferMonth() || currentMonth.value - 1
          }
        }
      }),
      http.get(getOperationBuIncomeList, {
        params: {
          json: { ...req.json, deptName: formModel.deptName[0] }
        }
      }),
      http.get(getOperationCustomertIncomeList, {
        params: {
          json: { year: formModel.year }
        }
      })
    ]);
    loading.close();
    operationData.value.cardData = cardData.data;
    operationData.value.costTableData = costList.data;
    operationData.value.bigPrjData = sgaList.data;
    operationData.value.dsoData = dsoList.data;
    operationData.value.salaryQuotationList = salaryQuotationList.data;
    operationData.value.buIncomeList = buIncomeList.data;
    operationData.value.customertIncomeList = customertIncomeList.data;
    // @ts-ignore
    operationRef.value?.updateOperationData();
  } catch (error) {
    loading.close();
  }
};

const hrTabRef = ref<InstanceType<typeof Hr>>();

const getHrData = () => {
  // @ts-ignore
  hrTabRef.value?.getInitData();
};

const jobTabRef = ref<InstanceType<typeof Job>>();
const getJobData = async () => {
  // @ts-ignore
  jobTabRef.value?.getJobInitData();
};
const updateTabData = async (tabName: string) => {
  const req = {
    json: {
      ...toRaw(formModel),
      dimension: tabName === "first" ? "3,4" : "2"
    }
  };
  const res = await http.get(getOperationSalaryQuotationList, {
    params: req
  });
  operationData.value.salaryQuotationList = res.data;
  // @ts-ignore
  operationRef.value?.updatePayOfferBarChart(
    operationData.value.salaryQuotationList,
    formModel.year
  );
};

const getData = () => {
  switch (activeName.value) {
    case "first":
      getOperationData();
      break;
    case "second":
      getHrData();
      break;
    case "third":
      getJobData();
      break;
    default:
      getOperationData();
      break;
  }
};

const tabClick = () => {
  formModel.year = currentYear.value;
  formModel.deptName = ["HWC"];
  getData();
};

const { isDev } = useGetEnv();
const areaOptions = ref<AreaOption[]>([]);

const getAreaData = async () => {
  const res = await http.get<AreaOption[]>(getAreaList);
  areaOptions.value = res.data.map(i => {
    i.value = i.areaName;
    i.label = i.areaName;
    return i;
  });
};

const getInitData = () => {
  getDeptData();
  getAreaData();
  getData();
};
const getPermission = async () => {
  try {
    // 当前页面刷新，直接查缓存的token
    const token = sessionStorage.getItem(TOKEN);
    if (token) {
      getInitData();
      return;
    }
    // 缓存没有token,从url取
    const t = route.query.t as string;
    if (!t) {
      router.back();
      return;
    }
    sessionStorage.setItem(TOKEN, t);
    // 取唯一的code
    const c = route.query.c;
    if (!c) {
      sessionStorage.removeItem(TOKEN);
      router.back();
      return;
    }
    // 校验code
    await http.get(delCode, { params: { code: c } });
    getInitData();
  } catch (error) {
    console.log("[ error :]", error);
    sessionStorage.removeItem(TOKEN);
    router.back();
  }
};

onMounted(() => {
  if (isDev.value) {
    getInitData();
  } else {
    getPermission();
  }
  // getPermission();
});
</script>

<template>
  <div class="container">
    <el-tabs tab-position="top" v-model="activeName" @tab-click="tabClick">
      <el-tab-pane name="first" label="运营">
        <Operation
          v-if="activeName === 'first'"
          :data="operationData"
          ref="operationRef"
          @update-tab="updateTabData"
          :year="formModel.year"
          :deptName="formModel.deptName[0]"
          :isBuMode="isBuMode"
        />
      </el-tab-pane>
      <el-tab-pane name="second" label="人资">
        <Hr
          v-if="activeName === 'second'"
          ref="hrTabRef"
          :year="formModel.year"
          :dept-name="formModel.deptName"
        />
      </el-tab-pane>
      <el-tab-pane name="third" label="招聘">
        <Job
          v-if="activeName === 'third'"
          :year="formModel.year"
          :dept-name="formModel.deptName"
          :area-name="formModel.areaName"
          ref="jobTabRef"
        />
      </el-tab-pane>
    </el-tabs>
    <div class="formBox">
      <el-form inline size="small" v-model="formModel">
        <el-form-item>
          <el-select
            placeholder="请选择"
            clearable
            style="width: 100px"
            v-model="formModel.year"
            @change="yearChange"
          >
            <el-option
              v-for="y in yearOptions"
              :key="y.id"
              :label="y.label"
              :value="y.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-cascader
            filterable
            v-model="formModel.deptName"
            :options="deptOptions"
            :props="cascaderProps"
            :style="`width: ${activeName === 'first' ? 130 : 80}px`"
          />
        </el-form-item>
        <el-form-item v-if="activeName === 'third'">
          <el-select
            v-model="formModel.areaName"
            placeholder=""
            style="width: 100px"
            clearable
          >
            <el-option
              v-for="item in areaOptions"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="headerRightBtn">
      <el-button type="primary" size="small">一键生成报表</el-button>
    </div> -->
  </div>
</template>

<style lang="less" scoped>
@positionTop: 15px;
.container {
  :deep(.el-tabs__nav) {
    left: 40%;
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }
  .formBox {
    position: absolute;
    top: @positionTop;
  }
  .headerRightBtn {
    position: absolute;
    right: 10px;
    top: @positionTop;
  }
}
</style>
