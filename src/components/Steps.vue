<template>
	<article class="form-steps-field pt-[90px] xl:pt-[30px]">
		<div class="wrapper w-full px-[30px] mx-auto relative">
			<div
				class="line h-[1px] w-full absolute left-0 top-[50%] translate-y-[-50%] bg-ebony-clay-800 [mask-image:linear-gradient(90deg,transparent,black,transparent)]">
			</div>
			<div
				class="steps flex items-center justify-center relative z-10 gap-[90px] xl:gap-[75px] lg:gap-[60px] md:gap-[45px] sm:gap-[30px] xs:gap-[20px]">
				<template v-for="i in Array(steps.stepsCount).keys()">
					<div :class="{
						'active': i === (steps.value - 1),
						'completed': i < (steps.value - 1)
					}" class="item relative overflow-hidden isolate [--circle-bg-color:var(--color-chetwode-blue-600)] hover-circle-effect [&.completed]:shadow-none [&.completed]:pointer-events-none [&.completed>.check>svg]:scale-100 [&.completed>.check>svg]:opacity-100 [&.completed>.check]:opacity-100 [&.active]:bg-ebony-clay-800 [&.active]:pointer-events-none cursor-pointer w-[60px] h-[60px] md:w-[45px] md:h-[45px] xs:w-[35px] xs:h-[35px] duration-350 shadow-[inset_0_0_0_1px_var(--color-ebony-clay-800)] rounded-full flex items-center justify-center bg-body-color text-white font-semibold text-[20px]">
						<span class="block relative z-10 md:text-[14px] xs:text-[12px]">
							{{ i + 1 }}
						</span>
						<div
							class="check opacity-0 duration-350 absolute z-20 w-full h-full left-0 top-0 rounded-full bg-body-color after:absolute after:left-0 after:top-0 after:w-full after:h-full after:rounded-full after:shadow-[inset_0_0_0_2px_var(--color-dull-lavender-400)] after:[mask-image:linear-gradient(180deg,_black,_transparent)] flex items-center justify-center">
							<svg
								class="w-[20px] h-[20px] md:w-[16px] md:h-[16px] xs:w-[12px] xs:h-[12px] fill-primary opacity-0 scale-50 duration-350 delay-100"
								xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 14.96">
								<path d="m17.35,0L7.16,9.45,2.85,4.85,0,7.53l6.96,7.43L20,2.87l-2.65-2.87Z" />
							</svg>
						</div>
					</div>
				</template>
			</div>
		</div>
	</article>

	<article class="form-content pt-[90px] xl:pt-[75px] lg:pt-[60px] md:pt-[45px]">
		<div class="wrapper max-w-[991px] px-[30px] mx-auto relative">
			<form action="" class="w-full">
				<div class="steps relative duration-600">
					<slot></slot>
				</div>
			</form>
		</div>
	</article>
</template>

<script setup lang="ts">
import { provide, reactive, nextTick } from "vue";
import Steps from '@/types/steps';

const setHeight = () => {
	const activeStep = document.querySelector(".form-content .steps .step.active") as HTMLElement;

	if (activeStep) {
		const steps = document.querySelector(".form-content .steps") as HTMLElement;

		steps.style.height = `${activeStep.offsetHeight}px`;
	}
}

const steps: Steps = reactive({
	value: 1,
	stepsCount: 0,
	addStep: () => steps.stepsCount++,
	getRecentStep: () => steps.stepsCount,
	nextStep: () => {
		nextTick(() => {
			steps.stepsCount === steps.value ? steps.value : steps.value++;

			setHeight();
		})
	},
	prevStep: () => {
		nextTick(() => {
			steps.value === 1 ? steps.value : steps.value--;

			setHeight();
		})
	}
})

provide("steps", steps);
</script>