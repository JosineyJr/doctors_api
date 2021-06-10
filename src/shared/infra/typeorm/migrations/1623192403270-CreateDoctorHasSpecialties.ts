import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDoctorHasSpecialties1623192403270
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctors_has_specialties',
        columns: [
          {
            name: 'doctor_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'specialty_id',
            type: 'uuid',
            isPrimary: true,
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK_doctor',
            columnNames: ['doctor_id'],
            referencedTableName: 'doctorsTB',
            referencedColumnNames: ['id'],
          }),
          new TableForeignKey({
            name: 'FK_specialty',
            columnNames: ['specialty_id'],
            referencedTableName: 'specialties_tb',
            referencedColumnNames: ['id'],
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctors_has_specialties');
  }
}
