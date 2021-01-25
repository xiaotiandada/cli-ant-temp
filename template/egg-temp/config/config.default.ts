import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  const domainWhiteList = [ 'http://localhost:8080', 'http://127.0.0.1:8080' ];

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1610375087399_4080';

  // add your egg config in here
  config.middleware = [
  ];

  config.security = {
    domainWhiteList,
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: ctx => {
      if (domainWhiteList.includes(ctx.request.header.origin)) {
        return ctx.request.header.origin;
      }
    },
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // https://cnodejs.org/topic/5be8dcf82fed25406c25d805
  config.ratelimiter = {
    router: [
      {
        path: '/', // 限制路由路径 此规则不会匹配(index.html?id=1)[http://url/index.html?id=1]
        max: 5000,
        time: '1m', // 时间单位 s m h d y ...
        message: {
          code: -1,
          message: 'Too Many Requests 7s/5',
        }, // 自定义请求超限错误信息
      },
    ],
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
