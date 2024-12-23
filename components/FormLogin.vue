<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
const config = useRuntimeConfig();

const router = useRouter();

interface LoginType {
    username: string;
    password: string;
}

const ruleFormRef = ref<FormInstance>()

const form = reactive<LoginType>({
    username: '',
    password: '',
});

const rules = reactive<FormRules<LoginType>>({
    username: [
        { required: true, message: 'Vui lòng nhập tài khoản', trigger: 'blur' },
        { min: 3, max: 50, message: 'Tài khoản không hợp lệ', trigger: 'blur' },
    ],
    password: [
        { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
        { min: 3, max: 50, message: 'Mật khẩu không hợp lệ', trigger: 'blur' },
    ],
})

const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate(async (valid) => {
        if (valid) {
            try {
                console.log('form', form);
                const res = await $fetch(`${config.public.apiUrl}/auth/token`, {
                    method: 'POST',
                    body: form as LoginType,
                })
                console.log('res', res);

                // if (error) {
                //     ElMessage({
                //         message: 'Lỗi ',
                //         type: 'error',
                //     });
                // }

                // const accessToken = data.value;

            } catch (err) {
                ElMessage({
                    message: 'Lỗi hệ thống, vui lòng thử lại sau!',
                    type: 'error',
                });
            }
        } else {
            ElMessage({
                message: 'Lỗi xác thực thông tin đăng nhập!',
                type: 'error',
            });
        }
    })


};
</script>
<template>
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="auto" label-position="top">
        <el-form-item prop="username">
            <span class="text-black font-semibold">Tài khoản</span>
            <el-input v-model="form.username" size="large" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="password">
            <span class="text-black font-semibold">Mật khẩu</span>
            <el-input v-model="form.password" type="password" size="large" autocomplete="off" />
        </el-form-item>
        <el-form-item class="mt-10">
            <el-button type="primary" @click="onSubmit(ruleFormRef)" class="w-full" size="large">Đăng nhập</el-button>
        </el-form-item>
    </el-form>
</template>
