import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import * as faker from 'faker';
import app from '@shared/infra/http/app';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';

let connection: Connection;
let createdDoctor: Doctor;

describe('schema PUT /doctors', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const doctor = {
      name: faker.name.firstName(),
      crm: '1214531',
      cellPhone: '31999931988',
      cep: '35163143',
      specialties: ['Angiologia', 'Cardiologia infantil'],
    };

    const { body } = await request(app)
      .post('/doctors')
      .send(doctor)
      .expect(201);

    createdDoctor = body.doctor;
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should inform that id must be a valid GUID', async () => {
    const { body } = await request(app)
      .put(`/doctors/${faker.random.word()}`)
      .send({
        crm: '1234648',
        cellPhone: '31976916681',
        cep: '35163143',
        specialties: ['Angiologia', 'Buco maxilo'],
        landline: '3138242424',
      })
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'id must be a valid GUID',
    });
  });

  it('should inform that crm fails to match the required pattern', async () => {
    const doctor = {
      name: faker.name.firstName(),
      cellPhone: '31976916681',
      crm: '123464',
      cep: '35163143',
      specialties: ['Angiologia', 'Buco maxilo'],
      landline: '3138242424',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `crm with value "${doctor.crm}" fails to match the required pattern: /^\\d{7}$/`,
    });
  });
  it('should inform that cep fails to match the required pattern', async () => {
    const doctor = {
      name: faker.name.firstName(),
      cellPhone: '31976916681',
      crm: '1234641',
      cep: '351631431',
      specialties: ['Angiologia', 'Buco maxilo'],
      landline: '3138242424',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `cep with value "${doctor.cep}" fails to match the required pattern: /^\\d{8}$/`,
    });
  });

  it('should inform that cell phone fails to match the required pattern', async () => {
    const doctor = {
      name: faker.name.firstName(),
      cellPhone: '319769166811',
      crm: '1234641',
      cep: '35163143',
      specialties: ['Angiologia', 'Buco maxilo'],
      landline: '3138242424',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `cellPhone with value "${doctor.cellPhone}" fails to match the required pattern: /^\\d{11}$/`,
    });
  });
  it('should inform that specialties must be an array when it is not an array', async () => {
    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send({
        name: faker.name.firstName(),
        crm: '1234648',
        cep: '35163143',
        cellPhone: '31976916681',
        landline: '3138242424',
        specialties: 'it is not an array',
      })
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'specialties must be an array',
    });
  });
  it('should inform that specialties must contain at least 2 items when it is less than 2 items', async () => {
    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send({
        name: faker.name.firstName(),
        crm: '1234648',
        cep: '35163143',
        cellPhone: '31976916681',
        landline: '3138242424',
        specialties: [],
      })
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'specialties must contain at least 2 items',
    });
  });
  it('should inform that landline fails to match the required pattern', async () => {
    const doctor = {
      name: faker.name.firstName(),
      cellPhone: '31976916681',
      crm: '1234641',
      cep: '35163143',
      specialties: ['Angiologia', 'Buco maxilo'],
      landline: '31382424248',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `landline with value "${doctor.landline}" fails to match the required pattern: /^\\d{10}$/`,
    });
  });
});
