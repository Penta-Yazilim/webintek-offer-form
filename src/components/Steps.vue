<template>
  <article class="form-steps-field pt-[90px] xl:pt-[30px]">
    <div class="wrapper relative mx-auto w-full px-[30px]">
      <div
        class="line absolute left-0 top-[50%] h-[1px] w-full translate-y-[-50%] bg-ebony-clay-800 [mask-image:linear-gradient(90deg,transparent,black,transparent)]"
      ></div>
      <div
        class="steps relative z-10 flex items-center justify-center gap-[90px] xl:gap-[75px] lg:gap-[60px] md:gap-[45px] sm:gap-[30px] xs:gap-[20px]"
      >
        <template v-for="i in steps.items.length">
          <div
            role="button"
            @click="i - 1 < steps.value ? steps.go(i - 1) : null"
            :class="{
              active: i - 1 === steps.value,
              completed: i - 1 < steps.value,
              '!shadow-pink-600': hasError(i - 1),
            }"
            class="item hover-circle-effect relative isolate flex h-[60px] w-[60px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-body-color text-[20px] font-semibold text-white shadow-[inset_0_0_0_1px_var(--color-ebony-clay-800)] duration-350 [--circle-bg-color:var(--color-chetwode-blue-600)] md:h-[45px] md:w-[45px] xs:h-[35px] xs:w-[35px] [&.active]:pointer-events-none [&.active]:bg-ebony-clay-800 [&.completed>.check>svg]:scale-100 [&.completed>.check>svg]:opacity-100 [&.completed>.check]:opacity-100 [&.completed]:shadow-none"
          >
            <span class="relative z-10 block md:text-[14px] xs:text-[12px]">
              {{ i }}
            </span>
            <div
              :class="{
                'after:shadow-pink-600': hasError(i - 1),
              }"
              class="check absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center rounded-full bg-body-color opacity-0 duration-350 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:rounded-full after:shadow-[inset_0_0_0_2px_var(--color-dull-lavender-400)] after:[mask-image:linear-gradient(180deg,_black,_transparent)]"
            >
              <svg
                class="h-[20px] w-[20px] scale-50 fill-primary opacity-0 delay-100 duration-350 md:h-[16px] md:w-[16px] xs:h-[12px] xs:w-[12px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 14.96"
              >
                <path
                  d="m17.35,0L7.16,9.45,2.85,4.85,0,7.53l6.96,7.43L20,2.87l-2.65-2.87Z"
                />
              </svg>
            </div>
          </div>
        </template>
      </div>
    </div>
  </article>

  <article
    class="form-content pt-[90px] pb-20 xl:pt-[75px] lg:pt-[60px] md:pt-[45px]"
  >
    <div class="wrapper relative mx-auto max-w-[991px] px-[30px]">
      <form @submit.prevent="$emit('submit')" class="w-full">
        <div class="steps relative duration-600">
          <slot></slot>
        </div>
      </form>
    </div>
  </article>
</template>

<script setup lang="ts">
import { provide, reactive, nextTick, onMounted } from "vue";
import Steps from "@/types/steps";

const setHeight = () => {
  const activeStep = document.querySelector(
    ".form-content .steps .step.active"
  ) as HTMLElement;

  if (activeStep) {
    const steps = document.querySelector(".form-content .steps") as HTMLElement;

    steps.style.height = `${activeStep.offsetHeight}px`;
  }
};

onMounted(() => {
  nextTick(() => {
    setHeight();
  });
});

const props = defineProps({
  start: {
    type: Number,
    default: 0,
  },
  form: {
    type: Object,
    default: {},
  },
  inputs: {
    type: Object,
    default: {},
  },
  apiUrl: {
    type: String,
    default: "",
  },
});

const steps: Steps = reactive({
  value: props.start,
  items: [],
  onAdd: null,
  onRemove: null,
  errors: [],
  apiURL: props.apiUrl,
  validateInputs: props.inputs,
  setErrors: (errors: Array<Array<string>>) => {
    steps.errors = errors;
  },
  go: (step: number) => {
    steps.value = step;

    nextTick(() => {
      setHeight();
    });
  },
  removeStep: (index: number) => {
    steps.items.splice(index, 1);

    if (typeof steps.onRemove === "function") steps.onRemove(index);
  },
  onRemoveStep(cbx) {
    steps.onRemove = cbx;
  },
  onAddStep(cbx) {
    steps.onAdd = cbx;
  },
  addStep: (title: string, toIndex: number): number => {
    steps.items.splice(toIndex, 0, { title });

    if (typeof steps.onAdd === "function") steps.onAdd(toIndex);

    return toIndex;
  },
  nextStep: () => {
    steps.value =
      steps.value === steps.items.length - 1 ? steps.value : ++steps.value;

    nextTick(() => {
      setHeight();
    });
  },
  prevStep: () => {
    steps.value = steps.value === 1 ? steps.value : --steps.value;

    nextTick(() => {
      setHeight();
    });
  },
});

const hasError = function (stepNumber: number) {
  const val = steps?.errors[stepNumber] ?? [];

  return val.length > 0;
};

provide("steps", steps);
provide("form", props.form);

defineExpose({
  steps,
});
</script>
