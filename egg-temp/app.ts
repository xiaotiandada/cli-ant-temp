import { IBoot, Application } from 'egg';
class AppBootHook implements IBoot {
  app: Application;
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    // 应用已经启动完毕;
    // const ctx = await this.app.createAnonymousContext();
    // ctx.service.mq.consumer();
    // ctx.service.mq.consumerBuy();
  }

}

export default AppBootHook;

