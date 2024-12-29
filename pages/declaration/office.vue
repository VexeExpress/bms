<script setup lang="ts">
import type {OfficeType} from "~/components/Office/OfficeType";
import {Plus} from "@element-plus/icons-vue";
import TableOffice from "~/components/Office/TableOffice.vue";
import ModalOffice from "~/components/Office/ModalOffice.vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "~/store/userStore";
const userStore = useUserStore();
const companyId = userStore.userData?.companyId;
const offices = ref<OfficeType[]>([]);

const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;
const showModal = ref(false);
const modalMode = ref<'add' | 'edit'>('add');
const selectedOffice = ref(null);
const openAddModal = () => {
  modalMode.value = 'add';
  selectedOffice.value = null;
  showModal.value = true;
};
const openEditModal = (office: any) => {
  modalMode.value = 'edit';
  selectedOffice.value = office;
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
    const res = await $fetch<{ code: number, message: string , result: OfficeType[] }>(`${config.public.apiUrl}/office/list-office/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.code === 1000) {
      offices.value = res.result;
      console.log('Fetched:', offices.value);
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
const handleDeleteOffice = async (officeData: OfficeType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
    }>(`${config.public.apiUrl}/office/delete/${officeData.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(officeData.id),
    });

    if (res.code === 1000) {
      offices.value = offices.value.filter(office => office.id !== officeData.id);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Xoá nhân viên thất bại');
    }
  } catch (err: any) {
    console.error('Error updating employee:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
const handleAddOffice = async (officeData: OfficeType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: OfficeType;
    }>(`${config.public.apiUrl}/office/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(officeData),
    });
    if (res.code === 1000) {
      offices.value.push(res.result);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Thêm văn phòng mới thất bại');
    }
  } catch (err: any) {
    console.error('Error saving:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
}
const handleUpdateOffice = async (officeData: OfficeType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
      result: OfficeType;
    }>(`${config.public.apiUrl}/office/update/${officeData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(officeData),
    });

    if (res.code === 1000) {
      const index = offices.value.findIndex((e) => e.id === officeData.id);
      if (index !== -1) {
        offices.value[index] = {...offices.value[index], ...res.result};
      }
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Cập nhật văn phòng thất bại');
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
    <h2 class="text-lg font-semibold">Danh sách văn phòng</h2>
    <el-button type="primary" :icon="Plus" @click="openAddModal">Thêm văn phòng</el-button>
  </div>
  <TableOffice :offices="offices" :companyId="companyId" :loading="loading" @edit="openEditModal" @delete="handleDeleteOffice"/>
  <ModalOffice v-if="showModal" :mode="modalMode" :companyId="companyId!" :office="selectedOffice" @close="closeModal" @addOffice="handleAddOffice" @updateOffice="handleUpdateOffice"/>
</section>
</template>

<style scoped>

</style>