import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../service/vehicle.service';
import { MenuComponent } from '../../componentes/menu/menu';

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
  imports: [CommonModule, HttpClientModule, FormsModule, MenuComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  veiculos: Veiculo[] = [];

  veiculoSelecionado: Veiculo | null = null;

  dadosVeiculo: DadosVeiculo | null = null;

  carregandoVeiculos = false;
  carregandoDados = false;
  vinInput: string = '';
  erroVinMessage: string | null = null;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.carregarVeiculos();
  }

  carregarVeiculos(): void {
    this.carregandoVeiculos = true;
    this.vehicleService.getVehicles().subscribe({
      next: (resposta) => {
        this.veiculos = resposta.vehicles || [];
        this.carregandoVeiculos = false;
        // Do NOT auto-select or auto-fetch vehicle data here.
        this.veiculoSelecionado = null;
      },
      error: (erro) => {
        this.carregandoVeiculos = false;
        console.error('Erro ao carregar veículos:', erro);
      }
    });
  }

  selecionarVeiculo(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const id = Number(select.value);
    this.selecionarVeiculoById(id);
  }

  selecionarVeiculoById(id: number): void {
    if (!id) return;
    // Only set the selected vehicle and clear previously loaded vehicle data.
    const veiculo = this.veiculos.find(v => v.id === id) || null;
    this.veiculoSelecionado = veiculo;
    this.dadosVeiculo = null;
  }

  consultarPorVin(): void {
    const vin = (this.vinInput || '').trim();
    if (!vin) {
      this.erroVinMessage = 'Informe um VIN válido.';
      return;
    }

    this.erroVinMessage = null;
    this.carregandoDados = true;

    this.vehicleService.getVehicleDataByVin(vin).subscribe({
      next: (dados) => {
        this.dadosVeiculo = dados;
        this.carregandoDados = false;
      },
      error: (err) => {
        console.error('Erro ao consultar VIN:', err);
        this.erroVinMessage = 'Não foi possível encontrar dados para o VIN informado.';
        this.carregandoDados = false;
      }
    });
  }
}