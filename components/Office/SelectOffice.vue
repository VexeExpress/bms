<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const value = ref(null)

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
const router = useRouter();

const startWorking = () => {
  router.push('/ticket')
};
</script>

<template>
  <el-select
      v-model="value"
      placeholder="Chọn văn phòng làm việc"
      size="large"
      style="width: 250px"
  >
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
    />
  </el-select>
  <el-button type="primary" class="button-start" @click="startWorking">Bắt đầu làm việc</el-button>
<!--  <el-button type="primary" class="button-start" :disabled="!value" @click="startWorking">Bắt đầu làm việc</el-button>-->
</template>

<style scoped>
.button-start {
  margin-top: 20px;
  width: 250px;
}
</style>