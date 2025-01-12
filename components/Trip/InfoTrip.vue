<script setup lang="ts">
import type {TripDataType} from "~/components/Trip/TripType";
import {formatTime} from "../../utils/formatTime";
import {formatDate} from "../../utils/formatDate";

const activeNames = ref([''])
const props = defineProps<{
  trip: TripDataType;
}>();
</script>

<template>
  <div class="demo-collapse mt-2">
    <el-collapse v-model="activeNames" >
      <el-collapse-item  name="1">
        <template #title>
          <p class="text-black font-semibold">{{ formatTime(trip.timeDeparture)}} <span class="px-1 font-extrabold">•</span> {{formatDate(trip.dateDeparture)}} <span class="px-1 font-extrabold">•</span> {{trip.routeName}}</p>
        </template>
        <el-row :gutter="20">
          <el-col :span="6">
            <p class="text-black text-[14px] font-medium">Biển số: </p>
          </el-col>
          <el-col :span="6">
            <p class="text-black text-[14px] font-medium">Tài xế:</p>
          </el-col>
          <el-col :span="6">
            <p class="text-black text-[14px] font-medium">Tổng vé:</p>
          </el-col>
          <el-col :span="6">
            <p class="text-black text-[14px] font-medium">Số hàng:</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <p class="text-black text-[14px] font-medium">Sơ đồ ghế: <span class="text-[#0072bc]">{{trip.seatChartName}}</span></p>
          </el-col>
          <el-col :span="6">
            <p class="text-black text-[14px] font-medium">Phụ xe:</p>
          </el-col>
          <el-col :span="6">
            <p class="text-black text-[14px] font-medium">Tổng tiền vé:</p>
          </el-col>
          <el-col :span="6">
            <p class="text-black text-[14px] font-medium">Tiền hàng:</p>
          </el-col>
        </el-row>
      </el-collapse-item>


    </el-collapse>
  </div>
</template>

<style scoped>

</style>