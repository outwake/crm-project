import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Oportunidade } from "../entities/oportunidade.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";


//O recomendado em tese seria criar um Many to Many entre candidata e oportunidade
//criando assim uma nova tabela candidatura, porem isso iria fugir do escorpo

@Injectable()

export class OportunidadeService{

    constructor(
    @InjectRepository(Oportunidade)
    private oportunidadeRepository: Repository<Oportunidade>,
  ) {}



  //Procurar todos
   async findAll(): Promise<Oportunidade[]> {
     return await this.oportunidadeRepository.find({
      relations:["usuario"]
     });
   }


  //Procurar por ID
  async findById(id: number): Promise<Oportunidade> {
  const oportunidade = await this.oportunidadeRepository.findOne({
    where: {id},
     relations: ["usuario"]
    })

    if(!oportunidade){
        throw new HttpException('Oportunidade não encontrada', HttpStatus.NOT_FOUND);
    }
    return oportunidade;
  }


  //Procurar por Nome
   async findByNome(titulo: string): Promise<Oportunidade[]> {
    return await this.oportunidadeRepository.find({
      where: { titulo: ILike(`%${titulo}%`) },
       relations: ["usuario"]
    });
    }

    
  //Procurar por Modalidade  
    async findByModalidade(modalidade: string): Promise<Oportunidade[]> {
    return await this.oportunidadeRepository.find({
      where: {modalidade},
       relations: ["usuario"]
    });
    }

  // Procurar por Localização
    async findByLocalizacao(localizacao: string): Promise<Oportunidade[]> {
    return await this.oportunidadeRepository.find({
      where: { localizacao: ILike(`%${localizacao}%`) },
       relations: ["usuario"]
    });
    }

  //Procurar por Tipo de Contrato  
    async findByTipoContrato(tipoContrato: string): Promise<Oportunidade[]> {
    return await this.oportunidadeRepository.find({
      where: {tipoContrato}
    });
    }

  //Procurar por Experiencia 
    async findByNivelExperiencia(nivelExperiencia: string): Promise<Oportunidade[]> {
    return await this.oportunidadeRepository.find({
      where: {nivelExperiencia}
    });
    }

    
  //Criar oportunidade
    async create(oportunidade: Oportunidade): Promise<Oportunidade> {
        return await this.oportunidadeRepository.save(oportunidade);
    }

  //Atualizar 
   async update(id: number, oportunidade: Oportunidade): Promise<Oportunidade> {
     await this.oportunidadeRepository.update(id, oportunidade);
     return this.findById(id);
   }

   //Deletar
    async remove(id: number): Promise<DeleteResult>{
        await this.findById(id);
        return await this.oportunidadeRepository.delete(id);
    }
}