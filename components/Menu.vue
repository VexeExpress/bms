<script lang="ts" setup>
import { ref, nextTick } from 'vue'
import {
  Ticket,
  Menu as IconMenu,
  UserFilled,
  GoodsFilled,
  TrendCharts,
  Management,
  List,
  Expand,
  Fold,
  Tools,
  Promotion
} from '@element-plus/icons-vue'

const isCollapse = ref(false)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-radio-group v-model="isCollapse" class="isCollapse">
    <el-radio-button v-if="isCollapse" :value="false">
      <el-icon><Expand /></el-icon> Mở
    </el-radio-button>
    <el-radio-button v-if="!isCollapse" :value="true">
      <el-icon><Fold /></el-icon> Thu gọn
    </el-radio-button>
  </el-radio-group>

  <el-menu
      ref="menu"
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >

    <el-menu-item index="1">
      <el-icon><icon-menu /></el-icon>
      <template #title>Tổng quan</template>
    </el-menu-item>

    <el-menu-item index="2">
      <el-icon><Ticket /></el-icon>
      <template #title>Đặt vé</template>
    </el-menu-item>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><UserFilled /></el-icon>
        <span>Hành khách</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Hành khách</span></template>
        <el-menu-item index="3-1">Tra cứu thông tin vé</el-menu-item>
        <el-menu-item index="3-2">Xuất vé điện tử</el-menu-item>
        <el-menu-item index="3-3">Quản lý hành khách</el-menu-item>
        <el-menu-item index="3-4">Đánh giá</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon><GoodsFilled /></el-icon>
        <span>Hàng hoá</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Hàng hoá</span></template>
        <el-menu-item index="4-1">Phiếu hàng hoá</el-menu-item>
        <el-menu-item index="4-2">Báo cáo hàng hoá</el-menu-item>
        <el-menu-item index="4-3">Báo cáo hàng hoá theo NV</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="5">
      <template #title>
        <el-icon><TrendCharts /></el-icon>
        <span>Điều hành</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Điều hành</span></template>
        <el-menu-item index="5-1">Phân tài trung chuyển</el-menu-item>
        <el-menu-item index="5-2">Sắp xếp tuyến</el-menu-item>
        <el-menu-item index="5-3">Báo cáo tài xế</el-menu-item>
        <el-menu-item index="5-4">Báo cáo trung chuyển</el-menu-item>
        <el-menu-item index="5-5">Thu chi</el-menu-item>
        <el-menu-item index="5-6">Thu chi chuyến</el-menu-item>
        <el-menu-item index="5-7">Danh sách chuyến</el-menu-item>
        <el-menu-item index="5-8">Nhiên liệu</el-menu-item>
        <el-menu-item index="6-1">Lệnh vận chuyển điện tử</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="6">
      <template #title>
        <el-icon><Management /></el-icon>
        <span>Quản lý</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Quản lý</span></template>
        <el-menu-item index="6-1">Phân quyền bán vé</el-menu-item>
        <el-menu-item index="6-2">Phiếu thu</el-menu-item>
        <el-menu-item index="6-3">Phiếu chi</el-menu-item>
        <el-menu-item index="6-4">Giá niêm yết</el-menu-item>
        <el-menu-item index="6-5">Chính sách huỷ vé</el-menu-item>
        <el-menu-item index="6-6">Mã khuyến mãi</el-menu-item>
        <el-menu-item index="6-7">Đối tượng ưu đãi</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="7">
      <template #title>
        <el-icon><List /></el-icon>
        <span>Khai báo</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Khai báo</span></template>
        <el-menu-item index="7-1">
          <NuxtLink to="/declaration/office">
            Văn phòng
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-2">
          <NuxtLink to="/declaration/employee">
            Nhân viên
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-3">
          <NuxtLink to="/declaration/point">
            Điểm dừng
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-4">
          <NuxtLink to="/declaration/route">
            Tuyến
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-5">
          <NuxtLink to="/declaration/seat">
            Sơ đồ ghế
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-6">
          <NuxtLink to="/declaration/vehicle">
            Phương tiện
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-7">
          <NuxtLink to="/declaration/plan-for-trip">
            Lịch chạy
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-8">
          <NuxtLink to="/declaration/agency">
            Đại lý
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-9">
          <NuxtLink to="/declaration/item">
            Khoản mục
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-10">
          <NuxtLink to="/declaration/surcharge-category">
            Danh mục phụ thu
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="7-11">
          <NuxtLink to="/declaration/telecom-number">
            Số máy tổng đài
          </NuxtLink>
        </el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="8">
      <template #title>
        <el-icon><Tools /></el-icon>
        <span>Hệ thống</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Hệ thống</span></template>
        <el-menu-item index="8-1">Cấu hình hệ thống</el-menu-item>
        <el-menu-item index="8-2">Lịch sử đăng nhập</el-menu-item>
        <el-menu-item index="8-3">Tuỳ chỉnh in vé</el-menu-item>
        <el-menu-item index="8-4">Tuỳ chỉnh in hàng</el-menu-item>
        <el-menu-item index="8-5">Cấu hình gửi tin nhắn</el-menu-item>
        <el-menu-item index="8-6">Cấu hình gửi mail</el-menu-item>
        <el-menu-item index="8-7">Lịch sử đăng nhập</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="9">
      <template #title>
        <el-icon><Promotion /></el-icon>
        <span>CSKH</span>
      </template>
      <el-menu-item-group>
        <template #title><span>CSKH</span></template>
        <el-menu-item index="1-1">Báo cáo số dư tài khoản</el-menu-item>
        <el-menu-item index="1-2">Đăng ký sử dụng VietQR</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

  </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-radio-button__inner{
  padding: 7px 13px !important;
}
.isCollapse{
  margin-bottom: 10px;
  margin-top: 2px;
  margin-left: 2px;
}
.el-menu{
  border-right: none !important;
}
</style>
