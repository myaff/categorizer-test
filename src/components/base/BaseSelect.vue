<template>
  <label class="base-select">
    <div v-if="label" class="base-select__label">
      {{ label }}
    </div>
    <select v-bind="$attrs" v-model="selectValue" class="base-select__select">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </label>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array,
      required: true,
      validator: arr => arr.every(option => option.value && option.text),
    },
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const selectValue = ref(props.modelValue);

    watch(selectValue, () => emit('update:model-value', selectValue.value));
    watch(
      () => props.modelValue,
      value => (selectValue.value = value)
    );
    return { selectValue };
  },
});
</script>

<style lang="styl" scoped>
.base-select {
  display: block;

  &__select {
    border: 1px solid $light-color;
    border-radius: $border-radius-base;
    padding: 0.5em 1em;
    display: block;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  &__label {
    margin-bottom: 0.5em;
  }
}
</style>
