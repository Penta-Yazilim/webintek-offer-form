<script setup lang="ts">
import { ref } from "vue";
import QuickForm from "@/components/QuickForm.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";

const type = ref("quickly");

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
  <Transition name="fade" mode="out-in">
    <div v-show="type === 'quickly'" class="w-full overflow-hidden">
      <QuickForm :baseURL="baseURL" @show-success="showSuccess" popup />
    </div>
  </Transition>

  <Transition name="fade" mode="out-in">
    <div v-if="type === 'success'" class="w-full overflow-hidden">
      <SuccessMessage />
    </div>
  </Transition>
</template>
