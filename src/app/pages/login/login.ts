import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  usuario: string = '';
  senha: string = '';
  carregando: boolean = false;
  mensagemErro: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  fazerLogin() {
    this.carregando = true;
    this.mensagemErro = null;
    this.auth.login({ nome: this.usuario, senha: this.senha }).subscribe({
      next: () => {
        this.carregando = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.carregando = false;
        this.mensagemErro = 'Falha no login';
        console.error('falha no login', err);
      }
    });
  }
}

export { LoginComponent as Login };