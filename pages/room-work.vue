<script setup lang="ts">
definePageMeta({
  layout: false,
});
import SelectOffice from "~/components/Office/SelectOffice.vue";
</script>

<template>
  <section>
    <div class="container">
      <img src="/static/logo-2.png" alt="App Logo" class="logo" />
      <h2 class="title">
        Lựa chọn văn phòng làm việc
      </h2>
      <SelectOffice/>
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
