import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './index.module.less';

interface HelpCneterProps {}

const HelpCneter: React.FC<HelpCneterProps> = () => {
  const { t } = useTranslation();

  return (
    <div className="oocard">
      <p className={styles.title}>{t('common.Example')} page A</p>
    </div>
  );
};

export default HelpCneter;
