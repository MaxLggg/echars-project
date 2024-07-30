<template>
  <div class="operationBox">
    <!-- card -->
    <div class="cardBox">
      <el-row :gutter="2">
        <el-col
          v-for="(item, index) in cardData"
          :key="index"
          :span="6"
          :class="index > 3 ? 'marginTop' : ''"
        >
          <Card
            :data="item"
            :show-progress="index < 4"
            :year="props.year"
            :isBuMode="props.isBuMode"
          />
        </el-col>
      </el-row>
    </div>
    <!-- 成本结构 -->
    <div class="costTableBox" v-if="isHWCMode">
      <div class="title">
        成本结构
        <span>
          {{
            `${
              isCurrentYear
                ? `截止${props.year}年${costTableMonth || "--"}月`
                : `${props.year}全年`
            }`
          }}
          &nbsp;&nbsp;单位：万元
        </span>
      </div>
      <el-table :data="costTableData" :row-class-name="tableRowClassName">
        <el-table-column label="收入" prop="income"></el-table-column>
        <el-table-column label="服务成本" prop="serviceCost"></el-table-column>
        <el-table-column
          label="毛利率"
          prop="grossProfitMargin"
          :formatter="(row, column, value) => `${value}%`"
        ></el-table-column>
        <el-table-column label="费用" prop="cost"></el-table-column>
        <el-table-column
          label="费用率 ="
          prop="costRate"
          :formatter="(row, column, value) => `${value}%`"
        ></el-table-column>
        <el-table-column
          label="管理费用率 +"
          prop="manageRate"
          :formatter="(row, column, value) => `${value}%`"
        ></el-table-column>
        <el-table-column
          label="研发+销售费用率"
          prop="saleRate"
          :formatter="(row, column, value) => `${value}%`"
        ></el-table-column>
        <el-table-column
          label="净利率"
          prop="profitMargin"
          :formatter="(row, column, value) => `${value}%`"
        ></el-table-column>
        <el-table-column label="现金流" prop="manageCashFlow"></el-table-column>
      </el-table>
      <div class="tableBottom">
        <div>
          <div class="box bg1"></div>
          预算
        </div>
        <div>
          <div class="box bg2"></div>
          实际达成(未调整)
        </div>
        <div>
          <div class="box bg3"></div>
          实际达成(已调整)
        </div>
      </div>
    </div>
    <!-- 薪酬报价比情况 -->
    <div class="payOfferBox" v-if="isHWCMode">
      <div class="titleBox">
        <div class="title">薪酬报价比情况</div>
        <div>
          <el-form>
            <!-- 当前月-1 -->
            <el-form-item label="月份筛选">
              <el-select
                v-model="payOfferMonth"
                placeholder=""
                style="width: 100px"
                @change="getpayOfferBarData(props.year)"
              >
                <el-option
                  v-for="m in monthOptions(props.year, currentMonth - 1)"
                  :key="m.id"
                  :value="m.value"
                  :label="m.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <el-tabs tab-position="top" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane name="first" label="BU/PDU维度"> </el-tab-pane>
        <el-tab-pane name="second" label="大区维度"> </el-tab-pane>
      </el-tabs>
      <template v-if="activeName === 'first'">
        <div>
          <div class="backBox" v-if="isUnderMode">
            <el-button type="primary" @click="getpayOfferBarData(props.year)">
              返回
            </el-button>
          </div>
          <el-row>
            <el-col :span="isUnderMode ? 0 : 3">
              <div class="leftBox" v-if="!isUnderMode">
                <div class="labelBox">{{ leftData?.category || "HWC" }}</div>
                <div class="desc1">薪酬报价比</div>
                <div class="valueBox">
                  {{ leftData?.salaryQuotationRate || 0 }}%
                </div>
                <div class="desc2">需管控人数占比</div>
                <div class="valueBox">
                  {{ leftData?.controlPersonRate || 0 }}%
                </div>
              </div>
            </el-col>
            <el-col :span="isUnderMode ? 24 : 21">
              <EchartsCard
                chartName="payOfferBar"
                ref="payOfferBarRef"
                :card-mode="false"
                :height="400"
                :option="payOfferBarOption"
              />
            </el-col>
          </el-row>
        </div>
      </template>
      <template v-if="activeName === 'second'">
        <EchartsCard
          chartName="payOfferBar"
          ref="payOfferBarRef"
          :card-mode="false"
          :height="400"
          :option="payOfferBarOption"
        />
      </template>
      <template></template>
    </div>
    <!-- 收入占比分析 -->
    <div class="incomeBarBox" v-if="isHWCMode">
      <el-row>
        <el-col :span="8">
          <EchartsCard
            chartName="incomeBuBar"
            ref="incomeBuBarRef"
            :card-mode="false"
            :height="400"
            :option="incomeBuBarOption"
          />
        </el-col>
        <el-col :span="16">
          <EchartsCard
            chartName="incomeCustomerBar"
            ref="incomeCustomerBarRef"
            :card-mode="false"
            :height="400"
            :option="incomeCustomerBarOption"
          />
        </el-col>
      </el-row>
    </div>
    <!-- SG&A科目大项 -->
    <div class="bigPrjBox">
      <div class="title">
        SG&A科目大项
        <span>{{
          `${
            isCurrentYear
              ? `截止${props.year}年${endMonth || "--"}月`
              : `${props.year}全年`
          }`
        }}</span>
      </div>
      <div class="content">
        <SimpleCard
          v-for="item in bigPrjData"
          :data="item"
          :total="item.bgWidth"
        ></SimpleCard>
      </div>
    </div>
    <!-- 回款DSO预警 -->
    <div class="dsoTableBox" v-if="props.isBuMode">
      <EchartsCard
        chartName="dsoLine"
        ref="dsoLineRef"
        :card-mode="false"
        :height="400"
        :option="dsoLineOption"
      />
      <div class="dsoBottomBox">
        <div class="title">
          <span>DSO回款小于基线为</span>
          <LampIcon :color="dsoLampColor.green" class-name="icon" />
          <span class="green"> 绿灯 </span>
          <span>大于基线小于等于基线+0.5为</span>
          <LampIcon :color="dsoLampColor.yellow" class-name="icon" />
          <span class="yellow"> 黄灯 </span>
          <span>否则为</span>
          <LampIcon :color="dsoLampColor.red" class-name="icon" />
          <span class="red"> 红灯 </span>
        </div>
      </div>
      <div class="tableBox">
        <el-row>
          <el-col :span="2" v-for="(item, index) in dsoData" :key="item.month">
            <div :class="index % 2 === 0 ? 'firstRow' : 'firstRow borderRight'">
              {{ item.month }}月
            </div>
          </el-col>
          <el-col :span="2" v-for="(item, index) in dsoData" :key="item.month">
            <div
              :class="index % 2 === 0 ? 'secondRow' : 'secondRow borderRight'"
            >
              {{ item.value }}
            </div>
          </el-col>
          <el-col :span="2" v-for="(item, index) in dsoData" :key="item.month">
            <div :class="index % 2 === 0 ? 'thirdRow' : 'thirdRow borderRight'">
              <LampIcon :color="dsoColLampColor(item)" :class-name="'icon'" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, computed } from "vue";
