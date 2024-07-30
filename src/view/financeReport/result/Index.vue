<template>
  <div class="contentBox">
    <div class="titleBox cardTitle">收入</div>
    <div>
      <SelectTabs
        :tabData="inComeTabData"
        @update-tab="updateIncomeTab"
        :default-month="defaultMonth"
        :select-options="monthOptions(props.year, currentMonth - 1)"
        ref="selectTabsRef"
      />
    </div>
    <div class="tableBox">
      <el-table
        stripe
        :data="inComeTableData"
        :span-method="spanMethod"
        :header-cell-style="{ backgroundColor: '#e4e7ed' }"
      >
        <el-table-column
          align="center"
          v-for="col in tableColumns"
          :label="col.label"
          :prop="col.prop"
          :formatter="(row, column, val) => (col.isPercent ? `${val}%` : val)"
          :min-width="col.isPercent ? 120 : 100"
        ></el-table-column>
      </el-table>
    </div>
  </div>
  <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">人均成本及收入</div>
      <div class="selectBox">
        <el-form>
          <el-form-item label="月度筛选">
            <el-select
              v-model="avgCostMonth"
              placeholder=""
              style="width: 100px"
              @change="avgCostMonthChange"
            >
              <el-option
                v-for="m in monthOptions(props.year, currentMonth - 1)"
                :key="m.id"
                :label="m.label"
                :value="m.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="tableBox2">
      <el-table
        stripe
        :data="avgCostTableData"
        :header-cell-style="{ backgroundColor: '#e4e7ed' }"
        :span-method="spanMethod2"
      >
        <el-table-column
          align="center"
          v-for="col in avgTableColumns"
          :label="col.label"
          :prop="col.prop"
          :formatter="(row, column, val) => (col.isPercent ? `${val}%` : val)"
          :min-width="col.isPercent ? 120 : 100"
        ></el-table-column>
      </el-table>
    </div>
    <div class="cardTitle">人均成本及收入增长额</div>
    <div>
      <EchartsCard
        chartName="avgCostBarLine"
        ref="avgCostBarLineRef"
        :card-mode="false"
        :height="300"
        :option="avgCostOption"
      />
    </div>
  </div>
  <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">毛利率/费用率/贡献利润率</div>
      <div class="selectBox">
        <el-form>
          <el-form-item label="月度筛选">
            <el-select
              v-model="rateMonth"
              placeholder=""
              style="width: 100px"
              @change="val => getAllRateData(props.year, val)"
            >
              <el-option
                v-for="m in monthOptions(props.year, currentMonth - 1)"
                :key="m.id"
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
        chartName="grossRateLine"
        ref="grossRateLineRef"
        :card-mode="false"
        :height="300"
        :option="grossRateLineOption"
      />
    </div>
    <div>
      <EchartsCard
        chartName="costRateLine"
        ref="costRateLineRef"
        :card-mode="false"
        :height="300"
        :option="costRateLineOption"
      />
    </div>
    <div>
      <EchartsCard
        chartName="contributionRateLine"
        ref="contributionRateLineRef"
        :card-mode="false"
        :height="300"
        :option="contributionRateLineOption"
      />
    </div>
    <div>
      <EchartsCard
        chartName="riseRateLine"
        ref="riseRateLineRef"
        :card-mode="false"
        :height="300"
        :option="riseRateLineOption"
      />
    </div>
    <!-- 贡献利润 -->
    <div>
      <EchartsCard
        chartName="contributionBar"
        ref="contributionBarRef"
        :card-mode="false"
        :height="300"
        :option="contributionBarOption"
      />
    </div>
  </div>
  <!-- 贡献利润 -->
  <!-- <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">贡献利润</div>
      <div class="selectBox">
        <el-form>
          <el-form-item label="月度筛选">
            <el-select
              v-model="contributionMonth"
              placeholder=""
              style="width: 100px"
              @change="val => getContributionData(props.year, val)"
            >
              <el-option
                v-for="m in monthOptions(props.year)"
                :key="m.id"
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
        chartName="contributionBar"
        ref="contributionBarRef"
        :card-mode="false"
        :height="300"
        :option="contributionBarOption"
      />
    </div>
  </div> -->
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
// import { TableColumnCtx } from "element-plus/lib/components/table/src/table-column/defaults";
import { IncomCostLitItem } from "../../../types/financeReport";
import SelectTabs, {
  UpdateTabData
} from "../../../components/common/SelectTabs.vue";
import EchartsCard from "../../../components/common/EchartsCard.vue";
import useIncome from "./hooks/useIncome";
import useAvgCost from "./hooks/useAvgCost";
import useGetRate from "./hooks/useGetRate";
import useGetYearMonth from "../../../hooks/common/useGetYearMonth";
import { TableColumnCtx } from "element-plus/es/components/table/src/table/defaults";
export interface IResultProps {
  year: number;
}

