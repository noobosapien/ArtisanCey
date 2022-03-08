import axios from 'axios';

export async function getOrder(link) {
  try {
    const { data } = await axios.get(
      `https://cms.artisancey.com/orders?orderLink=${link}`
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
