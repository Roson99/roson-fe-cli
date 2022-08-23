import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';

interface HelpCneterProps {}

const HelpCneter: React.FC<HelpCneterProps> = () => {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t('common.Example')} page B</p>
    </div>
  );
};

export default HelpCneter;
