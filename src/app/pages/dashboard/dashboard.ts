import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  veiculos = [
    {
      nome: 'Mustang',
      imagem: 'images/mustang.png',
      vin: '1FA6P8TH7M5102255',
      odometro: '9000 km',
      combustivel: '90 %',
      status: 'OK',
      lat: '-12.2222',
      long: '-38.3214'
    },
    {
      nome: 'Ranger',
      imagem: 'images/ranger.png',
      vin: '1FTER4FH5NLA12345',
      odometro: '8000 km',
      combustivel: '85 %',
      status: 'OK',
      lat: '-12.2222',
      long: '-38.3214'
    },
    {
      nome: 'Territory',
      imagem: 'images/territory.png',
      vin: 'LVSFAFAU8NV123456',
      odometro: '7000 km',
      combustivel: '75 %',
      status: 'OK',
      lat: '-12.2222',
      long: '-38.3214'
    },
    {
      nome: 'Bronco Sport',
      imagem: 'images/bronco-sport.png',
      vin: '3FMCR9B65MR123456',
      odometro: '6000 km',
      combustivel: '65 %',
      status: 'OK',
      lat: '-12.2222',
      long: '-38.3214'
    }
  ];

  veiculoSelecionado = this.veiculos[0];

  selecionarVeiculo(event: Event) {

    const select = event.target as HTMLSelectElement;

    const nome = select.value;

    const veiculo = this.veiculos.find(
      item => item.nome === nome
    );

    if (veiculo) {
      this.veiculoSelecionado = veiculo;
    }
  }
}