import Card from "../../../components/operation/HeadCard.vue";
import SimpleCard from "../../../components/operation/SimpleCard.vue";
import LampIcon from "../../../components/operation/LampIcon.vue";
import { OperationData } from "../../../types/operation/Index";
import EchartsCard from "../../../components/common/EchartsCard.vue";
import { TabsPaneContext } from "element-plus";
import useCard from "./hooks/useCard";
import useCostTable from "./hooks/useCostTable";
import useBigPrj from "./hooks/useBigPrj";
import useDSO from "./hooks/useDSO";
import usePayOffer from "./hooks/usePayOffer";
import useBuIncome from "./hooks/useBuIncome";
import useCustomerIncome from "./hooks/useCustomerIncomeBar";
import useGetYearMonth from "../../../hooks/common/useGetYearMonth";

export interface IOperationProps {
  data: OperationData;
  year: number;
  deptName: string;
  isBuMode: boolean;
}
const isPDUMode = computed(() => props.deptName.length === 2);
const isHWCMode = computed(() => props.isBuMode && props.deptName === "HWC");
const props = defineProps<IOperationProps>();

const emits = defineEmits<{
  (e: "update-tab", tabName: string): void;
}>();

const { cardData, updateCardData, endMonth } = useCard();

const { costTableData, costTableMonth, updateCostTable, tableRowClassName } =
  useCostTable();
const { currentYear, monthOptions, currentMonth } = useGetYearMonth();

const isCurrentYear = computed(() => props.year === currentYear.value);
const {
  activeName,
  payOfferBarOption,
  payOfferBarRef,
  payOfferMonth,
  leftData,
  isUnderMode,
  getpayOfferBarData,
  updatePayOfferBarChart
} = usePayOffer();

const tabClick = (tab: TabsPaneContext) => {
  // emits("update-tab", tab.paneName as string);
  getpayOfferBarData(props.year);
};

const { incomeBuBarOption, incomeBuBarRef, updateIncomeBuBar } = useBuIncome();
const {
  incomeCustomerBarOption,
  incomeCustomerBarRef,
  updateCustomerIncomeBar
} = useCustomerIncome();

