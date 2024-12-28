<script setup lang="ts">

import {useUserStore} from "~/store/userStore";

const userStore = useUserStore();






</script>

<template>
  <div v-if="userStore.userData">
    <p>Full Name: {{ userStore.userData.fullName }}</p>
    <p>Company Name: {{ userStore.userData.companyName }}</p>
    <p>Employee ID: {{ userStore.userData.employeeId }}</p>
    <p>Company ID: {{ userStore.userData.companyId }}</p>
  </div>
</template>

<style scoped>

</style>