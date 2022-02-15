import axios from 'axios';

export async function setReview(productID, rating, name, email, text, signal) {
  try {
    const res = await axios.post(
      `https://cms.artisancey.com/reviews?id=${productID}`,
      {
        rating,
        user: name,
        email,
        text,
      }
    );

    console.log(await res.json());
  } catch (e) {}
}
