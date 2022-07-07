import request from './http';

export const getAmountInfo = async (storeId?: number) => {
  const res = await request({
    url: `/bill/amount/getAmountInfo/${storeId}`,
    method: 'get',
  });
  return res.data;
};
