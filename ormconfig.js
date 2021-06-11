require('dotenv/config');

const dir =
  process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST'
    ? 'src'
    : 'dist';
const file =
  process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'TEST'
    ? 'ts'
    : 'js';

const database =
  process.env.NODE_ENV === 'TEST' ? 'tests_backend_test' : undefined;

const port = process.env.NODE_ENV === 'TEST' ? 5431 : undefined;

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: port || Number(process.env.POSTGRESQL_PORT),
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: database || process.env.POSTGRESQL_DATABASE,
  entities: [`./${dir}/modules/**/infra/typeorm/entities/*.${file}`],
  migrations: [`./${dir}/shared/infra/typeorm/migrations/*.${file}`],
  cli: {
    migrationsDir: `./${dir}/shared/infra/typeorm/migrations/`,
  },
};
