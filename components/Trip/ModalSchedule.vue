<script setup lang="ts">
import type {TripScheduleType} from "~/components/Trip/TripType";
import {ref} from "vue";
import type {RouteNameType} from "~/components/Route/RouteType";
import type {SeatChartNameType} from "~/components/Seat/SeatType";

const props = defineProps({
  mode: {
    type: String as PropType<'add' | 'edit'>,
    required: true,
  },
  schedule: {
    type: Object as PropType<TripScheduleType | null>,
    default: null,
  },
  route: {
    type: Object as PropType<RouteNameType[] | null>,
    required: true,
  },
  chart: {
    type: Object as PropType<SeatChartNameType[] | null>,
    required: true,
  },
  companyId: {
    type: Number,
    required: true,
  },
  employeeId: {
    type: Number,
    required: true,
  },
});
const visible = ref(true);
const emit = defineEmits(['close', 'add', 'update']);
const defaultData: TripScheduleType = {
  id: 0,
  valueTime: '',
  valueRoute: 1,
  valueSeatChart: 1,
  valueDateStart: '',
  valueDateEnd: '',
  valueEnableDateEnd: false,
  companyId: props.companyId,
  employeeId: props.employeeId,
  chart: '',
  route: '',
  employee: '',
  createdAt: '',
}
const schedule = ref<TripScheduleType>({
  ...defaultData,
  ...(props.mode === 'edit' && props.schedule ? props.schedule : {}),
});
watch(
    () => props.schedule,
    (newData) => {
      if (props.mode === 'edit' && newData) {
        schedule.value = { ...newData };
      }
    }
);
const modalTitle = computed(() => (props.mode === 'add' ? 'Thêm lịch chạy' : 'Chỉnh sửa thông tin lịch chạy'));
const closeModal = () => {
  visible.value = false;
  emit('close');
};
const handleSubmit = () => {
  if (props.mode === 'add') {
    emit('add', schedule.value);
  } else {
    emit('update', schedule.value);
  }
  closeModal();
};


const valueDateEnd = ref('')
const valueEnableDateEnd = ref(false)

watch(
    () => schedule.value.valueEnableDateEnd,
    (newVal) => {
      if (!newVal) {
        schedule.value.valueDateEnd = '';
      }
    }
);

</script>

<template>
<el-dialog v-model="visible" :show-close="false" class="custom-modal">
  <template #title>
    <div class="p-2 text-[17px] font-semibold text-white bg-[#0072bc]">
      {{ modalTitle }}
    </div>
  </template>
  <el-form :model="schedule" label-width="130px" class="px-[16px]">
    <h2 class="font-semibold text-[15px] text-black">Thông tin lịch chạy</h2>
    <el-row class="mt-3">
      <el-col :span="12">
        <el-form-item label="Tuyến" prop="routeName">
          <el-select v-model="schedule.valueRoute" placeholder="Chọn tuyến" >
            <el-option
                v-for="item in route"
                :key="item.id"
                :label="item.routeName"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Sơ đồ ghế" prop="routeName">
          <el-select v-model="schedule.valueSeatChart" placeholder="Chọn sơ đồ ghế">
            <el-option
                v-for="item in chart"
                :key="item.id"
                :label="item.name"
                :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Giờ khởi hành" prop="routeName">
          <el-time-select
              v-model="schedule.valueTime"
              style="width: 240px"
              start="00:05"
              step="00:05"
              end="23:55"
              placeholder="Chọn giờ khởi hành"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <h2 class="font-semibold text-[15px] text-black">Thời gian lặp lại lịch</h2>
    <el-row class="mt-3">
      <el-col :span="12">
        <el-form-item label="Ngày bắt đầu" prop="valueDateStart">
          <el-date-picker
              v-model="schedule.valueDateStart"
              type="date"
              placeholder="Chọn ngày"
              format="DD-MM-YYYY"
              value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="Ngày dừng" prop="valueEnableDateEnd">
          <el-switch
              v-model="schedule.valueEnableDateEnd"
              size="large"
              active-text="Đã biết"
              inactive-text="Chưa biết"
          />
        </el-form-item>

        <el-form-item v-if="schedule.valueEnableDateEnd" label="Ngày kết thúc" prop="valueDateEnd">
          <el-date-picker
              v-model="schedule.valueDateEnd"
              type="date"
              placeholder="Ngày kết thúc"
              format="DD-MM-YYYY"
              value-format="YYYY-MM-DD"
          />
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