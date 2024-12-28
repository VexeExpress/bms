<script setup lang="ts">
import type {VehicleType} from "~/components/Vehicle/VehicleType";
import {computed, ref} from "vue";
import {Operation} from "@element-plus/icons-vue";

const props = defineProps<{
  vehicles: VehicleType[];
  loading: boolean;
}>();
const emit = defineEmits(['edit', 'delete']);
const search = ref('');
const filterTableData = computed(() =>
    props.vehicles.filter(
        (data) =>
            !search.value ||
            data.licensePlate?.toLowerCase().includes(search.value.toLowerCase()) ||
            data.phone?.toLowerCase().includes(search.value.toLowerCase())
    )
);
const handleEdit = (row: VehicleType) => {
  emit('edit', row);
};
const handleDelete = (row: VehicleType) => {
  emit('delete', row);
}
const getStatusTagType = (status: number) => {
  switch (status) {
    case 1:
      return 'primary'
    case 2:
      return 'warning'
    case 3:
      return 'info'
    default:
      return 'default'
  }
}
const getStatus = (status: number) => {
  switch (status) {
    case 1:
      return 'Đang sử dụng'
    case 2:
      return 'Đang bảo trì'
    case 3:
      return 'Ngưng hoạt động'
    default:
        return status;
  }
}
const getTypeVehicleTag = (typeVehicle: number) => {
  switch (typeVehicle) {
    case 1:
      return 'success'
    case 2:
      return 'info'
    case 3:
      return 'warning'
    case 4:
      return 'danger'
    case 5:
      return 'warning'
    default:
      return 'default'
  }
}
const getTypeVehicle = (typeVehicle: number) => {
  switch (typeVehicle) {
    case 1:
      return 'Giường nằm'
    case 2:
      return 'Ghế ngồi'
    case 3:
      return 'Ghế ngồi limousine'
    case 4:
      return 'Giuờng nằm limousine'
    case 5:
      return 'Phòng VIP (Cabin)'
    default:
      return typeVehicle
  }
}
</script>

<template>
  <el-table v-loading="loading" :data="filterTableData" style="width: 100%" class="mt-5">
    <el-table-column label="STT" width="50">
      <template #default="{ row, $index }">
        {{ $index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="Biển số xe" prop="licensePlate" />
    <el-table-column label="Số điện thoại" prop="phone" />
    <el-table-column label="Loại xe" prop="typeVehicle" >
      <template #default="scope">
        <div>
          <el-tag
              :type="getTypeVehicleTag(scope.row.typeVehicle)"
              disable-transitions
              class="m-[2px]"
          >
            {{ getTypeVehicle(scope.row.typeVehicle) }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Tình trạng" prop="status">
      <template #default="scope">
        <div>
          <el-tag
              :type="getStatusTagType(scope.row.status)"
              disable-transitions
              class="m-[2px]"
          >
            {{ getStatus(scope.row.status) }}
          </el-tag>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Hạn đăng kiểm" prop="registrationPeriod" />
    <el-table-column label="Ghi chú" prop="note" />
    <el-table-column >
      <template #header>
        <el-input v-model="search" size="small" placeholder="Tìm phương tiện" />
      </template>
      <template #default="{ row }">
        <el-dropdown trigger="click">
          <el-button type="primary" size="small" :icon="Operation" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleEdit(row)">Chỉnh sửa</el-dropdown-item>
              <el-dropdown-item @click="handleDelete(row)">Xoá phương tiện</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>