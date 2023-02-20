<template>
  <div class="base-checkbox-group">
    <div v-if="label" class="base-checkbox-group__label">
      {{ label }}
    </div>
    <div class="base-checkbox-group__set">
      <label v-for="item in list" :key="item.value" class="base-checkbox-group__field">
        <input
          v-model="values"
          type="checkbox"
          :value="item.value"
          class="base-checkbox-group__checkbox"
        />
        <span class="base-checkbox-group__field-label">{{ item.text }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      required: true,
      validator: list => list.every(item => item.value && item.text),
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const values = ref(props.modelValue);

    watch(
      () => props.modelValue,
      () => (values.value = props.modelValue)
    );
    watch(values, list => emit('update:model-value', list));

    return { values };
  },
});
</script>

<style lang="styl" scoped>
.base-checkbox-group {
  display: block;

  &__label {
    margin-bottom: 0.5em;
  }

  &__field {
    display: flex;
    align-items: baseline;

    & + & {
      margin-top: 0.5em;
    }
  }

  &__checkbox {
    border: 1px solid $light-color;
    border-radius: $border-radius-base;
    padding: 0.25em;
    margin-right: 0.5em;

    &:focus {
      outline: none;
    }
  }
}
</style>
