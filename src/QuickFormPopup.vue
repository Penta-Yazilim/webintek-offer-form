<script setup lang="ts">
import { ref } from "vue";
import QuickForm from "@/components/QuickForm.vue";

const type = ref("quickly");

const baseURL =
  // @ts-ignore
  process.env.NODE_ENV === "development"
    ? "https://webintek-crm.test/api"
    : "//destek.webintek.com.tr/api";

function showSuccess() {
  window.location.href = "/tesekkurler";
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-show="type === 'quickly'" class="w-full overflow-hidden">
      <QuickForm :baseURL="baseURL" @show-success="showSuccess" popup />
    </div>
  </Transition>
</template>
