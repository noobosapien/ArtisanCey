import axios from 'axios';

export async function payOrder(details) {
  try {
    const res = await axios.put(`/api/order/pay`, details);
    return res;
  } catch (e) {
    console.log(e);
  }
}
