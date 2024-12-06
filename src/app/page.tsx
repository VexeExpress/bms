"use client";
import FormLogin from "@/modules/auth/components/FormLogin";
import useLogin from "@/modules/auth/hook/useLogin";
import Image from "next/image";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CloudArrowUpIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  GlobeAmericasIcon,
  LockClosedIcon,
  MapPinIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]
const giaiPhapHoTro = [
  { name: 'Camera hành trình GPS', href: '#', icon: MapPinIcon },
  { name: 'Thiết bị văn phòng', href: '#', icon: ComputerDesktopIcon },
  { name: 'Web/app thương hiệu nhà xe', href: '#', icon: GlobeAmericasIcon },
]
const sanPham = [
  { name: 'Phần mềm quản lý nhà xe', href: '#', code: "BMS" },
  { name: 'Phần mềm  quản lý hàng hoá', href: '#', code: "CMS" },
  { name: 'Phần mềm  quản lý bán vé', href: '#', code: "TMS" },
]
const features = [
  { name: 'Phần mềm Quản lý nhà xe', },
  { name: 'Phần mềm Quản lý hàng hoá', },
  { name: 'Phần mềm Quản lý bán vé', },
  { name: 'Ứng dụng Quản lý bán vé', },
  { name: 'Ứng dụng Quản lý hàng hoá', },
  { name: 'Ứng dụng đón trả khách cho tài xế/phụ xe', },
]
export default function Home() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    loading,
    errorMessage,
    handleLogin,
  } = useLogin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex h-[100vh] w-full flex-col items-center justify-center bg-white border md:h-screen md:w-[30%] ">



        <div className="text-center">
          <div className="m-0 mb-5 max-w-[280px]">
            <Image
              src="/static/logo-2.png"
              alt="Logo App"
              layout="responsive"
              width={270}
              height={120}
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <span className="font-rounded text-[16px] font-semibold text-[#0072bc]">
            Chúc bạn có một ngày làm việc hiệu quả!
          </span>
        </div>
        <FormLogin
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
          loading={loading}
          handleLogin={handleLogin}
        />
        <div className="m-5 text-center">
          <span className="p-5 font-rounded text-[12px] italic text-[#0a2e5c]">
            Liên hệ Hotline: 0877 71 7575 nếu gặp sự cố đăng nhập
          </span>
        </div>
      </div>

      <div className="h-[100vh] w-full bg-white md:h-screen md:w-[70%]">

        <header className="bg-white border shadow-md absolute md:w-[70%]">
          <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">

            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Mở bán vé xe trên VinaHome
              </a>
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                  Sản phẩm
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  <div className="">
                    {sanPham.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className=" text-gray-600 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white  group-hover:text-indigo-600">
                          {item.code}
                        </div>
                        <div className="flex-auto">
                          <a href={item.href} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          {/* <p className="mt-1 text-gray-600">{item.description}</p> */}
                        </div>
                      </div>
                    ))}
                  </div>

                </PopoverPanel>
              </Popover>
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
                  Giải pháp hỗ trợ
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-xs overflow-hidden rounded-3xl bg-white ring-1 shadow-lg ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  <div className="">
                    {giaiPhapHoTro.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                        </div>
                        <div className="flex-auto">
                          <a href={item.href} className="block font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          {/* <p className="mt-1 text-gray-600">{item.description}</p> */}
                        </div>
                      </div>
                    ))}
                  </div>

                </PopoverPanel>
              </Popover>
              <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Liên hệ
              </a>


            </PopoverGroup>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700">
                Nhận tư vấn
              </Button>
            </div>


          </nav>
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    <Disclosure as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180" />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Features
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Marketplace
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Company
                    </a>
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header>

        <section className="h-[100vh] w-full overflow-y-auto bg-gray-100">

          <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-base/7 font-semibold text-indigo-600">Sản phẩm cung cấp</h2>
                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
                  Hệ sinh thái quản trị toàn diện cho ngành vận tải
                </p>
                <p className="mt-6 text-lg/8 text-gray-600">
                  Cung cấp nền tảng công nghệ số hóa ngành vận tải hành khách đường dài. Giúp các nhà vận tải hành khách chuyển đổi số, chủ động quản trị khoa học.
                </p>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">

                <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-y-16 lg:gap-x-8">

                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-md relative overflow-hidden group flex flex-col justify-between"
                    >
                      <div className="mb-3">
                        <dt className="font-medium text-gray-900">{feature.name}</dt>
                      </div>
                      <Button className="mt-auto w-full rounded bg-sky-600 py-2 px-4 text-sm text-white transition-colors duration-300 hover:bg-sky-500 active:bg-sky-700">
                        Xem chi tiết
                      </Button>
                      <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </div>
                  ))}




                </dl>
              </div>
            </div>
          </div>


        </section>
      </div>
    </div>
  );
} 
