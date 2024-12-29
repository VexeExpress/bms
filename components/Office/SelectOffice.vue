<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import type {OfficeNameType} from "~/components/Office/OfficeType";
import {ElMessage} from "element-plus";
import {useUserStore} from "~/store/userStore";
const props = defineProps<{
  officesName: OfficeNameType[];
  loading: boolean;
}>();

const value = ref<number | null>(null);
const options = computed(() =>
    (props.officesName || []).map((office) => ({
      value: office.id,
      label: office.officeName,
    }))
);


const router = useRouter();

const userStore = useUserStore();
const logout = () => {
  userStore.clearUserData();
  router.push('/');
  ElMessage({
    message: 'Đăng xuất thành công!',
    type: 'success',
  });
}
const startWorking = () => {
  if (value.value) {
    localStorage.setItem('office_id', value.value.toString());
    router.push('/dashboard');
  } else {
    console.warn('No office selected');
  }
};
</script>

<template>
  <el-select
      v-model="value"
      placeholder="Chọn văn phòng làm việc"
      size="large"
      style="width: 250px"
      v-loading="loading"
  >
    <el-option

        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <div class="button-container">
    <el-button
        type="primary"
        class="button-start"
        :disabled="!value"
        @click="startWorking"
    >
      Bắt đầu làm việc
    </el-button>
    <el-button
        type="warning"
        class="button-start"
        @click="logout"
    >
      Đăng xuất
    </el-button>
  </div>


</template>

<style scoped>
.button-start {
  margin-top: 20px;
  width: 250px;
}
.button-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
.el-button+.el-button {
  margin-left: 0px !important;
}
</style>