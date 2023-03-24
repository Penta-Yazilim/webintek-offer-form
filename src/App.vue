<script setup lang="ts">
import { ref } from "vue";
import QuickForm from "@/components/QuickForm.vue";
import StepForm from "@/components/StepForm.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import TypeSelect from "@/components/TypeSelect.vue";

const type = ref('project');

const baseURL =
  // @ts-ignore
  process.env.NODE_ENV === "development"
    ? "https://webintek-crm.test/api"
    : "//destek.webintek.com.tr/api";

function showSuccess() {
  type.value = "success";
}
</script>

<template>
  <TypeSelect v-if="!type" v-model="type" />

  <Transition name="fade" mode="out-in">
    <div v-show="type === 'quickly'" class="w-full overflow-hidden">
      <QuickForm :baseURL="baseURL" @show-success="showSuccess" />
    </div>
  </Transition>

  <Transition name="fade" mode="out-in">
    <div v-if="type === 'project'" class="w-full overflow-hidden">
      <StepForm :baseURL="baseURL" />
    </div>
  </Transition>

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
