import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };

  // https://eggjs.org/zh-cn/tutorials/mysql.html
  config.mysql = {
    clients: {
      db1: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'xiaotian',
        database: 'test',
      },
    },
    // 所有数据库配置的默认值
    default: {
      multipleStatements: true,
      charset: 'utf8mb4',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.rabbitmq = {
    client: {
      url: 'amqp://guest:guest@localhost:5672',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.apollo = {
    config_server_url: 'http://127.0.0.1:8070', // required, 配置中心服务地址
    app_id: '1', // required, 需要加载的配置
    init_on_start: true, // optional, 在 app 启动时同时加载配置，加载的配置会在插件加载前被加载
    // cluster_name: 'default', // optional, 加载配置的集群名称, default: 'default'
    // namespace_name: 'application', // optional, 加载配置的命名空间, default: 'application'
    // release_key: 'xxx', // optional, 加载配置的版本 key, default: ''
    // ip: 'xxx', // optional,

    // set_env_file: false, // optional, 是否写入到 env 文件, default: false
    // env_file_path: 'xxxx', // optional, 写入的 env 文件路径, default: ${app.baseDir}/.env.apollo
    // watch: false, // optional, 长轮询查看配置是否更新, default: false
    timeout: 50000, // optional, 长轮询 timeout 设置，默认 50000
  };

  return config;
};
