<template>
  <form class="search-form" novalidate @submit.prevent>
    <div class="search-form__field">
      <BaseInput
        v-model="searchQuery"
        type="text"
        class="search-form__input"
        @keydown.enter.prevent="search"
      />
      <BaseButton
        v-show="searchQuery"
        color="error"
        theme="plain"
        size="small"
        icon="cross"
        class="search-form__reset"
        @click.prevent.stop="reset"
      />
    </div>
    <BaseButton
      icon="search"
      size="small"
      class="search-form__submit"
      @click.prevent.stop="search"
    />
    <div v-if="$slots.default" class="search-form__result">
      <slot />
    </div>
  </form>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseButton from './base/BaseButton.vue';
import BaseInput from './base/BaseInput.vue';

export default defineComponent({
  components: { BaseButton, BaseInput },
  emits: ['search'],
  setup(_props, { emit }) {
    const searchQuery = ref('');
    const reset = function () {
      searchQuery.value = '';
      search();
    };
    const search = function () {
      emit('search', searchQuery.value);
    };
    return { searchQuery, reset, search };
  },
});
</script>

<style lang="styl" scoped>
.search-form {
  display: flex;
  flex-wrap: wrap;
  &__field {
    position: relative;
    flex: 1 1 auto;
  }
  input&__input {
    padding-right: 2rem;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__reset {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.5rem;
  }

  &__submit {
    min-width: 2.25rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &__result {
    align-self: center;
    margin-top: 0.5rem;

    +breakpoint(sm-and-up) {
      margin: auto 0.5rem;
    }
  }
}
</style>
