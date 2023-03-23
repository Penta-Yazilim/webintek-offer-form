<script setup lang="ts">
import { ref, defineProps, onMounted, reactive, computed } from "vue";

interface Option {
	label: string;
	value: string;
}

const id = ref(Math.random().toString(36).substr(2, 9));

const emit = defineEmits(["update:model-value"]);

const props = defineProps({
	modelValue: {
		type: [String, Array] as unknown as () => string | string[] | null,
		default: "",
	},
	options: {
		type: Array as () => Option[],
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	placeholder: {
		type: String,
		default: "Select an option",
	},
	multiple: {
		type: Boolean,
		default: false,
	},
	required: {
		type: Boolean,
		default: true,
	},
});

const showOptions = ref(false);
const selectInput = ref<HTMLInputElement | null>(null);
const selectedOptions = ref<Option[]>([]);
const placeholderVal = computed(() => {
	if (props.multiple) {
		return selectedOptions.value.length > 0 ? selectedOptions.value.map((opt) => opt.label).join(", ") : props.placeholder;
	} else {
		return selectedOptions.value.length > 0 ? props.modelValue : props.placeholder;
	}
})

onMounted(() => {
	if (props.multiple) {
		selectedOptions.value = props.options.filter((option) => props.modelValue?.includes(option.value));
	} else {
		selectedOptions.value = props.options.filter((option) => option.value === props.modelValue);
	}
});

function toggleOptions() {
	showOptions.value = !showOptions.value;
}

function selectOption(option: Option) {
	if (props.multiple) {
		const exists = selectedOptions.value.find((opt) => opt.value === option.value);

		if (exists) {
			selectedOptions.value = selectedOptions.value.filter((opt) => opt.value !== option.value);
		} else {
			selectedOptions.value = [...selectedOptions.value, option];
		}

		emit("update:model-value", selectedOptions.value.map((opt) => opt.value));
	} else {
		selectedOptions.value = [option];

		emit("update:model-value", option.value);

		showOptions.value = false;
	}
}

function isSelected(option: Option) {
	return props.modelValue?.includes(option.value);
}
</script>

<template>
	<div class="form-el" v-click-outside="() => (showOptions = false)">
		<select :id="id" class="peer absolute left-0 top-0 w-full h-full opacity-0 z-10 !cursor-pointer" ref="selectInput"
			@click="toggleOptions" multiple :required="required">
			<option class="text-white bg-body-color" selected disabled value="">
				{{ placeholder }}
			</option>
			<option class="text-white bg-body-color" v-for="option in options" :value="option.value"
				:key="`option-val-${option.value}`">
				{{ option.label }}
			</option>
		</select>

		<div
			class="select relative !cursor-pointer peer-hover:[&>.box]:!shadow-[0_0_0_1px_var(--color-lynch-600)] peer-focus:[&>.box]:!shadow-[0_0_0_1px_var(--color-primary)]">
			<div
				class="box h-[80px] flex items-center font-extralight px-[30px] focus:ring-0 focus:ring-offset-0 duration-350 shadow-[0_0_0_1px_var(--color-lynch-800)] rounded-[10px] w-full border-0 bg-transparent text-white text:text-lynch-500">
				<div class="placeholder">
					{{ placeholderVal }}
				</div>
			</div>
			<div :class="{ 'hidden': !showOptions }"
				class="options absolute left-0 top-full bg-body-color shadow-[0_0_0_1px_var(--color-lynch-800)] w-full z-30 max-h-[135px] overflow-x-hidden overflow-y-auto">
				<div v-for="option in options" :key="`option-${option.value}`" @click="$event => selectOption(option)"
					role="option" :aria-selected="isSelected(option)" :class="{ 'is-selected': isSelected(option) }"
					class="item [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-t-lynch-800/50 text-lynch-500 px-[20px] py-[10px] duration-350 hover:text-white [&.is-selected]:text-white [&.is-selected]:font-bold">
					{{ option.label }}
				</div>
			</div>
		</div>
		<label :for="id"
			class="text-white peer-focus:text-primary leading-none whitespace-nowrap peer-focus:font-bold duration-350 font-extralight absolute focus:text-primary text-[14px] left-[15px] top-0 translate-y-[-50%] bg-body-color px-[15px]">
			{{ label }}
		</label>
		<div class="icon icon-chevron-bottom absolute text-white right-[30px] top-[34px] text-[16px] h-[16px] leading-none">
		</div>
	</div>
</template>
