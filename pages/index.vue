<script setup lang="ts">
import FormLogin from "~/components/Auth/FormLogin.vue";

definePageMeta({
  layout: false,
});


const softwareList = [
  {id: 1, name: "Phần mềm Quản lý nhà xe"},
  {id: 2, name: "Phần mềm Quản lý hàng hoá"},
  {id: 3, name: "Phần mềm Quản lý bán vé"},
  {id: 4, name: "Ứng dụng Quản lý bán vé"},
  {id: 5, name: "Ứng dụng Quản lý hàng hoá"},
  {id: 6, name: "Ứng dụng Đón trả khách"},
];

</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="350px" class="h-screen flex flex-col justify-center items-center px-5 shadow-right">

        <div class="mb-5">
          <img src="/static/logo-2.png" alt="Logo App" class="max-w-[280px] mx-auto">
        </div>

        <div class="mt-5 text-center">
          <span class="text-[16px] font-semibold text-[#0072bc]">
              Chúc bạn có một ngày làm việc hiệu quả!
          </span>
        </div>

        <div class="my-5 w-full text-center px-5">
          <FormLogin/>
        </div>

        <div class="mt-5 text-center">
          <span class="text-[12px] italic text-[#0a2e5c]">
              Liên hệ Hotline: 0877 71 7575 nếu gặp sự cố đăng nhập
          </span>
        </div>

      </el-aside>
      <el-container height="100vh">
        <el-header class="ml-[1px]">
          <AppHeader/>
        </el-header>
        <el-main>
          <el-scrollbar height="80vh" class="w-full">
            <div class="flex flex-col items-center justify-center h-full text-center mt-10 px-6 sm:px-12">
              <h3 class="text-lg font-semibold text-indigo-600">Sản phẩm cung cấp</h3>
              <h2 class="text-3xl font-bold text-gray-900 mt-4 mb-5 leading-tight">
                Hệ sinh thái quản trị toàn diện cho ngành vận tải
              </h2>
              <p class="text-sm text-gray-600 max-w-3xl">
                Cung cấp nền tảng công nghệ số hoá ngành vận tải hành khách đường dài.
                Giúp các nhà vận tải hành khách chuyển đổi số, chủ động quản trị khoa học.
              </p>
            </div>
            <div class="mx-16 mt-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                <div
                    v-for="software in softwareList"
                    :key="software.id"
                    class="p-6 bg-white shadow-lg rounded-lg text-center w-full mx-auto mb-6 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 hover:border-2 hover:border-blue-500"
                >
                  <h3 class="text-[17px] font-semibold text-gray-800 mb-4">{{ software.name }}</h3>
                  <el-button
                      type="primary"
                      plain
                      class="w-full py-2 text-sm font-semibold transition-colors duration-300 hover:bg-blue-600 hover:text-white">
                    Xem chi tiết
                  </el-button>
                </div>
              </div>

            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.el-header,
.el-main {
  padding: 0 !important;
}
.shadow-right {
 box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
}
</style>