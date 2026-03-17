import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { OportunidadeService } from "../services/oportunidade.service";
import { TipoContrato } from "../enums/contrato.enum";
import { ModalidadeTrabalho } from "../enums/modalidade.enum";
import { CreateOportunidadeDto } from "../dto/create.oportunidade.dto";
import { NivelExperiencia } from "../enums/nivel-experiencia.enum";




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
  findByModalidade(@Param('modalidade') modalidade: ModalidadeTrabalho) {
    return this.oportunidadeService.findByModalidade(modalidade);
  }

  // Buscar por localização
  @Get('/localizacao/:localizacao')
  findByLocalizacao(@Param('localizacao') localizacao: string) {
    return this.oportunidadeService.findByLocalizacao(localizacao);
  }

  // Buscar por tipo de contrato
  @Get('/contrato/:tipoContrato')
  findByTipoContrato(@Param('tipoContrato') tipoContrato: TipoContrato) {
    return this.oportunidadeService.findByTipoContrato(tipoContrato);
  }

  // Buscar por nível de experiência
  @Get('/experiencia/:nivelExperiencia')
  findByNivelExperiencia(
    @Param('nivelExperiencia') nivelExperiencia: NivelExperiencia,
  ) {
    return this.oportunidadeService.findByNivelExperiencia(nivelExperiencia);
  }

  // Criar oportunidade
  @Post()
  create(@Body() dto: CreateOportunidadeDto) {
    return this.oportunidadeService.create(dto);
  }

  // Atualizar oportunidade
  @Put('/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateOportunidadeDto,
  ) {
    return this.oportunidadeService.update(id, dto);
  }

  // Deletar oportunidade
  @Delete('/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.oportunidadeService.remove(id);
  }
}