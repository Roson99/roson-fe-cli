import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { LangEnum } from './config';
import enJSON from './locales/en-US';
import zhJSON from './locales/zh-CN';

// 语言优先级：浏览器 > 店铺 > 默认英文
const ls_lang = localStorage.getItem('i18nextLng') || '';
const fallbackLng = LangEnum[ls_lang] ?? LangEnum['en-US'];
localStorage.setItem('i18nextLng', fallbackLng);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      [LangEnum['zh-CN']]: { translation: zhJSON },
      [LangEnum['en-US']]: { translation: enJSON },
    },
    //选择默认语言，选择内容为上述配置中的key
    fallbackLng: fallbackLng,
    preload: [LangEnum['en-US'], LangEnum['zh-CN']],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // caches: ['localStorage', 'sessionStorage', 'cookie'],
    },
  });

export default i18n;
