<template>
  <div class="hrContainer">
    <el-page-header
      v-if="isDev"
      title="我的位置：人资小屏报告"
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
    <div class="containerBox">
      <div class="title">人力分布</div>
      <div>
        <EchartsCard
          chartName="distribution"
          ref="distributionRef"
          :card-mode="false"
          :height="300"
          :option="distributionOption"
        />
      </div>
    </div>
    <div class="containerBox">
      <div class="title">离职原因分布</div>
      <div>
        <EchartsCard
          chartName="out"
          ref="outRef"
          :card-mode="false"
          :height="300"
          :option="outOption"
        />
      </div>
    </div>
    <div class="containerBox">
      <div class="title">各月离职人数/流失人数</div>
      <el-tabs
        v-model="outInfoTab"
        @tab-click="getOutInfoData(formModel.year, outInfoTab)"
      >
        <el-tab-pane label="PS" name="PS"> </el-tab-pane>
        <el-tab-pane label="CS" name="CS"> </el-tab-pane>
        <el-tab-pane label="CDCE" name="CDCE"> </el-tab-pane>
      </el-tabs>
      <div>
        <EchartsCard
          chartName="outInfo"
          ref="outInfoRef"
          :card-mode="false"
          :height="300"
          :option="outInfoOption"
        />
      </div>
    </div>
    <div class="containerBox">
      <div class="title">离职原因分类的人数分布</div>
      <el-tabs
        v-model="remarkTabType"
        @tab-click="getremarkData(formModel.year, remarkTabType)"
      >
        <el-tab-pane label="PS" name="PS"> </el-tab-pane>
        <el-tab-pane label="CS" name="CS"> </el-tab-pane>
        <el-tab-pane label="CDCE" name="CDCE"> </el-tab-pane>
      </el-tabs>
      <div>
        <EchartsCard
          chartName="remark"
          ref="remarkRef"
          :card-mode="false"
          :height="600"
          :option="remarkOption"
        />
      </div>
    </div>
    <div class="containerBox">
      <div class="title">各BU转入转出人数</div>
      <el-tabs
        v-model="inoutTabType"
        @tab-click="getinoutData(formModel.year, inoutTabType)"
      >
        <el-tab-pane label="PS" name="PS"> </el-tab-pane>
        <el-tab-pane label="CS" name="CS"> </el-tab-pane>
        <el-tab-pane label="CDCE" name="CDCE"> </el-tab-pane>
      </el-tabs>
      <div>
        <EchartsCard
          chartName="inout"
          ref="inoutRef"
          :card-mode="false"
          :height="300"
          :option="inoutOption"
        />
      </div>
    </div>
    <div class="containerBox">
      <div class="title">各BU在各激励类型上总金额</div>
      <div>
        <el-form>
          <el-form-item label="激励类型">
            <el-select
              v-model="encourageType"
              placeholder=""
              clearable
              filterable
              @change="getEncourageMoneyData(formModel.year, encourageType)"
            >
              <el-option
                v-for="item in encourageTypes"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <EchartsCard
          chartName="encourageMoney"
          ref="encourageMoneyRef"
          :card-mode="false"
          :height="300"
          :option="encourageMoneyOption"
        />
      </div>
    </div>
    <div class="containerBox">
      <div class="title">激励金额在TOP10</div>
      <el-row>
        <el-col :span="8">
          <EchartsCard
            chartName="encourageUserCS"
            ref="encourageUserCSRef"
            :card-mode="false"
            :height="600"
            :option="buildEncourageUserOption('CS')"
          />
        </el-col>
        <el-col :span="8">
          <EchartsCard
            chartName="encourageUserCDCE"
            ref="encourageUserCDCERef"
            :card-mode="false"
            :height="600"
            :option="buildEncourageUserOption('CDCE')"
          />
        </el-col>
        <el-col :span="8">
          <EchartsCard
            chartName="encourageUserPSRef"
            ref="encourageUserPSRef"
            :card-mode="false"
            :height="600"
            :option="buildEncourageUserOption('PS')"
          />
        </el-col>
      </el-row>
    </div>
    <div class="containerBox">
      <div class="title">各类型认证角色及等级的人数</div>
      <el-tabs
        v-model="certificationInfoTab"
        @tab-click="
          getCertificationInfoData(formModel.year, certificationInfoTab)
        "
      >
        <el-tab-pane label="PS" name="PS"> </el-tab-pane>
        <el-tab-pane label="CS" name="CS"> </el-tab-pane>
        <el-tab-pane label="CDCE" name="CDCE"> </el-tab-pane>
      </el-tabs>
      <div>
        <EchartsCard
          chartName="certificationInfo"
          ref="certificationInfoRef"
          :card-mode="false"
          :height="300"
          :option="certificationInfoOption"
        />
      </div>
    </div>
    <div class="containerBox">
      <div class="title">各种晋升类型的人数分布</div>
      <div>
        <EchartsCard
          chartName="promoteInfo"
          ref="promoteInfoRef"
          :card-mode="false"
          :height="300"
          :option="promoteInfoOption"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import useGetEnv from "../../hooks/common/useGetEnv";
