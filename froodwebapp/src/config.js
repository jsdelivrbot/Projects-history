const commonConfig = {
  development: {
    apiUrl: 'http://api.frood.tech/v1',
    homeRedirectLink: '/sales/orders',
    isProduction: false
  },
  production: {
    apiUrl: 'https://proxystaging.frood.tech/v1',
    homeRedirectLink: '/sales/orders',
    isProduction: true
  },
}[process.env.NODE_ENV || 'development'];

const adobeCreativeConfig = {
  apiKey: '3032d9023c6c40f98734ac3eb1b0265e',
  theme: 'light',
  tools: 'all',
};

export default {
  development: {
    isProduction: commonConfig.isProduction,
    homeRedirectLink: commonConfig.homeRedirectLink,
    apiTokenCookieName: 'X-TOKEN',
    apiTimeout: 10000, // in ms. Default value for axios client - 1000
    api: {
      url: commonConfig.apiUrl,
    },
    port: 3000,
    devServerPort: 3002,
    adobeCreativeConfig
  },
  production: {
    isProduction: commonConfig.isProduction,
    homeRedirectLink: commonConfig.homeRedirectLink,
    apiTokenCookieName: 'X-TOKEN',
    apiTimeout: 10000, // in ms. Default value for axios client - 1000
    api: {
      url: commonConfig.apiUrl,
    },
    port: 3000,
    adobeCreativeConfig
  },
}[process.env.NODE_ENV || 'development'];
