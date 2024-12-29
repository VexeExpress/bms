<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue";
import TableEmployee from "~/components/Employee/TableEmployee.vue";
import type {EmployeeType} from "~/components/Employee/EmployeeType";
import ModalEmployee from "~/components/Employee/ModalEmployee.vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "~/store/userStore";
const userStore = useUserStore();
const companyId = userStore.userData?.companyId;
const employees = ref<EmployeeType[]>([]);
const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;

onMounted(async () => {
  if (!companyId) {
    console.error('Company ID is missing or invalid');
    return;
  }
  try {
    const res = await $fetch<{ code: number, message: string, result: EmployeeType[] }>(`${config.public.apiUrl}/employee/list-employee/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.code === 1000) {
      employees.value = res.result;
      console.log('Fetched employees:', employees.value);
      ElMessage.success(res.message);
    } else {
      console.error('API returned an error:', res.code);
    }
  } catch (err) {
    console.error('Error fetching employees:', err);
  } finally {
    loading.value = false;
  }
});
const showModal = ref(false);
const modalMode = ref<'add' | 'edit'>('add');
const selectedEmployee = ref(null);
const openAddModal = () => {
  modalMode.value = 'add';
  selectedEmployee.value = null;
  showModal.value = true;
};
const openEditModal = (employee: any) => {
  modalMode.value = 'edit';
  selectedEmployee.value = employee;
  showModal.value = true;
};
const closeModal = () => {
  showModal.value = false;
};
const handleAddEmployee = async (employeeData: EmployeeType) => {
  try {
    console.log('Thêm mới nhân viên:', employeeData);
    const res = await $fetch<{
      code: number;
      message: string;
      result: EmployeeType;
    }>(`${config.public.apiUrl}/employee/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (res.code === 1000) {
      employees.value.push(res.result);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Thêm nhân viên mới thất bại');
    }
  } catch (err: any) {
    console.error('Error saving employee:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
};
const handleUpdateEmployee = async (employeeData: EmployeeType) => {
  try {
    console.log('Cập nhật nhân viên:', employeeData);

    const res = await $fetch<{
      code: number;
      message: string;
      result: EmployeeType;
    }>(`${config.public.apiUrl}/employee/update/${employeeData.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData),
    });

    if (res.code === 1000) {
      const index = employees.value.findIndex((e) => e.id === employeeData.id);
      if (index !== -1) {
        employees.value[index] = { ...employees.value[index], ...res.result };
      }
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Cập nhật nhân viên thất bại');
    }
  } catch (err: any) {
    console.error('Error updating employee:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
};
const handleDeleteEmployee = async (employeeData: EmployeeType) => {
  try {
    console.log('Xoá nhân viên:', employeeData);

    const res = await $fetch<{
      code: number;
      message: string;
    }>(`${config.public.apiUrl}/employee/delete/${employeeData.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData.id),
    });

    if (res.code === 1000) {
      employees.value = employees.value.filter(employee => employee.id !== employeeData.id);
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Xoá nhân viên thất bại');
    }
  } catch (err: any) {
    console.error('Error updating employee:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
};
const handleLockAccount = async (employeeData: EmployeeType) => {
  try {
    console.log('Khoá tài khoản:', employeeData);
    const res = await $fetch<{
      code: number;
      message: string;
    }>(`${config.public.apiUrl}/employee/lock/${employeeData.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData.id),
    });
    if (res.code === 1000) {
      const index = employees.value.findIndex(emp => emp.id === employeeData.id);
      if (index !== -1) {
        employees.value[index] = { ...employees.value[index], status: false };
      }
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Khoá tài khoản thất bại');
    }
  } catch (err: any) {
    console.error('Error lock account employee:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
};
const handleChangePassword = async (employeeData: EmployeeType) => {
  try {
    const res = await $fetch<{
      code: number;
      message: string;
    }>(`${config.public.apiUrl}/employee/change-password/${employeeData.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employeeData.id),
    });
    if (res.code === 1000) {
      ElMessage.success(res.message);
    } else {
      ElMessage.error(res.message || 'Thay đổi mật khẩu tài khoản thất bại');
    }
  } catch (err: any) {
    console.error('Error change password employee:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  }
};
</script>
<template>
  <section class="m-[20px]">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Danh sách nhân viên</h2>
      <el-button type="primary" :icon="Plus" @click="openAddModal">Thêm nhân viên</el-button>
    </div>
    <TableEmployee :employees="employees" :loading="loading" @edit="openEditModal" @delete="handleDeleteEmployee" @lock="handleLockAccount" @changePassword="handleChangePassword"/>
    <ModalEmployee v-if="showModal" :mode="modalMode" :companyId="companyId!" :employee="selectedEmployee" @close="closeModal" @saveEmployee="handleAddEmployee" @updateEmployee="handleUpdateEmployee"/>
  </section>
</template>
