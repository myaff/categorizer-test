<template>
  <div v-if="articles.length" class="articles-choose">
    <BaseCheckboxGroup
      v-model="values"
      :list="paginatedList"
      :label="label"
      class="articles-choose__list"
    />
    <BasePagination
      v-if="paginated"
      :total-items="articles.length"
      :items-per-page="itemsPerPage"
      v-model:current-page="currentPage"
      class="articles-choose__pagination"
    />
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue';
import BaseCheckboxGroup from '@/components/base/BaseCheckboxGroup.vue';
import BasePagination from '@/components/base/BasePagination.vue';
import { useArticlesStore } from '@/store/articles';
import usePagination from '@/composables/usePagination';

export default defineComponent({
  props: {
    label: {
      type: String,
      deault: '',
    },
    modelValue: {
      type: Array,
      required: true,
    },
    paginated: {
      type: Boolean,
      default: false,
    },
    itemsPerPage: {
      type: Number,
      deault: 10,
    },
  },
  emits: ['update:model-value'],
  setup(props, { emit }) {
    const values = ref(props.modelValue);
    const articlesStore = useArticlesStore();
    const articles = computed(() =>
      articlesStore.articlesPlain.map(item => ({ value: item.id, text: item.title }))
    );
    const { currentPage, paginatedList } = usePagination(
      articles,
      props.itemsPerPage,
      1,
      props.paginated
    );
    watch(
      () => props.modelValue,
      () => (values.value = props.modelValue)
    );
    watch(values, value => emit('update:model-value', value));
    return { values, articles, currentPage, paginatedList };
  },
  components: { BaseCheckboxGroup, BasePagination },
});
</script>

<style lang="styl" scoped>
.articles-choose {
  &__pagination {
    margin-top: 1rem;
  }
}
</style>
