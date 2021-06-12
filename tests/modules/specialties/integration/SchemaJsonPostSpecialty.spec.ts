import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '@shared/infra/http/app';
import * as faker from 'faker';

let connection: Connection;

describe('schema POST /specialties', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should inform that name is required when it is not sent', async () => {
    const { body } = await request(app).post('/specialties').send().expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'name is required',
    });
  });
  it('should inform that more fields is not allowed', async () => {
    const { body } = await request(app)
      .post('/specialties')
      .send({ name: faker.hacker.verb(), moreField: faker.commerce.color() })
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'moreField is not allowed',
    });
  });
});
