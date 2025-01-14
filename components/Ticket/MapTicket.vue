<script setup lang="ts">
import type {TicketType} from "~/components/Ticket/TicketType";
import ItemTicket from "~/components/Ticket/ItemTicket.vue";

const props = defineProps<{
  listTicket: TicketType[];
  loading: boolean;
  selectedTicket: TicketType[];
}>();

const groupedTickets = computed(() => {
  return props.listTicket.reduce((acc, ticket) => {
    if (!acc[ticket.floor]) {
      acc[ticket.floor] = [];
    }
    acc[ticket.floor].push(ticket);
    return acc;
  }, {} as Record<number, TicketType[]>);
});

const emit = defineEmits(["openForm", "closeForm"]);


const selectItem = (ticket: TicketType) => {
  const index = props.selectedTicket.findIndex((item) => item.id === ticket.id);
  if (index > -1) {
    // Nếu vé đã được chọn, bỏ chọn nó
    props.selectedTicket.splice(index, 1);
  } else {
    // Nếu vé chưa được chọn, thêm vào danh sách
    props.selectedTicket.push(ticket);
  }

  // Nếu không còn vé nào được chọn, đóng form
  if (props.selectedTicket.length == 0) {
    emit("closeForm");
  } else {
    // Nếu còn vé, cập nhật danh sách vé đã chọn
    emit("openForm", [...props.selectedTicket]);
  }
};



</script>

<template>
  <div v-if="props.loading" v-loading="props.loading" class="flex justify-center items-center min-h-[50px]"/>

  <div class="flex gap-4 h-full">
    <!-- Sơ đồ ghế -->
    <div class="flex justify-between gap-3 transition-all w-full">
      <div v-for="(tickets, floor) in groupedTickets" :key="floor" class="flex-1">
        <div class="grid gap-1.5">
          <ItemTicket
              v-for="ticket in tickets"
              :key="ticket.id"
              :ticket="ticket"
              :class="[
                'border rounded-lg cursor-pointer transition-colors',
                props.selectedTicket.some(item => item.id === ticket.id) ? 'border-[1px] shadow-md' : 'border-gray-300'
              ]"
              :style="props.selectedTicket.some(item => item.id === ticket.id) ? 'border-color: #0072bc; background-color: #ffe4e1;' : ''"
              @select="selectItem(ticket)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>