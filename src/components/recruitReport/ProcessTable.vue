<template>
  <div class="container">
    <div class="processBox" v-for="(item, index) in listData" :key="index">
      <el-row>
        <el-col :span="8">
          <el-row>
            <el-col :span="8">
              <div>
                <el-tooltip :content="item.publicCol" placement="top">
                  <div class="firstBox">{{ item.publicCol }}</div>
                </el-tooltip>
              </div>
            </el-col>
            <el-col :span="16">
              <div class="colBox">
                <!-- 今日推送 -->
                <ColNumBox
                  :label-num="item.pushNum"
                  :compare-num="item.pushNumAdd"
                />
                <!-- 今日初面 -->
                <ColNumBox
                  :label-num="item.firstNum"
                  :compare-num="item.firstNumAdd"
                />
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="10">
          <div class="colBox">
            <!-- 待初面 -->
            <ColNumBox
              :label-num="item.waitFirstNum"
              :compare-num="item.waitFirstNumAdd"
            />
            <!-- 待技面 -->
            <ColNumBox
              :label-num="item.waitTecNum"
              :compare-num="item.waitTecNumAdd"
            />
            <!-- 待综面 -->
            <ColNumBox
              :label-num="item.waitFinalNum"
              :compare-num="item.waitFinalNumAdd"
            />
            <!-- 待评审 -->
            <ColNumBox
              :label-num="item.waitReviewNum"
              :compare-num="item.waitReviewNumAdd"
            />
          </div>
        </el-col>
        <el-col :span="6">
          <div class="colBox">
            <!-- 待入职 -->
            <ColNumBox
              :show-label="false"
              :label-num="item.waitEntryNum"
              :compare-num="item.waitEntryNumAdd"
            />
            <!-- 已入职 -->
            <ColNumBox
              :show-label="false"
              :label-num="item.entryNum"
              :compare-num="item.entryNumAdd"
            />
          </div>
        </el-col>
      </el-row>
    </div>
    <el-empty description="暂无数据" v-if="listData.length === 0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IProcessListItem } from "../../types/recruitReport";
import ColNumBox from "./ColNumBox.vue";
export interface IProcessTableProps {
  data: IProcessListItem[];
}

const props = withDefaults(defineProps<IProcessTableProps>(), {
  // @ts-ignore
  data: []
});

const listData = computed(() => props.data);
</script>

<style lang="less" scoped>
.container {
  padding-bottom: 10px;
  .processBox {
    margin-left: 40px;
    height: 60px;
    line-height: 60px;
    background-color: #f3f3f3;
    // background-color: #f67171;
    margin: 0 10px 10px 50px;
    border-radius: 30px;
    .firstBox {
      width: 150px;
      text-align: center;
      font-size: 12px;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      padding: 0 5px;
    }
    .secondBox {
      display: flex;
      justify-content: space-around;
    }
    .colBox {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
