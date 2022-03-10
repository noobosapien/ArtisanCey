import axios from 'axios';

export async function getOrder(link, auth) {
  try {
    const { data } = await axios.get(
      `https://cms.artisancey.com/orders/getOrder?order=${link}&auth=${auth}`
      // `http://localhost:1337/orders/getOrder?order=${link}&auth=${auth}`
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
