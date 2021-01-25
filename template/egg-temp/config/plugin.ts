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
};

export default plugin;
