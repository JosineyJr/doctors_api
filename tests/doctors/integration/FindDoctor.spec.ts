import { Connection, createConnection } from 'typeorm';
import app from '@shared/infra/http/app';
import request from 'supertest';
import faker from 'faker';

let connection: Connection;

describe('GET /doctor', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to find all doctors', async () => {
    const { body } = await request(app).get('/doctors').expect(200);

    expect(Array.isArray(body.doctors)).toBeTruthy();
  });
  it('should be able to find a doctor when a id is passed', async () => {
    const doctor = {
      name: faker.name.firstName(),
      crm: '1214534',
      cellPhone: '31999939988',
      cep: '35163143',
      specialties: ['Angiologia', 'Cardiologia infantil'],
    };

    const result = await request(app).post('/doctors').send(doctor).expect(201);

    const { body } = await request(app)
      .get(`/doctors/${result.body.doctor.id}`)
      .expect(200);

    expect(body.doctors).toHaveProperty('id');
    expect(body.doctors.name).toEqual(doctor.name);
    expect(body.doctors.crm).toEqual(doctor.crm);
    expect(body.doctors.cellPhone).toEqual(doctor.cellPhone);
    expect(body.doctors.cep.cep).toEqual(doctor.cep);
    expect(body.doctors.specialties).toHaveLength(2);
    expect(body.doctors.specialties[0].name).toEqual(doctor.specialties[0]);
    expect(body.doctors.specialties[1].name).toEqual(doctor.specialties[1]);
  });
  it('should be able to find a doctor when a crm is passed', async () => {
    const doctor = {
      name: faker.name.firstName(),
      crm: '1214532',
      cellPhone: '31999939987',
      cep: '35163143',
      specialties: ['Alergologia', 'Cardiologia infantil'],
    };

    const result = await request(app).post('/doctors').send(doctor).expect(201);

    const { body } = await request(app)
      .get(`/doctors/${result.body.doctor.crm}`)
      .expect(200);

    expect(body.doctors).toHaveProperty('id');
    expect(body.doctors.name).toEqual(doctor.name);
    expect(body.doctors.crm).toEqual(doctor.crm);
    expect(body.doctors.cellPhone).toEqual(doctor.cellPhone);
    expect(body.doctors.cep.cep).toEqual(doctor.cep);
    expect(body.doctors.specialties).toHaveLength(2);
    expect(body.doctors.specialties[0].name).toEqual(doctor.specialties[0]);
    expect(body.doctors.specialties[1].name).toEqual(doctor.specialties[1]);
  });
  it('should be able to find a doctor when a cell phone is passed', async () => {
    const doctor = {
      name: faker.name.firstName(),
      crm: '1214599',
      cellPhone: '31999939909',
      cep: '35163143',
      specialties: ['Buco maxilo', 'Cardiologia infantil'],
    };

    const result = await request(app).post('/doctors').send(doctor).expect(201);

    const { body } = await request(app)
      .get(`/doctors/${result.body.doctor.cellPhone}`)
      .expect(200);

    expect(body.doctors).toHaveProperty('id');
    expect(body.doctors.name).toEqual(doctor.name);
    expect(body.doctors.crm).toEqual(doctor.crm);
    expect(body.doctors.cellPhone).toEqual(doctor.cellPhone);
    expect(body.doctors.cep.cep).toEqual(doctor.cep);
    expect(body.doctors.specialties).toHaveLength(2);
    expect(body.doctors.specialties[0].name).toEqual(doctor.specialties[0]);
    expect(body.doctors.specialties[1].name).toEqual(doctor.specialties[1]);
  });
  it('should be able to find doctors when a landline is passed', async () => {
    const doctor1 = {
      name: faker.name.firstName(),
      crm: '1214500',
      cellPhone: '31999939902',
      cep: '35163143',
      landline: '3138242424',
      specialties: ['Buco maxilo', 'Cardiologia infantil'],
    };

    const result = await request(app)
      .post('/doctors')
      .send(doctor1)
      .expect(201);

    const doctor2 = {
      name: faker.name.firstName(),
      crm: '1214501',
      cellPhone: '31999939901',
      cep: '35163143',
      landline: '3138242424',
      specialties: ['Buco maxilo', 'Alergologia'],
    };

    await request(app).post('/doctors').send(doctor2).expect(201);

    const { body } = await request(app)
      .get(`/doctors/${result.body.doctor.landline}`)
      .expect(200);

    expect(Array.isArray([body.doctors])).toBeTruthy();
    expect(body.doctors).toHaveLength(2);
    expect(body.doctors[0].cellPhone).toEqual(doctor2.cellPhone);
    expect(body.doctors[0].name).toEqual(doctor2.name);
    expect(body.doctors[0].crm).toEqual(doctor2.crm);
    expect(body.doctors[0].cep.cep).toEqual(doctor2.cep);
    expect(body.doctors[0].specialties).toHaveLength(2);
    expect(body.doctors[0].specialties[1].name).toEqual(doctor2.specialties[0]);
    expect(body.doctors[0].specialties[0].name).toEqual(doctor2.specialties[1]);

    expect(body.doctors[1].cellPhone).toEqual(doctor1.cellPhone);
    expect(body.doctors[1].name).toEqual(doctor1.name);
    expect(body.doctors[1].crm).toEqual(doctor1.crm);
    expect(body.doctors[1].cep.cep).toEqual(doctor1.cep);
    expect(body.doctors[1].specialties).toHaveLength(2);
    expect(body.doctors[1].specialties[0].name).toEqual(doctor1.specialties[0]);
    expect(body.doctors[1].specialties[1].name).toEqual(doctor1.specialties[1]);
  });
});
