import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  usuario: string = '';
  senha: string = '';

  mensagem: string = '';

  login(): void{

    if (this.usuario === 'admin' && this.senha === '123456') {
      this.mensagem = 'Login realizado com sucesso!';
    } else {
      this.mensagem = 'Usuário ou senha incorretos.';
    }

  }

}