import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Veiculo {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string;
}

interface DadosVeiculo {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  veiculos: Veiculo[] = [];

  veiculoSelecionado: Veiculo | null = null;

  dadosVeiculo: DadosVeiculo | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {

    this.http.get<{ vehicles: Veiculo[] }>(
      'http://localhost:3001/vehicles'
    ).subscribe({
      next: (resposta) => {

        this.veiculos = resposta.vehicles;

        if (this.veiculos.length > 0) {
          this.veiculoSelecionado = this.veiculos[0];
        }

      },

      error: (erro) => {
        console.error('Erro ao carregar veículos:', erro);
      }
    });
  }

  selecionarVeiculo(event: Event): void {

    const select = event.target as HTMLSelectElement;

    const id = Number(select.value);

    const veiculo = this.veiculos.find(
      item => item.id === id
    );

    if (veiculo) {
      this.veiculoSelecionado = veiculo;
    }
  }

  carregarDadosVeiculo(vin: string): void {

    this.http.post<DadosVeiculo>(
      'http://localhost:3001/vehicleData',
      { vin }
    ).subscribe({
      next: (dados) => {
        this.dadosVeiculo = dados;
      },

      error: (erro) => {
        console.error('Erro ao carregar dados do veículo:', erro);
      }
    });
  }
}