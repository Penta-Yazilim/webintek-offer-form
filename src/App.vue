<script setup lang="ts">
import { ref } from "vue";
import QuickForm from "@/components/QuickForm.vue";
import StepForm from "@/components/StepForm.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import TypeSelect from "@/components/TypeSelect.vue";

const type = ref("");

const quickForm = ref(null);
const stepForm = ref(null);

const baseURL =
  // @ts-ignore
  process.env.NODE_ENV === "development"
    ? "https://webintek-crm.test/api"
    : "//destek.webintek.com.tr/api";

function showSuccess() {
  type.value = "success";
}

function backToStart() {
  type.value = "";

   // @ts-ignore
  quickForm.value?.reset();
  // @ts-ignore
  stepForm.value?.reset();
}
</script>

<template>

  <div v-if="!type" class="w-full overflow-hidden">
    <TypeSelect v-model="type" />
  </div>


  <button
    v-if="type === 'quickly' || type === 'project'"
    @click="backToStart"
    type="button"
    class="mx-auto mt-12 -mb-12 next-step button hover-circle-effect flex-center h-[58px] w-fit rounded-full bg-dull-lavender-500 px-[60px] shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] [--circle-bg-color:var(--color-chetwode-blue-600)] md:px-[45px] sm:px-[30px]"
  >
    <div class="text relative z-10 text-[14px] tracking-widest text-white">
      Geri Dön
    </div>
  </button>

  <div v-show="type === 'quickly'" class="w-full overflow-hidden">
    <QuickForm :baseURL="baseURL" @show-success="showSuccess" ref="quickForm"/>
  </div>

  <div v-if="type === 'project'" class="w-full overflow-hidden">
    <StepForm :baseURL="baseURL" @show-success="showSuccess" ref="stepForm"/>
  </div>

  <Transition name="fade" mode="out-in">
    <div v-if="type === 'success'" class="w-full overflow-hidden">
      <SuccessMessage />
    </div>
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