interface SpanMethodProps {
  row: IncomCostLitItem;
  column: TableColumnCtx<IncomCostLitItem>;
  rowIndex: number;
  columnIndex: number;
}

const props = defineProps<IResultProps>();
const { monthOptions, currentMonth, currentYear } = useGetYearMonth();
const defaultMonth = ref(currentMonth.value - 1);

const {
  inComeTabData,
  inComeTab,
  inComeTableData,
  tableColumns,
  getIncomeData
} = useIncome();

const updateIncomeTab = (data: UpdateTabData) => {
  inComeTab.value = data.activeName;
  getIncomeData(props.year, data.month, data.activeName);
};

const spanMethod = (data: SpanMethodProps) => {
  if ([13, 20, 21, 22, 23, 24, 25].includes(data.columnIndex)) {
    if (data.rowIndex === 0) {
      return [2, 1];
    } else {
      return [0, 0];
    }
  }
  return [1, 1];
};

const spanMethod2 = (data: SpanMethodProps) => {
  if ([0, 4, 5, 7, 8, 10, 11].includes(data.columnIndex)) {
    if (data.rowIndex % 2 === 0) {
      return [2, 1];
    } else {
      return [0, 0];
    }
  }
  return [1, 1];
};

const {
  avgCostMonth,
  getAvgCostData,
  avgCostTableData,
  avgTableColumns,
  avgCostBarLineRef,
  avgCostOption
} = useAvgCost();

const avgCostMonthChange = (val: number) => {
  getAvgCostData(props.year, val);
};

const {
  rateMonth,
  getAllRateData,
  grossRateLineRef,
  grossRateLineOption,
  costRateLineRef,
  costRateLineOption,
  contributionRateLineRef,
  contributionRateLineOption,
  riseRateLineRef,
  riseRateLineOption,
  getContributionData,
  contributionBarRef,
  contributionBarOption
} = useGetRate();

const selectTabsRef = ref<InstanceType<typeof SelectTabs>>();

const getResultData = () => {
  // @ts-ignore
  const data = selectTabsRef.value?.getSelectTabData();
  if (data) {
    getIncomeData(props.year, data.month, data.activeName);
  }
  getAvgCostData(props.year, avgCostMonth.value);
  getAllRateData(props.year, rateMonth.value);
};

/**
 * 更新数据
 * @param year
 */
const updateResultDataByYear = (year: number) => {
  const month = year === currentYear.value ? currentMonth.value - 1 : 12;
  avgCostMonth.value = month;
  rateMonth.value = month;
  // @ts-ignore
  selectTabsRef.value?.updateSelectTabMonth(month);
  getResultData();
};

onMounted(() => {
  updateResultDataByYear(props.year);
});
watch(
  () => props.year,
  value => {
    updateResultDataByYear(value);
  }
);
</script>

<style lang="less" scoped>
.contentBox {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 0 10px;
  border-radius: 3px;
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
  .tableBox {
    position: relative;
    bottom: 40px;
  }
  .tableBox2 {
    position: relative;
    bottom: 20px;
  }
}
</style>
