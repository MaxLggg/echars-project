<template>
  <div class="projectReportBox">
    <el-page-header
      v-if="isDev"
      title="我的位置：项目运营报告"
      content=""
      @back="goBack"
    >
      <template #content>
        <el-form :model="formModel" size="small" class="contentForm" inline>
          <el-form-item label="已选条件：">
            <el-select
              v-model="formModel.year"
              placeholder=""
              @change="yearChange"
            >
              <el-option
                v-for="y in yearOptions"
                :key="y.id"
                :value="y.value"
                :label="y.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item>
            <el-button type="primary" @click="getInitData">查询</el-button>
          </el-form-item> -->
        </el-form>
      </template>
    </el-page-header>
    <div v-else>
      <el-form :model="formModel" size="small" class="contentForm" inline>
        <el-form-item label="已选条件：">
          <el-select
            v-model="formModel.year"
            placeholder=""
            @change="yearChange"
          >
            <el-option
              v-for="y in yearOptions"
              :key="y.id"
              :value="y.value"
              :label="y.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="getInitData">查询</el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <!-- 项目整体情况 -->
    <div class="container">
      <div class="title">项目整体情况</div>
      <SelectTabs
        :tab-data="allProjectTabsData"
        :selectOptions="monthOptions(formModel.year)"
        @update-tab="updateAllprjTab"
        ref="allProjectTabsDataRef"
      />
      <div>
        <EchartsCard
          chartName="allPrjBarLine"
          ref="allPrjBarLineRef"
          :card-mode="false"
          :height="300"
          :option="allPrjBarLineOption"
        />
      </div>
    </div>
    <!-- 立项信息 -->
    <div class="container">
      <div class="title">立项信息</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="prjInfoTabs"
        @update-tab="updatePrjInfoTab"
        ref="prjInfoTabsRef"
      />
      <div>
        <template v-if="prjInfoForm.activeName === '1'">
          <el-table
            :data="prjInfoTable1"
            border
            stripe
            size="small"
            height="400"
          >
            <el-table-column
              label="BD/BU"
              align="center"
              prop="deptName"
            ></el-table-column>
            <el-table-column
              v-for="col in prjInfoColumns1"
              :label="col.label"
              align="center"
            >
              <el-table-column
                align="center"
                v-for="item in col.children"
                :label="item.label"
                :prop="item.prop"
              ></el-table-column>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="prjInfoForm.activeName === '2'">
          <el-table
            :data="prjInfoTable1"
            border
            stripe
            size="small"
            height="400"
          >
            <el-table-column
              label="BD/BU"
              align="center"
              prop="deptName"
            ></el-table-column>
            <el-table-column
              v-for="col in prjInfoColumns2"
              :label="col.label"
              align="center"
            >
              <el-table-column
                align="center"
                v-for="item in col.children"
                :label="item.label"
                :prop="item.prop"
              ></el-table-column>
            </el-table-column>
          </el-table>
        </template>
        <template v-else>
          <el-table
            :data="prjInfoTable1"
            border
            stripe
            size="small"
            height="400"
          >
            <el-table-column
              label="BD/BU"
              align="center"
              prop="deptName"
            ></el-table-column>
            <el-table-column
              v-for="col in prjInfoColumns3"
              :label="col.label"
              align="center"
            >
              <el-table-column
                align="center"
                v-for="item in col.children"
                :label="item.label"
                :prop="item.prop"
              >
                <el-table-column
                  align="center"
                  v-for="t in item.children"
                  :label="t.label"
                  :prop="t.prop"
                ></el-table-column>
              </el-table-column>
            </el-table-column>
            <el-table-column
              label="汇总当前PO签回进展"
              align="center"
              v-if="prjInfoForm.month > 1"
            >
              <el-table-column
                align="center"
                label="否"
                prop="noPoNumSum"
              ></el-table-column>
              <el-table-column
                align="center"
                label="是"
                prop="poNumSum"
              ></el-table-column>
              <el-table-column
                align="center"
                label="总计"
                prop="numSum"
              ></el-table-column>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <div class="container">
      <div class="title">立项项目毛利分布</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="prjGrossRateTabsData"
        :select-mode="false"
        @update-tab="updateprjGrossRateTab"
      />
      <div>
        <EchartsCard
          chartName="prjGrossRateBarLine"
          ref="prjGrossRateBarLineRef"
          :card-mode="false"
          :height="300"
          :option="prjGrossRateBarLineOption"
        />
      </div>
    </div>
    <!-- WIP信息 -->
    <div class="container">
      <div class="title">WIP信息</div>
      <div>WIP信息-BD/BU维度</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="wipInfoTabs"
        @update-tab="updateWIPInfoTab"
        ref="wipInfoTabsRef"
      />
      <div class="rowBox">
        <el-row>
          <el-col :span="14">
            <EchartsCard
              chartName="wipRemainBarLine"
              ref="wipRemainBarLineRef"
              :card-mode="false"
              :height="300"
              :option="wipRemainBarLineOption"
            />
          </el-col>
          <el-col :span="10">
            <EchartsCard
              chartName="winAccountAgeBarLine"
              ref="winAccountAgeBarLineRef"
              :card-mode="false"
              :height="300"
              :option="wipAccountAgeBarLineOption"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- WIP信息-客户维度 -->
    <div class="container">
      <div class="title">WIP信息-客户维度</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="wipInfoCustomerTabs"
        @update-tab="updateWIPCustomerTab"
        :select-mode="false"
      />
      <div>
        <EchartsCard
          chartName="wipCustomerBar"
          ref="wipCustomerBarRef"
          :card-mode="false"
          :height="300"
          :option="wipCustomerBarOption"
        />
      </div>
    </div>
    <!-- 客户组项目签订延期周期统计 -->
    <div class="container">
      <div>
        <EchartsCard
          chartName="wipDelayBar"
          ref="wipDelayBarRef"
          :card-mode="false"
          :height="600"
          :option="wipDelayBarOption"
        />
      </div>
    </div>
    <!-- AR信息 -->
    <div class="container">
      <div class="title">AR信息</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="arInfoTabs"
        @update-tab="updateArTab"
        ref="arInfoTabsRef"
      />
      <div>
        <EchartsCard
          chartName="arInfo1"
          ref="arInfo1Ref"
          :card-mode="false"
          :height="300"
          :option="arInfo1Option"
        />
      </div>
      <div>
        <EchartsCard
          chartName="arInfo2"
          ref="arInfo2Ref"
          :card-mode="false"
          :height="300"
          :option="arInfo2Option"
        />
      </div>
    </div>
    <div class="container">
      <div class="title">超期未结项信息</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="prjCompleteTabs"
        @update-tab="updateprjCompleteTab"
        ref="prjCompleteTabsRef"
      />
      <div>
        <EchartsCard
          chartName="prjCompleteBar"
          ref="prjCompleteBarRef"
          :card-mode="false"
          :height="300"
          :option="prjCompleteBarOption"
        />
      </div>
    </div>
    <div class="container">
      <div class="title">扣款分析</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="chargebackTabs"
        :select-mode="false"
        @update-tab="updateChargebackTab"
      />
      <div>
        <EchartsCard
          chartName="chargebackBar"
          ref="chargebackBarRef"
          :card-mode="false"
          :height="300"
          :option="chargebackBarOption"
        />
      </div>
    </div>
    <div class="container">
      <div class="title">FP项目交付进度分析</div>
      <div>
        <div class="monthBox">
          <div>进度与成本偏差信息</div>
          <div>
            <el-form>
              <el-form-item label="月份筛选">
                <el-select
                  v-model="deliveryCurMonth"
                  placeholder=""
                  style="width: 100px"
                  @change="getDeliveryData"
                >
                  <el-option
                    v-for="item in monthOptions(formModel.year)"
                    :key="item.id"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-row :gutter="50">
          <el-col :span="10">
            <el-table
              stripe
              size="small"
              :data="deliveryTableData"
              height="400"
            >
              <el-table-column
                label="进度与成本偏差度"
                prop="deviance"
                align="left"
                min-width="120"
              ></el-table-column>
              <el-table-column
                label="项目个数"
                prop="levelNum"
                align="center"
                min-width="60"
              ></el-table-column>
              <el-table-column
                label="分布占比"
                prop="levelRate"
                align="center"
                min-width="60"
                :formatter="(row, col, val) => `${val}%`"
              ></el-table-column>
              <el-table-column
                label="风险等级"
                prop="riskLevel"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="备注"
                prop="riskRemark"
                align="center"
                min-width="160"
                show-overflow-tooltip
              ></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="14">
            <div>
              <EchartsCard
                chartName="deliveryBar"
                ref="deliveryBarRef"
                :card-mode="false"
                :height="450"
                :option="deliveryBarOption"
              />
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <div class="selectTabTitle">进度与成本偏差占比分析</div>
        <SelectTabs
          :selectOptions="monthOptions(formModel.year)"
          :tab-data="deliveryTabs"
          @update-tab="updateDeliveryTab"
          :select-mode="false"
        />
        <div>
          <EchartsCard
            chartName="deliveryStackBar"
            ref="deliveryStackBarRef"
            :card-mode="false"
            :height="400"
            :option="deliveryStackBarOption"
          />
        </div>
      </div>
    </div>
    <div class="container">
      <div class="title">已签项目毛利分析</div>
      <div style="margin-bottom: 20px">
        <div class="monthBox">
          <div>BD/BU维度盈利情况</div>
          <div>
            <el-form>
              <el-form-item label="月份筛选">
                <el-select
                  v-model="grossTable1CurMonth"
                  placeholder=""
                  style="width: 100px"
                  @change="grossMonthChange"
                >
                  <el-option
                    v-for="item in monthOptions(formModel.year)"
                    :key="item.id"
                    :value="item.value"
                    :label="item.label"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <el-row :gutter="50">
          <el-col :span="10">
            <el-table stripe size="small" :data="grossTable1Data" height="400">
              <el-table-column
                label="BD/BU"
                prop="deptName"
                align="left"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="提报收入(万元)"
                prop="revenue"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="税金影响(万元)"
                prop="salestax"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="项目成本(万元)"
                prop="cost"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="毛利(万元)"
                prop="gross"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="毛利率"
                prop="grossRate"
                align="center"
                min-width="90"
                :formatter="(row, col, val) => `${val}%`"
              ></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="14">
            <div>
              <EchartsCard
                chartName="grossTable1"
                ref="grossTable1Ref"
                :card-mode="false"
                :height="450"
                :option="grossTable1Option"
              />
            </div>
          </el-col>
        </el-row>
      </div>
      <div>
        <div class="selectTabTitle">各BU经营单位业务盈利情况</div>
        <SelectTabs
          :selectOptions="monthOptions(formModel.year)"
          :tab-data="grossTabs"
          @update-tab="updateGrossTab"
          :select-mode="false"
        />
        <el-row style="margin-bottom: 20px" v-if="isShowGrossTable2">
          <el-col :span="12">
            <div>{{ grossTabData.type === "1" ? "CU维度" : "客户维度" }}</div>
            <el-table :data="grossTable2Data" stripe size="small" height="400">
              <el-table-column
                :label="grossTabData.type === '1' ? 'BU/CU' : 'BU/客户'"
                prop="area"
              ></el-table-column>
              <el-table-column
                label="提报收入(万元)"
                prop="revenue"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="税金影响(万元)"
                prop="salestax"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="项目成本(万元)"
                prop="cost"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="毛利(万元)"
                prop="gross"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="毛利率"
                prop="grossRate"
                align="center"
                min-width="90"
                :formatter="(row, col, val) => `${val}%`"
              ></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <div>
              <EchartsCard
                chartName="grossTable2"
                ref="grossTable2Ref"
                :card-mode="false"
                :height="450"
                :option="grossTable2Option"
              />
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>PDU维度</div>
            <el-table :data="grossTable3Data" stripe size="small" height="400">
              <el-table-column
                label="BU/PDU"
                prop="pdu"
                min-width="150"
              ></el-table-column>
              <el-table-column
                label="提报收入(万元)"
                prop="revenue"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="税金影响(万元)"
                prop="salestax"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="项目成本(万元)"
                prop="cost"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="毛利(万元)"
                prop="gross"
                align="center"
                min-width="100"
              ></el-table-column>
              <el-table-column
                label="毛利率"
                prop="grossRate"
                align="center"
                min-width="90"
                :formatter="(row, col, val) => `${val}%`"
              ></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <div>
              <EchartsCard
                chartName="grossTable3"
                ref="grossTable3Ref"
                :card-mode="false"
                :height="450"
                :option="grossTable3Option"
              />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="container">
      <div class="title">项目毛利分布占比情况</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="grossRateTabs"
        @update-tab="updateGrossRateTab"
        ref="grossRateTabsRef"
      />
      <template v-if="grossRateForm.activeName === '1'">
        <div>
          <EchartsCard
            chartName="grossRate1"
            ref="grossRate1Ref"
            :card-mode="false"
            :height="600"
            :option="grossRate1Option"
          />
        </div>
        <el-row>
          <el-col :span="12">
            <EchartsCard
              chartName="grossRate2"
              ref="grossRate2Ref"
              :card-mode="false"
              :height="300"
              :option="grossRate2Option"
            />
          </el-col>
          <el-col :span="12">
            <EchartsCard
              chartName="grossRate3"
              ref="grossRate3Ref"
              :card-mode="false"
              :height="300"
              :option="grossRate3Option"
            />
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <div class="grossRateTableBox">
          <el-table :data="grossRateTable" stripe size="small" height="400">
            <el-table-column
              label="BU/PDU"
              prop="pdu"
              align="left"
              v-if="grossRateForm.activeName === '2'"
            ></el-table-column>
            <el-table-column
              label="BU/地域"
              prop="area"
              align="left"
              v-if="grossRateForm.activeName === '3'"
            ></el-table-column>
            <el-table-column
              label="不盈利"
              prop="rate0"
              align="center"
              :formatter="(row, col, val) => `${val}%`"
            ></el-table-column>
            <el-table-column
              label="1%~10%"
              prop="rate1"
              align="center"
              :formatter="(row, col, val) => `${val}%`"
            ></el-table-column>
            <el-table-column
              label="11%~15%"
              prop="rate2"
              align="center"
              :formatter="(row, col, val) => `${val}%`"
            ></el-table-column>
            <el-table-column
              label="16%~20%"
              prop="rate3"
              align="center"
              :formatter="(row, col, val) => `${val}%`"
            ></el-table-column>
            <el-table-column
              label="21%~28%"
              prop="rate4"
              align="center"
              :formatter="(row, col, val) => `${val}%`"
            ></el-table-column>
            <el-table-column
              label="29%~32%"
              prop="rate5"
              align="center"
              :formatter="(row, col, val) => `${val}%`"
            ></el-table-column>
            <el-table-column
              label="33%以上"
              prop="rate6"
              align="center"
              :formatter="(row, col, val) => `${val}%`"
            ></el-table-column>
            <el-table-column
              label="32%以下"
              prop="rate7"
              align="center"
              :formatter="(row, col, val) => `${val}%`"
            ></el-table-column>
            <el-table-column
              label="33%以上的项目个数"
              prop="num6"
              align="center"
            ></el-table-column>
            <el-table-column
              label="32%以下的项目个数"
              prop="num7"
              align="center"
            ></el-table-column>
            <el-table-column
              label="毛利未达标对利润影响金额(以32%为基线,单位：万元)"
              prop="influence"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div>
          <EchartsCard
            chartName="grossRate4"
            ref="grossRate4Ref"
            :card-mode="false"
            :height="300"
            :option="grossRate4Option"
          />
        </div>
      </template>
    </div>
    <div class="container">
      <div class="title">低毛利原因分布情况</div>
      <SelectTabs
        :selectOptions="monthOptions(formModel.year)"
        :tab-data="lowGrossTabs"
        :select-mode="false"
        @update-tab="updateLowGrossTab"
      />
      <div style="margin-bottom: 20px">
        <el-table :data="lowGrossTableData" stripe size="small" height="400">
          <el-table-column
            label="BD/BU"
            prop="deptName"
            align="left"
            min-width="100"
            v-if="lowGrossForm.activeName === '1'"
          ></el-table-column>
          <el-table-column
            label="BU/PDU"
            prop="pdu"
            align="left"
            min-width="100"
            v-if="lowGrossForm.activeName === '2'"
          ></el-table-column>
          <el-table-column
            label="BD/地域"
            prop="area"
            align="left"
            min-width="100"
            v-if="lowGrossForm.activeName === '3'"
          ></el-table-column>
          <el-table-column
            v-for="item in columnData"
            :label="item.label"
            :prop="item.prop"
            align="center"
            :formatter="(row, col, val) => `${val}%`"
          ></el-table-column>
        </el-table>
      </div>
      <div>
        <EchartsCard
          chartName="lowGross"
          ref="lowGrossRef"
          :card-mode="false"
          :height="300"
          :option="lowGrossOption"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import { DictItem } from "../../types/common/Index";
