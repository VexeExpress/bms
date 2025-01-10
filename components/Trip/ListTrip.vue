<script setup lang="ts">
import {Plus} from "@element-plus/icons-vue";
import type {TripDataType} from "~/components/Trip/TripType";
import {formatTime} from "~/utils/formatTime";

const props = defineProps<{
  trips: TripDataType[];
  loading: boolean;
}>();
const emit = defineEmits<{
  (event: 'selectTrip', trip: TripDataType): void;
}>();
const selectTrip = (trip: TripDataType) => {
  emit('selectTrip', trip);
};
</script>
<template>
  <div class=" ">
    <div v-if="props.loading" v-loading="props.loading" class="flex justify-center items-center min-h-[50px]">

    </div>
    <div class="grid grid-cols-4 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
      <div
          v-if="!props.loading"
          v-for="(item, index) in props.trips"
          :key="index"
          @click="selectTrip(item)"
          class="bg-white rounded-md shadow-sm border border-gray-300 min-w-[150px] overflow-hidden text-ellipsis">

        <div class="bg-fuchsia-300 px-1 py-[1px] flex justify-between">
          <span class="font-semibold">{{ formatTime(item.timeDeparture) }}</span>
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
          <span class="text-[10px]">{{ item.licensePlate }}</span>
          <span class="text-[10px]">{{ item.seatChartName }}</span>
        </div>
      </div>

      <div v-if="!props.loading" class="bg-white rounded-md shadow-sm border border-gray-300 min-w-[150px] overflow-hidden text-ellipsis flex justify-center items-center min-h-[50px]">
        <el-icon style="font-size: 36px"><Plus /></el-icon>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>