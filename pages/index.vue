<script setup lang="ts">
definePageMeta({
    layout: false,
});
</script>
<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="350px" class="h-screen flex flex-col justify-center items-center bg-gray-50 px-5">

                <div class="mb-5">
                    <img src="/static/logo-2.png" alt="Logo App" class="max-w-[280px] mx-auto">
                </div>

                <div class="mt-5 text-center">
                    <span class="text-[16px] font-semibold text-[#0072bc]">
                        Chúc bạn có một ngày làm việc hiệu quả!
                    </span>
                </div>

                <div class="my-5 w-full text-center px-5">
                    <FormLogin />
                </div>

                <div class="mt-5 text-center">
                    <span class="text-[12px] italic text-[#0a2e5c]">
                        Liên hệ Hotline: 0877 71 7575 nếu gặp sự cố đăng nhập
                    </span>
                </div>

            </el-aside>
            <el-container>
                <el-header>
                    <AppHeader />
                </el-header>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-header{
    padding: 0 !important;
}
</style>