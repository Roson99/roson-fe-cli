import { ConfigProvider } from 'antd';
import PrimaryLayout from './PrimaryLayout';
import '@/assets/less/index.less';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <PrimaryLayout />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
