<template>
  <div class="base-pagination">
    <BaseButton
      icon="prev"
      theme="bordered"
      size="small"
      :disabled="page === 1"
      class="base-pagination__button base-pagination__prev"
      @click="page--"
    />
    <BaseButton
      v-for="item in pages"
      :key="item"
      size="small"
      :theme="page === item ? 'default' : 'bordered'"
      class="base-pagination__button base-pagination__page"
      @click="page = item"
    >
      {{ item }}
    </BaseButton>
    <BaseButton
      icon="next"
      size="small"
      theme="bordered"
      :disabled="page === totalPages"
      class="base-pagination__button base-pagination__next"
      @click="page++"
    />
  </div>
</template>
<script>
import { defineComponent, ref, computed, watch } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';

export default defineComponent({
  components: { BaseButton },
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:currentPage'],
  setup(props, { emit }) {
    const page = ref(props.currentPage);
    const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage) || 1);
    const pages = computed(() => {
      return new Array(totalPages.value).fill(0).map((_p, i) => i + 1);
    });
    watch(page, value => {
      emit('update:currentPage', value);
    });
    return { page, pages, totalPages };
  },
});
</script>

<style lang="styl" scoped>
.base-pagination {
  display: flex;

  &__button {
    margin-inline: 0.25em;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
