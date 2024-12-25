<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import type {LoginResponseType, LoginType} from "~/components/Auth/AuthType";


const config = useRuntimeConfig();

const router = useRouter();

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


const cookies = useCookie('access_token');
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        try {
          console.log('form', form);
          const res = await $fetch(`${config.public.apiUrl}/auth/token`, {
            method: 'POST',
            body: form as LoginType,
          }) as LoginResponseType
          if (res.code === 1000) {
            ElMessage({
              message: res.message,
              type: 'success',
            });
            cookies.value = res.result.token
            console.log('Logged in successfully:', res);
            await router.push('/room-work');
          } else {
            console.log('Error logged in successfully:', res);
            ElMessage({
              message: 'Đăng nhập thất bại',
              type: 'error',
            });
          }
        } catch (err: any) {
          const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
          ElMessage({
            message: errorMessage,
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
