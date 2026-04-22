import { Body,Controller,Delete,Get,HttpCode,HttpStatus,Param,ParseIntPipe,Post,Put, UseGuards} from "@nestjs/common";
import { CandidataService } from "../services/candidata.service";
import { Candidata } from "../entities/candidata.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Candidata')
@Controller("/candidatas")
export class CandidataController {

  constructor(private readonly candidataService: CandidataService) {}

  // Buscar todas candidatas
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Candidata[]> {
    return this.candidataService.findAll();
  }

  // Buscar candidata por ID
  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  async findById(@Param("id", ParseIntPipe) id: number): Promise<Candidata> {
    return this.candidataService.findById(id);
  }

  // Buscar candidata por nome
  @UseGuards(JwtAuthGuard)
  @Get("/nome/:nome")
  async findByNome(@Param("nome") nome: string): Promise<Candidata[]> {
    return this.candidataService.findByNome(nome);
  }

  // Buscar por nível de experiência
  @UseGuards(JwtAuthGuard)
  @Get("/experiencia/:nivel") async findByNivelExperiencia(@Param("nivel") nivel: string): Promise<Candidata[]> {
    return this.candidataService.findByNivelExperiencia(nivel);
  }

  // Buscar por localização
  @UseGuards(JwtAuthGuard)
  @Get("/localizacao/:localizacao") async findByLocalizacao (@Param("localizacao") localizacao: string): Promise<Candidata[]> {
    return this.candidataService.findByLocalizacao(localizacao);
  }

  // Buscar por disponibilidade
  @UseGuards(JwtAuthGuard)
  @Get("/disponibilidade/:disponibilidade")
  async findByDisponibilidade(@Param("disponibilidade") disponibilidade: string): Promise<Candidata[]> {
    return this.candidataService.findByDisponibilidade(disponibilidade);
  }

  // Criar candidata
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() candidata: Candidata): Promise<Candidata> {
    return this.candidataService.create(candidata);
  }

  // Atualizar candidata
  @UseGuards(JwtAuthGuard)
  @Put("/:id")
  async update(@Param("id", ParseIntPipe) id: number, @Body() candidata: Candidata): Promise<Candidata> {
    return this.candidataService.update(id, candidata);
  }

  // Deletar candidata
  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param("id", ParseIntPipe) id: number) {
    return this.candidataService.remove(id);
  }

}