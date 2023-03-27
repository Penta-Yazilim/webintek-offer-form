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
    _service: null,
    _languages: [],
    site_address: null,
    company_name: null,
    company_position: null,
    city: "",
    district: "",
    agreement: false,
  })
);

async function submitForm() {
  try {
    const data = await form.post(`${props.baseURL}/service-form`);

    emit("showSuccess", data.message);
  } catch (error: any) {
    const { response } = error;

    if (response.status === 422) {
      const { errors } = response.data;

      const stepInputs = {
        0: ["for"],
        1: ["_service"],
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

      const step = Object.keys(stepInputs).find((values, key: number) => {
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
  description: string;
  image: URL;
}

const completeServices = reactive<CompleteService[]>([
  {
    title: "Web Tasarım",
    description: "Web tasarım ihtiyacınız için seçebilirsiniz.",
    image: new URL("@/assets/image/icon/image-1.png", import.meta.url),
  },
  {
    title: "E-Ticaret",
    description: "Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.",
    image: new URL("@/assets/image/icon/image-2.png", import.meta.url),
  },
  {
    title: "SEO",
    description: "Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.",
    image: new URL("@/assets/image/icon/statistic.png", import.meta.url),
  },
  {
    title: "Dijital Pazarlama",
    description: "Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.",
    image: new URL("@/assets/image/icon/image-3.png", import.meta.url),
  },
  {
    title: "Kurumsal Kimlik",
    description: "Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.",
    image: new URL("@/assets/image/icon/image-4.png", import.meta.url),
  },
  {
    title: "Ürün Çekimi",
    description: "Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.",
    image: new URL("@/assets/image/icon/photoplus.png", import.meta.url),
  },
]);

const partialServices = reactive<CompleteService[]>([
  {
    title: "E-Ticaret",
    description: "Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.",
    image: new URL("@/assets/image/icon/image-2.png", import.meta.url),
  },
  {
    title: "SEO",
    description: "Online pazarda ürünlerinizi satmak istiyorsanız seçiniz.",
    image: new URL("@/assets/image/icon/statistic.png", import.meta.url),
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
  <Steps :form="form" @submit="submitForm" ref="refSteps" :start="4">
    <Step :index="0" title="Bu projeyi kimin için yapacağız?">
      <div
        class="custom-check-field mx-auto grid max-w-[575px] grid-cols-2 gap-[50px] md:gap-[40px] sm:grid-cols-1 sm:gap-[30px]"
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
      <p
        class="my-2 text-center text-lg text-pink-600"
        v-if="form.errors.has('_service')"
      >
        {{ form.errors.first("_service") }}
      </p>

      <div class="c-check-tabs">
        <div
          class="relative mx-auto mb-[90px] flex max-w-[825px] items-center justify-center gap-[45px] lg:mb-[75px] md:mb-[60px] sm:mb-[45px] xs:gap-[30px]"
        >
          <div
            role="button"
            @click="form.service_type = 'complete'"
            :class="{ active: form.service_type === 'complete' }"
            class="item group relative z-10 flex cursor-pointer flex-col items-center [&.active>.icon]:scale-100 [&.active>.icon]:opacity-100 [&.active>.text]:text-white"
          >
            <div
              class="text text-center text-[20px] font-extralight leading-normal text-lynch-500 duration-350 group-hover:text-white lg:text-[18px] md:text-[16px] sm:text-[14px]"
            >
              Anahtar Teslim Proje
            </div>
            <div
              class="icon mt-[25px] flex h-[35px] w-[35px] scale-50 items-center justify-center rounded-full bg-body-color opacity-0 shadow-[inset_0_0_0_1px_var(--color-ebony-clay-800)] duration-350"
            >
              <span
                class="icon-chevron-bottom relative block h-[10px] translate-x-[-1px] text-[10px] leading-none text-white"
              ></span>
            </div>
          </div>
          <div
            role="button"
            @click="form.service_type = 'partial'"
            :class="{ active: form.service_type === 'partial' }"
            class="item group relative z-10 flex cursor-pointer flex-col items-center [&.active>.icon]:scale-100 [&.active>.icon]:opacity-100 [&.active>.text]:text-white"
          >
            <div
              class="text text-center text-[20px] font-extralight leading-normal text-lynch-500 duration-350 group-hover:text-white lg:text-[18px] md:text-[16px] sm:text-[14px]"
            >
              İşin Belli Bir Kısmı
            </div>
            <div
              class="icon mt-[25px] flex h-[35px] w-[35px] scale-50 items-center justify-center rounded-full bg-body-color opacity-0 shadow-[inset_0_0_0_1px_var(--color-ebony-clay-800)] duration-350"
            >
              <span
                class="icon-chevron-bottom relative block h-[10px] translate-x-[-1px] text-[10px] leading-none text-white"
              ></span>
            </div>
          </div>
          <div
            class="line absolute left-0 bottom-[17.5px] h-[1px] w-full bg-ebony-clay-800 [mask-image:linear-gradient(90deg,transparent,black,transparent)]"
          ></div>
        </div>
        <div
          class="tab-content relative mx-auto w-full overflow-hidden duration-600"
        >
          <div
            :class="{ active: form.service_type === 'complete' }"
            class="item custom-check-field invisible absolute left-0 top-0 grid h-full w-full translate-y-[30px] grid-cols-3 gap-[50px] p-[12px] opacity-0 duration-450 md:gap-[40px] sm:grid-cols-1 sm:gap-[30px] [&.active]:visible [&.active]:translate-y-0 [&.active]:opacity-100 [&.active]:delay-200"
          >
            <div
              class="custom-check relative flex h-full w-full"
              v-for="(item, key) in completeServices"
              :key="`c-service-${key}`"
            >
              <input
                class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
                type="radio"
                name="c-service"
                :value="item.title"
                v-model="form._service"
              />
              <div
                class="box flex flex-col items-center rounded-[10px] py-6 px-8 shadow-[0_0_0_1px_var(--color-ebony-clay-800)] duration-350 backface-hidden peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] peer-hover:translate-y-[-10px] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100"
              >
                <div
                  class="image mb-[15px] flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-ebony-clay-800"
                >
                  <img
                    class="block h-[25px] w-[25px] object-contain object-center"
                    :src="item.image.href"
                  />
                </div>
                <h3 class="py-2 text-center text-xl font-extralight leading-5">
                  {{ item.title }}
                </h3>
                <p
                  class="py-4 text-center text-sm font-extralight text-lynch-500"
                >
                  {{ item.description }}
                </p>
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

          <div
            :class="{ active: form.service_type === 'partial' }"
            class="item custom-check-field invisible absolute left-0 top-0 grid w-full max-w-[575px] translate-y-[30px] grid-cols-2 gap-[50px] p-[12px] opacity-0 duration-450 md:gap-[40px] sm:grid-cols-1 sm:gap-[30px] [&.active]:visible [&.active]:translate-y-0 [&.active]:opacity-100 [&.active]:delay-200"
          >
            <div
              class="custom-check relative flex h-full w-full"
              v-for="(item, key) in partialServices"
              :key="`p-service-${key}`"
            >
              <input
                class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
                type="radio"
                name="p-service"
                :value="item.title"
                v-model="form._service"
              />
              <div
                class="box flex flex-col items-center rounded-[10px] py-6 px-8 shadow-[0_0_0_1px_var(--color-ebony-clay-800)] duration-350 backface-hidden peer-checked:shadow-[0_0_0_1px_var(--color-dull-lavender-500)] peer-hover:translate-y-[-10px] peer-hover:shadow-[0_0_0_1px_var(--color-ebony-clay-600)] peer-checked:[&>svg]:scale-100 peer-checked:[&>svg]:opacity-100"
              >
                <div
                  class="image mb-[15px] flex h-[50px] w-[50px] items-center justify-center rounded-[10px] bg-ebony-clay-800"
                >
                  <img
                    class="block h-[25px] w-[25px] object-contain object-center"
                    :src="item.image.href"
                  />
                </div>
                <h3 class="py-2 text-center text-xl font-extralight leading-5">
                  {{ item.title }}
                </h3>
                <p
                  class="py-4 text-center text-sm font-extralight text-lynch-500"
                >
                  {{ item.description }}
                </p>
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
            :input-options="{ placeholder: '0553  107  93  64' }"
            @input="($: any,phoneObject: any|null) => {
            form.phone_number = phoneObject?.number;
          }"
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
