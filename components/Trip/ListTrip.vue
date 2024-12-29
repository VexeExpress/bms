<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue";
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 5', 'Item 5', 'Item 5', 'Item 5', 'Item 5'];
</script>
<template>
  <div class=" ">
    <div class="grid grid-cols-4 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      <div
          v-for="(item, index) in items"
          :key="index"
          class="bg-white rounded-md shadow-sm border border-gray-300 min-w-[150px] overflow-hidden text-ellipsis">

        <div class="bg-fuchsia-300 px-1 py-[1px] flex justify-between">
          <span class="font-semibold">16:00</span>
          <span class="font-semibold">24/36</span>
        </div>

        <div class="px-1">
          <span class="text-[10px]">
            [T]: Đặng Tuấn Thành
          </span>
          <span class="text-[10px]">
            [P]: Đặng Tuấn Thành, Đặng Tuấn Thành
          </span>
        </div>

        <div class=" px-1 py-[1px] flex justify-between">
          <span class="text-[10px]">51B-292.63</span>
          <span class="text-[10px]">Limousine 36 phòng</span>
        </div>
      </div>

      <div class="bg-white rounded-md shadow-sm border border-gray-300 min-w-[150px] overflow-hidden text-ellipsis flex justify-center items-center min-h-[50px]">
        <el-icon style="font-size: 36px"><Plus /></el-icon>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>