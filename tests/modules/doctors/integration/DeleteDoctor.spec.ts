import { Connection, createConnection } from 'typeorm';
import faker from 'faker';
import request from 'supertest';
import app from '@shared/infra/http/app';

let connection: Connection;

describe('delete /doctors', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should not be able to exclude a doctor who has not yet been registered', async () => {
    await request(app).delete(`/doctors/${faker.datatype.uuid()}`).expect(400);
  });
  it('should be able to delete a doctor', async () => {
    const doctor = {
      name: faker.name.firstName(),
      crm: '1214531',
      cellPhone: '31999939988',
      cep: '35163143',
      specialties: ['Angiologia', 'Cardiologia infantil'],
    };

    const { body } = await request(app)
      .post('/doctors')
      .send(doctor)
      .expect(201);

    await request(app).delete(`/doctors/${body.doctor.id}`).expect(204);
  });
});
