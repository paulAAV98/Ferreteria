import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private url: string = `${environment.service_url}/pedido`;

  constructor(private http: HttpClient) { }

  public hacerPedido(sucursalNombre: string, latitudUsuario: number, lingitudUsuario: number, correoUsuario: string, cedulaUsuario: string) {
    return this.http.post(this.url + '/crearPedido', {
      sucursalNombre: sucursalNombre,
      latitudUsuario: latitudUsuario,
      lingitudUsuario: lingitudUsuario,
      correoUsuario: correoUsuario,
      cedulaUsuario: cedulaUsuario
    });
  }
  
  public listarPedido(codigo: number) {
    return this.http.get(`${this.url}/listar/${codigo}`);
  }

  public anularPedido(codigo: number) {
    return this.http.delete(`${this.url}/eliminar/${codigo}`);
  }

}
