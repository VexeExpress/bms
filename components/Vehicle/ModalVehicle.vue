<script setup lang="ts">
import type {OfficeType} from "~/components/Office/OfficeType";
import type {VehicleType} from "~/components/Vehicle/VehicleType";
import {ref} from "vue";
import type {EmployeeType} from "~/components/Employee/EmployeeType";

const props = defineProps({
  mode: {
    type: String as PropType<'add' | 'edit'>,
    required: true,
  },
  vehicle: {
    type: Object as PropType<VehicleType | null>,
    default: null,
  },
  companyId: {
    type: Number,
    required: true,
  },
});
const visible = ref(true);
const emit = defineEmits(['close', 'addVehicle', 'updateVehicle']);
const defaultVehicle: VehicleType = {
  id: 0,
  companyId: props.companyId,
  licensePlate: '',
  note: '',
  phone: '',
  typeVehicle: 1,
  registrationPeriod: '',
  status: 1,
  color: '',
  maintenancePeriod: '',
  brand: 1,
}
const vehicle = ref<VehicleType>({
  ...defaultVehicle,
  ...(props.mode === 'edit' && props.vehicle ? props.vehicle : {}),
});
watch(
    () => props.vehicle,
    (newVehicle) => {
      if (props.mode === 'edit' && newVehicle) {
        vehicle.value = { ...newVehicle };
      }
    }
);
const modalTitle = computed(() => (props.mode === 'add' ? 'Thêm phương tiện' : 'Chỉnh sửa thông tin phương tiện'));
const closeModal = () => {
  visible.value = false;
  emit('close');
};
const handleSubmit = () => {
  if (props.mode === 'add') {
    emit('addVehicle', vehicle.value);
  } else {
    emit('updateVehicle', vehicle.value);
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
    <el-form :model="vehicle" label-width="130px" class="px-[16px]">
      <el-row class="mt-3">
        <el-col :span="12"><div class="grid-content " />
          <el-form-item label="Biển số xe" prop="licensePlate">
            <el-input v-model="vehicle.licensePlate" placeholder="Nhập biển số xe" />
          </el-form-item>
          <el-form-item label="Số điện thoại xe" prop="phone">
            <el-input v-model="vehicle.phone" placeholder="Nhập số điện thoại xe" />
          </el-form-item>
          <el-form-item label="Loại xe" prop="typeVehicle">
            <el-select v-model="vehicle.typeVehicle" placeholder="Chọn loại xe">
              <el-option label="Giường nằm" :value="1" />
              <el-option label="Ghế ngồi" :value="2" />
              <el-option label="Ghế ngồi limousine" :value="3" />
              <el-option label="Giuờng nằm limousine" :value="4" />
              <el-option label="Phòng VIP (Cabin)" :value="5" />
            </el-select>
          </el-form-item>
          <el-form-item label="Tình trạng" prop="status">
            <el-select v-model="vehicle.status" placeholder="Chọn tình trạng">
              <el-option label="Đang sử dụng" :value="1" />
              <el-option label="Đang bảo trì" :value="2" />
              <el-option label="Ngưng hoạt động" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="Hãng xe" prop="brand">
            <el-select v-model="vehicle.brand" placeholder="Chọn hãng xe">
              <el-option label="Thaco" :value="1" />
              <el-option label="Hyundai" :value="2" />
              <el-option label="Samco" :value="3" />
              <el-option label="Mercedes-Benz" :value="4" />
              <el-option label="Kim Long" :value="6" />
              <el-option label="Tracomeco" :value="7" />
              <el-option label="Daewoo" :value="8" />
              <el-option label="Kia" :value="9" />
              <el-option label="Ford" :value="5" />
              <el-option label="Khác" :value="10" />
            </el-select>
          </el-form-item>


        </el-col>
        <el-col :span="12"><div class="grid-content " />
          <el-form-item prop="registrationPeriod" label="Hạn đăng kiểm">
            <el-date-picker
                v-model="vehicle.registrationPeriod"
                type="date"
                aria-label="Hạn đăng kiểm"
                placeholder="Hạn đăng kiểm"
                style="width: 100%"
            />
          </el-form-item>
          <el-form-item prop="maintenancePeriod" label="Hạn bảo dưỡng">
            <el-date-picker
                v-model="vehicle.maintenancePeriod"
                type="date"
                aria-label="Hạn bảo dưỡng"
                placeholder="Hạn bảo dưỡng"
                style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="Màu sắc" prop="color">
            <el-input v-model="vehicle.color" placeholder="Nhập màu xe" />
          </el-form-item>
          <el-form-item label="Ghi chú" prop="note">
            <el-input v-model="vehicle.note" placeholder="Nhập ghi chú" />
          </el-form-item>

        </el-col>
      </el-row>
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