import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Candidata } from "../../candidata/entities/candidata.entity";
import { Oportunidade } from "../../oportunidade/entities/oportunidade.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'db_crmproject',
            entities: [Candidata,Oportunidade, Usuario],
            synchronize: true,
    };
  }
}