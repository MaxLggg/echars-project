<template>
  <div class="recruitReportBox">
    <div class="topSectionBox">
      <div>
        <el-select
          v-model="topDeptName"
          placeholder=""
          style="width: 150px"
          @change="getInitData"
        >
          <el-option
            v-for="i in deptNameOptions"
            :key="i.value"
            :label="i.label"
            :value="i.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        <el-button type="primary" round>
          {{ topDeptName }} 招聘数据看板
        </el-button>
      </div>
      <div class="exportExcel">
        <el-button type="text" @click="exportExcel">生成报表</el-button>
      </div>
    </div>
    <!-- 招聘进度 -->
    <div class="contentBox">
      <div class="progressListBox">
        <div class="leftTitleBox">
          <div>招聘进度</div>
        </div>
        <div class="headerBox">
          <el-row>
            <el-col :span="8">
              <el-row>
                <el-col :span="8">
                  <div class="btnBox">
                    <el-button
                      size="small"
                      style="width: 100px"
                      round
                      :type="btnType('A')"
                      @click="changeHeadTag('A')"
                    >
                      PDU
                    </el-button>
                  </div>
                  <div class="btnBox">
                    <el-button
                      size="small"
                      style="width: 100px"
                      round
                      :type="btnType('B')"
                      @click="changeHeadTag('B')"
                    >
                      客户
                    </el-button>
                  </div>
                  <div class="btnBox">
                    <el-button
                      size="small"
                      style="width: 100px"
                      round
                      :type="btnType('C')"
                      @click="changeHeadTag('C')"
                    >
                      招聘顾问
                    </el-button>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="titleBox">
                    <div class="title">今日进展</div>
                    <div class="numBox">
                      <HeaderNumBox
                        label="今日推送量"
                        :label-num="processData.pushNumSum"
                        :compare-num="processData.pushNumAddSum"
                      />
                      <HeaderNumBox
                        label="今日初面"
                        :label-num="processData.firstNumSum"
                        :compare-num="processData.firstNumAddSum"
                      />
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="10">
              <div class="titleBox">
                <div class="title">管道中</div>
                <div class="numBox">
                  <HeaderNumBox
                    label="待初面"
                    :label-num="processData.waitFirstNumSum"
                    :compare-num="processData.waitFirstNumAddSum"
                  />
                  <HeaderNumBox
                    label="待技面"
                    :label-num="processData.waitTecNumSum"
                    :compare-num="processData.waitTecNumAddSum"
                  />
                  <HeaderNumBox
                    label="待综面"
                    :label-num="processData.waitFinalNumSum"
                    :compare-num="processData.waitFinalNumAddSum"
                  />
                  <HeaderNumBox
                    label="待评审"
                    :label-num="processData.waitReviewNumSum"
                    :compare-num="processData.waitReviewNumAddSum"
                  />
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="titleBox noBorder">
                <div class="title">已完成</div>
                <div class="numBox">
                  <HeaderNumBox
                    label="待入职"
                    :label-num="processData.waitEntryNumSum"
                    :compare-num="processData.waitEntryNumAddSum"
                    :show-compare="false"
                  />
                  <HeaderNumBox
                    label="已入职"
                    :label-num="processData.entryNumSum"
                    :compare-num="processData.entryNumAddSum"
                    :show-compare="false"
                  />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="listBox">
        <ProcessTable :data="processData.processList" />
      </div>
    </div>
    <!-- 需求完成情况 -->
    <div class="contentBox">
      <div class="completeBox">
        <div class="titleBox">
          <div class="title">需求完成情况</div>
          <div>
            <el-date-picker
              v-model="completeTime"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
              @change="completeTimeChange"
            />
          </div>
        </div>
        <el-tabs v-model="completeTabType" @tab-click="completeTabClick">
          <el-tab-pane name="A" label="PDU"></el-tab-pane>
          <el-tab-pane name="B" label="客户"></el-tab-pane>
          <el-tab-pane name="C" label="地域"></el-tab-pane>
        </el-tabs>
        <el-row>
          <el-col :span="6">
            <el-empty
              :description="isLoading ? '数据加载中...' : '暂无数据'"
              v-if="
                isLoading || (!isLoading && completeData?.personNumBU === 0)
              "
            />
            <div v-else>
              <Circle
                ref="circleRef"
                :radius="160"
                :data="{
                  num: completeData?.personNumBU || 0,
                  num1: completeData?.finishNumBU || 0,
                  num2: completeData?.timelyFinishNumBU || 0
                }"
              ></Circle>
            </div>
          </el-col>
          <el-col :span="18">
            <EchartsCard
              chartName="completeBar"
              ref="completeBarRef"
              :card-mode="false"
              :height="400"
              :option="completeBarOption"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 需求剩余情况 -->
    <div class="contentBox">
      <div class="completeBox">
        <div class="titleBox">
          <div class="title">需求剩余情况</div>
        </div>
        <el-tabs v-model="completeTabType" @tab-click="completeTabClick">
          <el-tab-pane name="A" label="PDU"></el-tab-pane>
          <el-tab-pane name="B" label="客户"></el-tab-pane>
          <el-tab-pane name="C" label="地域"></el-tab-pane>
        </el-tabs>
        <el-row>
          <el-col :span="4">
            <div class="firstColBox">
              <div>
                <el-button
                  color="#FF9845"
                  round
                  style="width: 100px; color: #fff"
                >
                  剩余缺口
                </el-button>
              </div>
              <div class="numBox">{{ completeData?.gapBU || 0 }}</div>
              <div>
                <el-button
                  color="#F8B97F"
                  round
                  style="width: 100px; color: #fff"
                >
                  管道中
                </el-button>
              </div>
              <div class="numBox">{{ completeData?.pipelineBU || 0 }}</div>
            </div>
          </el-col>
          <el-col :span="20">
            <EchartsCard
              chartName="restBar"
              ref="restBarRef"
              :card-mode="false"
              :height="300"
              :option="restOption"
            />
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 需求点灯情况 -->
    <div class="contentBox">
      <div class="completeBox">
        <div class="titleBox">
          <div class="title">需求点灯情况</div>
        </div>
        <el-tabs v-model="completeTabType" @tab-click="completeTabClick">
          <el-tab-pane name="A" label="PDU"></el-tab-pane>
          <el-tab-pane name="B" label="客户"></el-tab-pane>
          <el-tab-pane name="C" label="地域"></el-tab-pane>
        </el-tabs>
        <div class="lightChartBox">
          <el-row>
            <el-col :span="8">
              <EchartsCard
                chartName="lightPie"
                ref="lightPieRef"
                :card-mode="false"
                :height="300"
                :option="lightPieOption"
              />
            </el-col>
            <el-col :span="16">
              <EchartsCard
                chartName="lightBar"
                ref="lightBarRef"
                :card-mode="false"
                :height="300"
                :option="lightBarOption"
              />
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <EchartsCard
                chartName="lightBar2"
                ref="lightBarRef2"
                :card-mode="false"
                :height="600"
                :option="lightBar2Option"
              />
            </el-col>
            <el-col :span="8">
              <LightRankingCard :data="completeData?.redList || []" />
            </el-col>
            <el-col :span="8">
              <LightRankingCard
                label="阻塞需求排名"
                :data="completeData?.blockList || []"
                bg-color="#108EE9"
              />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 招聘顾问产能 -->
    <div class="contentBox">
      <div class="capacityBox">
        <div class="titleBox">
          <div class="title">招聘顾问产能</div>
        </div>
        <div>
          <el-form>
            <el-form-item label="日期范围">
              <el-date-picker
                v-model="capacityDate"
                type="daterange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                @change="capacityDateChange"
              />
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-row>
            <el-col :span="8" v-for="item in capacityBarKeys" :key="item">
              <EchartsCard
                :chartName="`capacitybar${item}`"
                :ref="(el:any) => setCapacityItemRef(el, item)"
                :card-mode="false"
                :height="600"
                :option="buildOptions(item)"
              />
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!--面试周期  面试过程转化-->
    <div class="contentBox">
      <div class="interviewBox">
        <el-row :gutter="10">
          <el-col :span="12">
            <div class="colBox">
              <div class="titleBox">
                <div class="title">面试周期</div>
                <div>
                  <el-button type="text" @click="openBaselineDialog">
                    基线维护
                  </el-button>
                </div>
                <!-- 基线维护弹框 -->
                <div>
                  <el-dialog
                    title="基线维护"
                    v-model="baseLineDialog"
                    width="50%"
                  >
                    <div>
                      <el-form
                        :model="baseLineForm"
                        ref="baseLineFormRef"
                        :rules="baseLineFormRules"
                        label-width="80px"
                        inline
                        size="small"
                      >
                        <el-form-item label="BU" prop="deptName">
                          <el-select
                            v-model="baseLineForm.deptName"
                            disabled
                            placeholder=""
                            @change="val => baselineFormChange(val, '1')"
                          >
                            <el-option label="CDCE" value="CDCE"></el-option>
                            <el-option label="CS" value="CS"></el-option>
                            <el-option label="PS" value="PS"></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="面试轮数" prop="round">
                          <el-select
                            v-model="baseLineForm.round"
                            placeholder=""
                            @change="val => baselineFormChange(val, '2')"
                          >
                            <el-option label="二轮" :value="2"></el-option>
                            <el-option label="三轮" :value="3"></el-option>
                            <el-option label="四轮" :value="4"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div>
                      <el-table :data="baseLineForm.stageList" border stripe>
                        <el-table-column
                          prop="stageName"
                          label="阶段"
                          align="center"
                        >
                        </el-table-column>
                        <el-table-column
                          prop="consumingDay"
                          label="耗时(天)"
                          align="center"
                        >
                          <template #default="{ row }">
                            <el-input
                              v-model="row.consumingDay"
                              placeholder=""
                              style="width: 100px"
                            ></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <template #footer>
                      <span>
                        <el-button @click="baseLineDialog = false">
                          取消
                        </el-button>
                        <el-button type="primary" @click="updateBaseline">
                          确定
                        </el-button>
                      </span>
                    </template>
                  </el-dialog>
                </div>
              </div>
              <el-tabs
                v-model="interviewCycleTabName"
                @tab-click="
                  getInterviewCycleData(interviewCycleTabName, topDeptName)
                "
              >
                <el-tab-pane name="A" label="PDU"></el-tab-pane>
                <el-tab-pane name="B" label="客户"></el-tab-pane>
                <el-tab-pane name="C" label="地域"></el-tab-pane>
              </el-tabs>
              <!-- 基线 -->
              <div class="baseLineBox">
                <!-- <BaseLine :data="baseLineData.stageList" /> -->
                <EchartsCard
                  chartName="interviewCycle"
                  ref="interviewCycleRef"
                  :card-mode="false"
                  :height="600"
                  :option="interviewCycleOption"
                />
              </div>
              <!-- 数据 -->
              <div></div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="colBox">
              <div class="titleBox">
                <div class="title">面试过程转化</div>
                <div style="margin-right: 20px">
                  <el-button
                    style="width: 100px"
                    :type="converType === 'A' ? 'primary' : 'info'"
                    @click="changeConverType('A')"
                  >
                    PDU
                  </el-button>
                  <el-button
                    style="width: 100px"
                    :type="converType === 'B' ? 'primary' : 'info'"
                    @click="changeConverType('B')"
                  >
                    招聘顾问
                  </el-button>
                </div>
                <div>
                  <el-select
                    v-model="publicColValue"
                    placeholder=""
                    @change="val => getConverData(topDeptName, converType, val)"
                  >
                    <el-option
                      v-for="(item, index) in typeOptions"
                      :key="index"
                      :label="item.publicCol"
                      :value="item.publicCol"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div>
                <EchartsCard
                  chartName="converFunnel"
                  ref="converFunnelRef"
                  :card-mode="false"
                  :height="654"
                  :option="converFunnelOption"
                />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import HeaderNumBox from "../../components/recruitReport/HeaderNumBox.vue";
