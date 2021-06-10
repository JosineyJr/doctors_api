import { MigrationInterface, QueryRunner } from 'typeorm';

export default class InsertSpecialties1623325047856
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO specialties_tb (name) VALUES ('Alergologia'),('Angiologia'),('Buco maxilo'),('Cardiologia clínca'),('Cardiologia infantil'),('Cirurgia cabeça e pescoço'),('Cirurgia cardíaca'),('Cirurgia de tórax')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DELETE FROM specialtiesTB WHERE name = 'Alergologia'",
    );
    await queryRunner.query(
      "DELETE FROM specialties_tb WHERE name = 'Angiologia'",
    );
    await queryRunner.query(
      "DELETE FROM specialties_tb WHERE name = 'Buco maxilo'",
    );
    await queryRunner.query(
      "DELETE FROM specialties_tb WHERE name = 'Cardiologia clínca'",
    );
    await queryRunner.query(
      "DELETE FROM specialties_tb WHERE name = 'Cardiologia infantil'",
    );
    await queryRunner.query(
      "DELETE FROM specialties_tb WHERE name = 'Cirurgia cabeça e pescoço'",
    );
    await queryRunner.query(
      "DELETE FROM specialties_tb WHERE name = 'Cirurgia cardíaca'",
    );
    await queryRunner.query(
      "DELETE FROM specialties_tb WHERE name = 'Cirurgia de tórax'",
    );
  }
}
