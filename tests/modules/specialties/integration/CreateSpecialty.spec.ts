import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '@shared/infra/http/app';
import * as faker from 'faker';

let connection: Connection;

describe('POST /specialties', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should not able to create a repeat specialty', async () => {
    const { body } = await request(app)
      .post('/specialties')
      .send({ name: 'Alergologia' })
      .expect(400);

    expect(body.status).toEqual('error');
    expect(body.message).toEqual('Specialty has already been registered');
  });
  it('should able to create a new specialty', async () => {
    const specialty = {
      name: faker.hacker.verb(),
    };

    const { body } = await request(app)
      .post('/specialties')
      .send(specialty)
      .expect(201);

    expect(body.specialty).toHaveProperty('id');
    expect(body.specialty.name).toEqual(specialty.name);
  });
});
