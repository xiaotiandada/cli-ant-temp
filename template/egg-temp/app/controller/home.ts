import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.test.sayHi('egg');
  }
  public async add() {
    const ctx = this.ctx;
    let count: any = ctx.cookies.get('count');
    console.log('count', count);
    console.log('token', ctx.cookies.get('token'));

    count = count ? Number(count) : 0;
    const countCookie: any = ++count;
    ctx.cookies.set('count', countCookie);
    const token: any = Date.now();
    ctx.cookies.set('token', token);
    ctx.body = count;
  }
  public async remove() {
    const ctx = this.ctx;
    ctx.cookies.set('count', null);
    ctx.status = 204;
  }
  public async fetchPosts() {
    const ctx = this.ctx;
    // 获取 Session 上的内容
    const userId = ctx.session.userId;
    const posts = `userId: ${userId}`;
    // 修改 Session 的值
    ctx.session.visited = ctx.session.visited ? (ctx.session.visited + 1) : 1;
    ctx.body = {
      success: true,
      posts,
    };
  }
}
