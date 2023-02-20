<template>
  <div :open="opened" class="base-collapser" :class="{['base-collapser--opened']: opened}">
    <div class="base-collapser__summary" @click="$emit('update:opened', !opened)">
      <BaseIcon name="down" class="base-collapser__summary-icon" />
      <slot name="title">
        {{ title }}
      </slot>
    </div>
    <transition name="slide-fade" mode="out-in">
      <div v-show="opened" class="base-collapser__content">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
import BaseIcon from './BaseIcon.vue';
defineProps({
  title: {
    type: String,
    default: '',
  },
  opened: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="styl" scoped>
.base-collapser {
  background: $white-color;
  &__summary {
    position: relative;
    display: flex;
    align-items: baseline;
    transition: background 0.3s;
    cursor: pointer;

    &:hover,
    ^[0]--opened > & {
      background: $muted-color;
    }

    &-icon {
      margin-inline: 0.5rem;
      transition: transform 0.3s;

      +breakpoint(sm-and-up) {
        margin-inline: 1rem;
      }

      ^[0]--opened > ^[1] > & {
        transform: rotate(180deg);
      }
    }
  }

  &__content {
    overflow: hidden;
  }
}
.slide-fade {
  &-enter-from,
  &-leave-to {
    opacity: 0;
    max-height: 0;
  }
  &-enter-to,
  &-leave-from {
    max-height: 1000px;
  }
  &-enter-active {
    transition: max-height .5s linear, opacity .3s .3s ease-in-out;
  }
  &-leave-active {
    transition: opacity .1s ease-in-out, max-height .3s linear;
  }
}
</style>
