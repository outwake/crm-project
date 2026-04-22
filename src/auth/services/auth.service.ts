import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from './../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { CandidataService } from '../../candidata/services/candidata.service';


@Injectable()
export class AuthService{
    constructor(
        private usuarioService: UsuarioService,
        private candidataService: CandidataService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){ }

   async validateUser(username: string, password: string): Promise<any> {

  console.log("USERNAME:", username);

  // 🔎 tenta encontrar recrutador
  const usuario = await this.usuarioService.findByUsuario(username);
  console.log("USUARIO:", usuario);

  if (usuario) {
    const match = await this.bcrypt.compararSenhas(password, usuario.senha);
    console.log("RECRUTADOR PASSWORD MATCH:", match);

    if (match) {
      const { senha, ...resposta } = usuario;
      return { ...resposta, tipo: "RECRUITER" };
    }
  }

  // 🔎 tenta encontrar candidata
  const candidata = await this.candidataService.findByEmail(username);
  console.log("CANDIDATA:", candidata);

  if (candidata) {
    const match = await this.bcrypt.compararSenhas(password, candidata.senha);
    console.log("CANDIDATA PASSWORD MATCH:", match);

    if (match) {
      const { senha, ...resposta } = candidata;
      return { ...resposta, tipo: "CANDIDATA" };
    }
  }

  throw new HttpException('Usuário não encontrado ou senha inválida!', HttpStatus.UNAUTHORIZED);
}

    async login(usuarioLogin: UsuarioLogin){

  const user = await this.validateUser(
    usuarioLogin.usuario,
    usuarioLogin.senha
  );

  const payload = {
    sub: user.id,
    tipo: user.tipo
  };

  return {
    id: user.id,
    nome: user.nome,
    usuario: usuarioLogin.usuario,
    tipo: user.tipo,
    token: this.jwtService.sign(payload)
  };
}
}