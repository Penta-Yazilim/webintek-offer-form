<script setup lang="ts">
// @ts-ignore
import Form from "form-backend-validation";
import { reactive, ref } from "vue";
import SuccessMessage from "@/components/SuccessMessage.vue";

const baseURL =
  // @ts-ignore
  process.env.NODE_ENV === "development"
    ? "https://webintek-crm.test/api"
    : "//destek.webintek.com.tr/api";

const contactForm = reactive(
  new Form({
    fullName: null,
    name: null,
    last_name: null,
    email_address: null,
    phone_number: null,
    desc: null,
    agreement: false,
  })
);

async function submit() {
  try {
    const fullName = contactForm.fullName?.split(" ") ?? [];

    const name = fullName[0];
    const lastName = fullName[1] ?? "-";

    contactForm.populate({
      name: name,
      last_name: lastName,
    });

    const data = await contactForm.post(`${baseURL}/contact`);

    showSuccess.value = true;
  } catch (error) {}
}

const showSuccess = ref(false);
</script>

<template>
  <div v-if="!showSuccess" class="flex flex-col">
    <article class="container">
      <div class="relative mx-auto w-full max-w-5xl px-[30px] text-center">
        <h1 class="text-5xl font-extralight">İletişim Formu</h1>
      </div>
    </article>

    <form @submit.prevent="submit" class="w-full">
      <div
        class="form-field mx-auto mt-20 grid max-w-[991px] grid-cols-1 gap-x-[30px] gap-y-[45px] sm:grid-cols-1"
      >
        <div class="form-el">
          <input
            type="text"
            v-model="contactForm.fullName"
            placeholder="Adınız Soyadınız"
            class="h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                contactForm.errors.has('name'),
            }"
          />
          <label
            for="name"
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            :class="{ '!text-pink-600': contactForm.errors.has('name') }"
          >
            Ad Soyad
          </label>

          <p
            class="mt-2 text-sm text-pink-600"
            v-if="contactForm.errors.has('name')"
          >
            {{ contactForm.errors.first("name") }}
          </p>
        </div>

        <div class="form-el">
          <input
            type="email"
            v-model="contactForm.email_address"
            placeholder="E-Posta adresinizi yazınız"
            class="h-[80px] w-full rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                contactForm.errors.has('email_address'),
            }"
          />
          <label
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            >E-Posta
          </label>

          <p
            class="mt-2 text-sm text-pink-600"
            v-if="contactForm.errors.has('email_address')"
          >
            {{ contactForm.errors.first("email_address") }}
          </p>
        </div>

        <div class="form-el">
          <vue-tel-input
            v-model="contactForm.phone_number"
            :class="{
              error: contactForm.errors.has('phone_number'),
            }"
          />
          <label
            class="absolute left-[15px] top-0 z-[999] translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            :class="{
              '!text-pink-600': contactForm.errors.has('phone_number'),
            }"
          >
            Telefon
          </label>

          <p
            class="mt-2 text-sm text-pink-600"
            v-if="contactForm.errors.has('phone_number')"
          >
            {{ contactForm.errors.first("phone_number") }}
          </p>
        </div>

        <div class="form-el col-span-full">
          <textarea
            v-model="contactForm.desc"
            placeholder="Pojeniz hakkında bize bilgi verebilir misiniz?"
            class="peer h-[200px] w-full rounded-[10px] border-0 bg-transparent p-[30px] font-extralight text-white shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 placeholder:text-lynch-500 hover:!shadow-[0_0_0_1px_var(--color-lynch-600)] focus:!shadow-[0_0_0_1px_var(--color-primary)] focus:ring-0 focus:ring-offset-0"
            :class="{
              '!shadow-pink-600 ring-0 ring-offset-0':
                contactForm.errors.has('desc'),
            }"
          ></textarea>
          <label
            class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
            :class="{ '!text-pink-600': contactForm.errors.has('desc') }"
          >
            Proje Bilgileri
          </label>

          <p
            class="mt-2 text-sm text-pink-600"
            v-if="contactForm.errors.has('desc')"
          >
            {{ contactForm.errors.first("desc") }}
          </p>
        </div>
      </div>

      <div
        class="button-field mx-auto mt-[40px] flex max-w-[991px] items-center justify-center gap-20 sm:mt-[45px] sm:gap-[30px]"
      >
        <div
          class="form-el flex w-full items-center justify-center gap-[30px] sm:col-span-1"
        >
          <input
            type="checkbox"
            id="agreement"
            v-model="contactForm.agreement"
            placeholder="E-Posta adresinizi yazınız"
            class="peer absolute left-0 top-0 z-10 h-full w-full cursor-pointer opacity-0"
          />

          <div
            :class="{
              '!shadow-pink-600': contactForm.errors.has('agreement'),
            }"
            class="box relative h-[40px] w-[40px] shrink-0 rounded-[10px] border-0 bg-transparent shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 before:absolute before:left-[50%] before:top-[50%] before:h-[40%] before:w-[40%] before:translate-x-[-50%] before:translate-y-[-50%] before:scale-0 before:rounded-[5px] before:bg-primary before:opacity-0 before:duration-350 peer-checked:!shadow-[0_0_0_1px_var(--color-primary)] peer-checked:before:!scale-100 peer-checked:before:!opacity-100 peer-hover:shadow-[0_0_0_1px_var(--color-lynch-600)]"
          ></div>

          <div class="flex flex-col">
            <label
              :class="{ '!text-pink-600': contactForm.errors.has('agreement') }"
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
              v-if="contactForm.errors.has('agreement')"
            >
              {{ contactForm.errors.first("agreement") }}
            </p>
          </div>
        </div>

        <button
          :class="{
            'ponter-events-none cursor-not-allowed opacity-50':
              contactForm.processing,
          }"
          type="submit"
          class="next-step button hover-circle-effect flex-center flex h-[58px] w-full rounded-full bg-dull-lavender-500 px-[60px] shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] [--circle-bg-color:var(--color-chetwode-blue-600)] md:px-[45px] sm:px-[30px]"
        >
          <div
            class="text relative z-10 text-[14px] tracking-widest text-white"
          >
            Gönder
          </div>
          <svg
            v-if="contactForm.processing"
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
    </form>
  </div>

  <Transition name="fade" mode="out-in">
    <div v-if="showSuccess" class="flex w-full overflow-hidden">
      <SuccessMessage title="İletişim formu başarıyla gönderildi." description="En kısa sürede size geri dönüş yapacağız." />
    </div>
  </Transition>
</template>
