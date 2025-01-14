<script setup lang="ts">
import type {TicketType} from "~/components/Ticket/TicketType";
import {
  Clock,
  CopyDocument,
  Delete,
  Edit,
  Loading,
  Printer,
  Rank,
} from "@element-plus/icons-vue";

const props = defineProps<{
  isVisible: boolean;
  selectedTicket: TicketType[];
}>();

const handleSubmit = () => {

};
const emit = defineEmits(['update:selectedTicket', 'close']);
const handleCloseTag = (item: TicketType) => {
  const updatedTickets = props.selectedTicket.filter(ticket => ticket.id !== item.id);
  emit('update:selectedTicket', updatedTickets);
  if (updatedTickets.length === 0) {
    emit('close');
  }
};
const activeNames = ref(['1'])

interface RestaurantItem {
  value: string
  link: string
}

const state1 = ref('')
const restaurants = ref<RestaurantItem[]>([])
const querySearch = (queryString: string, cb: any) => {
  const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
  // call callback function to return suggestions
  cb(results)
}
const createFilter = (queryString: string) => {
  return (restaurant: RestaurantItem) => {
    return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}
const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}

const handleSelect = (item: Record<string, any>) => {
  console.log(item)
}

onMounted(() => {
  restaurants.value = loadAll()
})
</script>

<template>
  <div
      v-if="isVisible"
      class="w-[280px] border-l border-gray-300 bg-white transition-all fixed right-0 top-0 bottom-0 h-full z-10"
  >
    <form class="mt-10" @submit.prevent="handleSubmit">
      <div class="pt-2">
        <div class="grid grid-cols-6 gap-1  p-2">
          <el-tooltip content="Sao chép vé" placement="top">
            <el-button color="#409EFF" :icon="CopyDocument" class="p-0 m-0"/>
          </el-tooltip>
          <el-tooltip content="In vé" placement="top">
            <el-button color="#67C23A" :icon="Printer"  />
          </el-tooltip>
          <el-tooltip content="Di chuyển vé" placement="top">
            <el-button color="#E6A23C" :icon="Rank"  />
          </el-tooltip>
          <el-tooltip content="Lịch sử vé" placement="top">
            <el-button color="#909399" :icon="Clock"  />
          </el-tooltip>
          <el-tooltip content="Chuyển xuống danh sách chờ xếp chỗ" placement="top">
            <el-button color="#FFC107" :icon="Loading"/>
          </el-tooltip>
          <el-tooltip content="Huỷ vé" placement="top">
            <el-button color="#F56C6C" :icon="Delete"/>
          </el-tooltip>
        </div>
        <div class="px-2">
          <el-scrollbar height="30px">
            <el-tag v-for="item in selectedTicket" :key="item.id" closable class="mx-[1px] my-[1px]"   @close="handleCloseTag(item)">
              {{ item.name }}
            </el-tag>
          </el-scrollbar>
        </div>
      </div>
      <hr/>
      <el-scrollbar :height="'calc(100vh - 200px)'" class="pr-3 pl-2">
        <div>
          <div class="demo-collapse">
            <el-collapse v-model="activeNames">
              <el-collapse-item  name="1">
                <template #title>
                  <h3 class="text-[#0072bc] font-semibold">THÔNG TIN HÀNH KHÁCH</h3>
                </template>
                <div>
                  <span class="font-semibold">Số điện thoại</span>
                  <el-input type="text" />
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Họ tên</span>
                  <el-input type="text" />
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Điểm đón</span>
                  <el-input type="text" />
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Điểm trả</span>
                  <el-input type="text" />
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Ghi chú</span>
                  <el-input type="textarea" />
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Đại lý</span>
                  <el-autocomplete
                      v-model="state1"
                      :fetch-suggestions="querySearch"
                      clearable
                      class="inline-input w-50"
                      placeholder="Chọn đại lý"
                      @select="handleSelect"
                  />
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Giới tính</span>
                  <el-select placeholder="Chọn giới tính">
                    <el-option label="Nam" value="shanghai" />
                    <el-option label="Nữ" value="beijing" />
                    <el-option label="Khác" value="beijing" />
                  </el-select>
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Ngày sinh</span>
                  <el-input type="text" />
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Email</span>
                  <el-input type="text" />
                </div>

              </el-collapse-item>
              <el-collapse-item name="2">
                <template #title>
                  <h3 class="text-[#0072bc] font-semibold">THÔNG TIN THANH TOÁN</h3>
                </template>
                <div>
                  <span class="font-semibold">Hình thức thanh toán</span>
                  <el-select placeholder="Chọn hình thức thanh toán">
                    <el-option label="Thanh toán trên xe" value="shanghai" />
                    <el-option label="Chuyển khoản" value="beijing" />
                    <el-option label="Thanh toán tiền mặt tại quầy" value="beijing" />
                    <el-option label="Thanh toán online" value="beijing" />
                  </el-select>
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Giá vé</span>
                  <el-input type="text" />
                </div>
                <div class="mt-2">
                  <span class="font-medium italic">Giá vé mẫu của công ty</span>
                  <el-radio-group >
                    <el-radio value="Sponsor">100.000</el-radio>
                    <el-radio value="Venue">150.000</el-radio>
                    <el-radio value="Venue">200.000</el-radio>
                    <el-radio value="Venue">230.000</el-radio>
                    <el-radio value="Venue">240.000</el-radio>
                    <el-radio value="Venue">250.000</el-radio>
                  </el-radio-group>
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Phụ thu</span>
                  <el-input type="text" />
                </div>
                <div class="mt-2">
                  <span class="font-semibold">Lý do phụ thu</span>
                  <el-input type="textarea" />
                </div>
              </el-collapse-item>

            </el-collapse>
          </div>
        </div>
      </el-scrollbar>

      <div class="fixed bottom-0 right-0 w-[280px]  p-4 border-t border-gray-300 bg-[#0072bc]">
        <div class="flex gap-2">
          <el-button type="success" plain class="flex-1" size="large">
            <span class="text-[15px]">QR code</span>
          </el-button>
          <el-button type="warning" plain class="flex-1" size="large">
            <span class="text-[15px]">Cập nhật</span>
          </el-button>

        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>