import SelectTabs, {
  UpdateTabData
} from "../../components/common/SelectTabs.vue";
import http from "../../utils/http";
import {
  getProjectBasicList,
  getProjectGrossRate,
  getWIPRemain,
  getWIPAccountAge,
  getWIPcustomStock,
  getWIPcustomDelayDays,
  getProjectNotcomplete,
  getProjectNeedcomplete,
  getChargebackByRemark,
  getChargebackByMonth,
  getProjectDeliveryInfo,
  getDeliveryLevel,
  getProjectGross,
  getProjectGrossByArea,
  getProjectGrossByPdu,
  getARInfo,
  getGrossReasonDistribution,
  getGrossDistributionRatio,
  getProjectSignPO,
  getProjectProgressPO,
  getProjectOverview
} from "../../api/projectReport";
import EchartsCard from "../../components/common/EchartsCard.vue";
import useAllPrj from "./hooks/useAllPrj";
import useWIP from "./hooks/useWIP";
import usePrjComplete from "./hooks/usePrjComplete";
import useChargeback from "./hooks/useChargeback";
import useDelivery from "./hooks/useDelivery";
import useProjecGross from "./hooks/useProjecGross";
import useARInfo from "./hooks/useARInfo";
import useLowGross from "./hooks/useLowGross";
import useGrossRate from "./hooks/useGrossRate";
import usePrjInfo from "./hooks/usePrjInfo";
import useGetEnv from "../../hooks/common/useGetEnv";
import useGetUrlToken from "../../hooks/common/useGetUrlToken";
import useGetYearMonth from "../../hooks/common/useGetYearMonth";

