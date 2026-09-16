import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<{ vehicles: any[] }> {
    return this.http.get<{ vehicles: any[] }>(`${this.baseUrl}/vehicles`);
  }

  getVehicleById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vehicles/${id}`);
  }

  getVehicleDataByVin(vin: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/vehicleData`, { vin });
  }
}