import Circle from "../../components/recruitReport/Circle3.vue";
import BaseLine from "../../components/recruitReport/BaseLine.vue";
import ProcessTable from "../../components/recruitReport/ProcessTable.vue";
import LightRankingCard from "../../components/recruitReport/LightRankingCard.vue";
import useGetProcess from "./hooks/useGetProcess";
import useGetUrlToken from "../../hooks/common/useGetUrlToken";
import useGetComplete from "./hooks/useGetComplete";
import EchartsCard from "../../components/common/EchartsCard.vue";
import useInterview from "./hooks/useInterview";
import useInterviewCycle from "./hooks/useInterviewCycle";
import useGetCapacity from "./hooks/useGetCapacity";
import http from "../../utils/http";
import { recruitExport } from "../../api/recruitReport";
import { saveAs } from "file-saver";
import { ElLoading, ElMessage } from "element-plus";

export type HeadTag = "A" | "B" | "C";

useGetUrlToken();

const topDeptName = ref("CDCE");
const deptNameOptions = [
  { label: "CDCE", value: "CDCE" },
  { label: "PS", value: "PS" },
  { label: "CS", value: "CS" },
  { label: "BD", value: "BD" }
];

const currentHeadTag = ref<HeadTag>("A");
const btnType = computed(
  () => (val: HeadTag) => val === currentHeadTag.value ? "primary" : "info"
);
const changeHeadTag = (val: HeadTag) => {
  currentHeadTag.value = val;
  // 请求数据
  getInitData();
};

