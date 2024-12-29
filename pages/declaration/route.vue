<script setup lang="ts">
import type {RouteType} from "~/components/Route/RouteType";
import {ElMessage} from "element-plus";
import {Plus} from "@element-plus/icons-vue";
import TableRoute from "~/components/Route/TableRoute.vue";
import ModalRoute from "~/components/Route/ModalRoute.vue";

const routes = ref<RouteType[]>([]);
import {useUserStore} from "~/store/userStore";
const userStore = useUserStore();
const companyId = userStore.userData?.companyId;
const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;
const showModal = ref(false);
const modalMode = ref<'add' | 'edit'>('add');
const selectedRoute = ref(null);
const openAddModal = () => {
  modalMode.value = 'add';
  selectedRoute.value = null;
  showModal.value = true;
};
const openEditModal = (route: any) => {
  modalMode.value = 'edit';
  selectedRoute.value = route;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};
onMounted(async () => {
  if (!companyId) {
    console.error('Company ID is missing or invalid');
    return;
  }
  try {
    const res = await $fetch<{ code: number, message: string , result: RouteType[] }>(`${config.public.apiUrl}/route/list-route/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.code === 1000) {
      routes.value = res.result;
      console.log('Fetched:', routes.value);
      ElMessage.success(res.message);
    } else {
      console.error('API returned an error:', res.code);
      ElMessage.error(res.message || 'Tải dữ liệu thất bại');
    }
  } catch (err: any) {
    console.error('Error fetching:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  } finally {
    loading.value = false;
  }
});
const handleDeleteRoute = async (routeData: RouteType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
    }>(`${config.public.apiUrl}/route/delete/${routeData.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeData.id),
    });

    if (res.code === 1000) {
      routes.value = routes.value.filter(route => route.id !== routeData.id);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Xoá tuyến thất bại');
    }
  } catch (err: any) {
    console.error('Error updating:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
const handleAddRoute = async (routeData: RouteType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: RouteType;
    }>(`${config.public.apiUrl}/route/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeData),
    });
    if (res.code === 1000) {
      routes.value.push(res.result);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Thêm tuyến mới thất bại');
    }
  } catch (err: any) {
    console.error('Error saving:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
const handleUpdateRoute = async (routeData: RouteType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: RouteType;
    }>(`${config.public.apiUrl}/route/update/${routeData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeData),
    });

    if (res.code === 1000) {
      const index = routes.value.findIndex((e) => e.id === routeData.id);
      if (index !== -1) {
        routes.value[index] = {...routes.value[index], ...res.result};
      }
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Cập nhật tuyến thất bại');
    }
  } catch (err: any) {
    console.error('Error updating:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
</script>

<template>
  <section class="m-[20px]">
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-semibold">Danh sách tuyến</h2>
    <el-button type="primary" :icon="Plus" @click="openAddModal">Tạo tuyến mới</el-button>
  </div>
  <TableRoute :routes="routes" :loading="loading" @edit="openEditModal" @delete="handleDeleteRoute"/>
  <ModalRoute v-if="showModal" :mode="modalMode" :companyId="companyId!" :route="selectedRoute" @close="closeModal" @add="handleAddRoute" @update="handleUpdateRoute"/>
  </section>
</template>

<style scoped>

</style>