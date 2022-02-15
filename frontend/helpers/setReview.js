import axios from 'axios';

export async function setReview(rating, name, email, text, signal) {
  try {
    const res = await axios.post('https://cms.artisancey.com/reviews', {
      rating,
      user: name,
      email,
      text,
    });

    console.log(await res.json());
  } catch (e) {}
}
