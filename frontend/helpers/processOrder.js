import axios from 'axios';

export async function processOrder(details) {
  try {
    const { data } = await axios.post(
      `https://cms.artisancey.com/orders/process`,
      details
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}