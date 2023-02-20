<template>
  <article class="article-card">
    <picture class="article-card__picture">
      <img v-if="image" :src="image" :alt="title" class="article-card__image" />
    </picture>
    <div class="article-card__body">
      <h3 class="article-card__title">
        {{ title }}
      </h3>
      <p v-if="description" class="article-card__description">
        {{ description }}
      </p>
    </div>
    <div class="article-card__footer">
      <BaseButton
        color="error"
        icon="heart"
        size="small"
        class="article-card__btn"
        @click="$emit('update', { likes: likes + 1 })"
      >
        <template v-if="likes">{{ likes }}</template>
      </BaseButton>
      <BaseButton
        color="error"
        icon="trash"
        theme="plain"
        size="small"
        class="article-card__btn"
        @click="$emit('detach')"
      >
        {{ t('removeArticle') }}
      </BaseButton>
    </div>
  </article>
</template>

<script setup>
import BaseButton from './base/BaseButton.vue';
import { useI18n } from 'vue-i18n';
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  likes: {
    type: Number,
    default: 0,
  },
});
const { t } = useI18n();
</script>

<style lang="styl" scoped>
.article-card {
  display: flex;
  flex-direction: column;
  backgroundL $white-color;
  border: 1px solid $light-color;
  border-radius: $border-radius-base;

  &__picture {
    display: block;
  }

  &__image {
    display: block;
    width: 100%;
  }

  &__body {
    padding: 1rem;
  }
  &__footer {
    margin: auto 0 0;
    padding: 0.5rem;
    display: flex;
    justify-content: space-between;
  }

  &__btn {
    margin: 0.5rem;
  }

  &__body {
    :first-child {
      margin-top: 0;
    }
    :last-child {
      margin-bottom: 0;
    }
  }
}
</style>
