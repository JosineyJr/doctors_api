import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '@shared/infra/http/app';
import faker from "faker";

let connection: Connection;

describe('schema GET /doctors', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should inform that min param length is 7 when it is sent', async () => {
    const { body } = await request(app).get(`/doctors/123456`).expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'param length must be at least 7 characters long',
    });
  });
  it('should inform that id must be a valid GUID on recover', async () => {
    const { body } = await request(app)
      .get(`/doctors/recover/${faker.commerce.color()}`)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'id must be a valid GUID',
    });
  });
});
