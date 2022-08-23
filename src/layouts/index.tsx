import React, { FC } from 'react';
import { ConfigProvider } from 'antd';
import PrimaryLayout from './PrimaryLayout';
import { BrowserRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { antdLocaleMap } from '@/i18n/config';

const App: FC = () => {
  const { i18n } = useTranslation();

  return (
    <ConfigProvider locale={antdLocaleMap[i18n.language]}>
      <BrowserRouter basename="/">
        <PrimaryLayout />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
