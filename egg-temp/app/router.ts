import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/add', controller.home.add);
  router.get('/remove', controller.home.remove);
  router.get('/fetchPosts', controller.home.fetchPosts);
  router.post('/signIn', controller.home.signIn);
};
