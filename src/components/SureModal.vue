<template>
  <teleport to="body">
    <BaseModal v-model:opened="active" :title="t('sure')" size="small">
      {{ t('uncancelableAction') }}
      <template #footer>
        <BaseButton @click="handle('save')">
          {{ t('yes') }}
        </BaseButton>
        <BaseButton color="muted" @click="handle('cancel')">
          {{ t('no') }}
        </BaseButton>
      </template>
    </BaseModal>
  </teleport>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import BaseModal from '@/components/base/BaseModal.vue';
import { useI18n } from 'vue-i18n';
export default defineComponent({
  props: {
    opened: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:opened', 'save', 'cancel'],
  setup(props, { emit }) {
    const active = ref(props.opened);
    watch(active, value => emit('update:opened', value));
    watch(
      () => props.opened,
      () => (active.value = props.opened)
    );
    const handle = eventType => {
      emit(eventType);
      active.value = false;
    };
    const { t } = useI18n();
    return { active, handle, t };
  },
  components: { BaseModal, BaseButton },
});
</script>
