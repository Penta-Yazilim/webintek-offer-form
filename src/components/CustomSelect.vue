<script setup lang="ts">
import { ref, watch } from "vue";

const showOptions = ref(false);

function toggleOptions() {
	showOptions.value = !showOptions.value;
}
</script>

<template>
	<div class="form-el custom-select" v-click-outside="() => (showOptions = false)">
		<select @click="toggleOptions" class="peer absolute left-0 top-0 w-full h-full opacity-0 z-10 !cursor-pointer"
			multiple required>
			<option class="text-white bg-body-color" selected disabled>
				Projenizdeki dil seçenekleri nelerdir?
			</option>
			<option class="text-white bg-body-color" value="1">İngilizce</option>
			<option class="text-white bg-body-color" value="2">Çince</option>
			<option class="text-white bg-body-color" value="3">Almanca</option>
		</select>

		<div
			class="select relative !cursor-pointer peer-hover:[&>.box]:!shadow-[0_0_0_1px_var(--color-lynch-600)] peer-focus:[&>.box]:!shadow-[0_0_0_1px_var(--color-primary)]">
			<div
				class="box h-[80px] flex items-center font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] rounded-[10px] w-full border-0 bg-transparent text-white text:text-lynch-500">
				<div class="placeholder" data-empty="Lütfen Dil Seçimi Yapın." data-value="{count} adet öğe seçtiniz"
					data-count="0">Lütfen Dil Seçimi Yapın.</div>
			</div>
			<div :class="{ 'hidden': !showOptions }"
				class="options absolute left-0 top-full bg-body-color shadow-[0_0_0_1px_var(--color-lynch-800)] w-full z-30 max-h-[135px] overflow-x-hidden overflow-y-auto">
				<div
					class="item [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-lynch-800/50 text-lynch-500 px-[20px] py-[10px] duration-350 hover:text-white [&.is-selected]:text-white [&.is-selected]:font-bold">
					İngilizce</div>
				<div
					class="item [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-lynch-800/50 text-lynch-500 px-[20px] py-[10px] duration-350 hover:text-white [&.is-selected]:text-white [&.is-selected]:font-bold">
					Çince</div>
				<div
					class="item [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-lynch-800/50 text-lynch-500 px-[20px] py-[10px] duration-350 hover:text-white [&.is-selected]:text-white [&.is-selected]:font-bold">
					Almanca</div>
				<div
					class="item [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-lynch-800/50 text-lynch-500 px-[20px] py-[10px] duration-350 hover:text-white [&.is-selected]:text-white [&.is-selected]:font-bold">
					Rusça</div>
				<div
					class="item [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-lynch-800/50 text-lynch-500 px-[20px] py-[10px] duration-350 hover:text-white [&.is-selected]:text-white [&.is-selected]:font-bold">
					İtalyanca</div>
				<div
					class="item [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-lynch-800/50 text-lynch-500 px-[20px] py-[10px] duration-350 hover:text-white [&.is-selected]:text-white [&.is-selected]:font-bold">
					Arapça</div>
				<div
					class="item [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-lynch-800/50 text-lynch-500 px-[20px] py-[10px] duration-350 hover:text-white [&.is-selected]:text-white [&.is-selected]:font-bold">
					Fransızca</div>
			</div>
		</div>
		<label for="city"
			class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">Dil
			Seçeneği</label>
		<div class="icon icon-chevron-bottom absolute text-white right-[30px] top-[34px] text-[16px] h-[16px] leading-none">
		</div>
	</div>
</template>
