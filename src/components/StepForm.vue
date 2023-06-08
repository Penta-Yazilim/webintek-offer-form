<script setup lang="ts">
import CustomSelect from "@/components/CustomSelect.vue";
import Steps from "@/components/Steps.vue";
import Step from "@/components/Step.vue";
import { nextTick, onMounted, reactive, watch, ref, computed } from "vue";
import locations from "@/data/locations.json";

// @ts-ignore
import Form from "form-backend-validation";

const emit = defineEmits(["showSuccess"]);

const props = defineProps({
  baseURL: {
    type: String,
    required: true,
  },
  canBack: {
    type: Boolean,
    default: false,
  },
});

const refSteps = ref<any>(null);

const form = reactive(
  new Form({
    for: "company",
    service_type: "complete",
    name: null,
    last_name: null,
    phone_number: null,
    email_address: null,
    desc: null,
    _services: [],
    _languages: [],
    site_address: null,
    company_name: null,
    company_position: null,
    city: "",
    district: "",
    agreement: false,
  })
);

const reset = () => {
  form.reset();
};

defineExpose({ reset });

const stepInputs = {
  0: ["for"],
  1: ["_services"],
  2: ["desc", "_languages", "site_address"],
  3:
    form.for === "company"
      ? ["company_name", "company_position"]
      : [
          "name",
          "last_name",
          "phone_number",
          "email_address",
          "city",
          "district",
        ],
  4: [
    "name",
    "last_name",
    "phone_number",
    "email_address",
    "city",
    "district",
  ],
};

async function submitForm() {
  try {
    const data = await form.post(`${props.baseURL}/service-form`);

    emit("showSuccess", data.message);
  } catch (error: any) {
    const { response } = error;

    if (response.status === 422) {
      const { errors } = response.data;

      let step = Object.keys(stepInputs).find((values, key: number) => {
        return stepInputs[key as keyof typeof stepInputs].some((input) => {
          return errors[input];
        });
      });

      const stepErrors = Object.keys(stepInputs).map((values, key: number) => {
        return stepInputs[key as keyof typeof stepInputs]
          .map((input) => {
            return errors[input] ?? null;
          })
          .filter((error) => error);
      });

      refSteps.value.steps.setErrors(stepErrors);

      if (step) {
        if(form.for === 'personal' && parseInt(step) === 4){
          step = '3';
        }

        refSteps.value.steps.go(Number(step));
      }
    }
  }
}

watch(
  () => form.service_type,
  (val) => {
    setTabContent(false);
  }
);

interface CompleteService {
  title: string;
}

const webServices = reactive<CompleteService[]>([
  {
    title: "Web Tasarım",
  },
  {
    title: "Arayüz Tasarımı (UX / UI)",
  },
  {
    title: "Web Yazılım",
  },
  {
    title: "E-Ticaret",
  },
  {
    title: "Mobil Uygulama Geliştirme",
  },
  {
    title: "Webintek CMS",
  },
  {
    title: "Sunucu ve Hosting Hizmetleri",
  },
]);

const digitalMarketing = reactive<CompleteService[]>([
  { 
    title: 'Sosyal Medya Yönetimi'
  },
  { 
    title: 'Sosyal Medya Reklamları'
  },
  { 
    title: 'Google Arama Ağı Reklamları'
  },
  { 
    title: 'Google Alışveriş Reklamları'
  },
  { 
    title: 'S.E.O. Hizmetleri'
  },
]);

const corporateIdentity = reactive<CompleteService[]>([
  {
    title: "Kurumsal Kimlik Tasarımı",
  },
  {
    title: "Logo Tasarımı",
  },
  {
    title: "Katolog Tasarımı",
  },
  {
    title: "Fotoğraf Çekimi",
  },
  {
    title: "Video Prodüksiyon",
  },
  {
    title: "Banner Slider",
  },
  {
    title: "Kurumsal E-Mail",
  },
]);

const setHeight = async () => {
  await nextTick();

  const activeStep = document.querySelector(
    ".form-content .steps .step.active"
  ) as HTMLElement;

  if (activeStep) {
    const steps = document.querySelector(".form-content .steps") as HTMLElement;

    steps.style.height = `${activeStep.scrollHeight}px`;
  }
};

onMounted(() => {
  setTabContent();
});

async function setTabContent(setHeightOfSteps = true) {
  await nextTick();

  const content = document.querySelector(
    ".c-check-tabs .tab-content"
  ) as HTMLElement;

  if (content) {
    const item = document.querySelector(
      ".c-check-tabs .tab-content .item.active"
    ) as HTMLElement;

    const h = item.scrollHeight + 30;

    content.style.height = `${h}px`;
  }

  if (setHeightOfSteps) {
    await nextTick();

    setHeight();
  }
}

