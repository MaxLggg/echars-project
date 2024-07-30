<template>
  <div class="topBox">
    <div class="title" v-if="props.label">{{ props.label }}</div>
    <div>
      <el-row>
        <el-col :span="2">
          <div class="">&nbsp;&nbsp;</div>
        </el-col>
        <el-col :span="10">
          <div class="">客户</div>
        </el-col>
        <el-col :span="6">
          <div>全年收入</div>
        </el-col>
        <el-col :span="6">
          <div class="lastBox">占比</div>
        </el-col>
      </el-row>
      <template v-if="props.data.length > 0">
        <el-row v-for="(item, index) in props.data" :key="index">
          <el-col :span="2">
            <div class="indexBox">
              <!-- <div :class="index < 3 ? 'circle' : 'textBox'"> -->
              <div
                class="circle"
                :style="`
                  background-color:${indexBgColor(index)};
                  color:${index > 2 ? '#000' : '#fff'}
                `"
              >
                {{ index + 1 }}
              </div>
            </div>
          </el-col>
          <el-col :span="10">
            <div class="nameBox">
              {{ item.statisticsValue }}
            </div>
          </el-col>
          <el-col :span="6">
            <div>{{ item.sumIncome }}</div>
          </el-col>
          <el-col :span="6">
            <div class="rateBox">
              <div class="textBox">{{ item.rateIncome.toFixed(2) }}%</div>
              <div class="rateContainer">
                <div
                  class="bgBox"
                  :style="`width:${item.rateIncome / 2}px`"
                ></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-empty description="暂无数据" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BUCostListItem } from "../../types/financeReport";

export interface ITopBoxProps {
  label?: string;
  data: BUCostListItem[];
}

const props = withDefaults(defineProps<ITopBoxProps>(), {
  label: "",
  // @ts-ignore
  data: []
});

const indexBgColor = computed(() => (index: number) => {
  switch (index) {
    case 0:
      // return "#FFD84D";
      return "#6A74FF";
    case 1:
      // return "#D5DFED";
      return "#8B92FF";
    case 2:
      // return "#F6BC64";
      return "#AEB4FF";
    default:
      return "#F0F2F5";
  }
});
</script>

<style lang="less" scoped>
.topBox {
  border: 1px solid #ccc;
  padding: 10px;
  .title {
    font-weight: bold;
    margin: 10px 0 10px 20px;
  }
  .lastBox {
    margin-left: 65px;
  }
  :deep(.el-col div:first-child) {
    height: 30px;
    line-height: 30px;
  }
  .indexBox {
    float: right;
    padding-right: 5px;
    .circle {
      text-align: center;
      border-radius: 50%;
      // background-color: #000;
      color: #fff;
      height: 26px !important;
      line-height: 26px !important;
      width: 26px;
    }
    // .textBox {
    //   padding-right: 7px;
    // }
  }
  .rateBox {
    display: flex;
    .textBox {
      width: 90px;
      text-align: right;
      margin-right: 10px;
    }
    .rateContainer {
      width: 50px;
      .bgBox {
        background-color: #3ba1ff;
        height: 90%;
      }
    }
  }
}
</style>
