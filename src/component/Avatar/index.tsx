import { Avatar, Space, Select } from 'antd';
import React, { FC } from 'react';
import styles from './index.module.less';
import { useTranslation } from 'react-i18next';
import { LangOptions } from '@/i18n/config';

interface AvatarProps {
  userName?: string;
  storeName?: string;
}

const UserAvatar: FC<AvatarProps> = (props) => {
  const { userName = '', storeName = '' } = props || {};
  const { i18n, t } = useTranslation();
  const userNamesInitials = userName.slice(0, 1) ?? '';

  /**
   * @method 语言环境切换
   * @param value
   */
  const changeLanguage = (value: any) => {
    window.location.reload();
    i18n.changeLanguage(value);
  };

  return (
    <Space className={styles.container} size={24}>
      <div>
        <span className={styles.storeName}>{storeName}</span>
      </div>
      <Select
        value={i18n.language}
        className={styles.languageSelect}
        bordered={false}
        onChange={changeLanguage}
        options={LangOptions}
        dropdownStyle={{ textAlign: 'center', padding: 10 }}
      />
      <Avatar className={styles.userAvatar}>{userNamesInitials}</Avatar>
    </Space>
  );
};

export default UserAvatar;
