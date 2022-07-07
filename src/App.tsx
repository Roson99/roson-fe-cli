import React from 'react';
import request from './apis/http';

export const getAmountInfo = async (storeId?: number) => {
  const res = await request({
    url: `/bill/amount/getAmountInfo/${storeId}`,
    method: 'get',
  });
  return res.data;
};

const App = () => {
  return (
    <div>
      12345678
      <button
        onClick={() => {
          getAmountInfo(583);
        }}
      >
        Post
      </button>
    </div>
  );
};

export default App;
