<script setup lang="ts">
import {
  LocationFilled
} from '@element-plus/icons-vue'
import type {TicketType} from "~/components/Ticket/TicketType";

const props = defineProps<{
  ticket: TicketType;
}>();
</script>

<template>
  <div
      class=" min-h-[70px] p-1 shadow border border-gray-200 rounded text-center text-sm font-medium"
      :style="{
      gridRow: ticket.row,
      gridColumn: ticket.column
    }"
  >
    <div class="flex justify-between items-start">
      <!-- Tên ghế ở góc trên bên trái -->
      <div class="text-left font-semibold text-[16px]">{{ ticket.name }}</div>
      <!-- Số điện thoại ở góc phải -->
      <div class="text-right px-[4px] py-[2px] border rounded border-gray-500" >
        <span class="font-semibold text-[16px]">0877717575</span>
      </div>
    </div>
    <div class="text-left">
      <p class="text-[14px] font-normal flex items-center">
        <el-icon color="red">
          <LocationFilled />
        </el-icon>
        <span>Buôn Ma Thuột</span>
      </p>
      <p class="text-[14px] font-normal flex items-center">
        <el-icon color="#409efc">
          <LocationFilled />
        </el-icon>
        <span>Hồ Chí Minh</span>
      </p>
    </div>
    <div class="text-right font-light text-[12px]">
      <span>(1) {{ ticket.id }}</span>
    </div>
    <div class="text-left font-medium text-[14px] text-[#0072bc]">
      <span>* ghi chú ghi chú ghi chúghi chúghi chúghi chúghi chú</span>
    </div>
    <div class="text-left mt-2">
      <span>250.000</span>
      <span class="px-2">TTTX</span>
    </div>
    <div class="w-full h-[5px] bg-[#0072bc]  rounded"/>
    <div class="text-left text-[12px] font-medium">
      <span>B: Đặng Tuấn Thành </span>/
      <span>VP An Sương</span>
    </div>
  </div>
</template>

<style scoped>

</style>