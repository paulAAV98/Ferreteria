import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url: string = `${environment.service_url}/sucursalproducto`;

  constructor(private http: HttpClient) { }

  public obtenerProductosPorSucursal(sucursal: string) {
    return this.http.get(`${this.url}/${sucursal}`);
  }
}
