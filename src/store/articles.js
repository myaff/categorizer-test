import { reactive, computed, onMounted } from 'vue';
import { defineStore } from 'pinia';

export const useArticlesStore = defineStore('articles', () => {
  const state = reactive({
    isLoading: true,
    articles: null,
    error: '',
  });

  const articlesPlain = computed(() => {
    if (!state.articles) return [];
    return Array.from(state.articles).map(([_id, value]) => value);
  });

  const fetchList = () => {
    state.isLoading = true;
    import('@/data/articles')
      .then(data => {
        state.articles = new Map(data.default.map(item => [item.id, item]));
      })
      .catch(error => (state.error = error.mesaage))
      .finally(setTimeout(() => (state.isLoading = false), 1000));
  };

  const updateItem = (id, value) => {
    if (!state.articles.has(id)) throw new Error(`Article with id '${id}' doesn't exist`);
    Object.assign(state.articles.get(id), value);
  };

  onMounted(() => {
    if (!state.articles?.size) fetchList();
  });

  return { state, articlesPlain, fetchList, updateItem };
});
