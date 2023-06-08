<script setup lang="ts">
import { ref } from "vue";
import QuickForm from "@/components/QuickForm.vue";
import StepForm from "@/components/StepForm.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import TypeSelect from "@/components/TypeSelect.vue";

const type = ref("project");

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

  <div v-if="!type" class="w-full flex flex-col justify-center items-center overflow-hidden min-h-[calc(100vh-150px)]">
    <TypeSelect v-model="type" />
  </div>

  <div v-show="type === 'quickly'" class="w-full flex flex-col justify-center items-center overflow-hidden min-h-[calc(100vh-150px)]">
    <QuickForm :baseURL="baseURL" @show-success="showSuccess" ref="quickForm" can-back @back="backToStart"/>
  </div>

  <div v-if="type === 'project'" class="w-full flex flex-col justify-center items-center overflow-hidden min-h-[calc(100vh-150px)]">
    <StepForm :baseURL="baseURL" @show-success="showSuccess" ref="stepForm" can-back @back="backToStart"/>
  </div>

  <Transition name="fade" mode="out-in">
    <div v-if="type === 'success'" class="w-full flex flex-col justify-center items-center overflow-hidden min-h-[calc(100vh-150px)]">
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
