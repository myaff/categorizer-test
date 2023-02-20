<template>
  <TransitionGroup tag="div" name="grid" class="articles-grid">
    <ArticleCard
      v-for="item in list"
      :key="item.id"
      v-bind="item"
      class="articles-grid__item"
      @update="value => updateArticle(item.id, value)"
      @detach="$emit('detach', item.id)"
    />
  </TransitionGroup>
</template>

<script>
import { defineComponent } from 'vue';
import ArticleCard from '@/components/ArticleCard.vue';
import { useArticlesStore } from '@/store/articles';

export default defineComponent({
  components: { ArticleCard },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const articlesStore = useArticlesStore();
    const updateArticle = (id, value) => {
      articlesStore.updateItem(id, value);
    };
    return { updateArticle };
  },
});
</script>

<style lang="styl" scoped>
.articles-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0.5rem -0.5rem;

  &__item {
    display: flex;
    align-content: stretch;
    justify-content: flex-start;
    margin: 0.5rem;
    width: calc(100% - 1rem);

    +breakpoint(sm-and-up) {
      width: calc(50% - 1rem);
    }
    +breakpoint(md-and-up) {
      width: calc(33% - 1rem);
    }
    +breakpoint(ml-and-up) {
      width: calc(25% - 1rem);
    }
  }
}
.grid {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: translateY(20px) scale(0.99);
  }

  &-enter-to,
  &-leave-from {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
  &-leave-active {
    position: absolute;
    transition: opacity 0s, transform .1s;
  }
}
</style>
