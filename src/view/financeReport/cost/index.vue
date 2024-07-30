<template>
  <div class="contentBox">
    <div class="contentBoxTitle">成本结构分析</div>
    <!-- BC报表数据 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">BC报表数据</div>
        <div>
          <el-form>
            <el-form-item label="月度筛选">
              <el-select
                v-model="cardTreeMonth"
                placeholder=""
                style="width: 100px"
                @change="val => getCardTreeData(props.year, val)"
              >
                <el-option
                  v-for="m in monthOptions(props.year, currentMonth - 1)"
                  :key="m.value"
                  :label="m.label"
                  :value="m.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="cardTreeBox">
        <template v-if="cardTreeData.length > 0">
          <div
            v-for="item in cardTreeData"
            :key="item.deptName"
            :class="`${item.deptName}Box`"
          >
            <CardTree
              :name="`${item.deptName}Box`"
              :bg-color="item.bgColor"
              :data="item"
            />
          </div>
        </template>
        <template v-else>
          <el-empty description="暂无数据" />
        </template>
      </div>
    </div>
    <!-- 成本子项 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle"><span></span> 成本子项</div>
      </div>
      <div class="selectBox">
        <SelectTabs
          :tabData="financeCostTabData"
          :select-options="monthOptions(props.year, currentMonth - 1)"
          @update-tab="updateFinanceCost"
          :defaultMonth="currentMonth - 1"
          ref="financeCostTabRef"
        />
        <EchartsCard
          chartName="financeCost"
          ref="financeCostRef"
          :card-mode="false"
          :height="300"
          :option="financeCostOption"
        />
      </div>
    </div>
    <!-- 成本大项 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">成本大项</div>
      </div>
      <div class="selectBox">
        <SelectTabs
          :tabData="majorTermTabData"
          :select-options="monthOptions(props.year, currentMonth - 1)"
          @update-tab="updateMajorTermFinanceCost"
          :default-month="currentMonth - 1"
          ref="majorTermTabRef"
        />
        <EchartsCard
          chartName="majorTerm"
          ref="majorTermRef"
          :card-mode="false"
          :height="300"
          :option="majorTermOption"
        />
      </div>
      <!-- 人工成本 -->
      <div class="childBox">
        <div class="childBoxTitle">
          <div class="cardTitle">人工成本</div>
        </div>
        <div>
          <EchartsCard
            chartName="person"
            ref="personRef"
            :card-mode="false"
            :height="300"
            :option="personOption"
          />
        </div>
      </div>
      <!-- 空间成本 -->
      <div class="childBox">
        <div class="childBoxTitle">
          <div class="cardTitle">空间成本</div>
        </div>
        <div>
          <EchartsCard
            chartName="space"
            ref="spaceRef"
            :card-mode="false"
            :height="300"
            :option="spaceOption"
          />
        </div>
      </div>
      <!-- WIP -->
      <div class="childBox">
        <div class="childBoxTitle">
          <div class="cardTitle">WIP</div>
        </div>
        <div>
          <EchartsCard
            chartName="WIP"
            ref="WIPRef"
            :card-mode="false"
            :height="300"
            :option="WIPOption"
          />
        </div>
      </div>
      <!-- 其他费用 -->
      <div class="childBox">
        <div class="childBoxTitle">
          <div class="cardTitle">其他费用</div>
        </div>
        <div>
          <EchartsCard
            chartName="other"
            ref="otherRef"
            :card-mode="false"
            :height="300"
            :option="otherOption"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- 费用率分析 -->
  <div class="contentBox">
    <div class="contentBoxTitle">费用率分析</div>
    <div class="selectBox">
      <SelectTabs
        :tabData="costRateTabData"
        :select-options="monthOptions(props.year, currentMonth - 1)"
        @update-tab="updateCostRate"
        :default-month="currentMonth - 1"
        ref="costRateTabRef"
      />
    </div>
    <!-- 整体费用率 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">整体费用率</div>
      </div>
      <div>
        <EchartsCard
          chartName="whole"
          ref="wholeRef"
          :card-mode="false"
          :height="300"
          :option="wholeOption"
        />
      </div>
    </div>
    <!-- 管理费用率 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">管理费用率</div>
      </div>
      <div>
        <EchartsCard
          chartName="manage"
          ref="manageRef"
          :card-mode="false"
          :height="300"
          :option="manageOption"
        />
      </div>
    </div>
    <!-- 研发费用率 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">研发费用率</div>
      </div>
      <div>
        <EchartsCard
          chartName="develop"
          ref="developRef"
          :card-mode="false"
          :height="300"
          :option="developOption"
        />
      </div>
    </div>
    <!-- 销售费用率 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">销售费用率</div>
      </div>
      <div>
        <EchartsCard
          chartName="sale"
          ref="saleRef"
          :card-mode="false"
          :height="300"
          :option="saleOption"
        />
      </div>
    </div>
  </div>

  <!-- 实施人均成本 -->
  <div class="contentBox">
    <div class="contentBoxTitle">实施人均成本</div>
    <div class="selectBox">
      <el-tabs
        v-model="capitaCostType"
        @tab-click="getCapitaCostData(props.year, capitaCostType)"
      >
        <el-tab-pane
          v-for="item in capitaCostTabData"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 人均成本 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">人均成本</div>
      </div>
      <div>
        <EchartsCard
          chartName="capitaCost"
          ref="capitaCostRef"
          :card-mode="false"
          :height="300"
          :option="capitaCostOption"
        />
      </div>
    </div>
    <!-- HC -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">HC</div>
      </div>
      <div>
        <EchartsCard
          chartName="HCChart"
          ref="HCChartRef"
          :card-mode="false"
          :height="300"
          :option="HCChartOption"
        />
      </div>
    </div>
  </div>

  <!-- 成本率 -->
  <div class="contentBox">
    <div class="contentBoxTitle">成本率(单位：%)</div>
    <div class="tableBox3">
      <el-table
        stripe
        :data="costRateData"
        :header-cell-style="{ backgroundColor: '#e4e7ed' }"
      >
        <el-table-column
          align="center"
          v-for="col in perCostTableColumns"
          :label="col.label"
          :prop="col.prop"
          :formatter="(row, column, val) => (col.isPercent ? `${val}%` : val)"
          :min-width="col.isPercent ? 120 : 100"
        ></el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 人均报销 -->
  <div class="contentBox">
    <div class="contentBoxTitle">人均报销</div>
    <div>
      <EchartsCard
        chartName="perExpense"
        ref="perExpenseRef"
        :card-mode="false"
        :height="300"
        :option="perExpenseOption"
      />
    </div>
    <!-- 人均报销较上月环比 -->
    <div class="itemBox">
      <div class="titleBox">
        <div class="cardTitle">人均报销较上月环比</div>
      </div>
      <div class="tabBox">
        <div class="selectBox">
          <el-form>
            <el-form-item label="月度筛选">
              <el-select
                v-model="expenseRiseMonth"
                placeholder=""
                style="width: 100px"
                @change="
                  val => getFinancePerCapitaExpenseRiseData(props.year, val)
                "
              >
                <el-option
                  v-for="m in monthOptions(props.year, currentMonth - 1)"
                  :key="m.value"
                  :label="m.label"
                  :value="m.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div>
        <EchartsCard
          chartName="expenseRise"
          ref="expenseRiseRef"
          :card-mode="false"
          :height="300"
          :option="expenseRiseOption"
        />
      </div>
    </div>
  </div>
  <!-- 人均工位成本（元） -->
  <div class="contentBox">
    <div class="contentBoxTitle">人均工位成本（元）</div>
    <div class="tableBox3">
      <el-table
        stripe
        :data="perCostData"
        :header-cell-style="{ backgroundColor: '#e4e7ed' }"
      >
        <el-table-column
          align="center"
          v-for="col in perCostTableColumns"
          :label="col.label"
          :prop="col.prop"
          :formatter="(row, column, val) => (col.isPercent ? `${val}%` : val)"
          :min-width="col.isPercent ? 120 : 100"
        ></el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 中台分摊费用 -->
  <div class="contentBox">
    <div class="contentBoxTitle">中台分摊费用</div>
    <div class="tableBox3">
      <el-table
        stripe
        :data="shareCostData"
        :header-cell-style="{ backgroundColor: '#e4e7ed' }"
      >
        <el-table-column align="center" label="BU/BD" prop="deptName">
        </el-table-column>
        <el-table-column
          v-for="col in shareCostTableColumns"
          align="center"
          :label="col.label"
          :prop="col.prop"
          :formatter="(row, column, val) => (col.isPercent ? `${val}%` : val)"
          :min-width="col.isPercent ? 120 : 100"
        >
          <el-table-column
            v-if="col.child && col.child.length > 0"
            align="center"
            v-for="item in col.child"
            :label="item.label"
            :prop="item.prop"
            :formatter="
              (row, column, val) => (item.isPercent ? `${val}%` : val)
            "
            :min-width="item.isPercent ? 120 : 100"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import useCostItem from "./hooks/useCostItem";
