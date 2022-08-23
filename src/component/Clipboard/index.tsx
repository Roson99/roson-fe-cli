import React, { Children } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Auth } from '@/component';

interface ClipboardProps {
  children?: string;
  icon?: boolean;
}

const Clipboard: React.FC<ClipboardProps> = (props) => {
  const { t } = useTranslation();

  if (!props.children) return null;
  return (
    <CopyToClipboard text={props.children}>
      <span onClick={() => message.success(`${t('common.copy')}  ${t('common.success')}`, 0.5)}>
        {props.children}
        <Auth auth={props.icon}>
          <CopyOutlined />
        </Auth>
      </span>
    </CopyToClipboard>
  );
};

export default Clipboard;