useGetUrlToken();
const { isDev } = useGetEnv();
const { yearOptions, monthOptions, currentMonth, currentYear } =
  useGetYearMonth();

const formModel = reactive({
  year: isDev.value ? currentYear.value - 1 : currentYear.value
});

const allProjectTabsDataRef = ref<InstanceType<typeof SelectTabs>>();
const prjInfoTabsRef = ref<InstanceType<typeof SelectTabs>>();
const wipInfoTabsRef = ref<InstanceType<typeof SelectTabs>>();
const arInfoTabsRef = ref<InstanceType<typeof SelectTabs>>();
const prjCompleteTabsRef = ref<InstanceType<typeof SelectTabs>>();
const grossRateTabsRef = ref<InstanceType<typeof SelectTabs>>();

const yearChange = (val: number) => {
  const month = val === currentYear.value ? currentMonth.value : 12;
  // @ts-ignore
  allProjectTabsDataRef.value?.updateSelectTabMonth(month);
  // @ts-ignore
  prjInfoTabsRef.value?.updateSelectTabMonth(month);
  // @ts-ignore
  wipInfoTabsRef.value?.updateSelectTabMonth(month);
  // @ts-ignore
  arInfoTabsRef.value?.updateSelectTabMonth(month);
  // @ts-ignore
  prjCompleteTabsRef.value?.updateSelectTabMonth(month);
  // @ts-ignore
  grossRateTabsRef.value?.updateSelectTabMonth(month);
  deliveryCurMonth.value = month;
  grossTable1CurMonth.value = month;
  grossTabData.value.month = month;
  getInitData();
};

