import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { OportunidadeModule } from './oportunidade/oportunidade.module';
import { UsuarioModule } from './usuario/usuario.module';
import { CandidataModule } from './candidata/candidata.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './data/services/dev.service';
import { ProdService } from './data/services/prod.service';


@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRootAsync({
	useClass: ProdService,
  imports: [ConfigModule],
}),
 OportunidadeModule, UsuarioModule, CandidataModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
