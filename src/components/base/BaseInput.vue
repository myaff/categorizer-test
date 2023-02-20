<template>
  <label class="base-input">
    <div v-if="label" class="base-input__label">
      {{ label }}
    </div>
    <input ref="input" v-bind="$attrs" v-model="inputValue" class="base-input__input" />
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
    autofocus: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const input = ref(null);
    const inputValue = ref(props.modelValue);

    watch(inputValue, () => emit('update:model-value', inputValue.value));
    watch(
      () => props.modelValue,
      value => (inputValue.value = value)
    );

    watch(
      () => props.autofocus,
      () => {
        if (props.autofocus) setTimeout(() => input.value.focus());
      }
    );
    return { input, inputValue };
  },
});
</script>

<style lang="styl" scoped>
.base-input {
  display: block;

  &__input {
    border: 1px solid $light-color;
    border-radius: $border-radius-base;
    padding: 0.5em 1em;
    display: block;
    width: 100%;
    font-size: $font-size-base;

    &:focus {
      outline: none;
    }
  }

  &__label {
    margin-bottom: 0.5em;
  }
}
</style>