const cities = ref<any>([]);

const districts = ref<any>([]);

const setLocations = async () => {
  const { data } = locations;

  cities.value = data
    .map((city: any) => {
      return {
        ...city,
        nufus: parseInt(city.nufus.replaceAll(".", "")),
      };
    })
    .sort((a: any, b: any) => b.nufus - a.nufus);

  districts.value = data.flatMap((city: any) => city.ilceler);
};

const getDistricts = computed(() => {
  return districts.value.filter((district: any) => {
    return (
      district.il_adi.toLowerCase().replaceAll("i̇", "i") ==
      form.city.toLowerCase().replaceAll("i̇", "i")
    );
  });
});

setLocations();
</script>

<template>
  <Steps :form="form" @submit="submitForm" ref="refSteps" :inputs="stepInputs" :api-url="props.baseURL">
    <Step :index="0" title="Bu projeyi kimin için yapacağız?" :can-back="canBack" @back="(e) => $emit('back')">
      <div
        class="custom-check-field mx-auto grid max-w-[600px] grid-cols-2 gap-[50px] md:gap-[40px] sm:grid-cols-1 sm:gap-[30px]"
      >
        <div class="custom-check relative">
          <input
            class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0 checked:pointer-events-none"
            type="radio"
            name="for"
            value="company"
            v-model="form.for"
          />
          <div
            class="box flex flex-col items-center rounded-[10px] py-6 px-8 shadow-[0_0_0_1px_var(--color-ebony-clay-800)] duration-350 backface-hidden peer-checked:pointer-events-none peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] peer-hover:translate-y-[-10px] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100"
          >
            <div
              class="image mb-[15px] flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-ebony-clay-800"
            >
              <img
                class="block h-[25px] w-[25px] object-contain object-center"
                src="@/assets/image/icon/image-12.png"
                alt=""
              />
            </div>
            <div
              class="text-editor text-center editor-p:text-[14px] editor-p:leading-normal [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0"
            >
              <h3>Şirketim İçin</h3>
              <p>Web tasarım ihtiyacınız için seçebilirsiniz.</p>
            </div>
            <svg
              class="absolute right-[15px] top-[15px] h-[30px] w-[30px] origin-center scale-50 fill-primary opacity-0 duration-350"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
            >
              <path
                d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z"
              />
            </svg>
          </div>
        </div>

        <div class="custom-check relative">
          <input
            class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0 checked:pointer-events-none"
            type="radio"
            value="personal"
            name="for"
            v-model="form.for"
          />
          <div
            class="box flex flex-col items-center rounded-[10px] py-6 px-8 shadow-[0_0_0_1px_var(--color-ebony-clay-800)] duration-350 backface-hidden peer-checked:pointer-events-none peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] peer-hover:translate-y-[-10px] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100"
          >
            <div
              class="image mb-[15px] flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-ebony-clay-800"
            >
              <img
                class="block h-[25px] w-[25px] object-contain object-center"
                src="@/assets/image/icon/image-13.png"
                alt=""
              />
            </div>
            <div
              class="text-editor text-center editor-p:text-[14px] editor-p:leading-normal [&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0"
            >
              <h3>Şahsım İçin</h3>
              <p>Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.</p>
            </div>
            <svg
              class="absolute right-[15px] top-[15px] h-[30px] w-[30px] origin-center scale-50 fill-primary opacity-0 duration-350"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
            >
              <path
                d="m15,0C6.73,0,0,6.73,0,15s6.73,15,15,15,15-6.73,15-15S23.27,0,15,0Zm8.38,11.05l-9.59,9.51c-.56.56-1.47.6-2.07.04l-5.08-4.62c-.6-.56-.64-1.5-.11-2.11.56-.6,1.5-.64,2.11-.08l4.02,3.68,8.57-8.57c.6-.6,1.54-.6,2.14,0,.6.6.6,1.54,0,2.14Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </Step>

    <Step :index="1" title="İstediğiniz hizmetler hangileri?">
      <template v-if="form.errors.has('_services')">
        <div class="text-red-500 italic mt-4 text-center" v-for="error in form.errors.get('_services')">
          {{ error }}
        </div>
      </template>

      <div class="grid grid-cols-3 md:grid-cols-1 gap-x-8 gap-y-10 mt-4 relative z-50 border">
          <div class="border border-solid border-[#2B3240] hover:bg-[#1B222F]/75 hover:border-transparent rounded-lg px-4 py-2 transition duration-450">
            <div class="flex items-center pt-3 pb-6 px-3 border-b border-solid border-[#2B3240]">
              <div class="flex mr-6">
                <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1402_3375)">
                  <path d="M50.375 62H11.625C5.20413 62 0 56.7959 0 50.375V11.625C0 5.20413 5.20413 0 11.625 0H50.375C56.7959 0 62 5.20413 62 11.625V50.375C62 56.7959 56.7959 62 50.375 62Z" fill="#222834"/>
                  <path d="M16.4688 27.125H28.7389C29.2737 27.125 29.7077 26.691 29.7077 26.1562C29.7077 25.6215 29.2737 25.1875 28.7389 25.1875H16.4688C15.934 25.1875 15.5 25.6215 15.5 26.1562C15.5 26.691 15.934 27.125 16.4688 27.125Z" fill="#687185"/>
                  <path d="M16.4688 31H28.7389C29.2737 31 29.7077 30.566 29.7077 30.0312C29.7077 29.4965 29.2737 29.0625 28.7389 29.0625H16.4688C15.934 29.0625 15.5 29.4965 15.5 30.0312C15.5 30.566 15.934 31 16.4688 31Z" fill="#687185"/>
                  <path d="M16.4688 34.875H28.7389C29.2737 34.875 29.7077 34.441 29.7077 33.9062C29.7077 33.3715 29.2737 32.9375 28.7389 32.9375H16.4688C15.934 32.9375 15.5 33.3715 15.5 33.9062C15.5 34.441 15.934 34.875 16.4688 34.875Z" fill="#687185"/>
                  <path d="M16.4688 38.75H28.7389C29.2737 38.75 29.7077 38.316 29.7077 37.7812C29.7077 37.2465 29.2737 36.8125 28.7389 36.8125H16.4688C15.934 36.8125 15.5 37.2465 15.5 37.7812C15.5 38.316 15.934 38.75 16.4688 38.75Z" fill="#687185"/>
                  <path d="M16.4688 42.625H28.7389C29.2737 42.625 29.7077 42.191 29.7077 41.6562C29.7077 41.1215 29.2737 40.6875 28.7389 40.6875H16.4688C15.934 40.6875 15.5 41.1215 15.5 41.6562C15.5 42.191 15.934 42.625 16.4688 42.625Z" fill="#687185"/>
                  <path d="M44.2396 25.1875H34.5521C33.3063 25.1875 32.291 26.2008 32.291 27.4486V32.6159C32.291 33.8617 33.3043 34.8769 34.5521 34.8769H44.2396C45.4873 34.875 46.5006 33.8617 46.5006 32.6139V27.4466C46.5006 26.2008 45.4873 25.1875 44.2396 25.1875Z" fill="#606ECD"/>
                  <path d="M44.2396 36.8125H34.5521C33.3063 36.8125 32.291 37.8258 32.291 39.0736V44.2409C32.291 45.4867 33.3043 46.5019 34.5521 46.5019H44.2396C45.4873 46.5 46.5006 45.4867 46.5006 44.2389V39.0716C46.5006 37.8258 45.4873 36.8125 44.2396 36.8125Z" fill="#606ECD"/>
                  <path d="M16.4688 46.5H28.7389C29.2737 46.5 29.7077 46.066 29.7077 45.5312C29.7077 44.9965 29.2737 44.5625 28.7389 44.5625H16.4688C15.934 44.5625 15.5 44.9965 15.5 45.5312C15.5 46.066 15.934 46.5 16.4688 46.5Z" fill="#687185"/>
                  <path d="M44.2393 15.5H28.0941C26.8483 15.5 25.833 16.5133 25.833 17.7611V20.9909C25.833 22.2367 26.8463 23.2519 28.0941 23.2519H44.2393C45.487 23.25 46.5003 22.2367 46.5003 20.9889V17.7611C46.5003 16.5133 45.487 15.5 44.2393 15.5Z" fill="#606ECD"/>
                  <path d="M19.375 23.25C21.5151 23.25 23.25 21.5151 23.25 19.375C23.25 17.2349 21.5151 15.5 19.375 15.5C17.2349 15.5 15.5 17.2349 15.5 19.375C15.5 21.5151 17.2349 23.25 19.375 23.25Z" fill="#606ECD"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_1402_3375">
                  <rect width="62" height="62" rx="10" fill="white"/>
                  </clipPath>
                  </defs>
                </svg>
              </div>

              <h2 class="text-xl text-white font-extralight">Web Hizmetleri</h2>
            </div>

            <ul class="py-4 flex flex-col font-light text-lg text-white">
              <li v-for="(service,i) in webServices" :key="i">
                <label class="flex items-center w-full py-4 rounded-xl hover:bg-[#222834] px-8 cursor-pointer" :for="`web-service-${i}`">
                  <input
                    type="checkbox"
                    v-model="form._services"
                    :id="`web-service-${i}`"
                    :value="service.title"
                    class="hidden" 
                  />

                  <span class="flex-1 pr-5 whitespace-pre-wrap">
                    {{ service.title }}
                  </span>

                  <svg 
                    :class="{'!block': form._services.includes(service.title)}"
                    class="ml-auto hidden" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1454 0.777344L5.01224 7.39485L1.99556 4.17555L0 6.0455L4.8736 11.2465L14 2.78764L12.1454 0.777344Z" fill="#606ECD"/>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
          <div class="border border-solid border-[#2B3240] hover:bg-[#1B222F]/75 hover:border-transparent rounded-lg px-4 py-2 transition duration-450">
            <div class="flex items-center pt-3 pb-6 px-3 border-b border-solid border-[#2B3240]">
              <div class="flex mr-6">
                <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50.375 62H11.625C5.20413 62 0 56.7959 0 50.375V11.625C0 5.20413 5.20413 0 11.625 0H50.375C56.7959 0 62 5.20413 62 11.625V50.375C62 56.7959 56.7959 62 50.375 62Z" fill="#222834"/>
                  <path d="M44.5936 18.5996H18.6466C17.2536 18.5996 16.1201 19.735 16.1201 21.128V25.5359C16.1201 28.1224 18.2242 30.2246 20.8089 30.2246C22.1961 30.2246 23.4303 29.6085 24.2886 28.6494C25.2012 29.6143 26.4838 30.2246 27.9117 30.2246C29.3881 30.2246 30.7037 29.5697 31.6182 28.5487C32.5346 29.5697 33.8482 30.2246 35.3246 30.2246C36.7545 30.2246 38.0371 29.6143 38.9477 28.6494C39.8061 29.6085 41.0422 30.2246 42.4275 30.2246C45.0141 30.2246 47.1162 28.1205 47.1162 25.5359V21.128C47.1201 19.735 45.9867 18.5996 44.5936 18.5996ZM22.9149 25.5359C22.9149 26.6964 21.9694 27.6419 20.8089 27.6419C19.6483 27.6419 18.7028 26.6964 18.7028 25.5359L18.6466 21.1842H22.9149V25.2278V25.5359ZM27.9137 27.6419C26.5826 27.6419 25.4996 26.5589 25.4996 25.2278V21.1842H30.3297V25.2278C30.3278 26.5589 29.2447 27.6419 27.9137 27.6419ZM35.3266 27.6419C33.9955 27.6419 32.9124 26.5589 32.9124 25.2278V21.1842H37.7426V25.2278C37.7426 26.5589 36.6576 27.6419 35.3266 27.6419ZM44.5374 25.5359C44.5374 26.6964 43.5919 27.6419 42.4314 27.6419C41.2708 27.6419 40.3253 26.6964 40.3253 25.5359V25.2259V21.1707L44.5374 21.128V25.5359Z" fill="#687185"/>
                  <path d="M43.9173 32.1371V35.0298H18.0827V32.1371C17.1275 31.8387 16.2479 31.3621 15.5 30.7285V37.936C15.5 39.176 16.5211 40.1971 17.7611 40.1971H27.6539C27.5028 40.8442 27.0998 41.8943 26.0245 42.9696C25.8404 43.1537 25.7842 43.4327 25.885 43.673C25.9838 43.9151 26.2202 44.0721 26.4817 44.0721H35.5241C35.7856 44.0721 36.022 43.9151 36.1208 43.673C36.2196 43.4308 36.1654 43.1537 35.9813 42.9696C34.9079 41.8963 34.4953 40.8461 34.3344 40.1971H44.2428C45.4828 40.1971 46.5039 39.176 46.5039 37.936V30.7285C45.7521 31.3621 44.8725 31.8387 43.9173 32.1371Z" fill="#606ECD"/>
                </svg>
              </div>

              <h2 class="text-xl text-white font-extralight">Dijital Pazarlama</h2>
            </div>

            <ul class="py-4 flex flex-col font-light text-lg text-white">
              <li v-for="(service,i) in digitalMarketing" :key="i">
                <label class="flex items-center w-full py-4 rounded-xl hover:bg-[#222834] px-8 cursor-pointer" :for="`digital-market-${i}`">
                  <input
                    type="checkbox"
                    v-model="form._services"
                    :id="`digital-market-${i}`"
                    :value="service.title"
                    class="hidden" 
                  />

                  <span class="flex-1 pr-4">
                    {{ service.title }}
                  </span>

                  <svg 
                    :class="{'!block': form._services.includes(service.title)}"
                    class="ml-auto hidden" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1454 0.777344L5.01224 7.39485L1.99556 4.17555L0 6.0455L4.8736 11.2465L14 2.78764L12.1454 0.777344Z" fill="#606ECD"/>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
          <div class="border border-solid border-[#2B3240] hover:bg-[#1B222F]/75 hover:border-transparent rounded-lg px-4 py-2 transition duration-450">
            <div class="flex items-center pt-3 pb-6 px-3 border-b border-solid border-[#2B3240]">
              <div class="flex mr-6">
                <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50.375 62H11.625C5.20413 62 0 56.7959 0 50.375V11.625C0 5.20413 5.20413 0 11.625 0H50.375C56.7959 0 62 5.20413 62 11.625V50.375C62 56.7959 56.7959 62 50.375 62Z" fill="#222834"/>
                  <path d="M29.5521 38.5944C29.2643 38.5944 28.9884 38.4801 28.7849 38.2766C28.5814 38.0731 28.4671 37.7971 28.4671 37.5094V36.0627C28.4671 35.1994 28.1242 34.3715 27.5137 33.7611C26.9033 33.1506 26.0754 32.8077 25.2121 32.8077C24.3488 32.8077 23.5209 33.1506 22.9105 33.7611C22.3 34.3715 21.9571 35.1994 21.9571 36.0627V37.5094C21.9571 37.7971 21.8428 38.0731 21.6393 38.2766C21.4358 38.4801 21.1599 38.5944 20.8721 38.5944C20.5843 38.5944 20.3084 38.4801 20.1049 38.2766C19.9014 38.0731 19.7871 37.7971 19.7871 37.5094V36.0627C19.7871 34.6239 20.3587 33.244 21.3761 32.2266C22.3934 31.2093 23.7733 30.6377 25.2121 30.6377C26.6509 30.6377 28.0308 31.2093 29.0482 32.2266C30.0655 33.244 30.6371 34.6239 30.6371 36.0627V37.5094C30.6371 37.7971 30.5228 38.0731 30.3193 38.2766C30.1158 38.4801 29.8399 38.5944 29.5521 38.5944Z" fill="#606ECD"/>
                  <path d="M25.2114 32.8076C24.2815 32.8076 23.3725 32.5319 22.5993 32.0153C21.8261 31.4986 21.2235 30.7643 20.8677 29.9052C20.5118 29.0461 20.4187 28.1007 20.6001 27.1887C20.7815 26.2767 21.2293 25.4389 21.8869 24.7814C22.5444 24.1238 23.3822 23.6761 24.2942 23.4946C25.2062 23.3132 26.1516 23.4063 27.0107 23.7622C27.8698 24.1181 28.6041 24.7207 29.1207 25.4939C29.6374 26.267 29.9131 27.1761 29.9131 28.106C29.9116 29.3525 29.4157 30.5475 28.5343 31.4289C27.6529 32.3103 26.4579 32.8061 25.2114 32.8076ZM25.2114 25.5743C24.7107 25.5743 24.2212 25.7228 23.8049 26.001C23.3886 26.2791 23.0641 26.6745 22.8725 27.1371C22.6809 27.5997 22.6307 28.1088 22.7284 28.5999C22.8261 29.091 23.0672 29.5421 23.4213 29.8961C23.7753 30.2502 24.2264 30.4913 24.7175 30.589C25.2086 30.6867 25.7177 30.6365 26.1803 30.4449C26.6429 30.2533 27.0383 29.9288 27.3164 29.5125C27.5946 29.0962 27.7431 28.6067 27.7431 28.106C27.7423 27.4348 27.4754 26.7913 27.0007 26.3167C26.5261 25.842 25.8826 25.5751 25.2114 25.5743Z" fill="#606ECD"/>
                  <path d="M41.1256 43.6575H20.8723C19.4339 43.656 18.055 43.0839 17.0379 42.0669C16.0209 41.0498 15.4488 39.6708 15.4473 38.2325V23.7658C15.4488 22.3275 16.0209 20.9485 17.0379 19.9315C18.055 18.9144 19.4339 18.3424 20.8723 18.3408H41.1256C42.5639 18.3424 43.9429 18.9144 44.96 19.9315C45.977 20.9485 46.5491 22.3275 46.5506 23.7658V38.2325C46.5491 39.6708 45.977 41.0498 44.96 42.0669C43.9429 43.0839 42.5639 43.656 41.1256 43.6575ZM20.8723 20.5108C20.0092 20.5116 19.1817 20.8548 18.5715 21.465C17.9612 22.0753 17.618 22.9028 17.6173 23.7658V38.2325C17.618 39.0955 17.9612 39.923 18.5715 40.5333C19.1817 41.1435 20.0092 41.4867 20.8723 41.4875H41.1256C41.9886 41.4867 42.8161 41.1435 43.4264 40.5333C44.0366 39.923 44.3798 39.0955 44.3806 38.2325V23.7658C44.3798 22.9028 44.0366 22.0753 43.4264 21.465C42.8161 20.8548 41.9886 20.5116 41.1256 20.5108H20.8723Z" fill="#687185"/>
                  <path d="M38.2323 34.9776H33.169C32.8812 34.9776 32.6053 34.8633 32.4018 34.6598C32.1983 34.4564 32.084 34.1804 32.084 33.8926C32.084 33.6049 32.1983 33.3289 32.4018 33.1254C32.6053 32.9219 32.8812 32.8076 33.169 32.8076H38.2323C38.5201 32.8076 38.7961 32.9219 38.9995 33.1254C39.203 33.3289 39.3173 33.6049 39.3173 33.8926C39.3173 34.1804 39.203 34.4564 38.9995 34.6598C38.7961 34.8633 38.5201 34.9776 38.2323 34.9776Z" fill="#606ECD"/>
                  <path d="M41.1257 30.6368H33.169C32.8812 30.6368 32.6053 30.5225 32.4018 30.319C32.1983 30.1155 32.084 29.8396 32.084 29.5518C32.084 29.264 32.1983 28.9881 32.4018 28.7846C32.6053 28.5811 32.8812 28.4668 33.169 28.4668H41.1257C41.4134 28.4668 41.6894 28.5811 41.8929 28.7846C42.0963 28.9881 42.2107 29.264 42.2107 29.5518C42.2107 29.8396 42.0963 30.1155 41.8929 30.319C41.6894 30.5225 41.4134 30.6368 41.1257 30.6368Z" fill="#606ECD"/>
                </svg>
              </div>

              <h2 class="text-xl text-white font-extralight">Kurumsal Kimlik</h2>
            </div>

            <ul class="py-4 flex flex-col font-light text-lg text-white">
              <li v-for="(service,i) in corporateIdentity" :key="i">
                <label class="flex items-center w-full py-4 rounded-xl hover:bg-[#222834] px-8 cursor-pointer" :for="`ci-${i}`">
                  <input
                    type="checkbox"
                    v-model="form._services"
                    :id="`ci-${i}`"
                    :value="service.title"
                    class="hidden" 
                  />

                  <span class="flex-1 pr-4">
                    {{ service.title }}
                  </span>

                  <svg 
                    :class="{'!block': form._services.includes(service.title)}" 
                    class="ml-auto hidden" width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.1454 0.777344L5.01224 7.39485L1.99556 4.17555L0 6.0455L4.8736 11.2465L14 2.78764L12.1454 0.777344Z" fill="#606ECD"/>
                  </svg>
                </label>
              </li>
            </ul>
          </div>
      </div>
    </Step>

    <Step :index="2" title="Bize projenizden bahseder misiniz?">
      <div
        class="form-field mx-auto grid max-w-[991px] grid-cols-2 gap-x-[30px] gap-y-[45px] sm:grid-cols-1"
      >
        <div class="form-el col-span-2 sm:col-span-1">
          <textarea
            id="message"
            placeholder="Pojeniz hakkında bize bilgi verebilir misiniz?"
            v-model="form.desc"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0': form.errors.has('desc'),
            }"
            class="peer h-[200px] w-full rounded-[10px] border-0 bg-transparent p-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
          ></textarea>
          <label
            for="message"
            :class="{ '!text-pink-600': form.errors.has('desc') }"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            >Proje Bilgileri</label
          >
          <p class="mt-2 text-sm text-pink-600" v-if="form.errors.has('desc')">
            {{ form.errors.first("desc") }}
          </p>
        </div>

        <CustomSelect
          label="Dil Seçeneği"
          placeholder="Projenizdeki dil seçenekleri nelerdir?"
          multiple
          :error="form.errors.first('_languages')"
          v-model="form._languages"
          :options="[
            {
              label: 'İngilizce',
              value: 'İngilizce',
            },
            {
              label: 'Türkçe',
              value: 'Türkçe',
            },
            {
              label: 'Almanca',
              value: 'Almanca',
            },
            {
              label: 'Arapça',
              value: 'Arapça',
            },
            {
              label: 'Rusça',
              value: 'Rusça',
            },
            {
              label: 'İspanyolca',
              value: 'İspanyolca',
            },
            {
              label: 'Farsça',
              value: 'Farsça',
            },
            {
              label: 'Portekizce',
              value: 'Portekizce',
            },
            {
              label: 'Fransızca',
              value: 'Fransızca',
            },
            {
              label: 'İtalyanca',
              value: 'İtalyanca',
            },
          ]"
        />

        <div class="form-el">
          <input
            type="text"
            id="company-position"
            placeholder="Web adresiniz varsa yazınız."
            v-model="form.site_address"
            class="peer h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                form.errors.has('site_address'),
            }"
          />
          <label
            for="company-position"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            :class="{ '!text-pink-600': form.errors.has('site_address') }"
            >Alan Adı
          </label>
          <p
            class="mt-2 text-sm text-pink-600"
            v-if="form.errors.has('site_address')"
          >
            {{ form.errors.first("site_address") }}
          </p>
        </div>
      </div>
    </Step>

    <Step
      :index="3"
      title="Şirket bilgilerinizi giriniz"
      v-if="form.for === 'company'"
    >
      <div
        class="form-field mx-auto grid max-w-[991px] grid-cols-2 gap-x-[30px] gap-y-[45px] sm:grid-cols-1"
      >
        <div class="form-el">
          <input
            type="text"
            id="company-name"
            placeholder="Şirket isminizi kısaca yazmanız yeterlidir."
            v-model="form.company_name"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                form.errors.has('company_name'),
            }"
            class="peer h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
          />
          <label
            for="company-name"
            :class="{ '!text-pink-600': form.errors.has('company_name') }"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            >Şirketinizin Adı</label
          >

          <p
            class="mt-2 text-sm text-pink-600"
            v-if="form.errors.has('company_name')"
          >
            {{ form.errors.first("company_name") }}
          </p>
        </div>

        <div class="form-el">
          <input
            type="text"
            id="company-position"
            placeholder="Görevinizi yazınız."
            v-model="form.company_position"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                form.errors.has('company_position'),
            }"
            class="peer h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
          />
          <label
            :class="{ '!text-pink-600': form.errors.has('company_position') }"
            for="company-position"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
          >
            Şirketteki Göreviniz
          </label>

          <p
            class="mt-2 text-sm text-pink-600"
            v-if="form.errors.has('company_position')"
          >
            {{ form.errors.first("company_position") }}
          </p>
        </div>
      </div>
    </Step>

    <Step
      :index="form.for === 'company' ? 4 : 3"
      title="Kişisel bilgilerinizi giriniz"
    >
      <div
        class="form-field mx-auto grid max-w-[991px] grid-cols-2 gap-x-[30px] gap-y-[45px] sm:grid-cols-1"
      >
        <div class="form-el">
          <input
            type="text"
            placeholder="Adınız"
            class="h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
            v-model="form.name"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0': form.errors.has('name'),
            }"
          />
          <label
            for="name"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            :class="{ '!text-pink-600': form.errors.has('name') }"
            >Ad
          </label>

          <p
            class="mt-[5px] text-[14px] font-extralight text-pink-600 duration-350"
            v-if="form.errors.has('name')"
          >
            {{ form.errors.first("name") }}
          </p>
        </div>

        <div class="form-el">
          <input
            type="text"
            placeholder="Soyadınız"
            class="h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
            v-model="form.last_name"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                form.errors.has('last_name'),
            }"
          />
          <label
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            :class="{ '!text-pink-600': form.errors.has('last_name') }"
            >Soyad
          </label>

          <p
            class="mt-[5px] text-[14px] font-extralight text-pink-600 duration-350"
            v-if="form.errors.has('last_name')"
          >
            {{ form.errors.first("last_name") }}
          </p>
        </div>

        <div class="form-el">
          <vue-tel-input
            v-model="form.phone_number"
            :class="{
              error: form.errors.has('phone_number'),
            }"
          />
          <label
            class="absolute left-[15px] top-0 z-[999] translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            :class="{ '!text-pink-600': form.errors.has('phone_number') }"
          >
            Telefon
          </label>

          <p
            class="mt-2 text-sm text-pink-600"
            v-if="form.errors.has('phone_number')"
          >
            {{ form.errors.first("phone_number") }}
          </p>
        </div>

        <div class="form-el">
          <input
            type="email"
            id="email"
            v-model="form.email_address"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                form.errors.has('email_address'),
            }"
            placeholder="E-Posta adresinizi yazınız"
            class="peer h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
          />
          <label
            :class="{ '!text-pink-600': form.errors.has('email_address') }"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            >E-Posta</label
          >

          <p
            class="mt-[5px] text-[14px] font-extralight text-pink-600 duration-350"
            v-if="form.errors.has('email_address')"
          >
            {{ form.errors.first("email_address") }}
          </p>
        </div>

        <div class="form-el">
          <select
            class="peer h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 invalid:text-black hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
            v-model="form.city"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0': form.errors.has('city'),
            }"
          >
            <option class="bg-body-color text-white" selected disabled value="">
              Bulunduğunuz şehri seçiniz
            </option>
            <option
              class="bg-body-color text-white"
              :value="city.il_adi"
              v-for="city in cities"
            >
              {{ city.il_adi }}
            </option>
          </select>
          <label
            :class="{ '!text-pink-600': form.errors.has('city') }"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            >Şehir</label
          >
          <div
            class="icon icon-chevron-bottom absolute right-[30px] top-[34px] h-[16px] text-[16px] leading-none text-white"
          ></div>

          <p
            class="mt-[5px] text-[14px] font-extralight text-pink-600 duration-350"
            v-if="form.errors.has('city')"
          >
            {{ form.errors.first("city") }}
          </p>
        </div>

        <div class="form-el">
          <select
            class="peer h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 invalid:text-black hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
            v-model="form.district"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                form.errors.has('district'),
              'cursor-not-allowed opacity-50': !form.city || !getDistricts,
            }"
            :disabled="!form.city || !getDistricts"
          >
            <option class="bg-body-color text-white" selected disabled value="">
              Bulunduğunuz semti seçiniz
            </option>
            <option
              class="bg-body-color text-white"
              v-for="district in getDistricts"
              :value="district.ilce_adi"
            >
              {{ district.ilce_adi }}
            </option>
          </select>
          <label
            :class="{
              '!text-pink-600': form.errors.has('district'),
            }"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            >Semt</label
          >
          <div
            class="icon icon-chevron-bottom absolute right-[30px] top-[34px] h-[16px] text-[16px] leading-none text-white"
          ></div>

          <p
            class="mt-[5px] text-[14px] font-extralight text-pink-600 duration-350"
            v-if="form.errors.has('district')"
          >
            {{ form.errors.first("district") }}
          </p>
        </div>

        <div
          class="form-el col-span-2 flex items-center justify-center gap-[30px] sm:col-span-1"
        >
          <input
            type="checkbox"
            id="agreement"
            v-model="form.agreement"
            placeholder="E-Posta adresinizi yazınız"
            class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
          />

          <div
            :class="{
              '!shadow-pink-600': form.errors.has('agreement'),
            }"
            class="box relative h-[40px] w-[40px] shrink-0 rounded-[10px] border-0 bg-transparent shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 before:absolute before:left-[50%] before:top-[50%] before:h-[40%] before:w-[40%] before:translate-x-[-50%] before:translate-y-[-50%] before:scale-0 before:rounded-[5px] before:bg-primary before:opacity-0 before:duration-350 peer-checked:!shadow-[0_0_0_1px_var(--color-primary)] peer-checked:before:!scale-100 peer-checked:before:!opacity-100 peer-hover:shadow-[0_0_0_1px_var(--color-lynch-600)]"
          ></div>

          <div class="flex flex-col">
            <label
              :class="{ '!text-pink-600': form.errors.has('agreement') }"
              for="agreement"
              class="font-extralight leading-normal text-lynch-500 duration-350"
              ><a
                href="#kvkk-popup"
                class="relative z-20 inline-block font-semibold text-lynch-400 duration-350 hover:text-white"
                data-fancybox
                >KVKK şartlarını</a
              >
              okudum ve kabul ediyorum.</label
            >

            <p
              class="mt-2 text-sm text-pink-600"
              v-if="form.errors.has('agreement')"
            >
              {{ form.errors.first("agreement") }}
            </p>
          </div>
        </div>
      </div>
    </Step>
  </Steps>
</template>
