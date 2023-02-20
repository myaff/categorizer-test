<template>
  <component :is="tag" class="base-button" :class="classes">
    <BaseIcon v-if="icon" :name="icon" class="base-button__icon" />
    <div v-if="title || $slots.default" class="base-button__title" :class="titleClass">
      <slot>{{ title }}</slot>
    </div>
  </component>
</template>

<script>
import { defineComponent, computed } from 'vue';
import BaseIcon from './BaseIcon.vue';
const themes = ['default', 'bordered', 'plain'];
const colors = ['primary', 'error', 'muted', 'dark'];
const sizes = ['small', 'medium', 'big'];
export default defineComponent({
  components: { BaseIcon },
  props: {
    theme: {
      type: String,
      validator: theme => themes.includes(theme),
      default: 'default',
    },
    color: {
      type: String,
      default: 'primary',
      validator: color => colors.includes(color),
    },
    size: {
      type: String,
      default: 'medium',
      validator: size => sizes.includes(size),
    },
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    titleClass: {
      type: String,
      default: '',
    },
  },
  setup(props, ctx) {
    const hasText = computed(() => props.title || !!ctx.slots.default);
    const classes = computed(() => {
      const base = 'base-button';
      return {
        [`${base}--${props.theme}`]: true,
        [`${base}--${props.color}`]: true,
        [`${base}--${props.size}`]: true,
        [`${base}--with-icon`]: props.icon && hasText.value,
        [`${base}--only-icon`]: props.icon && !hasText.value,
      };
    });
    const tag = computed(() => {
      return ctx.attrs.href ? 'a' : ctx.attrs.type ? 'input' : 'button';
    });
    return { classes, tag };
  },
});
</script>

<style lang="styl" scoped>
$colors = {
  primary: $primary-set,
  error: $error-set,
  muted: $muted-set,
  dark: $dark-set,
}
$sizes = {
  small: {
    font: 0.75rem,
    x: 1em,
    y: 0.5em,
  },
  medium: {
    font: 1rem,
    x: 1em,
    y: 0.5em,
  },
  large: {
    font: 1.5rem,
    x: 1em,
    y: 0.5em,
  }
}
.base-button {
  cursor: pointer;
  border: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1em;
  border: 1px solid transparent;
  border-radius: $border-radius-base;
  font-size: 12px;
  line-height: 1;
  transition: background .3s, border-color .3s, color .3s;

  &:hover,
  &:focus {
    outline: none;
  }

  for $key, $size in $sizes {
    &--{$key} {
      font-size: $size.font;
      padding: $size.y $size.x;

      ^[0]--only-icon& {
        padding-inline: $size.y;
      }
    }
  }

  for $name, $color in $colors {
    &--default&--{$name} {
      background: $color.base;
      color: $color.contrast;
      &:hover {
        background: darken($color.base, 10%);
      }
    }
    &--bordered&--{$name} {
      background: transparent;
      color: $color.base;
      border-color: $color.base;
      &:hover {
        color: darken($color.base, 20%);
        border-color: darken($color.base, 20%);
      }
    }
    &--plain&--{$name} {
      background: transparent;
      color: $color.base;
      border-color: transparent;
      &:hover {
        color: darken($color.base, 20%);
      }
    }
  }

  &__icon,
  &__title {
    pointer-events: none;
  }
  &__title {
    white-space: nowrap;

    ^[0]--with-icon & {
      margin-left: 0.5em;
    }
  }

  &:disabled {
    opacity: 0.7;
    pointer-events: none;
  }
}
</style>
