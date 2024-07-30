<template>
  <div class="loginBox">
    <ParticleEffect color="#DADA7F" bgColor="#345644" />
    <div>this is Login Page</div>
    <div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="默认账号admin"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="默认密码123456"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormItemRule } from "element-plus";
import { reactive, ref, toRaw } from "vue";
import { useRouter } from "vue-router";
import http from "../../utils/http";
import { baselogin } from "../../api/common";
import { TOKEN } from "../../constants/sessionStorageKeys";
import ParticleEffect from "../../components/common/ParticleEffect.vue";
import { Arrayable } from "element-plus/es/utils/typescript";

const loginForm = reactive({
  username: "cp",
  password: "123456"
});

const loginRules: Partial<Record<string, Arrayable<FormItemRule>>> = {
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ]
};

const router = useRouter();

const loginFormRef = ref<FormInstance>();
const login = async () => {
  try {
    // const valid = await loginFormRef.value!.validate();
    // if (valid) {
    //   const res = await http.post<{ token: string }>(
    //     baselogin,
    //     toRaw(loginForm)
    //   );
    //   // 存储token
      // sessionStorage.setItem(TOKEN, res.data.token);
      sessionStorage.setItem(TOKEN, '93541351as3d5f1a3s5df413sad');
      router.push("/home");
    // }
  } catch (error) {
    // console.log("[ error :]", error);
  }
};
</script>

<style lang="less" scoped>
.loginBox {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20%;
  color: #fff;
  :deep(.el-form-item__label) {
    color: #fff;
  }
}
</style>
