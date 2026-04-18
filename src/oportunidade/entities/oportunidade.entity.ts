import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Candidata } from "../../candidata/entities/candidata.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { ApiProperty } from "@nestjs/swagger";



@Entity({name: "tb_oportunidades"})

export class Oportunidade{

  //Criação do ID
  @PrimaryGeneratedColumn()
  @ApiProperty()  
  id: number;

  //Criação de Titulo
  @Column({ length: 120 })
  @ApiProperty()  
  titulo: string;

  //Criação da Empresa
  @Column({ length: 120 })
  @ApiProperty()  
  empresa: string;

  //Criação de Área
  @Column({ length: 100 })
  @ApiProperty()  
  area: string;

  //Criação de Descrição
  @Column({ type: 'text' })
  @ApiProperty()  
  descricao: string;

  //Modalidade de trabalho
  @Column({ length: 100 })
  @ApiProperty()  
  tipoContrato: string; 
  // CLT | PJ | Freelancer | Estágio

  @Column({ length: 100 })
  @ApiProperty()  
  modalidade: string;
  // Presencial | Híbrido | Remoto

  //Salário
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @ApiProperty()  
  salario: number;

  //Localização
  @Column({ length: 100 })
  @ApiProperty()  
  localizacao: string;


  //Nivel de EXPERIENCIA
  @Column({ length: 100 })
  @ApiProperty()  
  nivelExperiencia: string;
  // Junior | Pleno | Senior

  @Column({ type: 'text', nullable: true })
  @ApiProperty()  
  beneficios: string;

  @Column({ default: true })
  @ApiProperty()  
  ativa: boolean;

  @CreateDateColumn()
  @ApiProperty()  
  dataCriacao: Date;

  @UpdateDateColumn()
  @ApiProperty()  
  dataAtualizacao: Date;


  //Relacionamento com Candidata
  @ApiProperty()  
  @ManyToOne(()=> Candidata, (candidata)=> candidata.oportunidade,{
    onDelete: "CASCADE"
  })
  candidata: Candidata;

  //Relacionamento Usuário

  @ApiProperty()  
  @ManyToOne(() => Usuario, (usuario) => usuario.oportunidade,{
    onDelete: "CASCADE"
  } )
  usuario: Usuario;

}

