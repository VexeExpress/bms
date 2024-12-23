<template>
    <el-form :model="form" label-width="auto" label-position="top">
        <el-form-item>
            <span class="text-black font-semibold">Tài khoản</span>
            <el-input v-model="form.username" size="large" />
        </el-form-item>
        <el-form-item>
            <span class="text-black font-semibold">Mật khẩu</span>
            <el-input v-model="form.password" type="password" size="large" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" class="w-full" size="large">Đăng nhập</el-button>
        </el-form-item>
    </el-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'


const form = reactive({
    username: '',
    password: '',
})

const onSubmit = () => {
    console.log('submit!');
    ElMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
    });
}
</script>
