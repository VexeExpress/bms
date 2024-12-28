<script setup lang="ts">
import {useUserStore} from "~/store/userStore";

definePageMeta({
  layout: 'default',
});
const userStore = useUserStore();

onBeforeMount(() => {
  userStore.loadUserData();
});
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto" class="custom-menu">
        <Menu/>
      </el-aside>
      <el-container>
        <el-header>
          <Header/>
        </el-header>
        <el-main>
          <slot/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style scoped>
.el-header{
  padding: 0 !important;
}
.custom-menu {
  border-right: 1px solid #dcdfe6;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

</style>