const exportExcel = async () => {
  const loading = ElLoading.service();
  try {
    const res = await http.post<Blob>(
      recruitExport,
      {
        type: currentHeadTag.value,
        deptName: topDeptName.value
      },
      {
        responseType: "blob"
      }
    );
    loading.close();
    const now = new Date();
    const fileName = `${topDeptName.value}招聘进展情况${now.getFullYear()}${
      now.getMonth() + 1
    }${now.getDate()}.xlsx`;
    saveAs(res.data, fileName);
  } catch (error) {
    loading.close();
    ElMessage.error(
      typeof error === "string" ? error : "导出报表错误，请稍后再重试"
    );
  }
};

const { getProcessData, processData } = useGetProcess();

const {
  completeData,
  isLoading,
  completeTabType,
  completeTime,
  completeBarOption,
  completeBarRef,
  restOption,
  restBarRef,
  lightPieRef,
  lightBarRef,
  lightBarRef2,
  lightPieOption,
  lightBarOption,
  lightBar2Option,
  getCompleteInitData
} = useGetComplete();

const completeTimeChange = (val: any) => {
  getCompleteInitData(topDeptName.value, completeTabType.value, val);
};

const completeTabClick = () => {
  getCompleteInitData(
    topDeptName.value,
    completeTabType.value,
    completeTime.value
  );
};

