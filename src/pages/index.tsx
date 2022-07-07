import React from 'react';
import { Result, Card } from 'antd';

function Home() {
  return (
    <Card style={{ height: '100vh' }}>
      <Result status="success" title="欢迎使用" />
    </Card>
  );
}

export default Home;
