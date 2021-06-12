import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '@shared/infra/http/app';
import faker from 'faker';

let connection: Connection;

describe('schema DELETE /doctors', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should inform that id must be a valid GUID', async () => {
    const { body } = await request(app)
      .delete(`/doctors/${faker.commerce.color()}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'id must be a valid GUID',
    });
  });
});
