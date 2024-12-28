<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus'
import type {LoginResponseType, LoginType} from "~/components/Auth/AuthType";
import {useUserStore} from "~/store/userStore";
const router = useRouter();
const config = useRuntimeConfig();



const form = reactive<LoginType>({
    username: '',
    password: '',
});
const userStore = useUserStore();
const onSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate(async (valid) => {
      if (valid) {
        try {
          const res = await $fetch<{ code: number, message: string , result: LoginResponseType }>(`${config.public.apiUrl}/auth/token`, {
            method: 'POST',
            body: {
              username: form.username,
              password: form.password,
            },
          });
          if (res.code === 1000) {
            const token = useCookie('access_token');
            token.value = res.result.token;
            // const userInfo = {
            //   fullName: res.result.fullName,
            //   companyName: res.result.companyName,
            //   employeeId: res.result.employeeId,
            //   companyId: res.result.companyId,
            // };
            // localStorage.setItem('userInfo', JSON.stringify(userInfo));
            // const userStore = useUserStore();
            // userStore.setUserData(userInfo);
            const userInfo = {
              fullName: res.result.fullName,
              companyName: res.result.companyName,
              employeeId: res.result.employeeId,
              companyId: res.result.companyId,
            };

            userStore.setUserData(userInfo);
            await router.push('/room-work');
            ElMessage({
              message: res.message,
              type: 'success',
            });
          } else {
            ElMessage.error(res.message || 'Đăng nhập thất bại');
          }
        } catch (err: any) {
          console.error('Error login:', err);
          const errorMessage = err?.data?.message || err?.response?.data?.message || 'Lỗi hệ thống, vui lòng thử lại sau';
          ElMessage.error(errorMessage);
        }

      } else {
        ElMessage({
          message: 'Lỗi xác thực thông tin đăng nhập!',
          type: 'error',
        });
      }
    })
};
const ruleFormRef = ref<FormInstance>()
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
</script>
<template>
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="auto" label-position="top">
        <el-form-item prop="username">
            <span class="text-black font-semibold">Tài khoản</span>
            <el-input v-model="form.username" size="large" />
        </el-form-item>
        <el-form-item prop="password">
            <span class="text-black font-semibold">Mật khẩu</span>
            <el-input v-model="form.password" type="password" size="large" />
        </el-form-item>
        <el-form-item class="mt-10">
            <el-button type="primary" @click="onSubmit(ruleFormRef)" class="w-full" size="large">Đăng nhập</el-button>
        </el-form-item>
    </el-form>
</template>
