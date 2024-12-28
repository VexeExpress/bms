<script setup lang="ts">
import { ref } from 'vue'
import {
  User,
  DataAnalysis
} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import {useUserStore} from "~/store/userStore";

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const input = ref('')
const router = useRouter();

const userStore = useUserStore();
const logout = () => {
  router.push('/');
  userStore.clearUserData();
  ElMessage({
    message: 'Đăng xuất thành công!',
    type: 'success',
  });
};
</script>

<template>
  <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
  >
    <el-menu-item index="0" class="custom-menu-select">
      <el-input v-model="input" style="width: 240px" placeholder="Tìm kiếm vé" />
    </el-menu-item>

    <el-menu-item index="3" >
      <span>Đặng Tuấn Thành</span>
    </el-menu-item>

    <el-sub-menu index="2" class="custom-menu-support">
      <template #title>
        <el-icon><DataAnalysis /></el-icon>
      </template>
      <el-menu-item index="2-1">Hỗ trợ kỹ thuật: 0877 71 7575</el-menu-item>
      <el-menu-item index="2-2">Điều khiển từ xa</el-menu-item>
      <el-menu-item index="2-3">Gửi phản hồi cho VinaHome</el-menu-item>
      <el-menu-item index="2-4">Lịch sử phản hồi</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3" class="custom-menu-account">
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
}
.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom: none !important;
}
.el-menu--horizontal>.el-menu-item:hover {
  background-color: #fff !important;
}
</style>