<template>
  <div class="app">
    {{ t('categoriesEmpty') }}
  </div>
</template>
<script>
import { defineComponent, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  name: 'App',
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style lang="styl" scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}
</style>
