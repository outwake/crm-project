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

  // 🔎 tenta encontrar recrutador
  const usuario = await this.usuarioService.findByUsuario(username);

  if (usuario) {
    const match = await this.bcrypt.compararSenhas(password, usuario.senha);

    if (match) {
      const { senha, ...resposta } = usuario;
      return { ...resposta, tipo: "RECRUITER" };
    }
  }

  // 🔎 tenta encontrar candidata
  const candidata = await this.candidataService.findByEmail(username);

  if (candidata) {
    const match = await this.bcrypt.compararSenhas(password, candidata.senha);

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
    token: `Bearer ${this.jwtService.sign(payload)}`
  };
}
}