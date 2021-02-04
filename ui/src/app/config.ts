export default () => ({
  api: {
    url: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://api.carvin.com'
  }
});
