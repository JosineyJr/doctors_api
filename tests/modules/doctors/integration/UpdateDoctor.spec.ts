import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import faker from 'faker';
import app from '@shared/infra/http/app';
import Doctor from '@modules/doctors/infra/typeorm/entities/Doctor';

let connection: Connection;
let createdDoctor: Doctor;

describe('PUT /doctors', () => {
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
  it('should not be able to update a doctor with invalid crm format', async () => {
    const update = {
      crm: '12145311',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(update)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.type).toBe('validation');
  });
  it('should not be able to update a doctor with a crm that has already registered', async () => {
    const update = {
      crm: '1214531',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(update)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('Crm has already been registered');
  });
  it('should not be able to update a doctor with invalid cep format', async () => {
    const update = {
      cep: '3516314',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(update)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.type).toBe('validation');
  });
  it('should not be able to update a doctor with nonexistent cep', async () => {
    const update = {
      cep: '35163142',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(update)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('Cep does not exist');
  });
  it('should not be able to update a doctor with a cell phone already registered', async () => {
    const update = {
      cellPhone: '31999931988',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(update)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('Cell phone has already been registered');
  });
  it('should not be able to update a doctor who has less than  two specialties', async () => {
    const update = {
      specialties: ['Cardiologia clínca'],
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(update)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('specialties must contain at least 2 items');
  });
  it('should not be able to update a doctor who has some unregistered specialty', async () => {
    const update = {
      specialties: ['Cardiologia clínca', faker.hacker.verb()],
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(update)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('The doctor`s specialties are not in database');
  });
  it('should not be able to update doctor', async () => {
    const update = {
      name: faker.name.firstName(),
      specialties: ['Cardiologia clínca', 'Cirurgia de tórax'],
      cep: '35160023',
      cellPhone: '31997014086',
      landline: '3138282426',
    };

    const { body } = await request(app)
      .put(`/doctors/${createdDoctor.id}`)
      .send(update)
      .expect(200);

    expect(body.doctor.id).toEqual(createdDoctor.id);
    expect(body.doctor.name).toEqual(update.name);
    expect(body.doctor.cep.cep).toEqual(update.cep);
    expect(body.doctor.cellPhone).toEqual(update.cellPhone);
    expect(body.doctor.landline).toEqual(update.landline);
    expect(body.doctor.specialties[1].name).toEqual(update.specialties[1]);
    expect(body.doctor.specialties[0].name).toEqual(update.specialties[0]);
  });
});
