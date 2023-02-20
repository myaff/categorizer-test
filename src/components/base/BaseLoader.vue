<template>
  <div class="base-loader" :class="classes"></div>
</template>

<script>
import { defineComponent, toRefs, computed } from 'vue';
const colors = ['primary', 'error', 'inherit'];
const sizes = ['inherit', 'medium', 'large'];
export default defineComponent({
  props: {
    color: {
      type: String,
      default: 'inherit',
      validator: color => colors.includes(color),
    },
    size: {
      type: String,
      default: 'inherit',
      validator: size => sizes.includes(size) || parseInt(size),
    },
  },
  setup(props) {
    const propsRef = toRefs(props);
    const classes = computed(() => {
      const base = 'base-loader';
      return {
        [`${base}--${propsRef.color.value}`]: true,
        [`${base}--${propsRef.size.value}`]: sizes.includes(propsRef.size.value),
      };
    });
    return { classes };
  },
});
</script>

<style lang="styl" scoped>
$colors = {
  inherit: inherit,
  primary: $primary-set.base,
  error: $error-set.base,
}
$sizes = {
  inherit: inherit,
  medium: 20px,
  large: 4rem,
}
.base-loader {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  border: 3px solid currentColor;
  border-left-color: transparent;
  animation: rotation 1s linear infinite;

  for $name, $color in $colors {
    &--{$name} {
      color: $color;
    }
  }
  for $name, $size in $sizes {
    &--{$name} {
      font-size: $size;
    }
  }
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
