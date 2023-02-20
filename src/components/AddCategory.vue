<template>
  <div class="add-category">
    <BaseButton icon="plus" class="add-category__button" @click="modalOpened = true">
      {{ t('addCategory') }}
    </BaseButton>
    <teleport to="body">
      <BaseModal v-model:opened="modalOpened" :title="t('addCategory')">
        <div class="add-category__form">
          <BaseInput
            v-model="form.name"
            :label="t('categoryName')"
            :autofocus="modalOpened"
            class="add-category__field"
          />
          <BaseSelect
            v-if="options.length"
            v-model="form.parent"
            :options="options"
            :label="t('categoryParent')"
            class="add-category__field"
          />
          <ArticlesChoose
            v-model="form.articles"
            :items-per-page="5"
            paginated
            :label="t('addArticles')"
            class="add-category__field"
          />
        </div>
        <template #footer>
          <BaseButton :disabled="!isValid" @click="addCategory">
            {{ t('save') }}
          </BaseButton>
        </template>
      </BaseModal>
    </teleport>
  </div>
</template>

<script>
import { defineComponent, ref, computed, reactive } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';
import ArticlesChoose from '@/components/ArticlesChoose.vue';
import { useCategoriesStore } from '@/store/categories';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: { BaseButton, BaseModal, BaseInput, BaseSelect, ArticlesChoose },
  setup() {
    const modalOpened = ref(false);
    const form = reactive({
      name: '',
      parent: null,
      articles: [],
    });
    const isValid = computed(() => !!form.name);
    const categoriesStore = useCategoriesStore();
    const categories = computed(() => categoriesStore.list);
    const options = computed(() =>
      categories.value.map(c => ({ value: c.id, text: c.name }))
    );

    const addCategory = () => {
      categoriesStore.addCategory(form);
      modalOpened.value = false;
      clear();
    };

    const clear = () => {
      form.name = '';
      form.parent = null;
      form.articles = [];
    };

    const { t } = useI18n();

    return { modalOpened, form, isValid, options, addCategory, t };
  },
});
</script>

<style lang="styl" scoped>
.add-category {
  &__button {
    width: 100%;
  }
  &__field {
    & + & {
      margin-top: 1rem;
    }
  }
}
</style>
