<script setup lang="ts">
import type {SeatMapType} from "~/components/Seat/SeatType";
import {computed, ref} from "vue";
import {Operation} from "@element-plus/icons-vue";

const props = defineProps<{
  seatMap: SeatMapType[];
  loading: boolean;
}>();
const emit = defineEmits(['edit', 'delete']);
const search = ref('');
const filterTableData = computed(() =>
    props.seatMap.filter(
        (data) =>
            !search.value ||
            data.name?.toLowerCase().includes(search.value.toLowerCase())
    )
);
const handleEdit = (row: SeatMapType) => {
  console.log('handleEdit', row);
  emit('edit', row);
};
const handleDelete = (row: SeatMapType) => {
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
    <el-table-column label="Tên sơ đồ" prop="name" />
    <el-table-column label="Loại xe">
      <template #default="{ row }">
        {{row.floor}} tầng
      </template>
    </el-table-column>

    <el-table-column >
      <template #header>
        <el-input v-model="search" size="small" placeholder="Tìm sơ đồ" />
      </template>
      <template #default="{ row }">
        <el-dropdown trigger="click">
          <el-button type="primary" size="small" :icon="Operation" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleEdit(row)">Chỉnh sửa</el-dropdown-item>
              <el-dropdown-item @click="handleDelete(row)">Xoá sơ đồ</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>