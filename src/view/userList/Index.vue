<template>
  <div class="userListBox">
    <el-page-header v-if="isDev" content="用户管理" @back="goBack" />
    <div class="formBox">
      <el-form
        size="small"
        :model="formModel"
        inline
        @submit.prevent.stop="getUsers"
      >
        <el-form-item label="工号：">
          <el-input
            v-model.trim="formModel.number"
            placeholder=""
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input
            v-model.trim="formModel.name"
            placeholder=""
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名：">
          <el-input
            v-model.trim="formModel.username"
            placeholder=""
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input
            v-model.trim="formModel.phone"
            placeholder=""
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="getUsers">
            查询
          </el-button>
          <el-button type="danger" :icon="Refresh" @click="resetQuery">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableBox">
      <div class="addBox">
        <el-button
          type="primary"
          size="small"
          :icon="Plus"
          @click="openAddDialog"
        >
          添加人员
        </el-button>
      </div>
      <el-table :data="userList" border stripe>
        <el-table-column
          label="工号"
          prop="number"
          align="center"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column
          label="手机号"
          prop="phone"
          align="center"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center" min-width="150">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              :icon="Edit"
              @click="edit(row)"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              size="small"
              :icon="Delete"
              @click="del(row)"
            >
              删除
            </el-button>
            <el-button
              type="info"
              size="small"
              :icon="View"
              @click="viewPwd(row)"
            >
              查看密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationBox">
        <!-- hide-on-single-page -->
        <el-pagination
          v-model:currentPage="pageInfo.current"
          v-model:page-size="pageInfo.size"
          :page-sizes="[10, 20, 50, 100]"
          small
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          @size-change="val => pageChange(val, 'size')"
          @current-change="val => pageChange(val, 'current')"
        />
      </div>
      <div class="dialogBox">
        <el-dialog
          v-model="dialogVisible"
          :title="isEditMode ? '修改人员' : '添加人员'"
          width="60%"
          draggable
        >
          <el-form
            :model="addForm"
            ref="addFormRef"
            :rules="addFormRules"
            label-position="right"
            label-width="150px"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="工号：" prop="number">
                  <el-input v-model="addForm.number" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="addForm.name" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用户名：" prop="username">
                  <el-input
                    v-model="addForm.username"
                    placeholder=""
                    :disabled="isEditMode"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="密码：" prop="password">
                  <el-input
                    v-model="addForm.password"
                    type="password"
                    placeholder=""
                    show-password
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号：" prop="phone">
                  <el-input v-model="addForm.phone" placeholder=""></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮箱：" prop="email">
                  <el-input v-model="addForm.email" placeholder=""></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogConfirm">
                确定
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, toRaw } from "vue";
import { useRouter } from "vue-router";
import { deleteById, getUserPage, saveUpdate } from "../../api/userList";
import {
  EditUserInfo,
  ListResult,
  PageInfo,
  UserInfo
} from "../../types/common/Index";
import http from "../../utils/http";
import {
  Plus,
  Edit,
  Delete,
  Search,
  Refresh,
  View
} from "@element-plus/icons-vue";
import {
  FormInstance,
  FormItemRule,
  ElMessage,
  ElMessageBox,
  ElLoading
} from "element-plus";
import useGetUrlToken from "../../hooks/common/useGetUrlToken";
import useGetEnv from "../../hooks/common/useGetEnv";
import { Arrayable } from "element-plus/es/utils/typescript";

const router = useRouter();
const goBack = () => {
  router.back();
};

useGetUrlToken();
const { isDev } = useGetEnv();
const formModel = reactive<UserInfo>({} as UserInfo);
const dialogVisible = ref(false);
const isEditMode = ref(false);
const userList = ref<UserInfo[]>([]);
const pageInfo = reactive<PageInfo>({
  current: 1,
  size: 10,
  total: 0
});
const getUsers = async () => {
  const req = {
    json: {
      customQueryParams: toRaw(formModel),
      page: {
        current: pageInfo.current,
        size: pageInfo.size
      }
    }
  };
  const res = await http.get<ListResult<UserInfo>>(getUserPage, {
    params: req
  });
  pageInfo.current = res.data.current;
  pageInfo.size = res.data.size;
  pageInfo.total = res.data.total;
  userList.value = res.data.records;
};

