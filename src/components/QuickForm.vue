<script setup lang="ts">
// @ts-ignore
import Form from "form-backend-validation";
import { reactive } from "vue";

const props = defineProps({
  baseURL: {
    type: String,
    required: true,
  },
  popup:{
    type: Boolean,
    default: false
  },
  canBack:{
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["showSuccess"]);

const reset = () => {
  quickForm.reset();
};

defineExpose({ reset });

const quickForm = reactive(
  new Form({
    fullName: null,
    name: null,
    last_name: null,
    email_address: null,
    phone_number: null,
    company_name: null,
    desc: null,
    agreement: false,
  })
);

async function submitQuickForm() {
  try {
    const fullName = quickForm.fullName?.split(" ") ?? [];

    const name = fullName[0] ?? null;

    quickForm.populate({
      name: name,
      last_name: fullName[1] ?? (name ? " - " : null),
    });

    const data = await quickForm.post(`${props.baseURL}/quick-form`);

    emit("showSuccess", data.message);
  } catch (error) {}
}
</script>

<template>
  <article 
    v-if="!props.popup"
    class="container">
    <div class="relative mx-auto w-full max-w-5xl px-[30px] text-center">
      <h1 class="text-4xl font-extralight">Hızlı Teklif Al</h1>
      <p class="mt-10 text-xl font-extralight text-[#6D7E9B]">
        Etkileyici, kullanışlı, benzersiz, her zaman modern projeler üretiyoruz.
        Dijital dünyadaki görsel şovlarda ne yapılması gerektiğini çok iyi
        biliyoruz. Müşterilerimizi çok iyi dinliyor.
      </p>
    </div>
  </article>

  <div 
    v-if="props.popup"
    class="text-editor w-fit mx-auto relative z-2 !max-w-none mb-[45px]">
      <h3>Sihirli lambanız yoksa iletişim formunu doldurunuz</h3>
  </div>

  <form @submit.prevent="submitQuickForm" class="w-full px-12">
    <div
      class="form-field mx-auto mt-20 grid max-w-[991px] grid-cols-2 gap-x-[30px] gap-y-[45px] sm:grid-cols-1"
    >
      <div class="form-el">
        <input
          type="text"
          v-model="quickForm.fullName"
          placeholder="Adınız Soyadınız"
          class="h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
          :class="{
            '!shadow-pink-600 ring-0 ring-offset-0':
              quickForm.errors.has('name'),
          }"
        />
        <label
          for="name"
          class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
          :class="{ '!text-pink-600': quickForm.errors.has('name') }"
        >
          Ad Soyad
        </label>

        <p
          class="mt-2 text-sm text-pink-600"
          v-if="quickForm.errors.has('name')"
        >
          {{ quickForm.errors.first("name") }}
        </p>
      </div>

      <div class="form-el">
        <vue-tel-input
          v-model="quickForm.phone_number"
          :class="{
            error: quickForm.errors.has('phone_number'),
          }"
        />
        <label
          class="absolute left-[15px] top-0 z-[999] translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
          :class="{ '!text-pink-600': quickForm.errors.has('phone_number') }"
        >
          Telefon
        </label>

        <p
          class="mt-2 text-sm text-pink-600"
          v-if="quickForm.errors.has('phone_number')"
        >
          {{ quickForm.errors.first("phone_number") }}
        </p>
      </div>

      <div class="form-el">
        <input
          type="email"
          v-model="quickForm.email_address"
          placeholder="E-Posta adresinizi yazınız"
          class="h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
          :class="{
            '!shadow-pink-600 ring-0 ring-offset-0':
              quickForm.errors.has('email_address'),
          }"
        />
        <label
          class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
          >E-Posta
        </label>

        <p
          class="mt-2 text-sm text-pink-600"
          v-if="quickForm.errors.has('email_address')"
        >
          {{ quickForm.errors.first("email_address") }}
        </p>
      </div>

      <div class="form-el">
        <input
          type="text"
          v-model="quickForm.company_name"
          placeholder="Firmanızın adını yazınız"
          class="h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
          :class="{
            '!shadow-pink-600 ring-0 ring-offset-0':
              quickForm.errors.has('company_name'),
          }"
        />
        <label
          for="company-name"
          class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
          :class="{ '!text-pink-600': quickForm.errors.has('company_name') }"
          >Firma Adı
        </label>

        <p
          class="mt-2 text-sm text-pink-600"
          v-if="quickForm.errors.has('company_name')"
        >
          {{ quickForm.errors.first("company_name") }}
        </p>
      </div>

      <div class="form-el col-span-full">
        <textarea
          v-model="quickForm.desc"
          placeholder="Pojeniz hakkında bize bilgi verebilir misiniz?"
          class="peer h-[200px] w-full rounded-[10px] border-0 bg-transparent p-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
          :class="{
            '!shadow-pink-600 ring-0 ring-offset-0':
              quickForm.errors.has('desc'),
          }"
        ></textarea>
        <label
          class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
          :class="{ '!text-pink-600': quickForm.errors.has('desc') }"
        >
          Proje Bilgileri
        </label>

        <p
          class="mt-2 text-sm text-pink-600"
          v-if="quickForm.errors.has('desc')"
        >
          {{ quickForm.errors.first("desc") }}
        </p>
      </div>
    </div>

    <div
      class="button-field mt-[35px] flex flex-col items-center justify-center gap-8 sm:mt-[45px] sm:flex-col sm:gap-[30px]"
    >
      <div
        class="form-el col-span-2 flex items-center justify-center gap-[30px] sm:col-span-1"
      >
        <input
          type="checkbox"
          id="agreement"
          v-model="quickForm.agreement"
          placeholder="E-Posta adresinizi yazınız"
          class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
        />

        <div
          :class="{
            '!shadow-pink-600': quickForm.errors.has('agreement'),
          }"
          class="box relative h-[40px] w-[40px] shrink-0 rounded-[10px] border-0 bg-transparent shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 before:absolute before:left-[50%] before:top-[50%] before:h-[40%] before:w-[40%] before:translate-x-[-50%] before:translate-y-[-50%] before:scale-0 before:rounded-[5px] before:bg-primary before:opacity-0 before:duration-350 peer-checked:!shadow-[0_0_0_1px_var(--color-primary)] peer-checked:before:!scale-100 peer-checked:before:!opacity-100 peer-hover:shadow-[0_0_0_1px_var(--color-lynch-600)]"
        ></div>

        <div class="flex flex-col">
          <label
            :class="{ '!text-pink-600': quickForm.errors.has('agreement') }"
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
            v-if="quickForm.errors.has('agreement')"
          >
            {{ quickForm.errors.first("agreement") }}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-center gap-10">
        <button
          v-if="canBack"
          @click.prevent="() => $emit('back')"
          type="button"
          tabindex="-1"
          class="prev-step button hover-circle-effect flex-center h-[58px] w-fit rounded-full border-0 bg-ebony-clay-2-900 px-[45px] shadow-[inset_0_0_0_1px_var(--color-ebony-clay-2-900)] [--circle-bg-color:var(--color-lynch-500)] sm:px-[20px]"
        >
          <div class="inline-flex items-center text relative z-10 text-[14px] tracking-widest text-white">
            <svg class="mr-4 -mt-1" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6668 5.33306H2.94285L6.47152 1.8044C6.53519 1.7429 6.58598 1.66933 6.62092 1.588C6.65586 1.50666 6.67425 1.41918 6.67502 1.33066C6.67579 1.24214 6.65892 1.15436 6.6254 1.07243C6.59188 0.990495 6.54237 0.91606 6.47978 0.853465C6.41718 0.79087 6.34275 0.741368 6.26082 0.707847C6.17889 0.674327 6.0911 0.657459 6.00258 0.658228C5.91406 0.658998 5.82658 0.677388 5.74525 0.712328C5.66391 0.747267 5.59035 0.798055 5.52885 0.861729L0.862183 5.5284C0.737202 5.65341 0.666992 5.82295 0.666992 5.99973C0.666992 6.1765 0.737202 6.34604 0.862183 6.47106L5.52885 11.1377C5.65458 11.2592 5.82299 11.3264 5.99778 11.3248C6.17258 11.3233 6.33979 11.2532 6.4634 11.1296C6.587 11.006 6.65711 10.8388 6.65863 10.664C6.66015 10.4892 6.59295 10.3208 6.47152 10.1951L2.94285 6.66639H14.6668C14.8437 6.66639 15.0132 6.59616 15.1383 6.47113C15.2633 6.34611 15.3335 6.17654 15.3335 5.99973C15.3335 5.82292 15.2633 5.65335 15.1383 5.52832C15.0132 5.4033 14.8437 5.33306 14.6668 5.33306Z" fill="#5D6676"/>
            </svg>

            Geri
          </div>
          <svg
            v-if="quickForm.processing"
            aria-hidden="true"
            role="status"
            class="ml-3 inline h-4 w-4 animate-spin text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          :class="{
            'ponter-events-none cursor-not-allowed opacity-50':
              quickForm.processing,
          }"
          type="submit"
          class="next-step button hover-circle-effect flex-center h-[58px] w-fit rounded-full bg-dull-lavender-500 px-[60px] shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] [--circle-bg-color:var(--color-chetwode-blue-600)] md:px-[45px] sm:px-[30px]"
        >
          <div class="text relative z-10 text-[14px] tracking-widest text-white">
            Gönder
          </div>
          <svg
            v-if="quickForm.processing"
            aria-hidden="true"
            role="status"
            class="ml-3 inline h-4 w-4 animate-spin text-white"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  </form>
</template>