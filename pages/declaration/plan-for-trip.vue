<script setup lang="ts">

import {Plus} from "@element-plus/icons-vue";
import {useUserStore} from "~/store/userStore";
import ModalSchedule from "~/components/Trip/ModalSchedule.vue";
import ModalRoute from "~/components/Route/ModalRoute.vue";
import {ElMessage} from "element-plus";
import type {RouteNameType, RouteType} from "~/components/Route/RouteType";
import type {SeatChartNameType} from "~/components/Seat/SeatType";
import type {TripScheduleType} from "~/components/Trip/TripType";
import TableSchedule from "~/components/Trip/TableSchedule.vue";
const userStore = useUserStore();
const companyId = userStore.userData?.companyId;
const employeeId = userStore.userData?.employeeId;
const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;

const schedules = ref<TripScheduleType[]>([]);


const showModal = ref(false);
const modalMode = ref<'add' | 'edit'>('add');

const selectedSchedule = ref(null);
const openAddModal = () => {
  modalMode.value = 'add';
  selectedSchedule.value = null;
  showModal.value = true;
};
const openEditModal = (schedule: any) => {
  modalMode.value = 'edit';
  selectedSchedule.value = schedule;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};
const chartNames = ref<SeatChartNameType[]>([]);
const routeNames = ref<RouteNameType[]>([]);
onMounted(async () => {
  if (!companyId) {
    console.error('Company ID is missing or invalid');
    return;
  }
  try {
    const resRoute = await $fetch<{
      code: number,
      message: string,
      result: RouteNameType[]
    }>(`${config.public.apiUrl}/route/list-route-name/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resSeatChart = await $fetch<{
      code: number,
      message: string,
      result: SeatChartNameType[]
    }>(`${config.public.apiUrl}/seat/list-chart-name/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resPlan = await $fetch<{
      code: number,
      message: string,
      result: TripScheduleType[]
    }>(`${config.public.apiUrl}/schedule/list-schedule/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(resPlan)

    if (resPlan.code === 1000) {
      schedules.value = resPlan.result;
    }
    if (resRoute.code === 1000) {
      routeNames.value = resRoute.result;
    }
    if (resSeatChart.code === 1000) {
      chartNames.value = resSeatChart.result;
    }

  } catch (err: any) {
    console.error('Error fetching:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  } finally {
    loading.value = false;
  }
})
const handleAddPlan = async (scheduleData: TripScheduleType) => {
  console.log(scheduleData);
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: TripScheduleType;
    }>(`${config.public.apiUrl}/schedule/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    });
    if (res.code === 1000) {
      schedules.value.push(res.result);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Thêm lịch chạy mới thất bại');
    }
  } catch (err: any) {
    console.error('Error saving:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
const handleEdit = async (scheduleData: TripScheduleType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: TripScheduleType;
    }>(`${config.public.apiUrl}/schedule/update/${scheduleData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData),
    });

    if (res.code === 1000) {
      const index = schedules.value.findIndex((e) => e.id === scheduleData.id);
      if (index !== -1) {
        schedules.value[index] = {...schedules.value[index], ...res.result};
      }
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Cập nhật lịch chạy thất bại');
    }
  } catch (err: any) {
    console.error('Error updating:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
const handleDelete = async (scheduleData: TripScheduleType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
    }>(`${config.public.apiUrl}/schedule/delete/${scheduleData.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(scheduleData.id),
    });

    if (res.code === 1000) {
      schedules.value = schedules.value.filter(plan => plan.id !== scheduleData.id);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Xoá lịch chạy thất bại');
    }
  } catch (err: any) {
    console.error('Error delete:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
</script>

<template>
  <section class="p-[20px]">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Danh sách lịch chạy</h2>
      <el-button type="primary" :icon="Plus" @click="openAddModal">Thêm lịch chạy</el-button>
    </div>
    <ModalSchedule v-if="showModal" :mode="modalMode" :companyId="companyId!" :employeeId="employeeId!" :schedule="selectedSchedule" @close="closeModal"
    :route="routeNames!" :chart="chartNames!" @add="handleAddPlan" @update="handleEdit"/>
    <TableSchedule :schedules="schedules" :loading="loading" @edit="openEditModal" @delete="handleDelete"/>
  </section>
</template>

<style scoped>

</style>