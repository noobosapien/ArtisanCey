const withImages = require('next-images');

module.exports = withImages();

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['puppetinos.s3.us-west-1.amazonaws.com', 'www.shift4shop.com'],
  },
};
