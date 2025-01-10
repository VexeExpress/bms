<script setup lang="ts">
import type {TripScheduleType} from "~/components/Trip/TripType";
import {computed, ref} from "vue";
import {Operation} from "@element-plus/icons-vue";
import {formatTime} from "~/utils/formatTime";
import {formatDate} from "~/utils/formatDate";

const props = defineProps<{
  schedules: TripScheduleType[];
  loading: boolean;
}>();
const emit = defineEmits(['edit', 'delete']);
const search = ref('');
const filterTableData = computed(() =>
    props.schedules.filter(
        (data) =>
            !search.value ||
            data.route?.toLowerCase().includes(search.value.toLowerCase())
    )
);
const handleEdit = (row: TripScheduleType) => {
  emit('edit', row);
};
const handleDelete = (row: TripScheduleType) => {
  emit('delete', row);
}
</script>

<template>
  <el-table v-loading="loading" :data="filterTableData" style="width: 100%" class="mt-5" >
    <el-table-column label="STT" width="50">
      <template #default="{ row, $index }">
        {{ $index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="Tuyến" prop="route" />
    <el-table-column label="Giờ khởi hành">
      <template #default="{ row }">
        {{ formatTime(row.valueTime) }}
      </template>
    </el-table-column>
    <el-table-column label="Ngày tạo">
      <template #default="{ row }">
        {{ formatDate(row.createdAt) }}
      </template>
    </el-table-column>
    <el-table-column label="Ngày bắt đầu">
      <template #default="{ row }">
        {{ formatDate(row.valueDateStart) }}
      </template>
    </el-table-column>
    <el-table-column label="Ngày kết thúc">
      <template #default="{ row }">
        {{ row.valueDateEnd ? formatDate(row.valueDateEnd) : "Chưa xác định" }}
      </template>
    </el-table-column>

    <el-table-column label="Sơ đồ" prop="chart" />
    <el-table-column label="Nhân viên sửa" prop="employee" />



    <el-table-column >
      <template #header>
        <el-input v-model="search" size="small" placeholder="Tìm tuyến" />
      </template>
      <template #default="{ row }">
        <el-dropdown trigger="click">
          <el-button type="primary" size="small" :icon="Operation" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleEdit(row)">Chỉnh sửa</el-dropdown-item>
              <el-dropdown-item @click="handleDelete(row)">Xoá lịch</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>