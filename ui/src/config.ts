export default Object.create({
  dev: {
    siteHost: 'vin4free.com',
    api: {
      host: 'http://localhost',
      port: 3000,
      endpoints: {
        decodeVin: '/api/vin-decode?code=',
      }
    }
  },
  prod: {
    siteHost: 'vin4free.com',
    api: {
      host: 'https://vin4free.com',
      port: '',
      endpoints: {
        decodeVin: '/api/vin-decode?code=',
      }
    }
  }
});
