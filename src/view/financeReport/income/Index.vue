<template>
  <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">收入较基线值数据比对</div>
    </div>
    <div>
      <el-tabs
        v-model="baseCompareTab"
        @tab-click="getBaseCompareData(props.year, baseCompareTab)"
      >
        <el-tab-pane
          v-for="t in baseCompareTabData"
          :key="t.name"
          :label="t.label"
          :name="t.name"
        />
      </el-tabs>
      <EchartsCard
        chartName="baseCompareBarLine"
        ref="baseCompareBarLineRef"
        :card-mode="false"
        :height="300"
        :option="baseCompareBarLineOption"
      />
    </div>
  </div>
  <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">BU维度</div>
      <div class="selectBox">
        <el-form>
          <el-form-item label="月度筛选">
            <el-select
              v-model="buCostMonth"
              placeholder=""
              style="width: 100px"
              @change="val => getBUCostData(props.year, val)"
            >
              <el-option
                v-for="m in incomeMonthOptions"
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
        chartName="buCostBar"
        ref="buCostBarRef"
        :card-mode="false"
        :height="300"
        :option="buCostBarOption"
      />
    </div>
  </div>
  <div class="contentBox">
    <div class="tabBox">
      <div class="">
        <el-tabs
          v-model="otherTab"
          @tab-click="getOtherCostData(props.year, otherCostMonth, otherTab)"
        >
          <el-tab-pane label="CS" name="1"></el-tab-pane>
          <el-tab-pane label="PS" name="2"></el-tab-pane>
          <el-tab-pane label="CDCE" name="3"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="selectBox">
        <el-form>
          <el-form-item label="月度筛选">
            <el-select
              v-model="otherCostMonth"
              placeholder=""
              style="width: 100px"
              @change="val => getOtherCostData(props.year, val, otherTab)"
            >
              <el-option
                v-for="m in incomeMonthOptions"
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
        chartName="otherCostBar1"
        ref="otherCostBar1Ref"
        :card-mode="false"
        :height="300"
        :option="otherCostBarOption1"
      />
    </div>
    <div>
      <EchartsCard
        chartName="otherCostBar2"
        ref="otherCostBar2Ref"
        :card-mode="false"
        :height="300"
        :option="otherCostBarOption2"
      />
    </div>
  </div>
  <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">客户维度</div>
    </div>
    <div class="topBox">
      <el-row :gutter="20">
        <el-col :span="12">
          <TopBox
            :label="`${+props.year - 1}年TOP10客户`"
            :data="lastyearRankData"
          />
        </el-col>
        <el-col :span="12">
          <TopBox
            :label="`${props.year}年TOP10客户`"
            :data="curryearRankData"
          />
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">
        {{ props.year }}年TOP5客户与{{ +props.year - 1 }}排名对比
      </div>
    </div>
    <div>
      <EchartsCard
        chartName="rankComparison"
        ref="rankComparisonRef"
        :card-mode="false"
        :height="300"
        :option="rankComparisonOption(props.year)"
      />
    </div>
  </div>
  <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">{{ props.year }}年客户维度月度收入数据</div>
      <div class="selectBox">
        <el-form>
          <el-form-item label="月度筛选">
            <el-select
              v-model="incomeMonth"
              placeholder=""
              style="width: 100px"
              @change="val => getFinanceCostByCustomData(props.year, val)"
            >
              <el-option
                v-for="m in incomeMonthOptions"
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
        chartName="monthIncome"
        ref="monthIncomeRef"
        :card-mode="false"
        :height="400"
        :option="monthIncomeOption"
      />
    </div>
  </div>
  <div class="contentBox">
    <div class="titleBox">
      <div class="cardTitle">客户关闭计划</div>
    </div>
    <div class="tableBox3">
      <el-table
        stripe
        :data="customerCloseData"
        :header-cell-style="{ backgroundColor: '#e4e7ed' }"
        :height="500"
      >
        <el-table-column label="序号" type="index" width="80" align="center">
        </el-table-column>
        <el-table-column
          align="center"
          v-for="col in closePlanTableColumns"
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
      <div class="cardTitle">产业维度</div>
    </div>
    <div>
      <el-tabs
        v-model="costByEstateType"
        @tab-click="getCostByEstateData(props.year, costByEstateType)"
      >
        <el-tab-pane
          v-for="t in costByEstateTabData"
          :key="t.name"
          :label="t.label"
          :name="t.name"
        />
      </el-tabs>
      <EchartsCard
        chartName="costByEstate"
        ref="costByEstateRef"
        :card-mode="false"
        :height="300"
        :option="costByEstateOption"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useBaseCompare from "./hooks/useBaseCompare";
import EchartsCard from "../../../components/common/EchartsCard.vue";
import TopBox from "../../../components/financeReport/TopBox.vue";
import useBUCost from "./hooks/useBUCost";
import useOtherCost from "./hooks/useOtherCost";
import useCustom from "./hooks/useCustom";
import useMonthIncome from "./hooks/useMonthIncome";
import useCostByEstate from "./hooks/useCostByEstate";
import useGetYearMonth from "../../../hooks/common/useGetYearMonth";
import { computed, onMounted, watch } from "vue";

export interface IIncomeProps {
  year: number;
}

const props = defineProps<IIncomeProps>();

const { monthOptions, currentYear, currentMonth } = useGetYearMonth();

const incomeMonthOptions = computed(() => {
  return [
    {
      id: 0,
      label: "全部",
      value: 0
    },
    ...monthOptions.value(props.year, currentMonth.value - 1)
  ];
});

const {
  baseCompareTab,
  baseCompareTabData,
  getBaseCompareData,
  baseCompareBarLineRef,
  baseCompareBarLineOption
} = useBaseCompare();

const { buCostMonth, buCostBarRef, buCostBarOption, getBUCostData } =
  useBUCost();

const {
  getOtherCostData,
  otherTab,
  otherCostMonth,
  // otherMonthOptions,
  otherCostBar1Ref,
  otherCostBar2Ref,
  otherCostBarOption1,
  otherCostBarOption2
} = useOtherCost();

const {
  curryearRankData,
  lastyearRankData,
  rankComparisonData,
  customerCloseData,
  closePlanTableColumns,
  rankComparisonRef,
  rankComparisonOption,
  getCustomDaTa
} = useCustom();

const {
  incomeMonth,
  // incomeMonthOption,
  monthIncomeRef,
  monthIncomeOption,
  getFinanceCostByCustomData
} = useMonthIncome();

const {
  costByEstateType,
  costByEstateData,
  costByEstateRef,
  costByEstateOption,
  costByEstateTabData,
  getCostByEstateData
} = useCostByEstate();

const getIncomeData = () => {
  getBaseCompareData(props.year, baseCompareTab.value);
  getBUCostData(props.year, buCostMonth.value);
  getOtherCostData(props.year, otherCostMonth.value, otherTab.value);
  getCustomDaTa(props.year);
  getFinanceCostByCustomData(props.year, incomeMonth.value);
  getCostByEstateData(props.year, costByEstateType.value);
};

const updateIncomeDataByYear = (year: number) => {
  const month = year === currentYear.value ? currentMonth.value - 1 : 12;
  buCostMonth.value = month;
  otherCostMonth.value = month;
  incomeMonth.value = month;
  getIncomeData();
};

onMounted(() => {
  updateIncomeDataByYear(props.year);
});

watch(
  () => props.year,
  val => {
    updateIncomeDataByYear(val);
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
    padding: 20px 20px 0;
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
