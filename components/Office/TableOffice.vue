<script setup lang="ts">
import type {OfficeType} from "~/components/Office/OfficeType";
import {computed, ref} from "vue";
import {Operation} from "@element-plus/icons-vue";

const props = defineProps<{
  offices: OfficeType[];
  loading: boolean;
}>();
const emit = defineEmits(['edit', 'delete']);
const search = ref('');
const filterTableData = computed(() =>
    props.offices.filter(
        (data) =>
            !search.value ||
            data.officeName?.toLowerCase().includes(search.value.toLowerCase()) ||
            data.phone?.toLowerCase().includes(search.value.toLowerCase())
    )
);
const handleEdit = (row: OfficeType) => {
  emit('edit', row);
};
const handleDelete = (row: OfficeType) => {
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
    <el-table-column label="Tên văn phòng" prop="officeName" />
    <el-table-column label="Mã văn phòng" prop="officeCode" />
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
    <el-table-column label="Số điện thoại" prop="phone" />
    <el-table-column label="Địa chỉ" prop="address" />
    <el-table-column >
      <template #header>
        <el-input v-model="search" size="small" placeholder="Tìm văn phòng" />
      </template>
      <template #default="{ row }">
        <el-dropdown trigger="click">
          <el-button type="primary" size="small" :icon="Operation" circle />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleEdit(row)">Chỉnh sửa</el-dropdown-item>
              <el-dropdown-item @click="handleDelete(row)">Xoá văn phòng</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>