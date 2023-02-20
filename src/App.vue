<template>
  <div class="app">
    <transition name="fade" mode="out-in">
      <div v-if="isLoading" class="app__loader">
        <base-loader color="primary" size="large" />
      </div>
      <div v-else class="app__content">
        <header class="app__header">
          <div class="l-container">
            <div class="app__header-content">
              <SearchForm class="app__search" @search="onSearch">
                <template v-if="showSearchResultsCount">
                  {{ t('founded') + ' ' + t('articles', { count: searchResultsCount }) }}
                </template>
              </SearchForm>
              <AddCategory class="app__add" />
              <BaseButton icon="rotate" color="error" class="app__reset" @click="checkSure(resetApp)"/>
              <SureModal v-if="sureActive" v-model:opened="sureActive" @save="handleSure(true)" @cancel="handleSure(false)" />
            </div>
          </div>
        </header>
        <main class="app__main">
          <div class="l-container">
            <transition name="fade" mode="out-in">
              <div v-if="paginatedList.length">
                <CategoriesTree
                  v-for="item in paginatedList"
                  :id="item.id"
                  :key="item.id"
                  :name="item.name"
                  :children="item.children"
                  :articles="item.shownArticles"
                  :total-count="item.articlesCount"
                  :shown-count="item.shownArticlesCount"
                  opened
                  @update="updateCategory"
                  @remove="deleteCategory"
                />
              </div>
              <p v-else class="app__main-empty">{{ t('categoriesEmpty') }}</p>
            </transition>
          </div>
        </main>
        <footer class="app__footer">
          <div class="l-container">
            <BasePagination
              v-model:current-page="currentPage"
              :total-items="categories.length"
              :items-per-page="itemsPerPage"
              class="app__pagination"
            />
          </div>
        </footer>
      </div>
    </transition>
  </div>
</template>
<script>
import { defineComponent, computed, ref } from 'vue';
import BaseLoader from './components/base/BaseLoader.vue';
import BaseButton from './components/base/BaseButton.vue';
import CategoriesTree from './components/CategoriesTree.vue';
import SearchForm from './components/SearchForm.vue';
import BasePagination from './components/base/BasePagination.vue';
import AddCategory from './components/AddCategory.vue';
import SureModal from './components/SureModal.vue';
import useSureModal from '@/composables/useSureModal';
import usePagination from '@/composables/usePagination';
import { useArticlesStore } from './store/articles';
import { useCategoriesStore } from './store/categories';
import { useArticlesSearchStore } from '@/store/articlesSearch';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'App',
  components: {
    BaseLoader,
    BaseButton,
    CategoriesTree,
    SearchForm,
    BasePagination,
    AddCategory,
    SureModal,
  },
  setup() {
    // articles
    const articlesStore = useArticlesStore();
    const articlesSearchStore = useArticlesSearchStore();
    const isLoading = computed(() => articlesStore.state.isLoading);
    const searchResultsCount = computed(() => articlesSearchStore.searchResults.size);
    const showSearchResultsCount = ref(false);
    const onSearch = value => {
      showSearchResultsCount.value = !!value;
      articlesSearchStore.setQuery(value);
    };
    // categories
    const categoriesStore = useCategoriesStore();
    const categories = computed(() => categoriesStore.tree);
    const deleteCategory = id => {
      categoriesStore.deleteCategory(id);
    };
    const resetApp = () => {
      categoriesStore.reset();
    }
    const { currentPage, itemsPerPage, paginatedList } = usePagination(categories, 3);

    const updateCategory = category => {
      categoriesStore.updateCategory(category);
    };

    const { active: sureActive, checkSure, handleSure } = useSureModal();
    const { t } = useI18n();

    return {
      categories,
      searchResultsCount,
      showSearchResultsCount,
      isLoading,
      paginatedList,
      currentPage,
      itemsPerPage,
      sureActive,
      updateCategory,
      onSearch,
      deleteCategory,
      resetApp,
      checkSure,
      handleSure,
      t
    };
  },
});
</script>

<style lang="styl" scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  &__loader {
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1 0 100%;
  }

  &__header,
  &__main,
  &__footer {
    padding: 1rem;

    +breakpoint(sm-and-up) {
      padding: 2rem;
    }
  }

  &__header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    align-items: center;
    flex: 0 0 auto;
    background: $white-color;
    border-bottom: 1px solid $muted-color;
    z-index: $z-header;

    &-content {
      display: flex;
      flex-wrap: wrap;
    }
  }
  &__main {
    margin-top: 150px;
    flex: 1 0 100%;

    +breakpoint(sm-and-up) {
      margin-top: 100px;
    }
  }

  &__footer {
    flex: 0 0 auto;
  }

  &__search {
    flex: 1 0 100%;
    margin-left: 0;
    margin-bottom: 0.5rem;

    +breakpoint(sm-and-up) {
      flex: 0 0 auto;
      margin-right: auto;
      margin-bottom: 0;
    }
  }
  &__add {
    flex: 1 1 auto;

    +breakpoint(ms-and-up) {
      flex: 0 0 auto;
    }
  }
  &__reset {
    margin-right: 0;
    margin-left: 1rem;
    flex: 0 0 auto;
    +breakpoint(sm-and-up) {
      margin-left: 1rem;
    }
  }
}
</style>
