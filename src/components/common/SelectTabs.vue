<template>
  <div class="selectTabBox">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane
        v-for="(item, index) in props.tabData"
        :key="index"
        :name="item.name"
        :label="item.label"
      ></el-tab-pane>
    </el-tabs>
    <div class="selectLabelBox" v-if="selectMode">
      <el-form :model="formModel">
        <el-form-item :label="props.selectLabel">
          <el-select
            v-model="formModel.month"
            placeholder=""
            style="width: 100px"
            @change="monthChange"
          >
            <el-option
              v-for="i in options"
              :key="i.value"
              :value="i.value"
              :label="i.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { reactive, ref } from "vue";
import { DictItem, ITabDataItem } from "../../types/common/Index";

export interface ISelectTabProps {
  tabData: ITabDataItem[];
  selectOptions?: DictItem[];
  selectLabel?: string;
  selectMode?: boolean;
  defaultMonth?: number;
}

export interface UpdateTabData {
  activeName: string;
  month: number;
}

const props = withDefaults(defineProps<ISelectTabProps>(), {
  selectLabel: "月度筛选",
  selectMode: true
});

const emit = defineEmits<{
  (e: "update-tab", data: UpdateTabData): void;
}>();

const activeName = ref(props.tabData[0].name);

const formModel = reactive({
  month: props.defaultMonth || new Date().getMonth() + 1
});
const options = computed(() => {
  if (props.selectOptions && props.selectOptions.length > 0) {
    return props.selectOptions;
  }
  const currents = [];
  for (let i = 0; i <= new Date().getMonth(); i++) {
    currents.push({ label: `${i + 1}月`, value: i + 1, id: i });
  }
  return currents;
});

const tabClick = (tab: any) => {
  activeName.value = tab.paneName;
  emit("update-tab", {
    activeName: activeName.value,
    month: formModel.month
  });
};

const monthChange = () => {
  emit("update-tab", {
    activeName: activeName.value,
    month: formModel.month
  });
};

const updateSelectTabMonth = (month: number) => {
  formModel.month = month;
};

const getSelectTabData = () => {
  return {
    activeName: activeName.value,
    month: formModel.month
  };
};

defineExpose({ updateSelectTabMonth, getSelectTabData });
</script>

<style lang="less" scoped>
.selectTabBox {
  .selectLabelBox {
    position: relative;
    bottom: 55px;
    float: right;
  }
}
</style>
