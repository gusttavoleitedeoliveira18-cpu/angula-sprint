
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent {

  menuAberto = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  irPara(rota: string) {
    this.menuAberto = false;
    this.router.navigate([rota]);
  }

  logout() {
    this.menuAberto = false;
    this.authService.logout();
  }
}
