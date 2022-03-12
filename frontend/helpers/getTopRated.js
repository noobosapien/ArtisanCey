import axios from 'axios';

export async function getTopRated(id, amount) {
  try {
    const { data } = await axios.get(
      `https://cms.artisancey.com/products?category=${id}&_limit=${amount}&_sort=rating:DESC`
    );

    return data;
  } catch (e) {
    console.log(e);
  }
}
