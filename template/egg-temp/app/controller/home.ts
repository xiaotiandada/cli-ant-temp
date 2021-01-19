import { Controller } from 'egg';
import * as jwt from 'jwt-simple';
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
    ctx.cookies.set('count', countCookie, {
      sameSite: 'none',
    });
    const token: any = Date.now();
    ctx.cookies.set('token', token, {
      sameSite: 'none',
    });
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.body = count;
  }
  public async remove() {
    const ctx = this.ctx;
    ctx.cookies.set('count', null);
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.status = 204;
  }
  public async fetchPosts() {
    const ctx = this.ctx;
    // 获取 Session 上的内容
    console.log('ctx.session', ctx.session);

    const userId = 1;
    const posts = `userId: ${userId}`;
    // 修改 Session 的值
    ctx.session.visited = ctx.session.visited ? (ctx.session.visited + 1) : 1;
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.body = {
      success: true,
      posts,
    };
  }
  public async signIn() {
    const { ctx } = this;
    const { account, password } = ctx.request.body;
    console.log('account password', account, password, ctx.headers);
    const payload = {
      account,
    };
    const secret = 'xxx';
    const token = jwt.encode(payload, secret);
    console.log('token', token);
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.cookies.set('access-token', token);
    ctx.body = {
      data: token,
    };
  }
}