const {
  typeOptions,
  publicColValue,
  converType,
  converFunnelRef,
  converFunnelOption,
  getTypeOptions,
  getConverData
} = useInterview();

const changeConverType = (type: "A" | "B") => {
  converType.value = type;
  publicColValue.value = "全部";
  getTypeOptions(topDeptName.value, type, true);
};

const {
  baseLineDialog,
  openBaselineDialog,
  baseLineForm,
  baseLineFormRef,
  baseLineFormRules,
  updateBaseline,
  baselineFormChange,
  baseLineData,
  interviewCycleTabName,
  getInterviewCycleData,
  interviewCycleOption,
  interviewCycleRef,
  getInterviewInitData
} = useInterviewCycle();

const {
  getCapacityListData,
  capacityDate,
  setCapacityItemRef,
  buildOptions,
  capacityBarKeys
} = useGetCapacity();

const capacityDateChange = (val: any) => {
  // console.log("[ val :]", val);
  // if (!val) {
  //   capacityDate.value = ["", ""];
  // }
  getCapacityListData(topDeptName.value, val);
};

const getInitData = () => {
  baseLineForm.deptName = topDeptName.value;
  getProcessData(topDeptName.value, currentHeadTag.value);
  getCompleteInitData(
    topDeptName.value,
    completeTabType.value,
    completeTime.value
  );
  getCapacityListData(topDeptName.value, capacityDate.value);

  getTypeOptions(topDeptName.value, converType.value);
  getConverData(topDeptName.value, converType.value, publicColValue.value);
  getInterviewInitData(
    topDeptName.value,
    baseLineForm.round,
    interviewCycleTabName.value
  );
};

onMounted(() => {
  getInitData();
});
</script>

<style lang="less" scoped>
.recruitReportBox {
  background-color: #f3f5f9;
  .topSectionBox {
    display: flex;
    justify-content: space-between;
    // padding-bottom: 10px;
    padding: 10px;
    background-color: #fff;
    margin-bottom: 10px;
    .exportExcel {
      position: relative;
      top: 50px;
      right: 20px;
      width: 150px;
      text-align: right;
      z-index: 99;
    }
  }
  .contentBox {
    padding: 0 10px 10px 10px;
    & > div {
      background-color: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
    }
    .progressListBox {
      display: flex;
      margin-bottom: 0;
      height: 130px;
      .leftTitleBox {
        margin-right: 20px;
        width: 0;
        height: 150px;
        border-left: 40px solid #dcdfe2;
        border-top: 15px solid transparent;
        border-bottom: 15px solid transparent;
        position: relative;
        top: 150px;
        z-index: 9;
        & > div {
          position: relative;
          left: -26px;
          top: 33px;
        }
      }
      .headerBox {
        width: 100%;
        .btnBox {
          margin-bottom: 5px;
        }
        .btnBox:first-child {
          margin-top: 32px;
        }
        .titleBox {
          border-right: 1px solid #ccc;
          .title {
            text-align: center;
            margin: 10px 0;
            font-weight: bold;
          }
          .numBox {
            display: flex;
            justify-content: space-around;
          }
        }
        .noBorder {
          border-right: 0;
        }
      }
    }
    .listBox {
      min-height: 200px;
      position: relative;
    }
    .completeBox {
      padding: 10px;
      .titleBox {
        display: flex;
        height: 32px;
        line-height: 32px;
        .title {
          font-size: 24px;
          margin-right: 100px;
        }
      }
      .firstColBox {
        width: 100%;
        text-align: center;
        margin-top: 40px;
        .numBox {
          font-size: 24px;
          margin: 10px 0 50px 0;
        }
      }
    }

    .capacityBox {
      padding: 10px;
      .titleBox {
        display: flex;
        height: 32px;
        line-height: 32px;
        .title {
          font-size: 24px;
          margin-right: 100px;
        }
      }
    }
    .interviewBox {
      // padding: 10px;
      background-color: #f3f5f9;
      .colBox {
        padding: 10px;
        background-color: #fff;
        border-radius: 5px;
        .titleBox {
          display: flex;
          height: 32px;
          line-height: 32px;
          .title {
            font-size: 24px;
            margin-right: 100px;
          }
        }
      }
    }
  }
}
</style>
