import { createI18n } from 'vue-i18n';
import ru from './locale/ru.json';

export default createI18n({
  locale: 'ru',
  messages: { ru },
  legacy: false,
  pluralRules: {
    ru: (choice, choicesLength) => {
      if (choice === 0) return 0;
      const teen = choice > 10 && choice < 20;
      if (!teen && choice % 10 === 1) return 1;
      if (!teen && choice % 10 >= 2 && choice % 10 <= 4) return 2;
      return choicesLength < 4 ? 2 : 3;
    },
  },
});
