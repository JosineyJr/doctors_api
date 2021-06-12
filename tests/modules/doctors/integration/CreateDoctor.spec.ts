import faker from 'faker';
import request from 'supertest';
import app from '@shared/infra/http/app';
import { Connection, createConnection } from 'typeorm';

let connection: Connection;

describe('POST /doctors', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to register a new doctor', async () => {
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

    expect(body.doctor).toHaveProperty('id');
    expect(body.doctor.crm).toEqual(doctor.crm);
    expect(body.doctor.cellPhone).toEqual(doctor.cellPhone);
    expect(body.doctor.cep).toHaveProperty('id');
    expect(body.doctor.specialties).toHaveLength(2);
  });
  it('should not be able to register a new doctor with a invalid cep format', async () => {
    const { body } = await request(app)
      .post('/doctors')
      .send({
        name: faker.name.firstName(),
        crm: '1214531',
        cellPhone: '31999931988',
        cep: '3516314',
        specialties: ['Angiologia', 'Cardiologia infantil'],
      })
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.type).toBe('validation');
  });
  it('should not be able to register a new doctor with a nonexistent cep', async () => {
    const { body } = await request(app)
      .post('/doctors')
      .send({
        name: faker.name.firstName(),
        crm: '1214539',
        cellPhone: '31999931988',
        cep: '35163142',
        specialties: ['Angiologia', 'Cardiologia infantil'],
      })
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('Cep does not exist');
  });
  it('should not be able to register a new doctor with a invalid crm format', async () => {
    const { body } = await request(app)
      .post('/doctors')
      .send({
        name: faker.name.firstName(),
        crm: '12145315',
        cellPhone: '31999931988',
        cep: '35163143',
        specialties: ['Angiologia', 'Cardiologia infantil'],
      })
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.type).toBe('validation');
  });
  it('should not be able to register a new doctor that has a crm already registered', async () => {
    const { body } = await request(app)
      .post('/doctors')
      .send({
        name: faker.name.firstName(),
        crm: '1214531',
        cellPhone: '31999137988',
        cep: '35163143',
        specialties: ['Angiologia', 'Cardiologia infantil'],
      })
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('Crm has already been registered');
  });
  it('should not be able to register a new doctor that has a cell phone already registered', async () => {
    await request(app)
      .post('/doctors')
      .send({
        name: faker.name.firstName(),
        crm: '1214599',
        cellPhone: '31999137778',
        cep: '35163143',
        specialties: ['Angiologia', 'Cardiologia infantil'],
      });

    const { body } = await request(app)
      .post('/doctors')
      .send({
        name: faker.name.firstName(),
        crm: '1214532',
        cellPhone: '31999137778',
        cep: '35163143',
        specialties: ['Angiologia', 'Cardiologia infantil'],
      })
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('Cell phone has already been registered');
  });
  it('should not be able to create a new doctor who has less than  two specialties', async () => {
    const doctor = {
      name: faker.name.firstName(),
      crm: '1214531',
      cellPhone: '31999939988',
      cep: '35163143',
      specialties: ['Angiologia'],
    };

    const { body } = await request(app)
      .post('/doctors')
      .send(doctor)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('specialties must contain at least 2 items');
  });
  it('should not be able to create a new doctor who has some unregistered specialty', async () => {
    const doctor = {
      name: faker.name.firstName(),
      crm: '1214999',
      cellPhone: '31999939000',
      cep: '35163143',
      specialties: ['Angiologia', faker.hacker.verb()],
    };

    const { body } = await request(app)
      .post('/doctors')
      .send(doctor)
      .expect(400);

    expect(body.status).toBe('error');
    expect(body.message).toBe('The doctor`s specialties are not in database');
  });
});
