import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelas1790728524941 implements MigrationInterface {
    name = 'CriarTabelas1790728524941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`expense_splits\` (\`id\` int NOT NULL AUTO_INCREMENT, \`despesaId\` int NOT NULL, \`usuarioId\` int NOT NULL, \`valorDevido\` decimal(10,2) NOT NULL, \`pago\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expenses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`descricao\` varchar(255) NOT NULL, \`valor\` decimal(10,2) NOT NULL, \`pagoPorId\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`email\` varchar(150) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`expense_splits\` ADD CONSTRAINT \`FK_94b718b561a8eb2ac66c8b85123\` FOREIGN KEY (\`despesaId\`) REFERENCES \`expenses\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expense_splits\` ADD CONSTRAINT \`FK_f22f007630e7e21d4a504951114\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`expenses\` ADD CONSTRAINT \`FK_d2a5960adcc06eb350da65c5809\` FOREIGN KEY (\`pagoPorId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`expenses\` DROP FOREIGN KEY \`FK_d2a5960adcc06eb350da65c5809\``);
        await queryRunner.query(`ALTER TABLE \`expense_splits\` DROP FOREIGN KEY \`FK_f22f007630e7e21d4a504951114\``);
        await queryRunner.query(`ALTER TABLE \`expense_splits\` DROP FOREIGN KEY \`FK_94b718b561a8eb2ac66c8b85123\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`expenses\``);
        await queryRunner.query(`DROP TABLE \`expense_splits\``);
    }

}
