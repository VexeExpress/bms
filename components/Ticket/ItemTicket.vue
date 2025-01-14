<script setup lang="ts">
import {
  LocationFilled
} from '@element-plus/icons-vue'
import type {TicketType} from "~/components/Ticket/TicketType";

const props = defineProps<{
  ticket: TicketType;
}>();
const emit = defineEmits(["select"]);
const handleClick = () => {
  emit("select", props.ticket);
  console.log("Select ticket:", props.ticket);
};
</script>

<template>
  <div
      class=" min-h-[90px] p-1 shadow border border-gray-200 rounded text-center text-sm font-medium"
      :style="{
      gridRow: ticket.row,
      gridColumn: ticket.column
    }"
      @click="handleClick"
  >
    <div class="flex justify-between items-start">
      <!-- Tên ghế ở góc trên bên trái -->
      <div class="text-left font-semibold text-[16px]">{{ ticket.name }}</div>
      <!-- Số điện thoại ở góc phải -->
      <div class="text-right px-[4px] py-[2px] border rounded border-gray-500" v-if="ticket.phoneNumber">
        <span class="font-semibold text-[16px]">{{ ticket.phoneNumber }}</span>
      </div>
    </div>
    <div class="text-left" v-if="ticket.bookingStatus">
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
    <div class="text-right font-light text-[12px]" v-if="ticket.bookingStatus">
      <span>(1) {{ ticket.id }}</span>
    </div>
    <div class="text-left font-medium text-[14px] text-[#0072bc]" v-if="ticket.bookingStatus">
      <span>* ghi chú ghi chú ghi </span>
    </div>
    <div class="text-left mt-2" v-if="ticket.bookingStatus">
      <span>250.000</span>
      <span class="px-2">TTTX</span>
    </div>
    <div class="w-full h-[5px] bg-[#0072bc]  rounded" v-if="ticket.bookingStatus"/>
    <div class="text-left text-[12px] font-medium" v-if="ticket.bookingStatus">
      <span>B: Đặng Tuấn Thành </span>/
      <span>VP An Sương</span>
    </div>
  </div>
</template>

<style scoped>

</style>