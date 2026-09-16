import { Component } from '@angular/core';
import { MenuComponent } from '../../componentes/menu/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  menuAberto = false;

  toggleMenu() {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu() {
    this.menuAberto = false;
  }

}