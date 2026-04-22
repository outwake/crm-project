import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Candidata } from "../entities/candidata.entity";
import { Bcrypt } from "../../auth/bcrypt/bcrypt";


//O recomendado em tese seria criar um Many to Many entre candidata e oportunidade
//criando assim uma nova tabela candidatura, porem isso iria fugir do escorpo

@Injectable()

export class CandidataService{
  constructor(
  @InjectRepository(Candidata)
  private readonly candidataRepository: Repository<Candidata>,
  private readonly bcrypt: Bcrypt
    ){}

//Procurar tudo
async findAll(): Promise<Candidata[]>{
    return await this.candidataRepository.find({})
}  

//Procurar por ID
async findById(id: number): Promise<Candidata>{
    const candidata = await this.candidataRepository.findOne({
        where:{id},
         relations:{
            oportunidade: true
        }
    });

    if(!candidata){
        throw new HttpException('Candidata não encontrada!', HttpStatus.NOT_FOUND);
    }

    return candidata;
}
//Produrar por Email
 async findByEmail(email: string): Promise<Candidata | null> {
        return await this.candidataRepository.findOne({
            where: {
                email: email
            }
        })
    }
//Procurar por Nome
async findByNome(nome: string): Promise<Candidata[]>{
    return await this.candidataRepository.find({
        where:{ nome: ILike(`%${nome}`)},
         relations:{
            oportunidade: true
        }
    })
}


//Procurar por Experiencia 
async findByNivelExperiencia(nivel_experiencia: string): Promise<Candidata[]> {
return await this.candidataRepository.find({
  where: {nivel_experiencia},
   relations:{
            oportunidade: true
        }
});
}

// Procurar Candidata por Localização
async findByLocalizacao(localizacao: string): Promise<Candidata[]> {
return await this.candidataRepository.find({
    where: { localizacao: ILike(`%${localizacao}%`) },
     relations:{
            oportunidade: true
        }
});
}

//Procurar Candidata por Area de atuação
async findByDisponibilidade( disponibilidade: string): Promise<Candidata[]>{
    return await this.candidataRepository.find({
        where: {disponibilidade},
        relations:{
            oportunidade: true
        }
    });
}


//Criação da Candidata
async create(candidata: Candidata): Promise<Candidata> {
  candidata.senha = await this.bcrypt.criptografarSenha(candidata.senha);
  return this.candidataRepository.save(candidata);
}

//Atualização de Candidata
async update(id: number, candidata: Candidata): Promise<Candidata> {
  await this.findById(id);

  if (candidata.senha) {
    candidata.senha = await this.bcrypt.criptografarSenha(candidata.senha);
  }

  candidata.id = id;
  return this.candidataRepository.save(candidata);
}

async remove(id: number): Promise<DeleteResult>{
    await this.findById(id);
    return await this.candidataRepository.delete(id);
}

}