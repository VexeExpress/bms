<script setup lang="ts">
</script>
<template>
    <el-menu ellipsis class="el-menu-popper-demo w-full" mode="horizontal" :popper-offset="16">
        <el-menu-item index="1">Mở bán vé xe trên sàn VinaHome</el-menu-item>
        <el-sub-menu index="2">
            <template #title>Sản phẩm</template>
            <el-menu-item index="2-1">Phần mềm quản lý nhà xe</el-menu-item>
            <el-menu-item index="2-2">Phần mềm quản lý hàng hoá</el-menu-item>
            <el-menu-item index="2-3">Phần mềm quản lý bán vé</el-menu-item>
            <el-sub-menu index="2-4">
                <template #title>Ứng dụng</template>
                <el-menu-item index="2-4-1">Ứng dụng Quản lý bán vé</el-menu-item>
                <el-menu-item index="2-4-2">Ứng dụng Quản lý hàng hoá</el-menu-item>
                <el-menu-item index="2-4-3">Ứng dụng đón trả khách cho tài xế/phụ xe</el-menu-item>
            </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>Giải pháp hỗ trợ</template>
            <el-menu-item index="3-1">Camera hành trình GPS</el-menu-item>
            <el-menu-item index="3-2">Thiết bị văn phòng</el-menu-item>
            <el-menu-item index="3-3">Web/app thương hiệu nhà xe</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="4">Giới thiệu</el-menu-item>
        <el-menu-item index="5">Liên hệ</el-menu-item>
        <el-menu-item index="6">Nhận tư vấn</el-menu-item>
    </el-menu>
</template>
<style scoped></style>