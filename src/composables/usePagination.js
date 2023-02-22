import { ref, computed } from 'vue';
export default function usePagination(list, itemsPerPage, page = 1, paginated = true) {
  const srcList = ref(list);
  const currentPage = ref(page);
  const paginatedList = computed(() => {
    if (!paginated) return srcList.value;
    const start = (currentPage.value - 1) * itemsPerPage;
    return srcList.value.slice(start, start + itemsPerPage);
  });

  return { currentPage, itemsPerPage, paginatedList };
}
