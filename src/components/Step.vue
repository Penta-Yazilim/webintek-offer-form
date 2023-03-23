<template>
	<div :class="{ 'active': active }"
		class="step absolute duration-450 [&.active]:delay-200 left-0 top-0 w-full opacity-0 translate-y-[30px] invisible pointer-events-none [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto [&.active]:translate-y-0">
		<div class="text-editor text-center w-full mx-auto relative z-2 mb-[60px]">
			<h1>
				{{ title }}
			</h1>
		</div>

		<slot></slot>

		<div
			class="button-field flex xs:flex-col-reverse items-center justify-center gap-[50px] sm:gap-[30px] mt-[60px] sm:mt-[45px]">
			<button v-if="stepNumber > 1" type="button" @click="prev"
				class="prev-step button border-0 [--circle-bg-color:var(--color-lynch-500)] hover-circle-effect h-[58px] rounded-full px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-ebony-clay-2-900)] bg-ebony-clay-2-900">
				<div class="text relative z-10 text-[14px] tracking-widest text-white">GERİ</div>
			</button>
			<button @click="next" type="button"
				class="next-step button [--circle-bg-color:var(--color-chetwode-blue-600)] hover-circle-effect h-[58px] rounded-full px-[60px] md:px-[45px] sm:px-[30px] flex-center w-fit shadow-[inset_0_0_0_1px_var(--color-dull-lavender-500)] bg-dull-lavender-500">
				<div class="text relative z-10 text-[14px] tracking-widest text-white">DEVAM ET</div>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, defineProps, inject, onMounted, Ref, watch } from "vue";
import Steps from "@/types/steps";

defineProps({
	title: {
		type: String,
		default: "",
	},
})

const steps = inject<Steps>("steps");
const stepNumber = ref(1);
const active = ref(false);

onMounted(() => {
	steps?.addStep();

	stepNumber.value = steps?.getRecentStep() ?? 0;

	active.value = steps?.value === stepNumber.value;
});

watch(() => steps?.value, (value) => {
	active.value = value === stepNumber.value;
});

const next = () => {
	steps?.nextStep();
}

const prev = () => {
	steps?.prevStep();
}
</script>