import useMajorTerm from "./hooks/useMajorTerm";
import SelectTabs, {
  UpdateTabData
} from "../../../components/common/SelectTabs.vue";
import EchartsCard from "../../../components/common/EchartsCard.vue";
import useGetYearMonth from "../../../hooks/common/useGetYearMonth";
import useCostRate from "./hooks/useCostRate";
import useCapitaCost from "./hooks/useCapitaCost";
import useFinanceCosts from "./hooks/useFinanceCosts";
import CardTree from "../../../components/financeReport/CardTree.vue";
import useGetCardTree from "./hooks/useGetCardTree";
import { onMounted, ref, watch } from "vue";

export interface IIncomeProps {
  year: number;
}

const props = defineProps<IIncomeProps>();

const updateFinanceCost = (data: UpdateTabData) => {
  financeCostType.value = data.activeName;
  getfinanceCostData(props.year, data.activeName, data.month);
};

const updateMajorTermFinanceCost = (data: UpdateTabData) => {
  financeCostType.value = data.activeName;
  getMajorTermData(props.year, data.activeName, data.month);
};

const updateCostRate = (data: UpdateTabData) => {
  financeCostType.value = data.activeName;
  getCostRateData(props.year, data.activeName, data.month);
};

const { monthOptions, currentMonth, currentYear } = useGetYearMonth();

