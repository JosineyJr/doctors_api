import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '@shared/infra/http/app';
import faker from 'faker';

let connection: Connection;

describe('schema POST /cep', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should inform that cep is required when it is not sent', async () => {
    const { body } = await request(app).post('/cep').send().expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'cep is required',
    });
  });
  it('should inform that cep fails to match the required pattern', async () => {
    const cep = { cep: '351631431' };

    const { body } = await request(app).post('/cep').send(cep).expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `cep with value "${cep.cep}" fails to match the required pattern: /^\\d{8}$/`,
    });
  });
  it('should inform that more fields is not allowed', async () => {
    const cep = { cep: '35163143', moreField: faker.commerce.color() };

    const { body } = await request(app).post('/cep').send(cep).expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `moreField is not allowed`,
    });
  });
});
