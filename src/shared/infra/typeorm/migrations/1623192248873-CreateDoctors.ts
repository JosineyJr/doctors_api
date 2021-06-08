import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDoctors1623192248873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'doctorsTB',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'crm',
            type: 'varchar',
          },
          {
            name: 'landline',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'cellPhone',
            type: 'varchar',
          },
          {
            name: 'cep_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK_CEP',
            referencedTableName: 'cepsTB',
            referencedColumnNames: ['id'],
            columnNames: ['cep_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('doctorsTB');
  }
}
