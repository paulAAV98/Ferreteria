import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private url: string = `${environment.service_url}`;

  constructor(private http: HttpClient) { }

  public registrarTarjeta(numeroTarjeta: string, fechaCa: String, codigoSegu: string, nombreTarj: string, codigoCuenta: number) {
    return this.http.post(`${this.url}/cuenta/tarjeta`, { numeroTarjeta, fechaCa, codigoSegu, nombreTarj, codigoCuenta });
  }

  public eliminarTarjeta(codigo: number) {
    return this.http.delete(`${this.url}/tarjeta/delete/${codigo}`);
  }
}
