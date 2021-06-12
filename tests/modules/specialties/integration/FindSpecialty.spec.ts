import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '@shared/infra/http/app';

let connection: Connection;

describe('GET /specialties', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to find all specialties', async () => {
    const { body } = await request(app).get('/specialties').expect(200);

    expect(Array.isArray(body.specialties));
    expect(body.specialties).toHaveLength(8);
  });
});
