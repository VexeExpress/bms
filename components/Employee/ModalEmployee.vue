<script setup lang="ts">
import { ref } from 'vue';
import type {EmployeeType} from "~/components/Employee/EmployeeType";

const props = defineProps({
  mode: {
    type: String as PropType<'add' | 'edit'>,
    required: true,
  },
  employee: {
    type: Object as PropType<EmployeeType | null>,
    default: null,
  },
  companyId: {
    type: Number,
    required: true,
  },
});
const visible = ref(true);
const emit = defineEmits(['close', 'saveEmployee', 'updateEmployee']);


const defaultEmployee: EmployeeType = {
  id: 0,
  accessBms: false,
  accessCms: false,
  accessTms: false,
  username: '',
  roles: [],
  fullName: '',
  phone: '',
  startDate: '',
  birthDate: '',
  password: '',
  gender: 1,
  email: '',
  address: '',
  status: true,
  companyId: props.companyId,
};


const employee = ref<EmployeeType>({
  ...defaultEmployee,
  ...(props.mode === 'edit' && props.employee ? props.employee : {}),
});


watch(
    () => props.employee,
    (newEmployee) => {
      if (props.mode === 'edit' && newEmployee) {
        employee.value = { ...newEmployee };
      }
    }
);



const modalTitle = computed(() => (props.mode === 'add' ? 'Thêm nhân viên' : 'Chỉnh sửa thông tin nhân viên'));

const closeModal = () => {
  visible.value = false;
  emit('close');
};
const handleSubmit = () => {
  if (props.mode === 'add') {
    emit('saveEmployee', employee.value);
  } else {
    emit('updateEmployee', employee.value);
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
    <el-form :model="employee" label-width="130px" class="px-[16px]">
      <h2 class="font-semibold text-lg">Thông tin nhân viên</h2>
      <el-row class="mt-3">
        <el-col :span="12"><div class="grid-content " />
          <el-form-item label="Tên nhân viên" prop="name">
            <el-input v-model="employee.fullName" placeholder="Nhập tên nhân viên" />
          </el-form-item>
          <el-form-item label="Số điện thoại" prop="name">
            <el-input v-model="employee.phone" placeholder="Nhập số điện thoại" />
          </el-form-item>
          <el-form-item label="Email" prop="name">
            <el-input v-model="employee.email" placeholder="Nhập email" />
          </el-form-item>
          <el-form-item label="Địa chỉ" prop="name">
            <el-input v-model="employee.address" placeholder="Nhập địa chỉ" />
          </el-form-item>
        </el-col>
        <el-col :span="12"><div class="grid-content " />
          <el-form-item prop="birthDate" label="Ngày sinh">
            <el-date-picker
                v-model="employee.birthDate"
                type="date"
                aria-label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
            />
          </el-form-item>
          <el-form-item prop="startDate" label="Ngày làm việc">
            <el-date-picker
                v-model="employee.startDate"
                type="date"
                aria-label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="Giới tính" prop="gender">
            <el-radio-group v-model="employee.gender">
              <el-radio :value="1">Nam</el-radio>
              <el-radio :value="2">Nữ</el-radio>
              <el-radio :value="3">Khác</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-col>
      </el-row>
      <h2 class="font-semibold text-lg">Thông tin tài khoản</h2>
      <el-row class="mt-3">
        <el-col :span="12"><div class="grid-content " />
          <el-form-item label="Tài khoản" prop="username">
            <el-input v-model="employee.username" placeholder="Nhập tài khoản" />
          </el-form-item>
          <el-form-item label="Mật khẩu" prop="password" v-if="mode === 'add'">
            <el-input v-model="employee.password" placeholder="Nhập mật khẩu" />
          </el-form-item>
          <el-form-item label="Trạng thái" prop="status">
            <el-switch v-model="employee.status" />
          </el-form-item>
        </el-col>
        <el-col :span="12"><div class="grid-content " />
          <el-form-item label="Vai trò" prop="roles">
            <el-select v-model="employee.roles" multiple placeholder="Chọn vai trò">
              <el-option label="Tài xế" value="DRIVER" />
              <el-option label="Phụ xe" value="ASSISTANT" />
              <el-option label="Nhân viên" value="EMPLOYEE" />
              <el-option label="Quản trị viên" value="ADMIN" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <h2 class="font-semibold text-lg">Quyền truy cập</h2>
      <el-row class="mt-3 mb-5">
        <el-col :span="8">
          <el-form-item label="Phần mềm Quản lý nhà xe (BMS)" prop="accessBms">
            <el-switch v-model="employee.accessBms" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Phần mềm Quản lý hàng hoá (CMS)" prop="accessCms">
            <el-switch v-model="employee.accessCms" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Phần mềm Quản lý bán vé (TMS)" prop="accessTms">
            <el-switch v-model="employee.accessTms" />
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



