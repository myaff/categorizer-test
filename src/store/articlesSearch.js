import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useArticlesStore } from '@/store/articles';

export const useArticlesSearchStore = defineStore('articles-search', () => {
  const articlesStore = useArticlesStore();
  const query = ref('');

  const list = computed(() => {
    if (!articlesStore.state.articles) return [];
    return Array.from(articlesStore.state.articles).map(([_id, value]) => value);
  });

  const searchResults = computed(() => {
    if (!query.value) return new Set(list.value.map(item => item.id));
    const lowerQuery = query.value.toLowerCase();
    return list.value.reduce((set, item) => {
      if (item.title.toLowerCase().includes(lowerQuery)) set.add(item.id);
      return set;
    }, new Set());
  });

  const setQuery = value => (query.value = value);

  return { query, searchResults, setQuery };
});
