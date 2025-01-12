<script setup lang="ts">
import ListTrip from "~/components/Trip/ListTrip.vue";
import {useUserStore} from "~/store/userStore";
import type {RouteNameType} from "~/components/Route/RouteType";
import {ElMessage, type TabsPaneContext} from "element-plus";
import type {TripDataType, TripScheduleType} from "~/components/Trip/TripType";
import InfoTrip from "~/components/Trip/InfoTrip.vue";
import MapTicket from "~/components/Ticket/MapTicket.vue";
import type {TicketType} from "~/components/Ticket/TicketType";

const userStore = useUserStore();
const companyId = userStore.userData?.companyId;
const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;

const routesName = ref<RouteNameType[]>([]);
const tripsData = ref<TripDataType[]>([]);

const loadingRouteName = ref(true);
const loadingTripData = ref(true);

onMounted(async () => {
  if (!companyId) {
    console.error('Company ID is missing or invalid');
    return;
  }
  try {
    const resRouteName = await $fetch<{
      code: number,
      message: string,
      result: RouteNameType[]
    }>(`${config.public.apiUrl}/route/list-route-name/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (resRouteName.code === 1000) {
      routesName.value = resRouteName.result
    }
    console.log("route name: ", resRouteName);
  } catch (err: any) {
    console.error('Error fetching:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  } finally {
    loadingRouteName.value = false;
  }
})
const fetchDataTrip = async (date: string, route: number) => {
  if (!date || !route) {
    console.error('Date or route is missing');
    return;
  }
  loadingTripData.value = true;
  try {
    const resTrip = await $fetch<{
      code: number;
      message: string;
      result: TripDataType[];
    }>(`${config.public.apiUrl}/trip/list-data-trip/${companyId}`, {
      method: 'GET',
      params: { date, route },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (resTrip.code === 1000) {
      console.log('Fetched data:', resTrip);
      tripsData.value = resTrip.result;
    }
  } catch (err: any) {
    console.error('Error fetching trip data:', err);
    const errorMessage =
        err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  } finally {
    loadingTripData.value = false;
  }
};
const today = new Date();
const todayString = today.toISOString().split('T')[0];
const handleTodayClick = () => {
  value_date.value = todayString;
};
const value_date = ref('')
const value_route = ref(null)

watch([value_date, value_route], ([newDate, newRoute]) => {
  if (newDate && newRoute) {
    fetchDataTrip(newDate, newRoute);
    console.log("Date: ", newDate);
    console.log("Route: ", newRoute);
    selectedTrip.value = null;
  }
});
const selectedTrip = ref<TripDataType | null>(null);
const handleSelectTrip = (trip: TripDataType) => {
  selectedTrip.value = trip;
  console.log(selectedTrip.value);
};
const activeTab = ref('');
const listTicket = ref<TicketType[]>([]);
const loadingListTicket = ref(true);
const handleTabClick = async (tab: TabsPaneContext, event: Event) => {
  if (tab.props.name === '1') {
    loadingListTicket.value = true;
    try {
      console.log('Tab Sơ đồ ghế');
      const resTicket = await $fetch<{
        code: number;
        message: string;
        result: TicketType[];
      }>(`${config.public.apiUrl}/ticket/list-ticket/${selectedTrip.value?.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (resTicket.code === 1000) {
        listTicket.value = resTicket.result;
        console.log(resTicket);
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    } finally {
      loadingListTicket.value = false;
    }
  }
  if (tab.props.name === '2') {
    console.log('Tab Hành khách');
  }
  if (tab.props.name === '3') {
    console.log('Tab ĐÓn/trả');
  }
  if (tab.props.name === '4') {
    console.log('Tab Trung chuyển');
  }
  if (tab.props.name === '5') {
    console.log('Tab Nghiệm thu');
  }
  if (tab.props.name === '6') {
    console.log('Tab hàng hoá');
  }
}
watch(selectedTrip, async (newTrip) => {
  if (newTrip) {
    loadingListTicket.value = true;
    try {
      const resTicket = await $fetch<{
        code: number;
        message: string;
        result: TicketType[];
      }>(`${config.public.apiUrl}/ticket/list-ticket/${newTrip.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (resTicket.code === 1000) {
        listTicket.value = resTicket.result;
        console.log(resTicket);
      }
    } catch (error) {
      console.error('Error fetching ticket data:', error);
    } finally {
      loadingListTicket.value = false;
    }
  }
});

</script>

<template>
  <section class="w-full pt-2 px-2 flex items-center space-x-6">
    <el-button color="#626aef" @click="handleTodayClick">Hôm nay</el-button>
    <el-date-picker
        v-model="value_date"
        type="date"
        placeholder="Chọn ngày"
        style="width: 140px"
        format="DD-MM-YYYY"
        value-format="YYYY-MM-DD"
    />
    <el-select
        v-model="value_route"
        placeholder="Chọn tuyến"
        style="width: 240px"

    >
      <el-option
          v-for="item in routesName"
          :key="item.id"
          :label="item.routeName"
          :value="item.id"
      />
    </el-select>
  </section>
    <section class="px-2 pt-2">
      <ListTrip :trips="tripsData" :loading="loadingTripData" @selectTrip="handleSelectTrip"/>

    </section>
    <section class="px-2" v-if="selectedTrip">
      <InfoTrip :trip="selectedTrip" />
      <el-tabs class="demo-tabs" v-model="activeTab" @tab-click="handleTabClick">
        <el-tab-pane label="Sơ đồ ghế" name="1" >
          <MapTicket :loading="loadingListTicket" :listTicket="listTicket"/>
        </el-tab-pane>
        <el-tab-pane label="Hành khách" name="2"></el-tab-pane>
        <el-tab-pane label="Đón/Trả" name="3"></el-tab-pane>
        <el-tab-pane label="Trung chuyển" name="4"></el-tab-pane>
        <el-tab-pane label="Nghiệm thu" name="5"></el-tab-pane>
        <el-tab-pane label="Hàng hoá" name="6"></el-tab-pane>
      </el-tabs>
    </section>




</template>

<style scoped>

</style>