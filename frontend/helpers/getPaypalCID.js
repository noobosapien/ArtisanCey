import axios from 'axios';

export async function getPaypalCID() {
  try {
    const { data } = await axios.get(`/api/keys/paypal`);

    return data;
  } catch (e) {
    console.log(e);
  }
}
