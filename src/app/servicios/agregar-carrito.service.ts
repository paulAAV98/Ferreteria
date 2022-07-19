import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgregarCarritoService {
  private url: string = `${environment.service_url}/pedido`;

  constructor(private http: HttpClient) { }

  public agregarCarrito(cantidad: number, nombre: string) {
    return this.http.post(this.url + '/crearCarrito', {
      cantidad: cantidad,
      nombreProducto: nombre
    });
  }
  public editarCarrito(cantidad: number, nombre: string) {
    return this.http.post(this.url + '/editarCarrito', {
      cantidad: cantidad,
      nombre: nombre
    });
  }
  public eliminarCarrito(nombre: string) {
    return this.http.delete(this.url + '/eliminarCarrito/' + nombre);
  }


}
