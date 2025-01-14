<script setup lang="ts">
import { ref } from 'vue'
import {
  User,
  DataAnalysis, Search, Plus, Menu, Expand
} from '@element-plus/icons-vue'
import {type DropdownInstance, ElMessage} from "element-plus";
import {useUserStore} from "~/store/userStore";
import MenuApp from "~/components/MenuApp.vue";

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const input = ref('')
const router = useRouter();

const userStore = useUserStore();
const fullName = userStore.userData?.fullName;
const logout = () => {
  router.push('/');
  userStore.clearUserData();
  ElMessage({
    message: 'Đăng xuất thành công!',
    type: 'success',
  });
};

const dropdown1 = ref<DropdownInstance>()

function showClick() {
  if (!dropdown1.value) return
  dropdown1.value.handleOpen()
}
</script>

<template>
  <el-menu
      class="el-menu-demo bg-amber-300"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" class="custom-menu-select menu-item">
      <el-dropdown trigger="click">
        <el-button class="el-dropdown-link">
          <el-icon size="20"><Expand /></el-icon>
        </el-button>
        <template #dropdown>
          <el-scrollbar height="515px">
          <el-dropdown-menu>
              <MenuApp/>
          </el-dropdown-menu>
          </el-scrollbar>
        </template>
      </el-dropdown>
    </el-menu-item>


    <el-menu-item index="1" class="custom-menu-select">
      <el-input
          v-model="input"
          class="ml-[-10px]"
          style="width: 300px"
          placeholder="Tìm kiếm vé"
          :prefix-icon="Search"
      />
    </el-menu-item>

    <el-menu-item index="2" >
      <span class="text-white">{{ fullName }}</span>
    </el-menu-item>

    <el-sub-menu index="3" class="custom-menu-support">
      <template #title>
        <el-icon><DataAnalysis /></el-icon>
      </template>
      <el-menu-item index="2-1">Hỗ trợ kỹ thuật: 0877 71 7575</el-menu-item>
      <el-menu-item index="2-2">Điều khiển từ xa</el-menu-item>
      <el-menu-item index="2-3">Gửi phản hồi cho VinaHome</el-menu-item>
      <el-menu-item index="2-4">Lịch sử phản hồi</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4" class="custom-menu-account">
      <template #title>
        <el-icon><User /></el-icon>
      </template>
      <el-menu-item index="3-1">Đổi mật khẩu</el-menu-item>
      <el-menu-item index="3-2" @click="logout">Đăng xuất</el-menu-item>

    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
.custom-menu-support ::v-deep(.el-sub-menu__icon-arrow) {
  display: none !important;
}
.custom-menu-account ::v-deep(.el-sub-menu__icon-arrow) {
  display: none !important;
}
.custom-menu-support ::v-deep(.el-sub-menu__title) {
  padding-right: 0 !important;
}
.el-menu--horizontal{
  height: 50px !important;
  background-color: #0072bc;
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none !important;
}
.el-menu--horizontal>.el-menu-item:hover {
  background-color: #0072bc !important;
}
.el-menu-item:hover, .el-sub-menu__title:hover{
  background-color: #0072bc !important;
}
.el-menu--horizontal>.el-menu-item[data-v-a81738bd][data-v-a81738bd]:hover{
  background-color: #0072bc !important;
}
.el-menu-item [class^=el-icon] {
  margin-right: 0 !important;
}
.menu-item{
  padding: 10px !important;
}
</style>