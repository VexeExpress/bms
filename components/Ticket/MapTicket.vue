<script setup lang="ts">
import type {TicketType} from "~/components/Ticket/TicketType";
import ItemTicket from "~/components/Ticket/ItemTicket.vue";

const props = defineProps<{
  listTicket: TicketType[];
  loading: boolean;
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
const selectedItem = ref<number | null>(null);

const selectItem = (index: number) => {
  selectedItem.value = index;
};
</script>

<template>
  <div v-if="props.loading" v-loading="props.loading" class="flex justify-center items-center min-h-[50px]"/>

  <div class="flex justify-between gap-3">
    <div v-for="(tickets, floor) in groupedTickets" :key="floor" class="flex-1">
      <div class="grid gap-1.5">
        <ItemTicket
            v-for="ticket in tickets"
            :key="ticket.id"
            :ticket="ticket"
            :class="[
              'border rounded-lg cursor-pointer transition-colors',
              selectedItem === ticket.id ? 'border-[1px]  shadow-md' : 'border-gray-300'
            ]"
            :style="selectedItem === ticket.id ? 'border-color: #0072bc; background-color: #ffe4e1;' : ''"
            @click="selectItem(ticket.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>