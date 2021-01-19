import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610375087399_4080';

  // add your egg config in here
  config.middleware = [];

  config.security = {
    domainWhiteList: [ 'http://localhost:8080', 'http://127.0.0.1:8080', 'http://127.0.0.1', 'http://www.cookie123456.com' ],
    csrf: {
      enable: false,
    },
  };
  exports.cors = {
    origin: 'http://127.0.0.1:8080',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
