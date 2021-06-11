import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import * as faker from 'faker';
import app from '@shared/infra/http/app';

let connection: Connection;

describe('schema POST /doctors', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should inform that name is required when it is not sent', async () => {
    const { body } = await request(app)
      .post(`/doctors`)
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
      message: 'name is required',
    });
  });
  it('should inform that crm is required when it is not sent', async () => {
    const { body } = await request(app)
      .post(`/doctors`)
      .send({
        name: faker.name.firstName(),
        cellPhone: '31976916681',
        cep: '35163143',
        specialties: ['Angiologia', 'Buco maxilo'],
        landline: '3138242424',
      })
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'crm is required',
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
      .post(`/doctors`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `crm with value "${doctor.crm}" fails to match the required pattern: /^\\d{7}$/`,
    });
  });
  it('should inform that cep is required when it is not sent', async () => {
    const { body } = await request(app)
      .post(`/doctors`)
      .send({
        name: faker.name.firstName(),
        crm: '1234648',
        cellPhone: '31976916681',
        specialties: ['Angiologia', 'Buco maxilo'],
        landline: '3138242424',
      })
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'cep is required',
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
      .post(`/doctors`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `cep with value "${doctor.cep}" fails to match the required pattern: /^\\d{8}$/`,
    });
  });
  it('should inform that cell phone is required when it is not sent', async () => {
    const { body } = await request(app)
      .post(`/doctors`)
      .send({
        name: faker.name.firstName(),
        crm: '1234648',
        cep: '35163143',
        specialties: ['Angiologia', 'Buco maxilo'],
        landline: '3138242424',
      })
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'cellPhone is required',
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
      .post(`/doctors`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `cellPhone with value "${doctor.cellPhone}" fails to match the required pattern: /^\\d{11}$/`,
    });
  });
  it('should inform that specialties is required when it is not sent', async () => {
    const { body } = await request(app)
      .post(`/doctors`)
      .send({
        name: faker.name.firstName(),
        crm: '1234648',
        cep: '35163143',
        cellPhone: '31976916681',
        landline: '3138242424',
      })
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: 'specialties is required',
    });
  });
  it('should inform that specialties must be an array when it is not an array', async () => {
    const { body } = await request(app)
      .post(`/doctors`)
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
      .post(`/doctors`)
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
      .post(`/doctors`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `landline with value "${doctor.landline}" fails to match the required pattern: /^\\d{10}$/`,
    });
  });
  it('should inform that more fields is not allowed', async () => {
    const doctor = {
      name: faker.name.firstName(),
      cellPhone: '31976916681',
      crm: '1234641',
      cep: '35163143',
      specialties: ['Angiologia', 'Buco maxilo'],
      landline: '3138242424',
      moreField: faker.commerce.color(),
    };

    const { body } = await request(app)
      .post(`/doctors`)
      .send(doctor)
      .expect(400);

    expect(body).toStrictEqual({
      status: 'error',
      type: 'validation',
      message: `moreField is not allowed`,
    });
  });
});
