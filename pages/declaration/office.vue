<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue";
import TableOffice from "~/components/Office/TableOffice.vue";

</script>

<template>
<section>
  <div class="flex items-center justify-between">
    <h2 class="text-lg font-semibold">Danh sách văn phòng</h2>
    <el-button type="primary" :icon="Plus">Thêm văn phòng</el-button>
  </div>
  <TableOffice/>
</section>
</template>

<style scoped>

</style>