<script setup lang="ts">
import { computed, ref } from 'vue'
import type {EmployeeType} from "~/components/Employee/EmployeeType";
import {Operation} from "@element-plus/icons-vue";
const getRoleName = (role: string) => {
  switch (role) {
    case "ADMIN_APP":
      return 'VinaHome Support';
    case 'EMPLOYEE':
      return 'Nhân viên';
    case 'ADMIN':
      return 'Admin nhà xe';
    case 'DRIVER':
      return 'Tài xế'
    case 'ASSISTANT':
      return 'Phụ xe'
    default:
      return role;
  }
};

const getRoleTagType = (role: string) => {
  switch (role) {
    case 'ADMIN_APP':
      return 'danger';
    case 'EMPLOYEE':
      return 'success';
    case 'ADMIN':
      return 'primary';
    case 'DRIVER':
      return 'warning';
    case 'ASSISTANT':
      return 'info';
    default:
      return 'default';
  }
};

const props = defineProps<{
  employees: EmployeeType[];
  loading: boolean;
}>();


const emit = defineEmits(['edit', 'delete', 'lock', 'changePassword']);
const search = ref('');

const filterTableData = computed(() =>
    props.employees.filter(
        (data) =>
            !search.value ||
            data.fullName?.toLowerCase().includes(search.value.toLowerCase()) ||
            data.phone?.toLowerCase().includes(search.value.toLowerCase())
    )
);

const handleEdit = (row: EmployeeType) => {
  emit('edit', row);
};
const handleDelete = (row: EmployeeType) => {
  emit('delete', row);
}
const handleLockAccount = (row: EmployeeType) => {
  emit('lock', row);
}
const handleChangePassword = (row: EmployeeType) => {
  emit('changePassword', row);
}


</script>

<template>
  <el-table v-loading="loading" :data="filterTableData" style="width: 100%" class="mt-5" >
    <el-table-column label="STT" width="50">
      <template #default="{ row, $index }">
        {{ $index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="Tên nhân viên" prop="fullName" />
    <el-table-column label="Số điện thoại" prop="phone" />
    <el-table-column label="Giới tính" prop="gender">
      <template #default="scope">
        <el-tag
            :type="scope.row.gender === 1 ? 'success' : scope.row.gender === 2 ? 'warning' : 'info'"
            disable-transitions
        >
          {{ scope.row.gender === 1 ? 'Nam' : scope.row.gender === 2 ? 'Nữ' : 'Khác' }}
        </el-tag>
      </template>
    </el-table-column>


    <el-table-column label="Tài khoản" prop="username" />
    <el-table-column label="Vai trò" prop="roles">
      <template #default="scope">
        <div >
          <el-tag
              v-for="(role, index) in scope.row.roles"
              :key="index"
              :type="getRoleTagType(role)"
              disable-transitions
              class="m-[2px]"
          >
            {{ getRoleName(role) }}
          </el-tag>
        </div>
      </template>
    </el-table-column>


    <el-table-column label="Trạng thái" prop="status">
      <template #default="scope">
        <el-tag
            :type="scope.row.status ? 'success' : 'danger'"
            disable-transitions
        >
          {{ scope.row.status ? 'Đang hoạt động' : 'Ngưng hoạt động' }}
        </el-tag>
      </template>
    </el-table-column>




    <el-table-column >
      <template #header>
        <el-input v-model="search" size="small" placeholder="Tìm nhân viên" />
      </template>

      <template #default="{ row }">
        <el-dropdown trigger="click">
          <el-button type="primary" size="small" :icon="Operation" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleEdit(row)">Chỉnh sửa</el-dropdown-item>
              <el-dropdown-item @click="handleLockAccount(row)">Khoá tài khoản</el-dropdown-item>
              <el-dropdown-item @click="handleChangePassword(row)">Đặt lại mật khẩu</el-dropdown-item>
              <el-dropdown-item divided @click="handleDelete(row)">Xoá tài khoản</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>