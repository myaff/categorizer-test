<template>
  <transition name="modal" mode="out-in" appear>
    <div v-show="opened" class="base-modal" :class="classes" @click="close" @keydown.esc="close">
      <div class="base-modal__window" @click.stop>
        <div class="base-modal__header">
          <slot name="header">
            <h2 class="base-modal__title">{{ title }}</h2>
          </slot>
          <BaseButton
            icon="cross"
            theme="plain"
            color="dark"
            class="base-modal__close"
            @click="close"
          />
        </div>
        <div class="base-modal__body"><slot /></div>
        <div v-if="$slots.footer" class="base-modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, computed } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
const sizes = ['small', 'medium'];
export default defineComponent({
  components: { BaseButton },
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: size => sizes.includes(size),
    },
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['update:opened'],
  setup(props, { emit }) {
    const classes = computed(() => {
      const base = 'base-modal';
      return {
        [`${base}--${props.size}`]: true,
        [`${base}--opened`]: props.opened,
      };
    });
    const close = () => {
      emit('update:opened', !props.opened);
    };
    return { classes, close };
  },
});
</script>

<styles lang="styl" scoped>
$sizes = {
  small: 460px,
  medium: 660px,
}
.base-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(#000, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
  overscroll-behavior: none;
  z-index: $z-modal;
  transition: backdrop-filter .3s ease-out, opacity .3s;

  +breakpoint(sm-and-up) {
    padding: 2rem;
  }

  &--opened {
    backdrop-filter: blur(4px);
  }

  &__window {
    position: relative;
    background: #fff;
    width: 100%;
    border-radius: $border-radius-base;
    margin: auto;

    for $key, $size in $sizes {
      ^[0]--{$key} & {
        max-width: $size;
      }
    }
  }

  &__header,
  &__body {
    padding: 1rem;
  }

  &__header {
    padding-right: 3rem;
  }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  &__title {
    margin: 0;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    padding: 0.5rem;

    > * {
      margin: 0.5rem;
    }
  }
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  backdrop-filter: blur(0px);
}
.modal-enter-to,
.modal-leave-from {
  backdrop-filter: blur(4px);
  opacity: 1;
}
</styles>
