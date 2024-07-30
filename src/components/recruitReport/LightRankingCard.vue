<template>
  <div class="rankingBox">
    <div class="titleBox">{{ props.label }}</div>
    <el-row>
      <el-col :span="16">
        <div class="headerBox">需求名称</div>
      </el-col>
      <el-col :span="4">
        <div class="headerBox">剩余天数</div>
      </el-col>
      <el-col :span="4">
        <div class="headerBox">剩余缺口</div>
      </el-col>
    </el-row>
    <template v-if="tableData.length === 0">
      <el-empty description="暂无排名数据" />
    </template>
    <template v-else>
      <el-row v-for="(item, index) in tableData">
        <el-col :span="16">
          <div class="requirementNameBox">
            <span class="indexSpan">{{ index + 1 }}</span>
            <el-tooltip :content="item.requireName" placement="top-start">
              <span>{{ item.requireName }}</span>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="numBox">{{ item.remaindays }}</div>
        </el-col>
        <el-col :span="4">
          <div class="numBox">{{ item.residualgap }}</div>
        </el-col>
      </el-row>
    </template>
    <!-- <div class="moreBox">查看更多 >></div> -->
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RankCardListItem } from "../../types/recruitReport";

export interface IRankCardProps {
  label?: string;
  data: RankCardListItem[];
  bgColor?: "#F04864" | "#108EE9";
}

const props = withDefaults(defineProps<IRankCardProps>(), {
  label: "红灯需求排名",
  bgColor: "#F04864"
});

const tableData = computed(() => props.data);

const indexBgColor = computed(() => props.bgColor);
</script>

<style lang="less" scoped>
.rankingBox {
  font-size: 12px;
  .titleBox {
    text-align: center;
    background-color: v-bind(indexBgColor);
    border-radius: 15px;
    color: #fff;
    height: 30px;
    line-height: 30px;
  }
  .headerBox {
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 10px 0 20px 0;
    font-size: 14px;
    font-weight: bold;
  }
  .requirementNameBox {
    margin-bottom: 10px;
    // text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .indexSpan {
      display: inline-block;
      background-color: v-bind(indexBgColor);
      color: #fff;
      text-align: center;
      width: 22px;
      height: 22px;
      line-height: 22px;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .numBox {
    text-align: center;
    height: 22px;
    line-height: 22px;
  }
  .moreBox {
    color: #108ee9;
    cursor: pointer;
    text-align: center;
  }
  .moreBox:hover {
    text-decoration: underline;
  }
}
</style>
