<script setup lang="ts">
import {ref} from "vue";
import type {SeatMapType, SeatType} from "~/components/Seat/SeatType";


const props = defineProps({
  mode: {
    type: String as PropType<'add' | 'edit'>,
    required: true,
  },
  seatMap: {
    type: Object as PropType<SeatMapType | null>,
    default: null,
  },
  companyId: {
    type: Number,
    required: true,
  },
});
const closeModal = () => {
  visible.value = false;
  emit('close');
};
// const handleSubmit = () => {
//   if (props.mode === 'add') {
//     console.log('data', seatMap)
//     emit('add', seatMap.value);
//   } else {
//     emit('update', seatMap.value);
//   }
//   closeModal();
// };


const visible = ref(true);
const emit = defineEmits(['close', 'add', 'update']);
const modalTitle = computed(() => (props.mode === 'add' ? 'Thêm sơ đồ' : 'Chỉnh sửa thông tin sơ đồ'));

const floors = ref([1, 2, 3]);
const availableColumns = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const availableRows = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

const defaultData: SeatMapType = reactive({
  id: 0,
  floor: 1,
  column: 1,
  name: '',
  row: 1,
  seats: [],
  companyId: props.companyId,
});
const seatMap = ref<SeatMapType>({ ...defaultData });

onMounted(() => {
  if (props.mode === 'edit' && props.seatMap) {
    seatMap.value = { ...defaultData, ...props.seatMap };
  }
})
watch(
    () => props.seatMap,
    (newSeatMap) => {
      if (props.mode === 'edit' && newSeatMap) {
        seatMap.value = { ...defaultData, ...newSeatMap };
      } else if (props.mode === 'add') {
        seatMap.value = { ...defaultData };
      }
    }
);
const displayedColumns = computed(() => Array.from({ length: seatMap.value.column }, (_, i) => i + 1));
const displayedRows = computed(() => Array.from({ length: seatMap.value.row }, (_, i) => i + 1));
const displayedFloors = computed(() => Array.from({ length: seatMap.value.floor }, (_, i) => i + 1));

const getSeatClasses = (rowIndex: number, colIndex: number, currentFloor: number): string => {
  const seat = seatMap.value.seats.find((s) => s.row === rowIndex && s.column === colIndex && s.floor === currentFloor);
  return seat
      ? seat.type
          ? 'bg-green-500'
          : 'bg-red-500'
      : 'bg-blue-500';
};

const getSeatLabel = (rowIndex: number, colIndex: number, currentFloor: number): string => {
  return `${currentFloor}-${colIndex}-${rowIndex}`;
};




const seatNameMap = reactive<Record<string, string>>({});
const seatType = reactive<Record<string, number>>({});



const handleSubmit = () => {
  seatMap.value.seats.forEach(seat => {
    seat.name = seatNameMap[`${seat.floor}-${seat.column}-${seat.row}`]
    seat.type = seatType[`${seat.floor}-${seat.column}-${seat.row}`]
  })
  console.log('data', JSON.parse(JSON.stringify(seatMap.value)));
  if (props.mode === 'add') {
    emit('add', JSON.parse(JSON.stringify(seatMap.value)));
  } else {
    emit('update', JSON.parse(JSON.stringify(seatMap.value)));
  }
  closeModal();
};


const generateSeats = () => {
  const newSeats: SeatType[] = [];
  for (let f = 1; f <= seatMap.value.floor; f++) {
    for (let r = 1; r <= seatMap.value.row; r++) {
      for (let c = 1; c <= seatMap.value.column; c++) {
        const existingSeat = seatMap.value.seats.find(s => s.floor === f && s.row === r && s.column === c);

        newSeats.push(existingSeat ? {...existingSeat} : {
          id: 0,
          code: `${f}-${c}-${r}`,
          name: "",
          type: 0,
          floor: f,
          column: c,
          row: r,
        });
      }
    }
  }
  seatMap.value.seats = newSeats;
  nextTick(() => {
    seatMap.value.seats.forEach(seat => {
      seatNameMap[`${seat.floor}-${seat.column}-${seat.row}`] = seat.name;
      seatType[`${seat.floor}-${seat.column}-${seat.row}`] = seat.type;
    })
  })
};
watch(
    () => [seatMap.value.floor, seatMap.value.column, seatMap.value.row],
    generateSeats
);

</script>

<template>
  <el-dialog v-model="visible" :show-close="false" class="custom-modal">
    <template #title>
      <div class="p-2 text-[17px] font-semibold text-white bg-[#0072bc]">
        {{ modalTitle }}
      </div>
    </template>

    <div class="px-[16px]">
      <el-form :model="seatMap" label-width="130px">
        <el-row :gutter="20">
          <el-col :span="9">
            <el-input v-model="seatMap.name" placeholder="Tên sơ đồ" />
          </el-col>
          <el-col :span="5">
            <el-select v-model="seatMap.floor" placeholder="Số tầng">
              <el-option v-for="floor in floors" :key="floor" :label="`${floor} Tầng`" :value="floor" />
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="seatMap.column" placeholder="Số cột">
              <el-option v-for="column in availableColumns" :key="column" :label="`${column} Cột`" :value="column" />
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-select v-model="seatMap.row" placeholder="Số hàng">
              <el-option v-for="row in availableRows" :key="row" :label="`${row} Hàng`" :value="row" />
            </el-select>
          </el-col>
        </el-row>
      </el-form>
      <div class="mt-2">
        <span class="italic text-[12px]">Loại ghế: 0 (Ghế khoá)</span>
      </div>
      <!-- Hiển thị sơ đồ ghế -->
      <section v-if="seatMap.floor && seatMap.column && seatMap.row" class="mt-4">
        <div v-for="currentFloor in displayedFloors" :key="currentFloor">
          <h2 class="text-lg font-semibold mb-2">
            {{ seatMap.name }} - Tầng {{ currentFloor }}
          </h2>
          <div v-for="rowIndex in displayedRows" :key="rowIndex" class="flex flex-col gap-2">
            <div class="flex flex-row gap-2">
              <div v-for="colIndex in displayedColumns" :key="colIndex" class="w-fit">
                <div class="flex flex-row items-center">
                  <div
                      class="m-1 rounded border text-white font-medium text-[12px] min-w-[50px] text-center"
                      :class="getSeatClasses(rowIndex, colIndex, currentFloor)"
                  >
                    {{ getSeatLabel(rowIndex, colIndex, currentFloor) }}
                    <input
                        v-model="seatNameMap[`${currentFloor}-${colIndex}-${rowIndex}`]"
                        type="text"
                        placeholder="Tên ghế"
                        class="font-semibold text-[16px]  px-2 py-1 focus:outline-none focus:border-sky-500 w-full bg-transparent text-center text-white "
                    />
                    <input
                        v-model="seatType[`${currentFloor}-${colIndex}-${rowIndex}`]"
                        type="number"
                        placeholder="Loại ghế"
                        class="font-semibold text-[16px] w-full  px-2 py-1 focus:outline-none focus:border-sky-500 bg-transparent text-center text-white "
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>







    </div>
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