import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { OportunidadeService } from "../services/oportunidade.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Oportunidade } from "../entities/oportunidade.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Oportunidade')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/oportunidades')

export class OportunidadeController{
    constructor( private readonly oportunidadeService: OportunidadeService){}

    // Listar todas
  @Get()
  findAll() {
    return this.oportunidadeService.findAll();
  }

  // Buscar por ID
  @Get('/id/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.oportunidadeService.findById(id);
  }

  // Buscar por título
  @Get('/titulo/:titulo')
  findByNome(@Param('titulo') titulo: string) {
    return this.oportunidadeService.findByNome(titulo);
  }

  // Buscar por modalidade
  @Get('/modalidade/:modalidade')
  findByModalidade(@Param('modalidade') modalidade: string) {
    return this.oportunidadeService.findByModalidade(modalidade);
  }

  // Buscar por localização
  @Get('/localizacao/:localizacao')
  findByLocalizacao(@Param('localizacao') localizacao: string) {
    return this.oportunidadeService.findByLocalizacao(localizacao);
  }

  // Buscar por tipo de contrato
  @Get('/contrato/:tipoContrato')
  findByTipoContrato(@Param('tipoContrato') tipoContrato: string) {
    return this.oportunidadeService.findByTipoContrato(tipoContrato);
  }

  // Buscar por nível de experiência
  @Get('/experiencia/:nivelExperiencia')
  findByNivelExperiencia(
    @Param('nivelExperiencia') nivelExperiencia: string,
  ) {
    return this.oportunidadeService.findByNivelExperiencia(nivelExperiencia);
  }

  // Criar oportunidade
  @Post()
  create(@Body() oportunidade: Oportunidade) {
    return this.oportunidadeService.create(oportunidade);
  }

  // Atualizar oportunidade
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() oportunidade:Oportunidade,
  ) {
    return this.oportunidadeService.update(id, oportunidade);
  }

  // Atualizar Parcialmente
  @Patch('/:id')
  partialUpdate(
  @Param('id', ParseIntPipe) id: number,
  @Body() oportunidade: Partial<Oportunidade>,
  ) {
  return this.oportunidadeService.partialUpdate(id, oportunidade);
  }
  
  // Deletar oportunidade
  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.oportunidadeService.remove(id);
  }
}