import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  usuario = '';
  senha = '';

  carregando = false;
  mensagemErro = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  fazerLogin(): void {

    if (!this.usuario || !this.senha) {
      this.mensagemErro = 'Por favor, preencha todos os campos.';
      return;
    }

    this.carregando = true;
    this.mensagemErro = '';

    const dadosLogin = {
      nome: this.usuario,
      senha: this.senha
    };

    this.http.post('http://localhost:3001/login', dadosLogin)
      .subscribe({
        next: (resposta) => {

          console.log('Login realizado:', resposta);

          this.carregando = false;

          this.router.navigate(['/home']);
        },

        error: (erro) => {

          console.error('Erro no login:', erro);

          this.carregando = false;

          if (erro.status === 401) {
            this.mensagemErro = 'Usuário ou senha incorretos.';
          } else {
            this.mensagemErro = 'Não foi possível conectar com a API.';
          }
        }
      });
  }
}