const router = useRouter();
const goBack = () => router.back();

const {
  allProjectTabsData,
  allPrjBarLineOption,
  allPrjBarLineRef,
  updatePrjBarLineChart,
  prjGrossRateTabsData,
  prjGrossRateBarLineOption,
  prjGrossRateBarLineRef,
  updatePrjGrossRateBarLineChart,
  allPrjBarLineTab
} = useAllPrj();

const getAllPrjData = async (data: UpdateTabData) => {
  const res = await http.get(getProjectBasicList, {
    params: { year: formModel.year, month: data.month, type: data.activeName }
  });
  updatePrjBarLineChart(res.data);
};

const updateAllprjTab = (data: UpdateTabData) => {
  allPrjBarLineTab.value = data.activeName;
  getAllPrjData(data);
};

const getProjectGrossRateData = async (type: string) => {
  const res = await http.get(getProjectGrossRate, {
    params: { year: formModel.year, month: prjInfoForm.month, type }
  });
  updatePrjGrossRateBarLineChart(res.data);
};

const updateprjGrossRateTab = (data: UpdateTabData) => {
  getProjectGrossRateData(data.activeName);
};

const {
  prjInfoTabs,
  prjInfoColumns1,
  prjInfoTable1,
  prjInfoColumns2,
  prjInfoColumns3,
  buildPrjInfoColumn
} = usePrjInfo();

