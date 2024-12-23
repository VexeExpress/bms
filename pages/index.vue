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
            <el-container height="100vh">
                <el-header>
                    <AppHeader />
                </el-header>
                <el-main>
                    <el-scrollbar height="80vh" class="bg-[#afb1b2] w-full">
                        <div class="items-center justify-center h-full text-center">
                            <h3 class="text-lg font-semibold">Sản phẩm cung cấp</h3>
                            <h2 class="text-2xl font-bold mt-2">
                                Hệ sinh thái quản trị toàn diện cho ngành vận tải
                            </h2>
                            <span class="text-sm text-gray-600 mt-2 ">
                                Cung cấp nền tảng công nghệ số hoá ngành vận tải hành khách đường dài.
                                Giúp các nhà vận tải hành khách chuyển đổi số, chủ động quản trị khoa học
                            </span>
                        </div>
                        <div>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="p-4 bg-white shadow rounded-lg text-center">
                                    <h3 class="text-lg font-bold">Card 1</h3>
                                    <p class="text-gray-600">Nội dung card 1</p>
                                </div>
                                <div class="p-4 bg-white shadow rounded-lg text-center">
                                    <h3 class="text-lg font-bold">Card 2</h3>
                                    <p class="text-gray-600">Nội dung card 2</p>
                                </div>
                                <div class="p-4 bg-white shadow rounded-lg text-center">
                                    <h3 class="text-lg font-bold">Card 3</h3>
                                    <p class="text-gray-600">Nội dung card 3</p>
                                </div>
                                <div class="p-4 bg-white shadow rounded-lg text-center">
                                    <h3 class="text-lg font-bold">Card 4</h3>
                                    <p class="text-gray-600">Nội dung card 4</p>
                                </div>
                            </div>


                        </div>

                    </el-scrollbar>

                </el-main>

                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<style scoped>
.el-header,
.el-main {
    padding: 0 !important;
}
</style>