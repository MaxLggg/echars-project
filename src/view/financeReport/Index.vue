<template>
  <div class="financeBox">
    <div class="headerBox">
      <div></div>
      <div class="tabBox">
        <el-tabs v-model="headerForm.tab">
          <el-tab-pane label="经营结果分析" name="A"></el-tab-pane>
          <el-tab-pane label="收入结构分析" name="B"></el-tab-pane>
          <el-tab-pane label="成本结构分析" name="C"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="yearBox">
        <el-select v-model="headerForm.year" placeholder="">
          <el-option
            v-for="y in yearOptions"
            :key="y.id"
            :label="y.label"
            :value="y.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <template v-if="headerForm.tab === 'A'">
      <Result :year="headerForm.year" />
    </template>
    <template v-else-if="headerForm.tab === 'B'">
      <Income :year="headerForm.year" />
    </template>
    <template v-else>
      <Cost :year="headerForm.year" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Result from "./result/Index.vue";
import Income from "./income/Index.vue";
import Cost from "./cost/index.vue";
import useGetUrlToken from "../../hooks/common/useGetUrlToken";
import useGetYearMonth from "../../hooks/common/useGetYearMonth";

useGetUrlToken();
const { yearOptions, currentYear } = useGetYearMonth();
const headerForm = reactive({
  tab: "A",
  year: currentYear.value
});
</script>

<style lang="less" scoped>
.financeBox {
  background-color: #e4e7ed;
  padding: 10px;
  .headerBox {
    display: flex;
    justify-content: space-around;
    height: 54px;
    line-height: 54px;
    background-color: #fff;
    margin-bottom: 20px;
    padding: 0 10px;
    border-radius: 3px;
    .tabBox {
      padding-top: 2px;
    }
  }
}
</style>
