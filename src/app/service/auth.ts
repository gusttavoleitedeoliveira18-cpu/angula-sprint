


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const USER_KEY = 'user_data';

export interface Usuario {
  id?: number;
  nome: string;
  senha?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3001';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(usuario: Pick<Usuario, 'nome' | 'senha'>): Observable<Usuario> {
    return this.http.post<Usuario>(
      `${this.apiUrl}/login`,
      usuario
    ).pipe(
      tap((resposta) => {
        sessionStorage.setItem(USER_KEY, JSON.stringify(resposta));
      })
    );
  }

  logout() {
    sessionStorage.removeItem(USER_KEY);
    this.router.navigate(['/login']);
  }

  estaLogado() {
    return sessionStorage.getItem(USER_KEY) !== null;
  }
}

