import zh_CN from 'antd/lib/locale/zh_CN';
import en_US from 'antd/lib/locale/en_US';

export enum LangEnum {
  /** 中文（简体） */
  'zh-CN' = 'zh-CN',
  /**  美国英语 */
  'en-US' = 'en-US',
}

export const antdLocaleMap = {
  [LangEnum['zh-CN']]: zh_CN,
  [LangEnum['en-US']]: en_US,
};

export const LangOptions = [
  { value: LangEnum['zh-CN'], label: '简体中文' },
  { value: LangEnum['en-US'], label: 'English' },
];
