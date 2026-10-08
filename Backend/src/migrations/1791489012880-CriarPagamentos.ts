import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarPagamentos1791489012880 implements MigrationInterface {
    name = 'CriarPagamentos1791489012880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`expense_payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`splitId\` int NOT NULL, \`valor\` decimal(10,2) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`expense_payments\` ADD CONSTRAINT \`FK_411ca6e0c2f4d330284d2f05462\` FOREIGN KEY (\`splitId\`) REFERENCES \`expense_splits\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expense_payments\` DROP FOREIGN KEY \`FK_411ca6e0c2f4d330284d2f05462\``);
        await queryRunner.query(`DROP TABLE \`expense_payments\``);
    }

}