const getprjInfoData = async (tabData: UpdateTabData) => {
  const url =
    tabData.activeName === "1"
      ? getProjectOverview
      : tabData.activeName === "2"
      ? getProjectSignPO
      : getProjectProgressPO;
  const res = await http.get(url, {
    params: { year: formModel.year, month: tabData.month }
  });
  buildPrjInfoColumn(res.data, tabData.month, formModel.year);
};

const prjInfoForm = reactive({
  activeName: prjInfoTabs.value[0].name,
  month: currentMonth.value
});
const updatePrjInfoTab = (data: UpdateTabData) => {
  prjInfoForm.activeName = data.activeName;
  prjInfoForm.month = data.month;
  getprjInfoData(data);
};

const {
  wipInfoTabs,
  wipRemainBarLineOption,
  wipRemainBarLineRef,
  wipAccountAgeBarLineOption,
  winAccountAgeBarLineRef,
  updateWipBarLineChart,
  wipInfoCustomerTabs,
  wipCustomerBarOption,
  wipCustomerBarRef,
  updateWipCustomerBarChart,
  wipDelayBarOption,
  wipDelayBarRef,
  updateWipDelayBarChart
} = useWIP();

const getWipData = async (data: UpdateTabData) => {
  const req = {
    year: formModel.year,
    month: data.month,
    type: data.activeName
  };
  const res = await Promise.all([
    http.get(getWIPRemain, { params: req }),
    http.get(getWIPAccountAge, { params: req })
  ]);
  updateWipBarLineChart([res[0].data, res[1].data], data.month);
};

