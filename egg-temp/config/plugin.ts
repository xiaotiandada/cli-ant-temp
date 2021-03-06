import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  ratelimiter: {
    enable: true,
    package: 'egg-ratelimiter',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  xtransit: {
    enable: false,
    package: 'egg-xtransit',
  },
  alinode: {
    enable: false,
    package: 'egg-alinode',
  },
  rabbitmq: {
    enable: false,
    package: '@eggplugin/rabbitmq',
  },
  apollo: {
    enable: false,
    package: '@gaoding/egg-apollo-client',
  },
};

export default plugin;
