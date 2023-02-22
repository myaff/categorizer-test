<template>
  <section class="category-tree">
    <BaseCollapser v-model:opened="openedInner" class="category-tree__collapser">
      <template #title>
        <div class="category-tree__heading">
          <div class="category-tree__heading-texts">
            <h3 class="category-tree__title">{{ name }}</h3>
          </div>
          <div class="category-tree__heading-actions">
            <div class="category-tree__count">
              <template v-if="shownCount !== totalCount">
                <span class="category-tree__search">{{ shownCount }}</span> /
              </template>
              {{ t('articles', { count: totalCount }) }}
            </div>
            <baseButton
              icon="plus"
              class="category-tree__add"
              @click.stop="updating = true"
              title-class="l-hidden-ms-down"
            >
              {{ t('addArticles') }}
            </baseButton>
            <BaseButton
              theme="plain"
              color="error"
              icon="trash"
              class="category-tree__remove"
              @click.stop="checkSure(remove, id)"
            />
          </div>
        </div>
      </template>
      <transition name="bubble" appear>
        <div v-if="openedInner" class="category-tree__content">
          <div v-if="Object.keys(children).length" class="category-tree__children">
            <CategoriesTree
              v-for="(child, cid) in children"
              :id="cid"
              :key="cid"
              :name="child.name"
              :children="child.children"
              :articles="child.shownArticles"
              :total-count="child.articlesCount"
              :shown-count="child.shownArticlesCount"
              class="category-tree__children"
              @update="save"
              @remove="remove"
            />
          </div>
          <transition name="fade" mode="out-in">
            <section v-if="articles.length" class="category-tree__articles">
              <ArticlesGrid :list="articles" @detach="id => checkSure(detachArticle, id)" />
            </section>
            <p v-else class="category-tree__articles-empty">{{ t('articlesEmpty') }}</p>
          </transition>
        </div>
      </transition>
    </BaseCollapser>
    <teleport to="body">
      <BaseModal v-if="updating" v-model:opened="updating" :title="t('addArticles')">
        <ArticlesChoose v-model="form.articles" paginated :items-per-page="5" />
        <template #footer>
          <BaseButton @click="save(form)">
            {{ t('save') }}
          </BaseButton>
          <BaseButton color="muted" @click="cancel">
            {{ t('cancel') }}
          </BaseButton>
        </template>
      </BaseModal>
      <SureModal
        v-if="sureActive"
        v-model:opened="sureActive"
        @save="handleSure(true)"
        @cancel="handleSure(false)"
      />
    </teleport>
  </section>
</template>

<script>
import { defineComponent, reactive, ref, computed, watch } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseCollapser from '@/components/base/BaseCollapser.vue';
import ArticlesGrid from '@/components/ArticlesGrid.vue';
import ArticlesChoose from '@/components/ArticlesChoose.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import SureModal from './SureModal.vue';
import { useI18n } from 'vue-i18n';
import useSureModal from '@/composables/useSureModal';

export default defineComponent({
  name: 'CategoriesTree',
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    children: {
      type: Object,
      default: () => ({}),
    },
    articles: {
      type: Array,
      default: () => [],
    },
    totalCount: {
      type: Number,
      default: 0,
    },
    shownCount: {
      type: Number,
      default: 0,
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['remove', 'update'],
  setup(props, { emit }) {
    const propsArticlesIds = computed(() => props.articles.map(item => item.id));
    const form = reactive({
      id: props.id,
      articles: propsArticlesIds.value,
    });
    watch(propsArticlesIds, value => (form.articles = value));
    const updating = ref(false);
    const remove = id => emit('remove', id);
    const reset = () => (form.articles = propsArticlesIds.value);
    const close = () => (updating.value = false);
    const save = value => {
      emit('update', value);
      close();
      reset();
    };
    const cancel = () => {
      close();
      reset();
    };
    const detachArticle = id => {
      form.articles = propsArticlesIds.value.filter(item => item !== id);
      save(form);
    };
    const { active: sureActive, checkSure, handleSure } = useSureModal();
    const { t } = useI18n();
    const openedInner = ref(props.opened);
    watch(
      () => props.opened,
      () => (openedInner.value = props.opened)
    );
    return {
      form,
      updating,
      sureActive,
      openedInner,
      remove,
      save,
      cancel,
      detachArticle,
      checkSure,
      handleSure,
      t,
    };
  },
  components: {
    BaseCollapser,
    BaseButton,
    ArticlesGrid,
    ArticlesChoose,
    BaseModal,
    SureModal,
  },
});
</script>

<style lang="styl" scoped>
.category-tree {
  &__children {
    padding-left: 2%;
  }
  &__articles {
    display: flex;
    flex-wrap: wrap;
    margin: 0.5rem 0;
  }

  &__heading {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 1rem 0.5rem;
    justify-content: space-between;
    align-items: baseline;

    +breakpoint(md-and-up) {
      flex-wrap: nowrap;
    }

    &-texts {
      display: flex;
      flex: 0 0 100%;
      align-items: baseline;

      +breakpoint(md-and-up) {
        flex: 1 1 100%;
      }
    }

    &-actions {
      margin: 0 -0.5rem -0.5rem;
      display: flex;
      align-items: baseline;
      flex: 1 0 auto;
      justify-content: flex-end;

      +breakpoint(md-and-up) {
        margin-top: -0.5rem;
        flex: 0 0 auto;
      }
    }
  }

  &__title {
    margin: 0;
  }

  &__count {
    margin: 1rem auto 1rem 0.5rem;
    font-size: 1rem;
    line-height: 1;

    +breakpoint(md-and-up) {
      margin: auto 1rem;
    }
  }

  &__search {
    color: $primary-color;
  }

  &__add,
  &__remove {
    margin: 0.5rem;
  }
}
</style>