const { cardTreeData, cardTreeMonth, getCardTreeData } = useGetCardTree();

const {
  financeCostType,
  financeCostRef,
  financeCostOption,
  getfinanceCostData,
  financeCostTabData
} = useCostItem();

const {
  getMajorTermData,
  majorTermTabData,
  majorTermRef,
  majorTermOption,
  personRef,
  personOption,
  spaceRef,
  spaceOption,
  WIPRef,
  WIPOption,
  otherRef,
  otherOption
} = useMajorTerm();

const {
  getCostRateData,
  costRateTabData,
  wholeRef,
  wholeOption,
  manageRef,
  manageOption,
  developRef,
  developOption,
  saleRef,
  saleOption
} = useCostRate();

const {
  capitaCostData,
  capitaCostType,
  capitaCostRef,
  capitaCostOption,
  getCapitaCostData,
  capitaCostTabData,
  HCChartData,
  HCChartRef,
  HCChartOption
} = useCapitaCost();

const {
  getFinanceCostsData,
  perCostTableColumns,
  costRateData,
  perExpenseRef,
  perExpenseOption,
  getFinancePerCapitaExpenseRiseData,
  expenseRiseMonth,
  expenseRiseRef,
  expenseRiseOption,
  perCostData,
  shareCostData,
  shareCostTableColumns
} = useFinanceCosts();

const financeCostTabRef = ref<InstanceType<typeof SelectTabs>>();
const majorTermTabRef = ref<InstanceType<typeof SelectTabs>>();
const costRateTabRef = ref<InstanceType<typeof SelectTabs>>();
const updateSelectTabsMonth = (month: number) => {
  // @ts-ignore
  financeCostTabRef.value?.updateSelectTabMonth(month);
  // @ts-ignore
  majorTermTabRef.value?.updateSelectTabMonth(month);
  // @ts-ignore
  costRateTabRef.value?.updateSelectTabMonth(month);
};

const getCostInitData = () => {
  getCardTreeData(props.year, cardTreeMonth.value);
  // @ts-ignore
  const params1 = financeCostTabRef.value?.getSelectTabData();
  if (params1) {
    // 成本子项
    getfinanceCostData(props.year, params1.activeName, params1.month);
  }
  // @ts-ignore
  const params2 = majorTermTabRef.value?.getSelectTabData();
  if (params2) {
    // 成本大项
    getMajorTermData(props.year, params2.activeName, params2.month);
  }
  // @ts-ignore
  const params3 = costRateTabRef.value?.getSelectTabData();
  if (params3) {
    // 费用率分析
    getCostRateData(props.year, params3.activeName, params3.month);
  }
  // 实施人均成本
  getCapitaCostData(props.year, capitaCostType.value);
  getFinanceCostsData(props.year);
  getFinancePerCapitaExpenseRiseData(props.year, expenseRiseMonth.value);
};

const updateCostDataByYear = (year: number) => {
  let month = year === currentYear.value ? currentMonth.value - 1 : 12;
  cardTreeMonth.value = month;
  expenseRiseMonth.value = month;
  updateSelectTabsMonth(month);
  getCostInitData();
};
onMounted(() => {
  updateCostDataByYear(props.year);
});

watch(
  () => props.year,
  val => {
    updateCostDataByYear(val);
  }
);
</script>

<style lang="less" scoped>
.contentBox {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 0 10px;
  border-radius: 3px;
  .contentBoxTitle {
    padding: 20px 0 10px;
    font-size: 20px;
    font-weight: bold;
  }
  .itemBox {
    .childBox {
      .childBoxTitle {
        .cardTitle {
          font-size: 16px;
        }
      }
    }
  }
  .cardTitle {
    font-size: 18px;
    font-weight: bold;
  }
  .titleBox {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    .selectBox {
      font-weight: normal;
    }
  }
  .cardTreeBox {
    display: flex;
    justify-content: space-around;
  }
  .topBox {
    padding: 10px;
  }
  .tableBox {
    position: relative;
    bottom: 40px;
  }
  .tableBox2 {
    position: relative;
    bottom: 20px;
  }
  .tableBox3 {
    padding: 20px;
  }
  .tabBox {
    .selectBox {
      position: relative;
      bottom: 50px;
      float: right;
    }
  }
}
</style>
