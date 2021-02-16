const apiHost = 'vin4free.com';
const apiPort = 3000;
const endpoints = {
  decodeVin: '/api/vin-decode?code=',
};

export default Object.create({
  dev: {
    apiHost: `!!!dev!!! ${apiHost}`,
    api: {
      host: 'http://localhost',
      apiPort,
      endpoints
    },
  },
  test: {
    apiHost: `!!!dev!!! ${apiHost}`,
    api: {
      host: 'http://localhost',
      apiPort,
      endpoints
    },
  },
  staging: {
    apiHost: `!!!dev!!! ${apiHost}`,
    api: {
      host: 'https://staging.vin4free.com',
      port: 3333,
      endpoints
    },
  },
  prod: {
    apiHost,
    api: {
      host: 'https://vin4free.com',
      port: 6666,
      endpoints
    },
  }
});
