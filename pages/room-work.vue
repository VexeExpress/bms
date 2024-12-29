<script setup lang="ts">
import type {OfficeNameType, OfficeType} from "~/components/Office/OfficeType";

definePageMeta({
  layout: false,
});
import SelectOffice from "~/components/Office/SelectOffice.vue";
const officesName = ref<OfficeNameType[]>([]);
import {useUserStore} from "~/store/userStore";
import {ElMessage} from "element-plus";
const userStore = useUserStore();
const companyId = userStore.userData?.companyId;
const loading = ref(true);
const config = useRuntimeConfig();
const token = useCookie('access_token').value;
onMounted(async () => {

  if (!companyId) {
    console.error('Company ID is missing or invalid');
    return;
  }
  try {
    const res = await $fetch<{
      code: number,
      message: string,
      result: OfficeNameType[]
    }>(`${config.public.apiUrl}/office/list-office-name/${companyId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.code === 1000) {
      officesName.value = res.result;
      console.log('Fetched:', officesName.value);
      ElMessage.success(res.message);
    } else {
      console.error('API returned an error:', res.code);
      ElMessage.error(res.message || 'Tải dữ liệu thất bại');
    }
  } catch (err: any) {
    console.error('Error fetching:', err);
    const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
    ElMessage.error(errorMessage);
  } finally {
    loading.value = false;
  }
})
</script>

<template>
  <section>
    <div class="container">
      <img src="/static/logo-2.png" alt="App Logo" class="logo" />
      <h2 class="title">
        Lựa chọn văn phòng làm việc
      </h2>
      <SelectOffice :officesName="officesName" :loading="loading" />
    </div>
  </section>
</template>


<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f7fafc;
  padding: 1rem;
}

.logo {
  margin-bottom: 2rem;
  width: 400px;
}

.title {
  margin-bottom: 1rem;
  font-size: 20px;
  font-weight: 600;
  color: #0072bc;
}
</style>
