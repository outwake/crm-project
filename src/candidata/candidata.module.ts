import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Candidata } from "./entities/candidata.entity";
import { CandidataController } from "./controllers/candidata.controller";
import { CandidataService } from "./services/candidata.service";
import { Bcrypt } from "../auth/bcrypt/bcrypt";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Candidata]),
    forwardRef(() => AuthModule)
  ],
  controllers: [CandidataController],
  providers: [CandidataService],
  exports: [CandidataService],
})
export class CandidataModule {}