<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

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
  error: {
    type: String,
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
  let stringVal: any = "";

  if (props.multiple) {
    stringVal = selectedOptions.value.length > 0
      ? selectedOptions.value.map((opt) => opt.label).join(", ")
      : props.placeholder;
  } else {
    stringVal = selectedOptions.value.length > 0 ? props.modelValue : props.placeholder;
  }

  if(typeof stringVal === "string") {
    // Trim comma from start and end
    return stringVal.replace(/^,|,$/g, "");
  }

  return stringVal;
});

onMounted(() => {
  if (props.multiple) {
    selectedOptions.value = props.options.filter((option) =>
      props.modelValue?.includes(option.value)
    );
  } else {
    selectedOptions.value = props.options.filter(
      (option) => option.value === props.modelValue
    );
  }
});

function toggleOptions(e: MouseEvent) {
  if(!showOptions.value){
    selectInput.value?.blur();
    window.focus();
  }

  showOptions.value = !showOptions.value;
}

function selectOption(option: Option) {
  if (props.multiple) {
    const exists = selectedOptions.value.find(
      (opt) => opt.value === option.value
    );

    if (exists) {
      selectedOptions.value = selectedOptions.value.filter(
        (opt) => opt.value !== option.value
      );
    } else {
      selectedOptions.value = [...selectedOptions.value, option];
    }

    emit(
      "update:model-value",
      selectedOptions.value.filter((opt) => opt.value).map((opt) => opt.value)
    );
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
    <select
      :id="id"
      class="peer absolute left-0 top-0 z-10 h-full w-full !cursor-pointer opacity-0 appearance-none"
      ref="selectInput"
      @click.prevent="toggleOptions"
      multiple
      :required="required"
    >
      <option class="bg-body-color text-white" selected disabled value="">
        {{ placeholder }}
      </option>
      <option
        class="bg-body-color text-white"
        v-for="option in options"
        :value="option.value"
        :key="`option-val-${option.value}`"
      >
        {{ option.label }}
      </option>
    </select>

    <div
      class="select relative !cursor-pointer peer-hover:[&>.box]:!shadow-[0_0_0_1px_var(--color-lynch-600)] peer-focus:[&>.box]:!shadow-[0_0_0_1px_var(--color-primary)]"
    >
      <div
        class="box flex h-[80px] w-full items-center rounded-[10px] border-0 bg-transparent px-[30px] font-extralight text-lynch-500 shadow-[0_0_0_1px_var(--color-lynch-800)] duration-350 focus:ring-0 focus:ring-offset-0"
        :class="{ 
          '!text-white': selectedOptions.length > 0 ,
          '!shadow-pink-600': error,
        }"
      >
        <div class="placeholder">
          {{ placeholderVal }}
        </div>
      </div>
      <div
        :class="{ '!block': showOptions }"
        class="hidden options absolute left-0 top-full z-30 max-h-[135px] w-full overflow-y-auto overflow-x-hidden bg-body-color shadow-[0_0_0_1px_var(--color-lynch-800)]"
      >
        <div
          v-for="option in options"
          :key="`option-${option.value}`"
          @click="($event) => selectOption(option)"
          role="option"
          :aria-selected="isSelected(option)"
          :class="{ 
            'is-selected': isSelected(option),
          }"
          class="item px-[20px] py-[10px] text-lynch-500 duration-350 hover:text-white [&.is-selected]:font-bold [&.is-selected]:text-white [&:not(:first-child)]:border-t-[1px] [&:not(:first-child)]:border-solid [&:not(:first-child)]:border-t-lynch-800/50"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
    <label
      :for="id"
      :class="{
        '!text-pink-600': error,
      }"
      class="absolute left-[15px] top-0 translate-y-[-50%] whitespace-nowrap bg-body-color px-[15px] text-[14px] font-extralight leading-none text-white duration-350 focus:text-primary peer-focus:font-bold peer-focus:text-primary"
    >
      {{ label }}
    </label>
    <div
      class="icon icon-chevron-bottom absolute right-[30px] top-[34px] h-[16px] text-[16px] leading-none text-white"
    ></div>

    <p class="mt-2 text-sm text-pink-600" v-if="error">
      {{ error }}
    </p>
  </div>
</template>
