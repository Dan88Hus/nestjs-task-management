import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig : TypeOrmModuleOptions= {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "dev",
    password: "123",
    database: "dev",
    entities: [__dirname + "/../**/*.entity.ts"],
    synchronize: true,
}