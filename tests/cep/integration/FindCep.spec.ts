import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';

let connection: Connection;

describe('GET /cep', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to find all registered ceps', async () => {
    await request(app).post('/cep').send({ cep: '35163143' }).expect(201);
    await request(app).post('/cep').send({ cep: '35163143' }).expect(201);
    await request(app).post('/cep').send({ cep: '35160138' }).expect(201);

    const { body } = await request(app).get('/cep').expect(200);

    expect(Array.isArray(body.ceps)).toBeTruthy();
    expect(body.ceps).toHaveLength(2);
  });
});