const { bigPrjData, updateBigPrjData } = useBigPrj();

const {
  dsoData,
  updateDSOData,
  dsoLineOption,
  dsoLineRef,
  dsoLampColor,
  dsoColLampColor
} = useDSO(props.data.dsoData);

const updateOperationData = () => {
  updateCardData(props.data.cardData);
  updateCostTable(props.data.costTableData);
  updateBigPrjData(props.data.bigPrjData);
  nextTick(() => {
    updateDSOData(props.data.dsoData);
    updatePayOfferBarChart(props.data.salaryQuotationList, props.year);
    updateIncomeBuBar(props.data.buIncomeList, props.year);
    updateCustomerIncomeBar(props.data.customertIncomeList, props.year);
  });
};

const updateMonth = (val?: number) => {
  payOfferMonth.value = val ? val : new Date().getMonth() + 1;
  // getpayOfferBarData(props.year);
};

const getPayOfferMonth = () => payOfferMonth.value;

onMounted(() => {
  updateOperationData();
});

defineExpose({
  updateOperationData,
  updatePayOfferBarChart,
  updateMonth,
  getPayOfferMonth
});
</script>

<style lang="less" scoped>
.operationBox {
  background-color: #f3f5f9;
  height: 100%;
  padding: 0.1px 10px 20px 10px;
  .cardBox {
    margin-top: 10px;
    .marginTop {
      margin-top: 10px;
    }
  }
  .costTableBox {
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    :deep(.el-table__header-wrapper) {
      border-bottom: 2px solid #4e576a;
    }
    .title {
      margin: 10px;
      font-size: 24px;
      font-weight:bold;
      span {
        font-size: 12px;
        color: #ccc;
      }
    }
    :deep(.budgetRow) {
      background-color: #eef3fe;
    }
    :deep(.actualUnadjustedRow) {
      background-color: #fdf4ec;
    }
    :deep(.actualAdjustedRow) {
      background-color: #effaf4;
    }
    .tableBottom {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end;
      & > div {
        display: flex;
        align-items: flex-end;
        margin-right: 30px;
        font-size: 16px;
        color: #4e576a;
      }
      .box {
        height: 14px;
        width: 14px;
        margin-right: 5px;
        border: 2px solid #d3d5da;
      }
      .bg1 {
        background-color: #eef3fe;
      }
      .bg2 {
        background-color: #fdf4ec;
      }
      .bg3 {
        background-color: #effaf4;
      }
    }
  }
  .payOfferBox {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;
    .titleBox {
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 24px;
        font-weight: bold;
      }
    }
    .leftBox {
      text-align: center;
      .labelBox {
        margin-top: 50px;
        font-weight: bold;
      }
      .valueBox {
        font-weight: bold;
      }
      .desc1 {
        margin-top: 10px;
        background-color: #548af8;
        color: #fff;
        font-size: 12px;
        height: 24px;
        line-height: 24px;
      }
      .desc2 {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
        margin-top: 40px;
        color: #fff;
        background-color: #e98e39;
      }
    }
    .backBox {
      text-align: center;
      float: left;
      position: relative;
      left: 10%;
      top: 10px;
      z-index: 99;
    }
    :deep(.el-tabs__nav) {
      left: 2%;
    }
  }
  .incomeBarBox {
    margin-top: 20px;
    padding-top: 10px;
    background-color: #fff;
  }
  .bigPrjBox {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;
    .title {
      margin: 10px;
      font-size: 24px;
      font-weight: bold;
      span {
        font-size: 12px;
        color: #ccc;
      }
    }
    .content {
      display: flex;
    }
  }
  .dsoTableBox {
    margin-top: 20px;
    background-color: #fff;
    padding: 10px;
    .dsoBottomBox {
      padding: 10px;
      background-color: #f3f5f9;
      font-weight: bold;
      color: #4e576a;
      .icon {
        top: 1px;
      }
      .green {
        color: #58ca8b;
      }
      .yellow {
        color: #e98e39;
      }
      .red {
        color: #e2635e;
      }
    }
    .tableBox {
      margin-top: 20px;
      .borderRight {
        border-right: 1px solid #d8dade;
      }
      .firstRow {
        background-color: #f6f7f8;
        text-align: center;
        color: #4e576a;
        height: 48px;
        line-height: 48px;
        font-weight: bold;
        border-bottom: 2px solid #d8dade;
      }

      .secondRow {
        text-align: center;
        height: 48px;
        line-height: 48px;
        border-bottom: 2px solid #d8dade;
      }
      .thirdRow {
        text-align: center;
        height: 48px;
        line-height: 48px;
        border-bottom: 2px solid #d8dade;
      }
    }
  }
}
</style>
