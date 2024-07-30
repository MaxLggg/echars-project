<template>
  <div class="businessOperationReportBox">
    <el-page-header
      v-if="isDev"
      title="我的位置：商务运营报告"
      content=""
      @back="goBack"
    >
      <template #content>
        <el-form :model="formModel" size="small" class="contentForm" inline>
          <el-form-item label="已选条件：">
            <el-select v-model="formModel.year" placeholder="">
              <el-option
                v-for="y in yearOptions"
                :key="y.id"
                :value="y.value"
                :label="y.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getInitData">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-page-header>
    <div v-else class="topBox">
      <el-form :model="formModel" size="small" class="contentForm" inline>
        <el-form-item label="已选条件：">
          <el-select v-model="formModel.year" placeholder="">
            <el-option
              v-for="y in yearOptions"
              :key="y.id"
              :value="y.value"
              :label="y.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getInitData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="contractBox">
      <div class="title">非华为业务销售合同签约情况</div>
      <el-row>
        <el-col :span="12">
          <EchartsCard
            chartName="contractBar"
            ref="contractBarChartRef"
            :card-mode="false"
            :height="300"
            :option="contractOption"
          />
        </el-col>
        <el-col :span="12">
          <EchartsCard
            chartName="salesBar"
            ref="salesBarChartRef"
            :card-mode="false"
            :height="300"
            :option="salesOption"
        /></el-col>
      </el-row>
    </div>
    <div class="contractBox">
      <div class="title">华为PO签约情况</div>
      <el-row>
        <el-col :span="12">
          <EchartsCard
            chartName="poNumBar"
            ref="poNumBarChartRef"
            :card-mode="false"
            :height="300"
            :option="poNumOption"
          />
        </el-col>
        <el-col :span="12">
          <EchartsCard
            chartName="poSalesBar"
            ref="poSalesBarChartRef"
            :card-mode="false"
            :height="300"
            :option="poSalesOption"
          />
        </el-col>
      </el-row>
    </div>
    <div class="contractBox">
      <div class="title">各客户项目签约情况</div>
      <div>
        <el-tabs v-model="customerTabName" @tab-click="customerTabClick">
          <el-tab-pane name="first" label="百特项目"></el-tab-pane>
          <el-tab-pane name="second" label="金蝶项目"></el-tab-pane>
          <el-tab-pane name="third" label="烽火项目"></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <EchartsCard
              chartName="customerNumBar"
              ref="customerNumBarChartRef"
              :card-mode="false"
              :height="300"
              :option="customerNumBarOption"
            />
          </el-col>
          <el-col :span="12">
            <EchartsCard
              chartName="customerCostBar"
              ref="customerCostBarChartRef"
              :card-mode="false"
              :height="300"
              :option="customerCostBarOption"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="contractBox">
      <div class="title">非华为业务开票情况</div>
      <el-row>
        <el-col :span="12">
          <EchartsCard
            chartName="invoiceNumBar"
            ref="invoiceNumBarRef"
            :card-mode="false"
            :height="300"
            :option="invoiceNumBarOption"
          />
        </el-col>
        <el-col :span="12">
          <EchartsCard
            chartName="invoiceCostBar"
            ref="invoiceCostBarRef"
            :card-mode="false"
            :height="300"
            :option="invoiceCostBarOption"
          />
        </el-col>
      </el-row>
    </div>
    <div class="contractBox">
      <div class="title">非华为业务回款情况</div>
      <el-row>
        <el-col :span="24">
          <EchartsCard
            chartName="collectionCostBar"
            ref="collectionCostBarRef"
            :card-mode="false"
            :height="300"
            :option="collectionCostBarOption"
          />
        </el-col>
      </el-row>
    </div>
    <div class="contractBox">
      <div class="title">非华为业务招投标情况</div>
      <div class="extraDataBox">
        <div>
          <div class="extraDataLabel">截止目前投标总数</div>
          <div class="extraDataValue">{{ bidInfo.sumNum }}</div>
        </div>
        <div>
          <div class="extraDataLabel">中标项目数</div>
          <div class="extraDataValue">{{ bidInfo.bidNum }}</div>
        </div>
        <div>
          <div class="extraDataLabel">中标率</div>
          <div class="extraDataValue">{{ bidInfo.bidRate }}%</div>
        </div>
      </div>
      <el-row>
        <el-col :span="12">
          <EchartsCard
            chartName="bidInfoNumBar"
            ref="bidInfoNumBarRef"
            :card-mode="false"
            :height="300"
            :option="bidInfoNumBarOption"
          />
        </el-col>
        <el-col :span="12">
          <EchartsCard
            chartName="bidInfoCostBar"
            ref="bidInfoCostBarRef"
            :card-mode="false"
            :height="300"
            :option="bidInfoCostBarOption"
          />
        </el-col>
      </el-row>
    </div>
    <div class="contractBox">
      <div class="title">采购合同签约情况</div>
      <el-row>
        <el-col :span="12">
          <EchartsCard
            chartName="purchaseNumBar"
            ref="purchaseNumBarRef"
            :card-mode="false"
            :height="300"
            :option="purchaseNumBarOption"
          />
        </el-col>
        <el-col :span="12">
          <EchartsCard
            chartName="purchaseCostBar"
            ref="purchaseCostBarRef"
            :card-mode="false"
            :height="300"
            :option="purchaseCostBarOption"
          />
        </el-col>
      </el-row>
    </div>
    <div class="contractBox">
      <div class="title">采购合同类型签约情况</div>
      <div>
        <!-- <el-tabs :activate-name="purchaseTabName" @tab-click="purchaseTabClick">
          <el-tab-pane label="总计" name="1"></el-tab-pane>
          <el-tab-pane label="项目合同" name="2"></el-tab-pane>
          <el-tab-pane label="非项目合同" name="3"></el-tab-pane>
        </el-tabs> -->

        <el-tabs v-model="purchaseTabName" @tab-click="purchaseTabClick">
          <el-tab-pane name="1" label="总计"></el-tab-pane>
          <el-tab-pane name="2" label="项目合同"></el-tab-pane>
          <el-tab-pane name="3" label="非项目合同"></el-tab-pane>
        </el-tabs>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <EchartsCard
              chartName="purchaseTypeNumBar"
              ref="purchaseTypeNumBarRef"
              :card-mode="false"
              :height="300"
              :option="purchaseTypeNumBarOption"
            />
          </el-col>
          <el-col :span="12">
            <EchartsCard
              chartName="purchaseCostTypeBar"
              ref="purchaseCostTypeBarRef"
              :card-mode="false"
              :height="300"
              :option="purchaseCostTypeBarOption"
            />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  getBidInfo,
  getBidInfoList,
  getCollectionList,
  getContractInvoiceList,
  getSalesContractList,
  getPurchaseContractList,
  getPurchaseContractByType
} from "../../api/businessOperationReport";
import { DictItem } from "../../types/common/Index";
import http from "../../utils/http";
import useSalesContract from "./hooks/useSalesContract";
import EchartsCard from "../../components/common/EchartsCard.vue";
import useInvoice from "./hooks/useInvoice";
import useCollection from "./hooks/useCollection";
import useBidInfo from "./hooks/useBidInfo";
import usePurchaseContract from "./hooks/usePurchaseContract";
import useGetEnv from "../../hooks/common/useGetEnv";
import useGetUrlToken from "../../hooks/common/useGetUrlToken";
import useGetYearMonth from "../../hooks/common/useGetYearMonth";

