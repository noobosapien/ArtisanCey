import axios from 'axios';

export async function processOrder(details) {
  try {
    const { data } = await axios.post(
      `https://cms.puppetinos.com/artisanceyorders/process`,
      // `http://localhost:1337/artisanceyorders/process`,
      details
    );
    return data;
  } catch (e) {
    console.log(e);
  }
}
