<script setup lang="ts">
import CustomSelect from '@/components/CustomSelect.vue';
import { ref } from 'vue';

const testSelect = ref(null);
</script>

<template>
  <article class="form-steps-field pt-[90px] xl:pt-[30px]">
    <div class="wrapper w-full px-[30px] mx-auto relative">
      <div
        class="line h-[1px] w-full absolute left-0 top-[50%] translate-y-[-50%] bg-ebony-clay-800 [mask-image:linear-gradient(90deg,transparent,black,transparent)]">
      </div>
      <div
        class="steps flex items-center justify-center relative z-10 gap-[90px] xl:gap-[75px] lg:gap-[60px] md:gap-[45px] sm:gap-[30px] xs:gap-[20px]">
        <template v-for="i in Array(5).keys()">
          <div :class="{ 'active': i === 0 }"
            class="item relative overflow-hidden isolate [--circle-bg-color:var(--color-chetwode-blue-600)] hover-circle-effect [&.completed]:shadow-none [&.completed]:pointer-events-none [&.completed>.check>svg]:scale-100 [&.completed>.check>svg]:opacity-100 [&.completed>.check]:opacity-100 [&.active]:bg-ebony-clay-800 [&.active]:pointer-events-none cursor-pointer w-[60px] h-[60px] md:w-[45px] md:h-[45px] xs:w-[35px] xs:h-[35px] duration-350 shadow-[inset_0_0_0_1px_var(--color-ebony-clay-800)] rounded-full flex items-center justify-center bg-body-color text-white font-semibold text-[20px]">
            <span class="block relative z-10 md:text-[14px] xs:text-[12px]">
              {{ i + 1 }}
            </span>
            <div
              class="check opacity-0 duration-350 absolute z-20 w-full h-full left-0 top-0 rounded-full bg-body-color after:absolute after:left-0 after:top-0 after:w-full after:h-full after:rounded-full after:shadow-[inset_0_0_0_2px_var(--color-dull-lavender-400)] after:[mask-image:linear-gradient(180deg,_black,_transparent)] flex items-center justify-center">
              <svg
                class="w-[20px] h-[20px] md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px] fill-primary opacity-0 scale-50 duration-350 delay-100"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14.96">
                <path d="m17.35,0L7.16,9.45,2.85,4.85,0,7.53l6.96,7.43L20,2.87l-2.65-2.87Z" />
              </svg>
            </div>
          </div>
        </template>
      </div>
    </div>
  </article>
  <article class="form-content pt-[90px] xl:pt-[75px] lg:pt-[60px] md:pt-[45px]">
    <div class="wrapper max-w-[991px] px-[30px] mx-auto relative">
      <form action="" class="w-full">
        <div class="steps relative duration-600">
          <!-- Step 1 -->
          <div
            class="step absolute duration-450 [&.active]:delay-200 left-0 top-0 w-full opacity-0 translate-y-[30px] invisible pointer-events-none [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto [&.active]:translate-y-0">
            <div class="text-editor text-center w-full mx-auto relative z-2 mb-[60px]">
              <h1>Bu projeyi kimin için yapacağız?</h1>
            </div>
            <div
              class="custom-check-field grid grid-cols-2 sm:grid-cols-1 gap-[50px] md:gap-[40px] sm:gap-[30px] max-w-[575px] mx-auto">
              <div class="custom-check relative">
                <input
                  class="absolute checked:pointer-events-none peer left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer"
                  type="radio" name="step-1" checked>
                <div
                  class="box duration-350 peer-hover:translate-y-[-10px] backface-hidden shadow-[0_0_0_1px_var(--color-ebony-clay-800)] peer-checked:pointer-events-none peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] rounded-[10px] p-[30px] flex flex-col items-center peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
                  <div
                    class="image w-[50px] h-[50px] flex items-center justify-center bg-ebony-clay-800 rounded-[10px] mb-[15px]">
                    <img class="w-[25px] h-[25px] object-contain object-center block"
                      src="@/assets/image/icon/image-12.png" alt="">
                  </div>
                  <div
                    class="text-editor text-center editor-p:leading-normal editor-p:text-[14px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0">
                    <h3>Şirketim İçin</h3>
                    <p>Web tasarım ihtiyacınız için seçebilirsiniz.</p>
                  </div>
                  <svg
                    class="absolute right-[15px] top-[15px] fill-primary w-[30px] h-[30px] origin-center scale-50 opacity-0 duration-350"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <path
                      d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z" />
                  </svg>
                </div>
              </div>

              <div class="custom-check relative">
                <input
                  class="absolute checked:pointer-events-none peer left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer"
                  type="radio" name="step-1">
                <div
                  class="box duration-350 peer-hover:translate-y-[-10px] backface-hidden shadow-[0_0_0_1px_var(--color-ebony-clay-800)] peer-checked:pointer-events-none peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] rounded-[10px] p-[30px] flex flex-col items-center peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
                  <div
                    class="image w-[50px] h-[50px] flex items-center justify-center bg-ebony-clay-800 rounded-[10px] mb-[15px]">
                    <img class="w-[25px] h-[25px] object-contain object-center block"
                      src="@/assets/image/icon/image-13.png" alt="">
                  </div>
                  <div
                    class="text-editor text-center editor-p:leading-normal editor-p:text-[14px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0">
                    <h3>Şahsım İçin</h3>
                    <p>Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.</p>
                  </div>
                  <svg
                    class="absolute right-[15px] top-[15px] fill-primary w-[30px] h-[30px] origin-center scale-50 opacity-0 duration-350"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <path
                      d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div
              class="button-field flex xs:flex-col-reverse items-center justify-center gap-[50px] sm:gap-[30px] mt-[60px] sm:mt-[45px]">
              <button type="button"
                class="next-step button [--circle-bg-color:var(--color-chetwode-blue-600)] hover-circle-effect h-[58px] rounded-full px-[60px] md:px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] bg-dull-lavender-500">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">DEVAM ET</div>
              </button>
            </div>
          </div>

          <!-- Step 2 -->
          <div
            class="step absolute duration-450 [&.active]:delay-200 left-0 top-0 w-full opacity-0 translate-y-[30px] invisible pointer-events-none [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto [&.active]:translate-y-0">
            <div class="text-editor text-center w-full mx-auto relative z-2 mb-[60px]">
              <h1>Kişisel bilgilerinizi giriniz</h1>
            </div>
            <div class="form-field grid grid-cols-2 sm:grid-cols-1 gap-x-[30px] gap-y-[45px] max-w-[991px] mx-auto">
              <div class="form-el">
                <input type="text" id="name" placeholder="Adınız Soyadınız"
                  class="h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500">
                <label for="name"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Ad
                  Soyad</label>
              </div>

              <div class="form-el">
                <input type="tel" id="phone" placeholder="+90 553 107 93 64"
                  class="phone-input h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500">
                <label for="phone"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Telefon</label>
              </div>

              <div class="form-el">
                <input type="email" id="email" placeholder="E-Posta adresinizi yazınız"
                  class="h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500">
                <label for="email"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">E-Posta</label>
              </div>

              <div class="form-el">
                <input type="text" id="company-name" placeholder="Firmanızın adını yazınız"
                  class="h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500">
                <label for="company-name"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Firma
                  Adı</label>
              </div>

              <div class="form-el">
                <select id="city"
                  class="invalid:text-black h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500"
                  required>
                  <option class="text-white bg-body-color" selected disabled>Bulunduğunuz şehri seçiniz</option>
                  <option class="text-white bg-body-color" value="1">Şehir 1</option>
                  <option class="text-white bg-body-color" value="2">Şehir 2</option>
                  <option class="text-white bg-body-color" value="3">Şehir 3</option>
                </select>
                <label for="city"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Şehir</label>
                <div
                  class="icon icon-chevron-bottom absolute text-white right-[30px] top-[34px] text-[16px] h-[16px] leading-none">
                </div>
              </div>

              <div class="form-el">
                <select id="state"
                  class="invalid:text-black h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500"
                  required>
                  <option class="text-white bg-body-color" selected disabled>Bulunduğunuz semti seçiniz</option>
                  <option class="text-white bg-body-color" value="1">Semt 1</option>
                  <option class="text-white bg-body-color" value="2">Semt 2</option>
                  <option class="text-white bg-body-color" value="3">Semt 3</option>
                </select>
                <label for="state"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Semt</label>
                <div
                  class="icon icon-chevron-bottom absolute text-white right-[30px] top-[34px] text-[16px] h-[16px] leading-none">
                </div>
              </div>
            </div>
            <div
              class="button-field flex xs:flex-col-reverse items-center justify-center gap-[50px] sm:gap-[30px] mt-[60px] sm:mt-[45px]">
              <button type="button"
                class="prev-step button border-0 [--circle-bg-color:var(--color-lynch-500)] hover-circle-effect h-[58px] rounded-full px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-ebony-clay-2-900)] bg-ebony-clay-2-900">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">GERİ</div>
              </button>
              <button type="button"
                class="next-step button border-0 [--circle-bg-color:var(--color-chetwode-blue-600)] hover-circle-effect h-[58px] rounded-full px-[60px] md:px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] bg-dull-lavender-500">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">DEVAM ET</div>
              </button>
            </div>
          </div>

          <!-- Step 3 -->
          <div
            class="step absolute duration-450 [&.active]:delay-200 left-0 top-0 w-full opacity-0 translate-y-[30px] invisible pointer-events-none [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto [&.active]:translate-y-0">
            <div class="text-editor text-center w-full mx-auto relative z-2 mb-[60px]">
              <h1>Şirket bilgilerinizi giriniz</h1>
            </div>
            <div class="form-field grid grid-cols-2 sm:grid-cols-1 gap-x-[30px] gap-y-[45px] max-w-[991px] mx-auto">
              <div class="form-el">
                <input type="text" id="company-name" placeholder="Şirket isminizi kısaca yazmanız yeterlidir."
                  class="h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500">
                <label for="company-name"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Şirketinizin
                  Adı</label>
              </div>

              <div class="form-el">
                <input type="text" id="company-position" placeholder="Görevinizi yazınız."
                  class="h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500">
                <label for="company-position"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Şirketteki
                  Göreviniz</label>
              </div>
            </div>
            <div
              class="button-field flex xs:flex-col-reverse items-center justify-center gap-[50px] sm:gap-[30px] mt-[60px] sm:mt-[45px]">
              <button type="button"
                class="prev-step button border-0 [--circle-bg-color:var(--color-lynch-500)] hover-circle-effect h-[58px] rounded-full px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-ebony-clay-2-900)] bg-ebony-clay-2-900">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">GERİ</div>
              </button>
              <button type="button"
                class="next-step button border-0 [--circle-bg-color:var(--color-chetwode-blue-600)] hover-circle-effect h-[58px] rounded-full px-[60px] md:px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] bg-dull-lavender-500">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">DEVAM ET</div>
              </button>
            </div>
          </div>

          <!-- Step 4 -->
          <div
            class="step absolute duration-450 [&.active]:delay-200 left-0 top-0 w-full opacity-0 translate-y-[30px] invisible pointer-events-none [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto [&.active]:translate-y-0">
            <div class="text-editor text-center w-full mx-auto relative z-2 mb-[60px]">
              <h1>İstediğiniz hizmetler hangileri?</h1>
            </div>
            <div class="custom-check-tabs">
              <div
                class="tab-buttons relative flex items-center justify-center gap-[45px] xs:gap-[30px] max-w-[825px] mx-auto mb-[90px] lg:mb-[75px] md:mb-[60px] sm:mb-[45px]">
                <div
                  class="active item cursor-pointer group [&.active>.icon]:opacity-100 [&.active>.icon]:scale-100 [&.active>.text]:text-white item flex flex-col items-center relative z-10">
                  <div
                    class="text text-lynch-500 duration-350 font-extralight text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] leading-normal text-center group-hover:text-white">
                    Anahtar Teslim Proje</div>
                  <div
                    class="icon opacity-0 scale-50 duration-350 w-[35px] h-[35px] flex items-center justify-center shadow-[inset_0_0_0_1px_var(--color-ebony-clay-800)] bg-body-color rounded-full mt-[25px]">
                    <span
                      class="icon-chevron-bottom  relative block text-[10px] h-[10px] leading-none text-white translate-x-[-1px]"></span>
                  </div>
                </div>
                <div
                  class="item cursor-pointer group [&.active>.icon]:opacity-100 [&.active>.icon]:scale-100 [&.active>.text]:text-white item flex flex-col items-center relative z-10">
                  <div
                    class="text text-lynch-500 duration-350 font-extralight text-[20px] lg:text-[18px] md:text-[16px] sm:text-[14px] leading-normal text-center group-hover:text-white">
                    İşin Belli Bir Kısmı</div>
                  <div
                    class="icon opacity-0 scale-50 duration-350 w-[35px] h-[35px] flex items-center justify-center shadow-[inset_0_0_0_1px_var(--color-ebony-clay-800)] bg-body-color rounded-full mt-[25px]">
                    <span
                      class="icon-chevron-bottom  relative block text-[10px] h-[10px] leading-none text-white translate-x-[-1px]"></span>
                  </div>
                </div>
                <div
                  class="line h-[1px] w-full absolute left-0 bottom-[17.5px] bg-ebony-clay-800 [mask-image:linear-gradient(90deg,transparent,black,transparent)]">
                </div>
              </div>
              <div class="tab-content overflow-hidden duration-600 relative mx-auto max-w-[575px] w-full">
                <div
                  class="active item p-[12px] custom-check-field grid grid-cols-2 sm:grid-cols-1 gap-[50px] md:gap-[40px] sm:gap-[30px] max-w-[575px] absolute duration-450 [&.active]:delay-200 left-0 top-0 w-full opacity-0 translate-y-[30px] invisible [&.active]:opacity-100 [&.active]:visible [&.active]:translate-y-0">
                  <div class="custom-check relative">
                    <input class="absolute peer left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer" type="checkbox"
                      name="step-4" checked>
                    <div
                      class="box duration-350 peer-hover:translate-y-[-10px] backface-hidden shadow-[0_0_0_1px_var(--color-ebony-clay-800)] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] rounded-[10px] p-[30px] flex flex-col items-center peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
                      <div
                        class="image w-[50px] h-[50px] flex items-center justify-center bg-ebony-clay-800 rounded-[10px] mb-[15px]">
                        <img class="w-[25px] h-[25px] object-contain object-center block"
                          src="@/assets/image/icon/image-1.png" alt="">
                      </div>
                      <div
                        class="text-editor text-center editor-p:leading-normal editor-p:text-[14px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0">
                        <h3>Web Tasarım</h3>
                        <p>Web tasarım ihtiyacınız için seçebilirsiniz.</p>
                      </div>
                      <svg
                        class="absolute right-[15px] top-[15px] fill-primary w-[30px] h-[30px] origin-center scale-50 opacity-0 duration-350"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                          d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z" />
                      </svg>
                    </div>
                  </div>

                  <div class="custom-check relative">
                    <input class="absolute peer left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer" type="checkbox"
                      name="step-4">
                    <div
                      class="box duration-350 peer-hover:translate-y-[-10px] backface-hidden shadow-[0_0_0_1px_var(--color-ebony-clay-800)] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] rounded-[10px] p-[30px] flex flex-col items-center peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
                      <div
                        class="image w-[50px] h-[50px] flex items-center justify-center bg-ebony-clay-800 rounded-[10px] mb-[15px]">
                        <img class="w-[25px] h-[25px] object-contain object-center block"
                          src="@/assets/image/icon/image-2.png" alt="">
                      </div>
                      <div
                        class="text-editor text-center editor-p:leading-normal editor-p:text-[14px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0">
                        <h3>E-Ticaret</h3>
                        <p>Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.</p>
                      </div>
                      <svg
                        class="absolute right-[15px] top-[15px] fill-primary w-[30px] h-[30px] origin-center scale-50 opacity-0 duration-350"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                          d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z" />
                      </svg>
                    </div>
                  </div>

                  <div class="custom-check relative">
                    <input class="absolute peer left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer" type="checkbox"
                      name="step-4">
                    <div
                      class="box duration-350 peer-hover:translate-y-[-10px] backface-hidden shadow-[0_0_0_1px_var(--color-ebony-clay-800)] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] rounded-[10px] p-[30px] flex flex-col items-center peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
                      <div
                        class="image w-[50px] h-[50px] flex items-center justify-center bg-ebony-clay-800 rounded-[10px] mb-[15px]">
                        <img class="w-[25px] h-[25px] object-contain object-center block"
                          src="@/assets/image/icon/image-3.png" alt="">
                      </div>
                      <div
                        class="text-editor text-center editor-p:leading-normal editor-p:text-[14px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0">
                        <h3>Dijital Pazarlama</h3>
                        <p>Web tasarım ihtiyacınız için seçebilirsiniz.</p>
                      </div>
                      <svg
                        class="absolute right-[15px] top-[15px] fill-primary w-[30px] h-[30px] origin-center scale-50 opacity-0 duration-350"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                          d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z" />
                      </svg>
                    </div>
                  </div>

                  <div class="custom-check relative">
                    <input class="absolute peer left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer" type="checkbox"
                      name="step-4">
                    <div
                      class="box duration-350 peer-hover:translate-y-[-10px] backface-hidden shadow-[0_0_0_1px_var(--color-ebony-clay-800)] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] rounded-[10px] p-[30px] flex flex-col items-center peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
                      <div
                        class="image w-[50px] h-[50px] flex items-center justify-center bg-ebony-clay-800 rounded-[10px] mb-[15px]">
                        <img class="w-[25px] h-[25px] object-contain object-center block"
                          src="@/assets/image/icon/image-4.png" alt="">
                      </div>
                      <div
                        class="text-editor text-center editor-p:leading-normal editor-p:text-[14px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0">
                        <h3>Kurumsal Kimlik</h3>
                        <p>Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.</p>
                      </div>
                      <svg
                        class="absolute right-[15px] top-[15px] fill-primary w-[30px] h-[30px] origin-center scale-50 opacity-0 duration-350"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                          d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  class="item p-[12px] custom-check-field grid grid-cols-2 sm:grid-cols-1 gap-[50px] md:gap-[40px] sm:gap-[30px] max-w-[575px] absolute duration-450 [&.active]:delay-200 left-0 top-0 w-full opacity-0 translate-y-[30px] invisible [&.active]:opacity-100 [&.active]:visible [&.active]:translate-y-0">
                  <div class="custom-check relative">
                    <input class="absolute peer left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer" type="checkbox"
                      name="step-4" checked>
                    <div
                      class="box duration-350 peer-hover:translate-y-[-10px] backface-hidden shadow-[0_0_0_1px_var(--color-ebony-clay-800)] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] rounded-[10px] p-[30px] flex flex-col items-center peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
                      <div
                        class="image w-[50px] h-[50px] flex items-center justify-center bg-ebony-clay-800 rounded-[10px] mb-[15px]">
                        <img class="w-[25px] h-[25px] object-contain object-center block"
                          src="@/assets/image/icon/image-1.png" alt="">
                      </div>
                      <div
                        class="text-editor text-center editor-p:leading-normal editor-p:text-[14px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0">
                        <h3>Web Tasarım</h3>
                        <p>Web tasarım ihtiyacınız için seçebilirsiniz.</p>
                      </div>
                      <svg
                        class="absolute right-[15px] top-[15px] fill-primary w-[30px] h-[30px] origin-center scale-50 opacity-0 duration-350"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                          d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z" />
                      </svg>
                    </div>
                  </div>

                  <div class="custom-check relative">
                    <input class="absolute peer left-0 top-0 w-full h-full opacity-0 z-10 cursor-pointer" type="checkbox"
                      name="step-4">
                    <div
                      class="box duration-350 peer-hover:translate-y-[-10px] backface-hidden shadow-[0_0_0_1px_var(--color-ebony-clay-800)] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] rounded-[10px] p-[30px] flex flex-col items-center peer-checked:[&>svg]:opacity-100 peer-checked:[&>svg]:scale-100">
                      <div
                        class="image w-[50px] h-[50px] flex items-center justify-center bg-ebony-clay-800 rounded-[10px] mb-[15px]">
                        <img class="w-[25px] h-[25px] object-contain object-center block"
                          src="@/assets/image/icon/image-2.png" alt="">
                      </div>
                      <div
                        class="text-editor text-center editor-p:leading-normal editor-p:text-[14px] [&>*:last-child]:!mb-0 [&>*:first-child]:!mt-0">
                        <h3>E-Ticaret</h3>
                        <p>Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.</p>
                      </div>
                      <svg
                        class="absolute right-[15px] top-[15px] fill-primary w-[30px] h-[30px] origin-center scale-50 opacity-0 duration-350"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <path
                          d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="button-field flex xs:flex-col-reverse items-center justify-center gap-[50px] sm:gap-[30px] mt-[60px] sm:mt-[45px]">
              <button type="button"
                class="prev-step button border-0 [--circle-bg-color:var(--color-lynch-500)] hover-circle-effect h-[58px] rounded-full px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-ebony-clay-2-900)] bg-ebony-clay-2-900">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">GERİ</div>
              </button>
              <button type="button"
                class="next-step button border-0 [--circle-bg-color:var(--color-chetwode-blue-600)] hover-circle-effect h-[58px] rounded-full px-[60px] md:px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] bg-dull-lavender-500">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">DEVAM ET</div>
              </button>
            </div>
          </div>

          <!-- Step 5 -->
          <div
            class="active step absolute duration-450 [&.active]:delay-200 left-0 top-0 w-full opacity-0 translate-y-[30px] invisible pointer-events-none [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto [&.active]:translate-y-0">
            <div class="text-editor text-center w-full mx-auto relative z-2 mb-[60px]">
              <h1>Bize projenizden bahseder misiniz?</h1>
            </div>
            <div class="form-field grid grid-cols-2 sm:grid-cols-1 gap-x-[30px] gap-y-[45px] max-w-[991px] mx-auto">
              <div class="form-el col-span-2 sm:col-span-1">
                <textarea id="message" placeholder="Pojeniz hakkında bize bilgi verebilir misiniz?"
                  class="h-[200px] peer font-extralight p-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500"></textarea>
                <label for="message"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Proje
                  Bilgileri</label>
              </div>

              <CustomSelect v-model="testSelect" label="Dil Seçeneği" :options="[
                {
                  label: 'İngilizce',
                  value: 'İngilizce'
                },
                {
                  label: 'Türkçe',
                  value: 'Türkçe'
                },
                {
                  label: 'İspanyolca',
                  value: 'İspanyolca'
                }
              ]" />

              <div class="form-el">
                <input type="text" id="company-position" placeholder="Web adresiniz varsa yazınız."
                  class="h-[80px] peer font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] w-full border-0 bg-transparent text-white placeholder:text-lynch-500">
                <label for="company-position"
                  class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Alan
                  Adı</label>
              </div>

              <div class="form-el flex items-center gap-[30px] col-span-2 sm:col-span-1 justify-center">
                <input type="checkbox" id="acceptance" placeholder="E-Posta adresinizi yazınız"
                  class="peer cursor-pointer absolute left-0 top-0 w-full h-full opacity-0 z-10">
                <div
                  class="box relative shrink-0 h-[40px] w-[40px] before:absolute before:duration-350 peer-checked:before:!opacity-100 peer-checked:before:!scale-100 before:scale-0 before:opacity-0 before:left-[50%] before:top-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:rounded-[5px] before:w-[40%] before:h-[40%] before:bg-primary duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] peer-hover:shadow-[0_0_0_1px_var(--color-lynch-600)] peer-checked:!shadow-[0_0_0_1px_var(--color-primary)] rounded-[10px] border-0 bg-transparent">
                </div>
                <label for="acceptance" class="text-lynch-500 leading-normal duration-350 font-extralight"><a
                    href="#kvkk-popup"
                    class="inline-block relative z-20 text-lynch-400 font-semibold hover:text-white duration-350"
                    data-fancybox>KVKK şartlarını</a> okudum ve kabul ediyorum.</label>
              </div>
            </div>
            <div
              class="button-field flex xs:flex-col-reverse items-center justify-center gap-[50px] sm:gap-[30px] mt-[60px] sm:mt-[45px]">
              <button type="button"
                class="prev-step button border-0 [--circle-bg-color:var(--color-lynch-500)] hover-circle-effect h-[58px] rounded-full px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-ebony-clay-2-900)] bg-ebony-clay-2-900">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">GERİ</div>
              </button>
              <!-- Bunu butona çevirirsiniz ben sayfaya yönlendirmek için a-href yaptım -->
              <a href="page-formsuccess.php"
                class="button border-0 [--circle-bg-color:var(--color-chetwode-blue-600)] hover-circle-effect h-[58px] rounded-full px-[60px] md:px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] bg-dull-lavender-500">
                <div class="text relative z-10 text-[14px] tracking-widest text-white">FORMU GÖNDER</div>
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  </article>
</template>
