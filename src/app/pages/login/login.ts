import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
 
  usuario = '';
  senha = '';

  carregando = false;
  mensagemErro = '';

  
  fazerLogin(): void {
    if (!this.usuario || !this.senha) {
      this.mensagemErro = 'Por favor, preencha todos os campos.';
      return;
    }

    this.mensagemErro = '';
    this.carregando = true;

    console.log('Dados prontos para envio:', {
      usuario: this.usuario,
      senha: this.senha
    });

   
    setTimeout(() => {
      this.carregando = false;
      alert('Login efetuado com sucesso!');
    }, 1500);
  }
}