import { computed, watch, reactive, onMounted } from 'vue';
import { defineStore } from 'pinia';
import generateUniqueId from '@/utils/generateUniqueId';
import { useArticlesSearchStore } from '@/store/articlesSearch';
import { useArticlesStore } from '@/store/articles';
import Category from '@/models/Category';

export const useCategoriesStore = defineStore('categories', () => {
  // state
  const state = reactive({
    categories: {},
  });
  const articlesSearchStore = useArticlesSearchStore();
  const articlesStore = useArticlesStore();

  // getters
  const shown = computed(() => {
    return Object.values(state.categories).map(category => ({
      ...category,
      shownArticles: category.articles
        .filter(id => articlesSearchStore.searchResults.has(id))
        .map(id => articlesStore.state.articles.get(id)),
    }));
  });
  const list = computed(() => Object.values(shown.value));

  const nodesMap = computed(() => {
    return list.value.reduce((map, item) => {
      map[item.id] = new Category(item);
      return map;
    }, {});
  });

  const tree = computed(() => {
    return list.value.reduce((tree, node) => {
      if (node.parent !== null) {
        const parent = nodesMap.value[node.parent];
        parent.children[node.id] = nodesMap.value[node.id];
      } else {
        tree.push(nodesMap.value[node.id]);
      }
      return tree;
    }, []);
  });

  // public actions
  const addCategory = value => {
    if (!value.name) throw new Error('Category must have a name');
    const id = value?.id ?? generateUniqueId(6);
    const category = {
      id,
      name: value.name,
      parent: value.parent ?? null,
      articles: value.articles,
    };
    state.categories[id] = category;
  };

  const updateCategory = value => {
    if (!value.id) throw new Error('Missed required param "id"');
    if (!state.categories[value.id]) throw new Error(`Category ${value.id} is not found`);
    Object.assign(state.categories[value.id], value);
  };

  const deleteCategory = id => {
    if (!state.categories[id]) return;
    const node = nodesMap.value[id];
    const children = Object.values(node.children);
    if (children.length) children.forEach(child => deleteCategory(child.id));
    delete state.categories[id];
  };

  const reset = () => {
    state.categories = {};
  };

  // set initial state, private(?)
  const setCategories = data => {
    for (let id of Object.keys(data)) {
      addCategory(data[id]);
    }
  };

  // connect to storage, set state from storage
  // TODO: replace storage logic
  watch(state, value => {
    localStorage.setItem('categories', JSON.stringify(value));
  });

  onMounted(() => {
    const storedData = JSON.parse(localStorage.getItem('categories'));
    if (storedData?.categories) {
      setCategories(storedData.categories);
    }
  });

  return { list, tree, addCategory, updateCategory, deleteCategory, reset };
});
