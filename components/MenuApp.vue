<script setup lang="ts">
const menuItems = [
  { index: '1', label: 'Tổng quan', path: '/dashboard' },
  { index: '2', label: 'Đặt vé', path: '/ticket' },
  {
    index: '3',
    label: 'Hành khách',
    children: [
      { index: '3-1', label: 'Tra cứu thông tin vé', path: '/customers/report-ticket-detail' },
      { index: '3-2', label: 'Xuất vé điện tử', path: '/customers/electronic-ticket' },
      { index: '3-3', label: 'Quản lý hành khách', path: '/customers' },
      { index: '3-4', label: 'Đánh giá', path: '/customers/rating' },
    ],
  },
  {
    index: '4',
    label: 'Hàng hoá',
    children: [
      { index: '4-1', label: 'Phiếu hàng hoá', path: '/goods' },
      { index: '4-2', label: 'Báo cáo hàng hoá', path: '/goods/report-goods' },
      { index: '4-3', label: 'Báo cáo hàng hoá theo NV', path: '/goods/goods-by-employee' },
    ],
  },
  {
    index: '5',
    label: 'Điều hành',
    children: [
      { index: '5-1', label: 'Phân tài trung chuyển', path: '/executive/transit' },
      { index: '5-2', label: 'Sắp xếp tuyến', path: '/executive/order-route' },
      { index: '5-3', label: 'Báo cáo tài xế', path: '/executive/driver-report' },
      { index: '5-4', label: 'Báo cáo trung chuyển', path: '/executive/transshipment-report' },
      { index: '5-5', label: 'Thu chi', path: '/executive/bill' },
      { index: '5-6', label: 'Thu chi chuyến', path: '/executive/bill-in-trip' },
      { index: '5-7', label: 'Danh sách chuyến', path: '/executive/manage-list-trip' },
      { index: '5-8', label: 'Nhiên liệu', path: '/executive/manage-ingredient' },
      { index: '5-9', label: 'Lệnh vận chuyển điện tử', path: '/executive/electronic-shipping-orders' },
    ],
  },
  {
    index: '6',
    label: 'Quản lý',
    children: [
      { index: '6-1', label: 'Phân quyền bán vé', path: '/administer/manage-permission-sell-ticket' },
      { index: '6-2', label: 'Phiếu thu', path: '/administer/payment' },
      { index: '6-3', label: 'Phiếu chi', path: '/administer/payment-slip' },
      { index: '6-4', label: 'Giá niêm yết', path: '/administer/price-policy' },
      { index: '6-5', label: 'Chính sách huỷ vé', path: '/administer/cancel-ticket-policy' },
      { index: '6-6', label: 'Mã khuyến mãi', path: '/administer/promotion' },
      { index: '6-7', label: 'Khách hàng đăng ký ưu đãi', path: '/administer/customers-register-incentives' },
    ],
  },
  {
    index: '7',
    label: 'Khai báo',
    children: [
      { index: '7-1', label: 'Văn phòng', path: '/declaration/office' },
      { index: '7-2', label: 'Nhân viên', path: '/declaration/employee' },
      { index: '7-3', label: 'Điểm dừng', path: '/declaration/point' },
      { index: '7-4', label: 'Tuyến', path: '/declaration/route' },
      { index: '7-5', label: 'Sơ đồ ghế', path: '/declaration/seat' },
      { index: '7-6', label: 'Phương tiện', path: '/declaration/vehicle' },
      { index: '7-7', label: 'Lịch chạy', path: '/declaration/plan-for-trip' },
      { index: '7-8', label: 'Đại lý', path: '/declaration/agency' },
      { index: '7-9', label: 'Khoản mục', path: '/declaration/item' },
      { index: '7-10', label: 'Số máy tổng đài', path: '/declaration/telecom-number' },
      { index: '7-11', label: 'Mức giá mẫu', path: '' },
    ],
  },
  {
    index: '8',
    label: 'Hệ thống',
    children: [
      { index: '8-1', label: 'Cấu hình hệ thống', path: '/system/system-setting' },
      { index: '8-2', label: 'Lịch sử đăng nhập', path: '/system/login-history' },
      { index: '8-3', label: 'Tuỳ chỉnh in vé', path: '/system/config-ticket' },
      { index: '8-4', label: 'Tuỳ chỉnh in hàng', path: '/system/config-goods' },
      { index: '8-5', label: 'Cấu hình gửi tin nhắn', path: '/system/config-sms' },
      { index: '8-6', label: 'Cấu hình gửi mail', path: '/system/config-mail' },
    ],
  },
  {
    index: '9',
    label: 'CSKH',
    children: [
      { index: '9-1', label: 'Báo cáo số dư tài khoản', path: '/support/report-message' },
      { index: '9-2', label: 'Đăng ký sử dụng VietQR', path: '/support/register-vietqr' },
    ],
  }
];
</script>

<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened>
    <template v-for="item in menuItems" :key="item.index">
      <el-menu-item v-if="!item.children" :index="item.index">
        <NuxtLink :to="item.path" class="w-full">{{ item.label }}</NuxtLink>
      </el-menu-item>
      <el-sub-menu v-else :index="item.index">
        <template #title>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item
            v-for="child in item.children"
            :key="child.index"
            :index="child.index"
        >
          <NuxtLink :to="child.path">{{ child.label }}</NuxtLink>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<style scoped>

</style>