<script setup lang="ts">
import type {OfficeType} from "~/components/Office/OfficeType";
import type {RouteType} from "~/components/Route/RouteType";
import {ref} from "vue";

const props = defineProps({
  mode: {
    type: String as PropType<'add' | 'edit'>,
    required: true,
  },
  route: {
    type: Object as PropType<RouteType | null>,
    default: null,
  },
  companyId: {
    type: Number,
    required: true,
  },
});
const visible = ref(true);
const emit = defineEmits(['close', 'add', 'update']);
const defaultData: RouteType = {
  id: 0,
  routeName: '',
  routeNameShort: '',
  displayPrice: 0,
  status: true,
  note: '',
  displayOrder: 0,
  companyId: props.companyId
}
const route = ref<RouteType>({
  ...defaultData,
  ...(props.mode === 'edit' && props.route ? props.route : {}),
});
watch(
    () => props.route,
    (newData) => {
      if (props.mode === 'edit' && newData) {
        route.value = { ...newData };
      }
    }
);
const modalTitle = computed(() => (props.mode === 'add' ? 'Thêm tuyến' : 'Chỉnh sửa thông tin tuyến'));
const closeModal = () => {
  visible.value = false;
  emit('close');
};
const handleSubmit = () => {
  if (props.mode === 'add') {
    emit('add', route.value);
  } else {
    emit('update', route.value);
  }
  closeModal();
};
function parseCurrency(value: string): number | '' {
  if (value.trim() === '') return ''; // Trả về rỗng khi không có gì nhập
  return parseFloat(value.replace(/[^\d]/g, "")) || 0; // Chuyển chuỗi thành số
}
function displayAsNumber(value: number | string): string {
  if (value === '' || value == null) return ''; // Giữ nguyên giá trị rỗng
  return new Intl.NumberFormat("vi-VN").format(Number(value));
}
</script>

<template>
  <el-dialog v-model="visible" :show-close="false" class="custom-modal">
    <template #title>
      <div class="p-2 text-[17px] font-semibold text-white bg-[#0072bc]">
        {{ modalTitle }}
      </div>
    </template>
    <el-form :model="route" label-width="130px" class="px-[16px]">
      <el-row class="mt-3">
        <el-col :span="12">
          <el-form-item label="Tên tuyến" prop="routeName">
            <el-input v-model="route.routeName" placeholder="Nhập tên tuyến" />
          </el-form-item>
          <el-form-item label="Tên tuyến rút gọn" prop="routeNameShort">
            <el-input v-model="route.routeNameShort" placeholder="Nhập tên tuyến rút gọn" />
          </el-form-item>

        </el-col>
        <el-col :span="12"><div class="grid-content " />
          <el-form-item label="Giá cơ bản" prop="displayPrice">
            <el-input v-model.number="route.displayPrice" placeholder="0" :parser="parseCurrency" :formatter="displayAsNumber"/>
          </el-form-item>
          <el-form-item label="Trạng thái" prop="status">
            <el-switch v-model="route.status" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Ghi chú" prop="note">
        <el-input v-model="route.note" placeholder="Nhập ghi chú" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="pb-[16px] pr-[16px]">
        <el-button @click="closeModal">Hủy</el-button>
        <el-button type="primary" @click="handleSubmit">
          {{ mode === 'add' ? 'Thêm' : 'Lưu' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>