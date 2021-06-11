import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '@shared/infra/http/app';

let connection: Connection;

describe('POST /cep', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should not be able to register a new cep', async () => {
    const cep = { cep: '3516314' };

    const { body } = await request(app).post('/cep').send(cep).expect(400);

    expect(body.status).toEqual('error');
    expect(body.type).toEqual('validation');
  });
  it('should be able to register a new cep', async () => {
    const cep = { cep: '35163143' };

    const { body } = await request(app).post('/cep').send(cep).expect(201);

    expect(body.cep).toHaveProperty('id');
    expect(body.cep.cep).toEqual(cep.cep);
  });
  it('should not be able to register a repeated cep', async () => {
    const cep = { cep: '35163143' };
    const cep1 = { cep: '35163143' };

    const result = await request(app).post('/cep').send(cep).expect(201);
    const result1 = await request(app).post('/cep').send(cep1).expect(201);

    expect(result.body.cep).toStrictEqual(result1.body.cep);
  });
});