useGetUrlToken();

const { yearOptions, currentYear } = useGetYearMonth();
const formModel = reactive({
  year: currentYear.value
});

const router = useRouter();
const goBack = () => router.back();

const { isDev } = useGetEnv();

/**
 * 根据类型查询数据
 * @param type  // 1：非华为  2：华为  3：百特  4：金蝶 5：烽火
 */
const getSalesContractListData = async (type: string) => {
  return http.get(getSalesContractList, {
    params: { year: formModel.year, type }
  });
};

const getSignContractData = async () => {
  try {
    // 1：非华为  2：华为  3：百特  4：金蝶 5：烽火
    const types = ["1", "2"];
    const res = await Promise.all(types.map(t => getSalesContractListData(t)));
    if (res && res.length > 1) {
      updateSalesContractData(res[0].data, +formModel.year);
      updatePoChart(res[1].data, +formModel.year);
    }
  } catch (error) {
    // console.log("[ error :]", error);
  }
};

/**
 * 根据年度获取合同开票信息
 */
const getContractInvoiceData = async () => {
  const res = await http.get(getContractInvoiceList, {
    params: { year: formModel.year }
  });
  updateInvoiceBar(res.data, +formModel.year);
};

/**
 * 根据年度获取非华为业务回款信息
 */
const getCollectionData = async () => {
  const res = await http.get(getCollectionList, {
    params: { year: formModel.year }
  });
  updateCollectionBar(res.data, +formModel.year);
};

