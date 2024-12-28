<script setup lang="ts">
import type {RouteType} from "~/components/Route/RouteType";
import {computed, ref} from "vue";
import {Operation} from "@element-plus/icons-vue";
import {formatCurrency} from "../../utils/formatCurrency";

const props = defineProps<{
  routes: RouteType[];
  loading: boolean;
}>();
const emit = defineEmits(['edit', 'delete']);
const search = ref('');
const filterTableData = computed(() =>
    props.routes.filter(
        (data) =>
            !search.value ||
            data.routeName?.toLowerCase().includes(search.value.toLowerCase()) ||
            data.routeNameShort?.toLowerCase().includes(search.value.toLowerCase())
    )
);
const handleEdit = (row: RouteType) => {
  emit('edit', row);
};
const handleDelete = (row: RouteType) => {
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
    <el-table-column label="Tên tuyến" prop="routeName" />
    <el-table-column label="Tên tuyến rút gọn" prop="routeName" />
    <el-table-column label="Giá vé cơ bản">
      <template #default="{ row }">
        {{ formatCurrency(row.displayPrice) }}
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
        <el-input v-model="search" size="small" placeholder="Tìm tuyến" />
      </template>
      <template #default="{ row }">
        <el-dropdown trigger="click">
          <el-button type="primary" size="small" :icon="Operation" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleEdit(row)">Chỉnh sửa</el-dropdown-item>
              <el-dropdown-item >Cấu hình lộ trình</el-dropdown-item>
              <el-dropdown-item @click="handleDelete(row)">Xoá tuyến</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>