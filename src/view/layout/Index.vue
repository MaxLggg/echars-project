<template>
  <div class="commonLayout">
    <el-container>
      <el-header height="48px">
        <div class="headerBox">
          <div>LOGO</div>
          <div>Content</div>
          <div class="avata">
            <el-space :size="30">
              <div>
                <el-badge :value="200" :max="9" class="item">
                  <div class="spaceItem">
                    <el-icon> <Bell /> </el-icon>
                  </div>
                </el-badge>
              </div>
              <div class="spaceItem">
                <el-avatar :size="24" :icon="UserFilled" @click="avatarClick" />
                <el-dropdown>
                  <span class="dropdownLink">
                    Admin
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="avatarClick">
                        <el-icon> <User /> </el-icon>
                        个人中心
                      </el-dropdown-item>
                      <!-- <el-dropdown-item @click="avatarClick">
                        <el-icon> <Setting /> </el-icon>
                        个人设置
                      </el-dropdown-item> -->
                      <el-dropdown-item divided @click="logout">
                        <el-icon> <Exit /> </el-icon>
                        退出登录
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-space>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="asideWidth + 'px'">
          <LeftMenu @toogle="menuToogle" />
        </el-aside>
        <el-main>
          <!-- <router-view></router-view> -->
          <TestDemo label="asasasasa" />
        </el-main>
      </el-container>
    </el-container>
    <el-drawer
      v-model="avatarDrawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <template #header>
        <h2 class="drawerSetting">
          <el-icon class="drawerSettingIcon">
            <Setting />
          </el-icon>
          设置
        </h2>
      </template>
      <span>Hi, AvatarDrawer!</span>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { UserFilled, Setting, Bell, User } from "@element-plus/icons-vue";
import Exit from "../../icon/Exit.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";
import LeftMenu from "./LeftMenu.vue";

const avatarDrawer = ref(false);
const avatarClick = () => {
  avatarDrawer.value = true;
};

// const isCollapse = ref(false);
// const asideDuration = ref("width 0.3s");
const asideWidth = ref(200);
const menuToogle = (data: boolean) => {
  asideWidth.value = data ? 64 : 200;
  // isCollapse.value = data;
  // asideDuration.value = data ? "width 0.3s" : "width 1s";
};

const handleClose = (done: () => void) => {
  done();
};
const router = useRouter();
const logout = () => {
  ElMessageBox.confirm("确定退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    sessionStorage.clear();
    router.push("/login");
  });
};

const initBodyStyle = () => {
  document.body.style.margin = "0";
};
onMounted(() => {
  initBodyStyle();
});
</script>

<style lang="less" scoped>
@headerHeight: 48px;
.commonLayout {
  .headerBox {
    display: flex;
    justify-content: space-between;
    height: @headerHeight;
    line-height: @headerHeight;
    .avata {
      cursor: pointer;
      .spaceItem {
        height: 24px;
        line-height: 24px;
      }
      .dropdownLink {
        color: #fff;
        position: relative;
        left: 5px;
        top: 5px;
      }
    }
  }
  .drawerSetting {
    // cursor: pointer;
    .drawerSettingIcon {
      top: 4px;
    }
  }
  :deep(.el-header) {
    background-color: #001529;
    padding: 0;
    color: #fff;
  }
  :deep(.el-aside) {
    transition: width var(--el-transition-duration);
    border-right: solid 1px var(--el-menu-border-color);
  }
  :deep(.el-menu) {
    border: 0;
  }
}
</style>