const getBidInfoData = async () => {
  const params = { year: formModel.year };
  const res = await Promise.all([
    http.get(getBidInfo, { params }),
    http.get(getBidInfoList, { params })
  ]);
  updateBidInfoBar([res[0].data, res[1].data], +formModel.year);
};

const getPurchaseContractData = async () => {
  const res = await http.get(getPurchaseContractList, {
    params: { year: formModel.year }
  });
  updatePurchaseBar(res.data);
};

const {
  contractBarChartRef,
  contractOption,
  salesBarChartRef,
  salesOption,
  updateSalesContractData,
  customerTabName,
  customerNumBarOption,
  customerNumBarChartRef,
  customerCostBarOption,
  customerCostBarChartRef,
  updateTabChart,
  poNumOption,
  poNumBarChartRef,
  poSalesOption,
  poSalesBarChartRef,
  updatePoChart
} = useSalesContract();

const {
  invoiceNumBarOption,
  invoiceNumBarRef,
  invoiceCostBarOption,
  invoiceCostBarRef,
  updateInvoiceBar
} = useInvoice();

const { collectionCostBarOption, collectionCostBarRef, updateCollectionBar } =
  useCollection();

const {
  bidInfo,
  bidInfoNumBarOption,
  bidInfoNumBarRef,
  bidInfoCostBarOption,
  bidInfoCostBarRef,
  updateBidInfoBar
} = useBidInfo();
const {
  purchaseNumBarOption,
  purchaseNumBarRef,
  purchaseCostBarOption,
  purchaseCostBarRef,
  updatePurchaseBar,
  purchaseTabName,
  purchaseTypeNumBarOption,
  purchaseTypeNumBarRef,
  purchaseCostTypeBarOption,
  purchaseCostTypeBarRef,
  updatePurchaseTabChart
} = usePurchaseContract();

const customerTabClick = async () => {
  let type = "3";
  switch (customerTabName.value) {
    case "first":
      type = "3";
      break;
    case "second":
      type = "4";
      break;
    case "third":
      type = "5";
      break;
    default:
      break;
  }
  const res = await getSalesContractListData(type);
  updateTabChart(res.data);
};

/**
 * 根据年度和类型获取采购合同签约情况
 * @param type 类型  （1：总计 2：合同 3：非合同）
 */
const getPurchaseListData = async (type: string) => {
  return http.get(getPurchaseContractByType, {
    params: {
      year: formModel.year,
      type
    }
  });
};
const purchaseTabClick = async () => {
  // 1：总计 2：合同 3：非合同
  // let type = "1";
  // switch (purchaseTabName.value) {
  //   case "first":
  //     type = "1";
  //     break;
  //   case "second":
  //     type = "2";
  //     break;
  //   case "third":
  //     type = "3";
  //     break;
  //   default:
  //     break;
  // }
  const res = await getPurchaseListData(purchaseTabName.value);
  updatePurchaseTabChart(res.data);
};

const getInitData = () => {
  getSignContractData();
  customerTabClick();
  getContractInvoiceData();
  getCollectionData();
  getBidInfoData();
  getPurchaseContractData();
  purchaseTabClick();
};

onMounted(() => {
  getInitData();
});
</script>

<style lang="less" scoped>
.businessOperationReportBox {
  & > div {
    background-color: #fff;
    padding-bottom: 10px;
  }
  background-color: #f3f5f9;
  .topBox {
    padding: 10px !important;
  }
  .contentForm {
    margin-bottom: 0;
    & > div {
      margin-bottom: 0;
    }
  }
  .contractBox {
    margin: 10px 0;
    background-color: #fff;
    padding: 20px;
    .title {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .extraDataBox {
      display: flex;
      justify-content: space-around;
      padding: 0 30%;
      margin-bottom: 20px;
      .extraDataLabel {
        font-size: 12px;
        color: #999;
      }
      .extraDataValue {
        font-size: 24px;
      }
    }
  }
}
</style>
