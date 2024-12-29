<script setup lang="ts">
import ListTrip from "~/components/Trip/ListTrip.vue";

const value_date = ref('')
const value_route = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Sài Gòn - Buôn Ma Thuột',
  },

]
</script>

<template>
  <section class="w-full px-2 flex items-center space-x-6">
    <el-button color="#626aef">Hôm nay</el-button>
    <el-date-picker
        v-model="value_date"
        type="date"
        placeholder="Chọn ngày"
        style="width: 140px"
        format="DD-MM-YYYY"
        value-format="YYYY-MM-DD"
    />
    <el-select
        v-model="value_route"
        placeholder="Chọn tuyến"
        style="width: 240px"

    >
      <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </section>
  <section class="px-2 py-2">
    <ListTrip/>
  </section>



</template>

<style scoped>

</style>