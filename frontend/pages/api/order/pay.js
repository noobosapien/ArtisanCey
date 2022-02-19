import nc from 'next-connect';

import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = process.env.SECRET_KEY;
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex'),
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    secretKey,
    Buffer.from(hash.iv, 'hex')
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, 'hex')),
    decipher.final(),
  ]);

  return decrpyted.toString();
};

const handler = nc({});

handler.put(async (req, res) => {
  try {
    const order = req.body;

    const data = {
      PPID: order.id,
      payer: order.payer.email_address,
      time: order.create_time,
    };

    const toEncrypt = JSON.stringify(data);
    const encrypted = await encrypt(toEncrypt);

    res.send(
      JSON.stringify({ orderID: encrypted.content, message: 'Order paid' })
    );
  } catch (e) {
    console.log(e);
  }
});

export default handler;