import useGetUrlToken from "../../hooks/common/useGetUrlToken";
import useGetYearMonth from "../../hooks/common/useGetYearMonth";
import useGetDistribution from "./hooks/useGetDistribution";
import EchartsCard from "../../components/common/EchartsCard.vue";
import useGetOut from "./hooks/useGetOut";
import useGetRemark from "./hooks/useGetRemark";
import useGetInout from "./hooks/useGetInout";
import useEncourageMoney from "./hooks/useEncourageMoney";
import useGetEncourageUser from "./hooks/useGetEncourageUser";
import useGetCertificationInfo from "./hooks/useGetCertificationInfo";
import useGetPromoteInfo from "./hooks/useGetPromoteInfo";
import useGetOutInfo from "./hooks/useGetOutInfo";
useGetUrlToken();
const router = useRouter();
const goBack = () => router.back();

const { isDev } = useGetEnv();
const { yearOptions, currentYear } = useGetYearMonth();
const formModel = reactive({
  year: currentYear.value - 1
});

const { getDistributionData, distributionRef, distributionOption } =
  useGetDistribution();
const { getoutData, outRef, outOption } = useGetOut();

const { getremarkData, remarkRef, remarkOption, remarkTabType } =
  useGetRemark();

const { outInfoTab, getOutInfoData, outInfoRef, outInfoOption } =
  useGetOutInfo();
const { getinoutData, inoutRef, inoutOption, inoutTabType } = useGetInout();

const {
  encourageTypes,
  encourageType,
  encourageMoneyRef,
  encourageMoneyOption,
  getEncourageMoneyData
} = useEncourageMoney();

const {
  getEncourageUserData,
  encourageUserCSRef,
  encourageUserCDCERef,
  encourageUserPSRef,
  buildEncourageUserOption
} = useGetEncourageUser();

const {
  certificationInfoTab,
  getCertificationInfoData,
  certificationInfoRef,
  certificationInfoOption
} = useGetCertificationInfo();

const { getPromoteInfoData, promoteInfoRef, promoteInfoOption } =
  useGetPromoteInfo();
const getInitData = () => {
  getDistributionData();
  getoutData(formModel.year);
  getOutInfoData(formModel.year, outInfoTab.value);
  getremarkData(formModel.year, remarkTabType.value);
  getinoutData(formModel.year, inoutTabType.value);
  getEncourageMoneyData(formModel.year, encourageType.value);
  getEncourageUserData(formModel.year);
  getCertificationInfoData(formModel.year, certificationInfoTab.value);
  getPromoteInfoData(formModel.year);
};

onMounted(() => {
  getInitData();
});
</script>
<style lang="less" scoped>
.hrContainer {
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
  .containerBox {
    margin: 10px 0;
    background-color: #fff;
    padding: 20px;
    .title {
      font-size: 24px;
      margin-bottom: 20px;
    }
  }
}
</style>
