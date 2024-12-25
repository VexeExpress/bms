<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue";
import TableEmployee from "~/components/Employee/TableEmployee.vue";
import type {EmployeeType} from "~/components/Employee/EmployeeType";
import ModalEmployee from "~/components/Employee/ModalEmployee.vue";
import {ElMessage} from "element-plus";
const employees = ref<EmployeeType[]>([]);
const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;
onMounted(async () => {
  try {
    const res = await $fetch<{ code: number, result: EmployeeType[] }>(`${config.public.apiUrl}/employee/list-employee/1`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.code === 1000) {
      employees.value = res.result;
      console.log('Fetched employees:', employees.value);
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
const handleSaveEmployee = async (employeeData: EmployeeType) => {
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
  } catch (err) {
    console.error('Error saving employee:', err);
    ElMessage.error( 'Lỗi hệ thống, vui lòng thử lại sau');
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
  } catch (err) {
    console.error('Error updating employee:', err);
    ElMessage.error('Lỗi hệ thống, vui lòng thử lại sau');
  }
};
</script>
<template>
  <section>
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Danh sách nhân viên</h2>
      <el-button type="primary" :icon="Plus" @click="openAddModal">Thêm nhân viên</el-button>
    </div>
    <TableEmployee :employees="employees" :loading="loading" @edit="openEditModal" />
    <ModalEmployee v-if="showModal" :mode="modalMode" :employee="selectedEmployee" @close="closeModal" @saveEmployee="handleSaveEmployee" @updateEmployee="handleUpdateEmployee"/>
  </section>
</template>
