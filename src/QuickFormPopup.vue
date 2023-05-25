<script setup lang="ts">
import { ref } from "vue";
import QuickForm from "@/components/QuickForm.vue";
import StepForm from "@/components/StepForm.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import TypeSelect from "@/components/TypeSelect.vue";

const type = ref('');

const baseURL =
  // @ts-ignore
  process.env.NODE_ENV === "development"
    ? "https://webintek-crm.test/api"
    : "//destek.webintek.com.tr/api";

</script>

<template>
  <QuickForm :baseURL="baseURL" popup/>
</template>