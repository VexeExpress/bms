<script setup lang="ts">

import {Plus} from "@element-plus/icons-vue";
import ModalSeat from "~/components/Seat/ModalSeat.vue";
import {useUserStore} from "~/store/userStore";
import type {SeatMapType} from "~/components/Seat/SeatType";
import {ElMessage} from "element-plus";
import type {RouteType} from "~/components/Route/RouteType";
import TableSeatChart from "~/components/Seat/TableSeatChart.vue";

const seatsMap = ref<SeatMapType[]>([]);
const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;
const userStore = useUserStore();
const companyId = userStore.userData?.companyId;
const showModal = ref(false);
const selectedSeatMap = ref(null);
const modalMode = ref<'add' | 'edit'>('add');
const openAddModal = () => {
  modalMode.value = 'add';
  selectedSeatMap.value = null;
  showModal.value = true;
};
const openEditModal = (seatMap: any) => {
  modalMode.value = 'edit';
  selectedSeatMap.value = seatMap;
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
    const res = await $fetch<{
      code: number,
      message: string,
      result: SeatMapType[]
    }>(`${config.public.apiUrl}/seat/list-chart/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.code === 1000) {
      seatsMap.value = res.result;
      console.log('Fetched:', seatsMap.value);
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
})
const handleAdd = async (seatMapData: SeatMapType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: SeatMapType;
    }>(`${config.public.apiUrl}/seat/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seatMapData),
    });
    if (res.code === 1000) {
      seatsMap.value.push(res.result);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Thêm sơ đồ mới thất bại');
    }
  } catch (err: any) {
    console.error('Error saving:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
const handleDelete = async (seatMapData: SeatMapType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: SeatMapType;
    }>(`${config.public.apiUrl}/seat/delete/${seatMapData.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seatMapData.id),
    });

    if (res.code === 1000) {
      seatsMap.value = seatsMap.value.filter(seatMap => seatMap.id !== seatMapData.id);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Xoá sơ đồ thất bại');
    }
  } catch (err: any) {
    console.error('Error updating:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
const handleUpdate = async (seatMapData: SeatMapType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: SeatMapType;
    }>(`${config.public.apiUrl}/seat/update/${seatMapData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(seatMapData),
    });

    if (res.code === 1000) {
      const index = seatsMap.value.findIndex((e) => e.id === seatMapData.id);
      if (index !== -1) {
        seatsMap.value[index] = {...seatsMap.value[index], ...res.result};
      }
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Cập nhật sơ đồ thất bại');
    }
  } catch (err: any) {
    console.error('Error updating:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
</script>

<template>
  <section class="p-[20px]">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Danh sách sơ đồ ghế</h2>
      <el-button type="primary" :icon="Plus" @click="openAddModal">Tạo sơ đồ</el-button>
    </div>
    <TableSeatChart :seatMap="seatsMap" :loading="loading" @edit="openEditModal" @delete="handleDelete"/>
    <ModalSeat v-if="showModal" :mode="modalMode" :companyId="companyId!" @close="closeModal" :seatMap="selectedSeatMap"
               @add="handleAdd" @update="handleUpdate"/>
  </section>
</template>

<style scoped>

</style>