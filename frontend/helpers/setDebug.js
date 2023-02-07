import axios from 'axios';

export async function setDebug(info) {
  try {
    const { data } = await axios.post(`https://cms.puppetinos.com/debugs`, {
      data: {
        info,
      },
    });

    return data;
  } catch (e) {}
}
