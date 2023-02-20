<template>
  <svg class="base-icon" :class="classes">
    <use :href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    default: 'icon',
  },
  color: {
    type: String,
    default: 'inherit',
    validator: color => ['primary', 'error', 'inherit'].includes(color),
  },
  filled: {
    type: Boolean,
    default: true,
  },
  stroked: {
    type: Boolean,
    default: false,
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const classes = computed(() => {
  const prefix = 'base-icon';
  return {
    [`${prefix}--${props.name}`]: true,
    [`${prefix}--filled`]: props.filled,
    [`${prefix}--stroked`]: props.stroked,
  };
});
</script>

<style scoped lang="styl">
$colors = {
  inherit: inherit,
  primary: $primary-set.base,
  error: $error-set.base,
}
.base-icon {
  display: inline-block;
  font-size: inherit;
  width: 1em;
  min-width: 1em;
  height: 1em;
  line-height: 1;

  &--filled {
    fill: currentcolor;
  }

  &--stroked {
    stroke: currentcolor;
  }

  for $key, $color in $colors {
    &--{$key} {
      color: $color;
    }
  }
}
</style>