const updateWIPInfoTab = (data: UpdateTabData) => {
  wipCustomerForm.month = data.month;
  getWipData(data);
  getWIPCustomerData();
};

const getWIPCustomerData = async () => {
  const res = await http.get(getWIPcustomStock, {
    params: {
      year: formModel.year,
      month: wipCustomerForm.month,
      type: wipCustomerForm.activeName
    }
  });
  updateWipCustomerBarChart(res.data);
};

const getWIPDelayData = async () => {
  const res = await http.get(getWIPcustomDelayDays, {
    params: { year: formModel.year }
  });
  updateWipDelayBarChart(res.data);
};

const wipCustomerForm = reactive({
  activeName: wipInfoCustomerTabs.value[0].name,
  month: currentMonth.value
});
const updateWIPCustomerTab = (data: UpdateTabData) => {
  // wipCustomerTabName.value=
  wipCustomerForm.activeName = data.activeName;
  getWIPCustomerData();
};

const {
  prjCompleteTabs,
  prjCompleteBarOption,
  prjCompleteBarRef,
  updatePrjCompleteBarChart
} = usePrjComplete();

const getPrjCompleteData = async (data: UpdateTabData) => {
  const url =
    data.activeName === "1" ? getProjectNotcomplete : getProjectNeedcomplete;
  const res = await http.get(url, {
    params: { year: formModel.year, month: data.month, type: data.activeName }
  });
  updatePrjCompleteBarChart(res.data, data.activeName, data.month);
};

