<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue";
import type {VehicleType} from "~/components/Vehicle/VehicleType";
import {ElMessage} from "element-plus";
import TableVehicle from "~/components/Vehicle/TableVehicle.vue";
import ModalVehicle from "~/components/Vehicle/ModalVehicle.vue";

const vehicles = ref<VehicleType[]>([]);
import {useUserStore} from "~/store/userStore";
const userStore = useUserStore();
const companyId = userStore.userData?.companyId;
const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;
const showModal = ref(false);
const modalMode = ref<'add' | 'edit'>('add');
const selectedVehicle = ref(null);
const openAddModal = () => {
  modalMode.value = 'add';
  selectedVehicle.value = null;
  showModal.value = true;
};
const openEditModal = (vehicle: any) => {
  modalMode.value = 'edit';
  selectedVehicle.value = vehicle;
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
    const res = await $fetch<{ code: number, message: string , result: VehicleType[] }>(`${config.public.apiUrl}/vehicle/list-vehicle/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.code === 1000) {
      vehicles.value = res.result;
      console.log('Fetched:', vehicles.value);
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
const handleAddVehicle = async (vehicleData: VehicleType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: VehicleType;
    }>(`${config.public.apiUrl}/vehicle/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });
    if (res.code === 1000) {
      vehicles.value.push(res.result);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Thêm phương tiện mới thất bại');
    }
  } catch (err: any) {
    console.error('Error saving:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
};
const handleUpdateVehicle = async (vehicleData: VehicleType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: VehicleType;
    }>(`${config.public.apiUrl}/vehicle/update/${vehicleData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData),
    });

    if (res.code === 1000) {
      const index = vehicles.value.findIndex((e) => e.id === vehicleData.id);
      if (index !== -1) {
        vehicles.value[index] = {...vehicles.value[index], ...res.result};
      }
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Cập nhật phương tiện thất bại');
    }
  } catch (err: any) {
    console.error('Error updating:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
};
const handleDeleteVehicle = async (vehicleData: VehicleType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
    }>(`${config.public.apiUrl}/vehicle/delete/${vehicleData.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vehicleData.id),
    });

    if (res.code === 1000) {
      vehicles.value = vehicles.value.filter(vehicle => vehicle.id !== vehicleData.id);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Xoá phương tiện thất bại');
    }
  } catch (err: any) {
    console.error('Error updating:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
</script>

<template>
  <section>
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Danh sách phương tiện</h2>
      <el-button type="primary" :icon="Plus" @click="openAddModal">Thêm phương tiện</el-button>
    </div>
    <TableVehicle :vehicles="vehicles" :companyId="companyId" :loading="loading" @edit="openEditModal" @delete="handleDeleteVehicle"/>
    <ModalVehicle v-if="showModal" :mode="modalMode" :companyId="companyId!" :vehicle="selectedVehicle" @close="closeModal" @addVehicle="handleAddVehicle" @updateVehicle="handleUpdateVehicle"/>
  </section>
</template>

<style scoped>

</style>