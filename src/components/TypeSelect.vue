<template>
  <article class="container">
    <div class="relative mx-auto w-full max-w-5x text-center">
      <h1 class="text-4xl font-extralight">Size Nasıl Yardımcı Olabiliriz?</h1>
      <p class="mt-10 text-xl font-extralight text-[#6D7E9B] max-w-[42rem] mx-auto">
        Etkileyici, kullanışlı, benzersiz, her zaman modern projeler üretiyoruz.
        Dijital dünyadaki görsel şovlarda ne yapılması gerektiğini çok iyi
        biliyoruz. Müşterilerimizi çok iyi dinliyor.
      </p>
    </div>

    <div
      class="mx-auto mt-20 sm:mt-10 flex w-full max-w-3xl flex-row items-center gap-20 sm:gap-10 sm:flex-col xs:pb-10"
    >
      <div class="custom-check relative h-[300px] w-[400px] xs:h-auto xs:w-auto">
        <input
          class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
          type="radio"
          name="type"
          value="quickly"
          @input="$emit('update:modelValue', 'quickly')"
        />
        <div
          class="box peer-checked:[&amp;>svg]:opacity-100 peer-checked:[&amp;>svg]:scale-100 flex flex-col items-center rounded-[10px] p-[30px] shadow-[0_0_0_1px_var(--color-ebony-clay-800)] duration-350 backface-hidden peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] peer-hover:translate-y-[-10px] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)]"
        >
          <div
            class="image mb-[15px] flex h-[77px] w-[77px] items-center justify-center rounded-xl bg-[#222834]"
          >
            <svg
              width="26"
              height="34"
              viewBox="0 0 26 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.9736 13.8552C24.8559 13.6344 24.6702 13.4575 24.444 13.3507C24.2179 13.2439 23.9633 13.2129 23.7181 13.2623L17.3243 14.6108L19.3006 1.82331C19.3372 1.57801 19.2944 1.32743 19.1784 1.1082C19.0624 0.888971 18.8794 0.712573 18.656 0.604785C18.4327 0.496998 18.1807 0.463473 17.9369 0.509108C17.6931 0.554742 17.4703 0.677146 17.3011 0.85843L1.02607 18.2959C0.858418 18.4762 0.752328 18.705 0.723079 18.9495C0.693831 19.1939 0.742935 19.4413 0.863316 19.6561C0.98208 19.8725 1.16664 20.0454 1.39028 20.1499C1.61391 20.2544 1.865 20.285 2.10719 20.2373L8.59394 18.8888L6.52469 31.6763C6.48454 31.9232 6.52506 32.1764 6.64024 32.3983C6.75542 32.6203 6.93912 32.7993 7.16407 32.9086C7.38825 33.0173 7.64145 33.0512 7.88633 33.0051C8.13122 32.9591 8.35483 32.8356 8.52419 32.6528L24.7992 15.2153C24.9687 15.0364 25.0769 14.8082 25.1083 14.5637C25.1396 14.3192 25.0924 14.0711 24.9736 13.8552ZM9.44257 28.2818L11.1747 17.5636C11.2019 17.3961 11.192 17.2247 11.1459 17.0614C11.0998 16.8981 11.0185 16.7469 10.9077 16.6184C10.7969 16.4899 10.6593 16.3872 10.5046 16.3175C10.3499 16.2478 10.1818 16.2129 10.0122 16.2151H9.77969L5.22269 17.1683L16.4292 5.18293L14.7784 15.9361C14.7494 16.1221 14.7659 16.3124 14.8267 16.4905C14.8874 16.6687 14.9906 16.8295 15.1272 16.9591C15.2635 17.0872 15.4288 17.1805 15.6089 17.2311C15.789 17.2817 15.9787 17.2881 16.1618 17.2497L20.6026 16.3197L9.44257 28.2818Z"
                fill="white"
              />
            </svg>
          </div>
          <h3 class="py-2 text-[20px] font-extralight">Hızlı Teklif Al</h3>
          <p class="py-4 text-sm text-[#6D7E9B]">Doldurma Süresi : 40 sn.</p>
          <svg
            class="absolute right-[15px] top-[15px] h-[30px] w-[30px] origin-center scale-50 fill-primary opacity-0 duration-350"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
          >
            <path
              d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z"
            ></path>
          </svg>
        </div>
      </div>
      <div class="custom-check relative h-[300px] w-[400px] xs:h-auto xs:w-auto">
        <input
          class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
          type="radio"
          name="type"
          value="project"
          @input="$emit('update:modelValue', 'project')"
        />
        <div
          class="box peer-checked:[&amp;>svg]:opacity-100 peer-checked:[&amp;>svg]:scale-100 flex flex-col items-center rounded-[10px] p-[30px] shadow-[0_0_0_1px_var(--color-ebony-clay-800)] duration-350 backface-hidden peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] peer-hover:translate-y-[-10px] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)]"
        >
          <div
            class="image mb-[15px] flex h-[77px] w-[77px] items-center justify-center rounded-xl bg-[#222834]"
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M36.6178 17.4501L30.6438 14.4632L36.6178 11.4761C37.6864 10.942 37.6875 9.41163 36.6178 8.87664L19.4708 0.303162C19.0616 0.0988157 18.5802 0.0988157 18.171 0.303162L1.02402 8.87664C-0.0445469 9.41106 -0.0456821 10.9414 1.02402 11.4761L6.99803 14.4632L1.02402 17.4501C-0.0445469 17.9845 -0.0456821 19.5146 1.02402 20.0496L6.99803 23.0367L1.02402 26.0236C-0.0445469 26.558 -0.0456821 28.0881 1.02402 28.623L18.171 37.1965C18.5794 37.4006 19.0607 37.4014 19.4708 37.1965L36.6178 28.623C37.6864 28.0886 37.6875 26.5586 36.6178 26.0236L30.6438 23.0367L36.6178 20.0496C37.6864 19.5154 37.6875 17.9851 36.6178 17.4501ZM18.8209 3.22759L32.7185 10.1765L18.8209 17.1251L4.92335 10.1765L18.8209 3.22759ZM32.7185 27.3235L18.8209 34.2721L4.92335 27.3235L10.2474 24.6613L18.171 28.623C18.5797 28.8271 19.0607 28.828 19.4708 28.623L27.3944 24.6613L32.7185 27.3235ZM18.8209 25.6986L4.92335 18.75L10.2474 16.0878L18.171 20.0496C18.5797 20.2536 19.0607 20.2545 19.4708 20.0496L27.3944 16.0878L32.7185 18.75L18.8209 25.6986Z"
                fill="white"
              />
            </svg>
          </div>
          <h3 class="py-2 text-[20px] font-extralight">Projem Var</h3>
          <p class="py-4 text-sm text-[#6D7E9B]">Doldurma Süresi : 2 dk.</p>
          <svg
            class="absolute right-[15px] top-[15px] h-[30px] w-[30px] origin-center scale-50 fill-primary opacity-0 duration-350"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
          >
            <path
              d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>
