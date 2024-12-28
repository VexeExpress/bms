<script setup lang="ts">
import type {OfficeType} from "~/components/Office/OfficeType";
import {ref} from "vue";

const props = defineProps({
  mode: {
    type: String as PropType<'add' | 'edit'>,
    required: true,
  },
  office: {
    type: Object as PropType<OfficeType | null>,
    default: null,
  },
  companyId: {
    type: Number,
    required: true,
  },
});
const visible = ref(true);
const emit = defineEmits(['close', 'addOffice', 'updateOffice']);
const defaultOffice: OfficeType = {
  id: 0,
  officeName: '',
  officeCode: '',
  status: true,
  phone: '',
  address: '',
  companyId: props.companyId
}
const office = ref<OfficeType>({
  ...defaultOffice,
  ...(props.mode === 'edit' && props.office ? props.office : {}),
});
watch(
    () => props.office,
    (newOffice) => {
      if (props.mode === 'edit' && newOffice) {
        office.value = { ...newOffice };
      }
    }
);
const modalTitle = computed(() => (props.mode === 'add' ? 'Thêm văn phòng' : 'Chỉnh sửa thông tin văn phòng'));
const closeModal = () => {
  visible.value = false;
  emit('close');
};
const handleSubmit = () => {
  if (props.mode === 'add') {
    emit('addOffice', office.value);
  } else {
    emit('updateOffice', office.value);
  }
  closeModal();
};
</script>

<template>
  <el-dialog v-model="visible" :show-close="false" class="custom-modal">
    <template #title>
      <div class="p-2 text-[17px] font-semibold text-white bg-[#0072bc]">
        {{ modalTitle }}
      </div>
    </template>
    <el-form :model="office" label-width="130px" class="px-[16px]">
      <el-row class="mt-3">
        <el-col :span="12"><div class="grid-content " />
          <el-form-item label="Tên văn phòng" prop="name">
            <el-input v-model="office.officeName" placeholder="Nhập tên văn phòng" />
          </el-form-item>
          <el-form-item label="Số điện thoại" prop="name">
            <el-input v-model="office.phone" placeholder="Nhập số điện thoại" />
          </el-form-item>

        </el-col>
        <el-col :span="12"><div class="grid-content " />
          <el-form-item label="Mã văn phòng" prop="name">
            <el-input v-model="office.officeCode" placeholder="Nhập mã văn phòng" />
          </el-form-item>
          <el-form-item label="Trạng thái" prop="status">
            <el-switch v-model="office.status" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Địa chỉ" prop="name">
        <el-input v-model="office.address" placeholder="Nhập địa chỉ" />
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