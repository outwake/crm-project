import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Oportunidade } from "../../oportunidade/entities/oportunidade.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, TransformFnParams } from "class-transformer";
import { IsDateString } from "class-validator";


@Entity({name:"tb_candidata"})

export class Candidata{

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  //Nome
  @ApiProperty()
  @Column({ length: 120 })
  nome: string;

  //Email
  @ApiProperty()
  @Column({ length: 120, unique: true })
  email: string;

  // Telefone
  @ApiProperty()
  @Column({ length: 20 })
  telefone: string;
  

  //Data de nascimento
 @Transform(({ value }: TransformFnParams) => {
         // Verifica se a data chegou como string e se tem a letra 'T' separando o horário
         if (typeof value === 'string' && value.includes('T')) {
             return value.split('T')[0]; // Retorna apenas o 'YYYY-MM-DD'
         }
         return value?.trim();
     })
     @IsDateString()
     @Column({type: "date"})
     @ApiProperty() 
     dataNascimento: string; // <-- É melhor deixar como string para bater com o @IsDateString() e o TypeORM lida bem com isso
  
  //Localização
  @ApiProperty()
  @Column({ length: 100 })
  localizacao: string;
  

  //Area profissional
  @ApiProperty()
  @Column({ length: 100 })
  area_profissional: string;

  //Linkedin
  @ApiProperty()
  @Column({ length: 200, nullable: true })
  linkedin: string;
  

  //Portifólio
  @ApiProperty()
  @Column({ length: 200, nullable: true })
  portfolio: string;
  

  //Nivel de Experiencia
  @ApiProperty()
  @Column({ length: 100 })
  nivel_experiencia: string;


  // Pretensão Salarial
  @ApiProperty()
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  pretensao_salarial: number;


  //Disponibilidade
  @ApiProperty()
  @Column({ length: 100 })
  disponibilidade: string;


  //Data de Criação
  @ApiProperty()
  @CreateDateColumn()
  data_cadastro: Date;

  
  //Relacionamento com Oportunidade
  @ApiProperty()
  @OneToMany(() => Oportunidade,(oportunidade) => oportunidade.candidata)
  oportunidade: Oportunidade[];


}