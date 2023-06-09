<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from "vue";

defineProps({
  title: {
    type: String,
    default: "Teklif al formu gönderilmiştir.",
  },
  description: {
    type: String,
    default:
      "Müşteri temsilcimiz en kısa sürede sizlere geri dönüş sağlayacaktır.",
  },
});

const loadingDash = ref(0);
const count = ref(5);
const loadingDashRef = ref<HTMLElement | null>(null);

watch(loadingDash, (value: any) => {
  if (loadingDashRef.value && value <= 5) {
    const progress = value * 100 / 500;    

    loadingDashRef.value.style.strokeDasharray = `${progress} 1`;
  }
});

onMounted(() => {
  const interval = setInterval(() => {
    loadingDash.value += 0.1;
    
    if (loadingDash.value > 5) {
      clearInterval(interval);
    }
  }, 100);

  const countInterval = setInterval(() => {
    count.value -= 1;

    if (count.value === 1) {
      clearInterval(countInterval);
    }
  }, 1000);

  setTimeout(() => {
    window.location.href = "/";
  }, 5000);
});
</script>

<template>
  <div
    class="sm:pt-10 container flex h-full flex-col items-center justify-center pb-20"
  >
    <svg
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="90"
        cy="90"
        r="89"
        fill="#1C212C"
        stroke="url(#paint0_linear_703_2888)"
        stroke-width="2"
      />
      <g clip-path="url(#clip0_703_2888)">
        <path
          d="M112.052 67.6172L81.481 95.9779L68.5524 82.1809L60 90.195L80.8868 112.485L120 76.2328L112.052 67.6172Z"
          fill="#8C9FE1"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_703_2888"
          x1="90"
          y1="0"
          x2="90"
          y2="180"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#8C9FE1" />
          <stop
            offset="0.435312"
            stop-color="#8C9FE1"
            stop-opacity="0.564688"
          />
          <stop offset="1" stop-color="#8C9FE1" stop-opacity="0" />
        </linearGradient>
        <clipPath id="clip0_703_2888">
          <rect
            width="60"
            height="60"
            fill="white"
            transform="translate(60 60)"
          />
        </clipPath>
      </defs>
    </svg>

    <h2 class="mt-16 text-4xl font-extralight text-white">
      {{ title }}
    </h2>
    <p class="mt-10 text-lg font-extralight text-[#6D7E9B]">
      {{ description }}
    </p>

    <div role="status" class="mt-10">
        <div class="relative">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="30" pathLength="1" class="stroke-white stroke-[15%] fill-none" style="stroke-dashoffset: 0;"></circle>
            <circle cx="50" cy="50" r="30" ref="loadingDashRef" pathLength="1" class="stroke-[#8C9FE1] stroke-[15%] fill-none transition-all duration-100" style="stroke-dashoffset: 0;stroke-dasharray: 0 1;"></circle>
          </svg>
          <span class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {{ count }}
          </span>
        </div>
    </div>

    <a
        href="/"
        type="button"
        class="mt-5 next-step button hover-circle-effect flex-center h-[58px] w-fit rounded-full bg-dull-lavender-500 px-[60px] shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] [--circle-bg-color:var(--color-chetwode-blue-600)] md:px-[45px] sm:px-[30px]"
      >
        <div class="text relative z-10 text-[14px] tracking-widest text-white">
          Anasayfaya Dön
        </div>
      </a>
  </div>
</template>
