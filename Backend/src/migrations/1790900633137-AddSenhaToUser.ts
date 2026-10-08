import { MigrationInterface, QueryRunner } from "typeorm";

export class AddSenhaToUser1790900633137 implements MigrationInterface {
    name = 'AddSenhaToUser1790900633137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`senha\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`email\` \`email\` varchar(150) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`senha\``);
    }

}
