import { reactive, watch, ref } from 'vue';

export default function useSureModal() {
  const sure = reactive({
    fn: null,
    args: [],
  });
  const active = ref(false);

  const reset = () => {
    sure.fn = null;
    sure.args = [];
  };

  const checkSure = (fn, ...args) => {
    sure.fn = fn;
    sure.args = args;
    active.value = true;
  };
  const handleSure = answer => {
    if (answer) sure.fn(...sure.args);
    active.value = false;
  };

  watch(active, value => {
    if (!value) reset();
  });

  return { active, checkSure, handleSure };
}