const updateprjCompleteTab = (data: UpdateTabData) => {
  getPrjCompleteData(data);
};

const {
  chargebackTabs,
  chargebackBarOption,
  chargebackBarRef,
  updateChargebackBarChart
} = useChargeback();

const getChargebackData = async (type: string = "1") => {
  const url = type === "1" ? getChargebackByRemark : getChargebackByMonth;
  const res = await http.get(url, { params: { year: formModel.year } });
  updateChargebackBarChart(res.data, type);
};

const updateChargebackTab = (data: UpdateTabData) => {
  getChargebackData(data.activeName);
};

const {
  deliveryTableData,
  deliveryCurMonth,
  deliveryBarOption,
  deliveryBarRef,
  updateDeliveryBarChart,
  deliveryStackBarOption,
  deliveryStackBarRef,
  updateDeliveryStackBarChart,
  deliveryTabs,
  deliveryTabName
} = useDelivery();

const getDeliveryData = async () => {
  getDeliveryStackData(deliveryTabName.value);
  const res = await http.get(getProjectDeliveryInfo, {
    params: {
      year: formModel.year,
      month: deliveryCurMonth.value
    }
  });
  deliveryTableData.value = res.data;
  updateDeliveryBarChart(res.data);
};

const getDeliveryStackData = async (type: string) => {
  const res = await http.get(getDeliveryLevel, {
    params: {
      year: formModel.year,
      month: deliveryCurMonth.value,
      type
    }
  });
  updateDeliveryStackBarChart(res.data, type);
};

const updateDeliveryTab = (data: UpdateTabData) => {
  deliveryTabName.value = data.activeName;
  getDeliveryStackData(data.activeName);
};

const {
  grossTable1Data,
  grossTable2Data,
  grossTable3Data,
  grossTable1CurMonth,
  grossTabs,
  grossTabData,
  isShowGrossTable2,
  grossTable1Option,
  grossTable1Ref,
  grossTable2Option,
  grossTable2Ref,
  grossTable3Option,
  grossTable3Ref,
  updategrossTableChart
} = useProjecGross();

const grossMonthChange = (value: number) => {
  grossTabData.value.month = value;
  getProjectGrossData(grossTabData.value.type);
};

const getProjectGrossData = async (type: string = "1") => {
  try {
    const promiseArr =
      type === "3"
        ? [
            http.get(getProjectGross, {
              params: { year: formModel.year, month: grossTable1CurMonth.value }
            }),
            http.get(getProjectGrossByPdu, {
              params: { ...toRaw(grossTabData.value), year: formModel.year }
            })
          ]
        : [
            http.get(getProjectGross, {
              params: { year: formModel.year, month: grossTable1CurMonth.value }
            }),
            http.get(getProjectGrossByArea, {
              params: { ...toRaw(grossTabData.value), year: formModel.year }
            }),
            http.get(getProjectGrossByPdu, {
              params: { ...toRaw(grossTabData.value), year: formModel.year }
            })
          ];
    const res = await Promise.all(promiseArr);
    if (type === "3") {
      grossTable1Data.value = res[0].data;
      grossTable3Data.value = res[1].data;
      updategrossTableChart([res[0].data, [], res[1].data], type);
    } else {
      grossTable1Data.value = res[0].data;
      grossTable2Data.value = res[1].data;
      grossTable3Data.value = res[2].data;
      updategrossTableChart([res[0].data, res[1].data, res[2].data], type);
    }
  } catch (error) {
    // console.log("[ error :]", error);
  }
};

const updateGrossTab = (data: UpdateTabData) => {
  grossTabData.value.month = grossTable1CurMonth.value;
  grossTabData.value.type = data.activeName;
  getProjectGrossData(data.activeName);
};

