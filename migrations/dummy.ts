import { MigrationInterface, QueryRunner } from 'typeorm';

export class dummy implements MigrationInterface {
  name = 'dummy';

  public async up(queryRunner: QueryRunner): Promise<void> {
    throw new Error('You are running a dummy migration. Please remove it before you generate a real one.');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