const resetQuery = () => {
  formModel.number = "";
  formModel.name = "";
  formModel.username = "";
  formModel.phone = "";
  getUsers();
};

const pageChange = (val: number, type: "size" | "current") => {
  pageInfo[type] = val;
  getUsers();
};

const addForm = reactive<UserInfo>({
  name: "",
  username: "",
  number: "",
  password: "",
  email: "",
  phone: ""
});

const addFormRules = reactive<Partial<Record<string, Arrayable<FormItemRule>>>>(
  {
    name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    number: [{ required: true, message: "请输入工号", trigger: "blur" }],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
      {
        pattern:
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        message: "长度至少为8，至少含有一个字母和一个数字和一个特殊字符",
        trigger: "blur"
      }
    ],
    email: [
      {
        required: true,
        message: "请输入邮箱",
        trigger: "blur"
      },
      {
        pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        message: "邮箱格式不正确",
        trigger: "blur"
      }
    ],
    phone: [
      { required: true, message: "请输入手机号", trigger: "blur" },
      {
        pattern: /^(0|86|17951)?(1[3-9])[0-9]{9}$/,
        message: "手机号格式不正确",
        trigger: "blur"
      }
    ]
  }
);

const addFormRef = ref<FormInstance>();
const openAddDialog = () => {
  addForm.email = "";
  addForm.name = "";
  addForm.number = "";
  addForm.password = "";
  addForm.phone = "";
  addForm.username = "";
  isEditMode.value = false;
  dialogVisible.value = true;
};
const editRowData = ref<EditUserInfo>();

const dialogConfirm = async () => {
  const loading = ElLoading.service();
  try {
    const valid = await addFormRef.value?.validate();
    if (valid) {
      // const url=saveUpdate
      const res = await http.post(saveUpdate, {
        ...toRaw(addForm),
        id: isEditMode.value ? editRowData.value?.id : ""
      });
      // @ts-ignore
      if (res.flag === "1") {
        loading.close();
        ElMessage.success("操作成功");
        dialogVisible.value = false;
        getUsers();
      }
    }
  } catch (error) {
    loading.close();
  }
};

const del = async (row: EditUserInfo) => {
  const loading = ElLoading.service();
  try {
    await ElMessageBox.confirm("确定删除该用户吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });

    const res = await http.get(deleteById, { params: { id: row.id } });
    // @ts-ignore
    if (res.flag === "1") {
      loading.close();
      ElMessage.success("操作成功");
      getUsers();
    }
  } catch (error) {
    loading.close();
  }
};

const edit = async (row: EditUserInfo) => {
  editRowData.value = { ...row };
  addForm.email = row.email;
  addForm.password = row.password;
  addForm.name = row.name;
  addForm.number = row.number;
  addForm.username = row.username;
  addForm.phone = row.phone;
  isEditMode.value = true;
  dialogVisible.value = true;
};

const viewPwd = (row: EditUserInfo) => {
  ElMessageBox.alert(
    `
    用户 <strong>${row.name}</strong> 的密码是： <i>${row.password}</i> 
  `,
    "提示",
    {
      dangerouslyUseHTMLString: true
    }
  );
};

onMounted(() => {
  getUsers();
});
</script>

<style lang="less" scoped>
.userListBox {
  // background-color: #fff;
  padding: 0 10px 10px 10px;
  & > div {
    background-color: #fff;
    margin-bottom: 20px;
  }
  .formBox {
    padding: 20px 10px 0 10px;
  }
  .tableBox {
    .addBox {
      margin: 10px 10px 10px 0;
      float: right;
    }
    .paginationBox {
      margin: 10px 10px 0 0;
      float: right;
    }
  }
  .dialogBox {
    :deep(.el-form-item) {
      margin-bottom: 30px;
    }
  }
}
</style>