const {
  arInfoTabs,
  arInfoTabName,
  arInfo1Option,
  arInfo1Ref,
  arInfo2Option,
  arInfo2Ref,
  updateArInfoChart
} = useARInfo();

const getARInfoData = async (data: UpdateTabData) => {
  const tempType = data.activeName === "1" ? 1 : 3;
  const res = await Promise.all([
    http.get(getARInfo, {
      params: { year: formModel.year, month: data.month, type: tempType }
    }),
    http.get(getARInfo, {
      params: { year: formModel.year, month: data.month, type: tempType + 1 }
    })
  ]);
  updateArInfoChart([res[0].data, res[1].data]);
};

const updateArTab = (data: UpdateTabData) => {
  arInfoTabName.value = data.activeName;
  getARInfoData(data);
};

const {
  lowGrossTabs,
  lowGrossTableData,
  lowGrossOption,
  lowGrossRef,
  columnData,
  updateLowGrossChart
} = useLowGross();

const getLowGrossData = async (data: UpdateTabData) => {
  const res = await http.get(getGrossReasonDistribution, {
    params: { year: formModel.year, month: data.month, type: data.activeName }
  });
  updateLowGrossChart(res.data, data.activeName);
};

const lowGrossForm = reactive({
  activeName: lowGrossTabs.value[0].name,
  month: currentMonth.value
});
const updateLowGrossTab = (data: UpdateTabData) => {
  lowGrossForm.activeName = data.activeName;
  lowGrossForm.month = data.month;
  getLowGrossData(data);
};

const {
  grossRateTabs,
  grossRate1Option,
  grossRate1Ref,
  grossRate2Option,
  grossRate2Ref,
  grossRate3Option,
  grossRate3Ref,
  grossRate4Option,
  grossRate4Ref,
  grossRateTable,
  updateGrossRateChart
} = useGrossRate();

const getGrossRateData = async (data: UpdateTabData) => {
  const res = await http.get(getGrossDistributionRatio, {
    params: { year: formModel.year, month: data.month, type: data.activeName }
  });
  updateGrossRateChart(res.data, data.activeName);
};

const grossRateForm = reactive({
  activeName: grossRateTabs.value[0].name,
  month: currentMonth.value
});
const updateGrossRateTab = (data: UpdateTabData) => {
  grossRateForm.month = data.month;
  grossRateForm.activeName = data.activeName;
  getGrossRateData(data);
  lowGrossForm.month = data.month;
  getLowGrossData(toRaw(lowGrossForm));
};

const getInitData = () => {
  const month = formModel.year === currentYear.value ? currentMonth.value : 12;
  getAllPrjData({
    activeName: allProjectTabsData.value[0].name,
    month
  });

  getprjInfoData(toRaw(prjInfoForm));
  getProjectGrossRateData(prjGrossRateTabsData.value[0].name);
  getWipData({
    activeName: wipInfoTabs.value[0].name,
    month
  });
  getWIPCustomerData();
  getWIPDelayData();
  getPrjCompleteData({
    activeName: prjCompleteTabs.value[0].name,
    month
  });
  getChargebackData();
  getDeliveryData();
  getDeliveryStackData(deliveryTabs.value[0].name);
  getProjectGrossData();
  getARInfoData({
    activeName: arInfoTabs.value[0].name,
    month
  });
  getLowGrossData({
    activeName: lowGrossTabs.value[0].name,
    month
  });
  getGrossRateData({
    activeName: grossRateTabs.value[0].name,
    month
  });
};
onMounted(() => {
  getInitData();
});
</script>

<style lang="less" scoped>
.projectReportBox {
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
  .container {
    margin: 10px 0;
    background-color: #fff;
    padding: 20px;
    .title {
      font-size: 24px;
      margin-bottom: 20px;
    }
    .rowBox {
      margin-top: 20px;
    }
    .monthBox {
      display: flex;
      justify-content: space-between;
      & > div:first-child {
        font-size: 18px;
      }
    }
    .selectTabTitle {
      font-size: 18px;
    }
    .grossRateTableBox {
      // margin-bottom: 0px;
      & > div {
        position: relative;
        bottom: 50px;
      }
    }
  }
}
</style>
