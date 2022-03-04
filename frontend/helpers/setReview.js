import axios from 'axios';

export async function setReview(
  productID,
  rating,
  name,
  userLastName,
  heading,
  email,
  text
) {
  try {
    const res = await axios.post(
      `https://cms.artisancey.com/reviews?id=${productID}`,
      {
        rating,
        user: name,
        userLastName,
        heading,
        email,
        text,
      }
    );

    console.log(await res.json());
  } catch (e) {}
}
