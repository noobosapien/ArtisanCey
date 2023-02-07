import axios from 'axios';

export async function getOrder(link, auth) {
  try {
    const { data } = await axios.post(
      `https://cms.puppetinos.com/artisanceyorders/getOrder?order=${link}&auth=${auth}`
      // `http://localhost:1337/artisanceyorders/getOrder?order=${link}&auth=${auth}`
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
