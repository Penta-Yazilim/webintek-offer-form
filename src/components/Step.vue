<template>
  <div
    :class="{
      active: active,
    }"
    :id="`step-${stepNumber + 1}`"
    class="step pointer-events-none invisible absolute left-0 top-0 w-full translate-y-[30px] opacity-0 duration-450 [&.active]:pointer-events-auto [&.active]:visible [&.active]:translate-y-0 [&.active]:opacity-100 [&.active]:delay-200"
  >
    <div class="text-4xl z-2 relative mx-auto mb-[30px] w-full text-center">
      <h1>
        {{ title }}
      </h1>
    </div>

    <slot></slot>

    <div
      class="button-field mt-[60px] flex items-center justify-center gap-[50px] sm:mt-[45px] sm:gap-[30px] xs:flex-col-reverse"
    >
      <button
        v-if="stepNumber >= 1 || props.canBack"
        type="button"
        @click="prev"
        :class="{
          'ponter-events-none cursor-not-allowed opacity-50': loaders.prev,
        }"
        class="prev-step button hover-circle-effect flex-center h-[58px] w-fit rounded-full border-0 bg-ebony-clay-2-900 px-[45px] shadow-[inset_0_0_0_1px_var(--color-ebony-clay-2-900)] [--circle-bg-color:var(--color-lynch-500)] sm:px-[30px]"
      >
        <div class="inline-flex items-center text relative z-10 text-[14px] tracking-widest text-white">
          <svg class="mr-4 -mt-1" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6668 5.33306H2.94285L6.47152 1.8044C6.53519 1.7429 6.58598 1.66933 6.62092 1.588C6.65586 1.50666 6.67425 1.41918 6.67502 1.33066C6.67579 1.24214 6.65892 1.15436 6.6254 1.07243C6.59188 0.990495 6.54237 0.91606 6.47978 0.853465C6.41718 0.79087 6.34275 0.741368 6.26082 0.707847C6.17889 0.674327 6.0911 0.657459 6.00258 0.658228C5.91406 0.658998 5.82658 0.677388 5.74525 0.712328C5.66391 0.747267 5.59035 0.798055 5.52885 0.861729L0.862183 5.5284C0.737202 5.65341 0.666992 5.82295 0.666992 5.99973C0.666992 6.1765 0.737202 6.34604 0.862183 6.47106L5.52885 11.1377C5.65458 11.2592 5.82299 11.3264 5.99778 11.3248C6.17258 11.3233 6.33979 11.2532 6.4634 11.1296C6.587 11.006 6.65711 10.8388 6.65863 10.664C6.66015 10.4892 6.59295 10.3208 6.47152 10.1951L2.94285 6.66639H14.6668C14.8437 6.66639 15.0132 6.59616 15.1383 6.47113C15.2633 6.34611 15.3335 6.17654 15.3335 5.99973C15.3335 5.82292 15.2633 5.65335 15.1383 5.52832C15.0132 5.4033 14.8437 5.33306 14.6668 5.33306Z" fill="#5D6676"/>
          </svg>

          <template v-if="props.canBack"> Geri Dön </template>
          <template v-else> Geri </template>
        </div>
        <svg
          v-if="loaders.prev"
          aria-hidden="true"
          role="status"
          class="ml-3 inline -mt-2 h-4 w-4 animate-spin text-white"
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
        v-if="!isLastStep"
        :class="{
          'ponter-events-none cursor-not-allowed opacity-50': loaders.next,
        }"
        @click="next"
        type="button"
        class="next-step button hover-circle-effect flex-center h-[58px] w-fit rounded-full bg-dull-lavender-500 px-[60px] shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] [--circle-bg-color:var(--color-chetwode-blue-600)] md:px-[45px] sm:px-[30px]"
      >
        <div class="text relative z-10 text-[14px] tracking-widest text-white">
          Devam Et
        </div>
        <svg
          v-if="loaders.next"
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
        v-else
        :class="{
          'ponter-events-none cursor-not-allowed opacity-50': form?.processing,
        }"
        type="submit"
        class="next-step button hover-circle-effect flex-center h-[58px] w-fit rounded-full bg-dull-lavender-500 px-[60px] shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] [--circle-bg-color:var(--color-chetwode-blue-600)] md:px-[45px] sm:px-[30px]"
      >
        <div class="text relative z-10 text-[14px] tracking-widest text-white">
          Gönder
        </div>
        <svg
          v-if="loaders.next"
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
</template>

<script setup lang="ts">
import {
  ref,
  defineProps,
  inject,
  onMounted,
  reactive,
  watch,
  onUnmounted,
  computed,
} from "vue";

import Steps from "@/types/steps";

const emit = defineEmits(["back"]);

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  index: {
    type: Number,
    default: -1,
  },
  canBack: {
    type: Boolean,
    default: false,
  },
});

const steps = inject<Steps>("steps");
const stepNumber = ref<number>(1);
const active = ref(false);
const loaders = reactive({
  next: false,
  prev: false,
});

const form = inject<any | null>("form");

watch(
  () => props.index,
  (value) => {
    stepNumber.value = value;
  }
);

const isLastStep = computed(() => {
  return (steps?.items.length ?? 0) - 1 === stepNumber.value;
});

onMounted(() => {
  stepNumber.value = steps?.addStep(props.title, props.index) ?? 0;

  active.value = steps?.value === stepNumber.value;

  steps?.onRemoveStep((step) => {
    if (step < stepNumber.value) {
      stepNumber.value--;
    }
  });
});

onUnmounted(() => {
  steps?.removeStep(stepNumber.value);
});

watch(
  () => steps?.value,
  (value) => {
    active.value = value === stepNumber.value;
  }
);

function Minimum(
  cbx: () => void,
  delay: number,
  originalPromiseDelay: number = 350
) {
  const originalPromise = new Promise<void>((resolve) => {
    setTimeout(() => {
      cbx();
      resolve();
    }, originalPromiseDelay);
  });

  return Promise.all([
    originalPromise,
    new Promise<void>((resolve) => {
      setTimeout(() => resolve(), delay);
    }),
  ]).then((result) => result[0]);
}

const validate = () => {
  return new Promise<void>((resolve, reject) => {
    if (isLastStep.value) {
      return resolve();
    }

    //@ts-ignore
    axios
      .post(`${steps?.apiURL}/validate-service-form`, form.data())
      .then((response: any) => {
        if (response.status === 422) {
          return response.json().then((data: any) => {
            throw {
              response,
              data,
            };
          });
        }

        return response.json();
      })
      .then(() => {
        resolve();
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};

const next = () => {
  loaders.next = true;

  Minimum(async () => {
    try {
      await validate();

      steps?.nextStep();
    } catch (error: any) {
      const { response } = error;
      if (response.status === 422) {
        const { errors } = response.data;

        const stepErrors: any = {};

        const validateInputs = steps?.validateInputs[props.index];

        validateInputs?.forEach((input) => {
          if (errors[input]) {
            stepErrors[input] = errors[input];
          }
        });

        if (Object.keys(stepErrors).length === 0) {
          steps?.nextStep();

          form.withErrors({});
          steps?.setErrors([]);
        } else {
          steps?.setErrors({
            [props.index]: Object.values(stepErrors),
          });

          form.withErrors(stepErrors);
        }
      }
    }
  }, 350).then(() => {
    loaders.next = false;
  });
};

const prev = () => {
  if (props.canBack) {
    emit("back");

    return;
  }

  loaders.prev = true;

  Minimum(() => steps?.prevStep(), 1000).then(() => {
    loaders.prev = false;
  });
};
</script>
