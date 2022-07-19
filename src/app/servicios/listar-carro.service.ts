import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListarCarroService {

  private url: string = `${environment.service_url}/pedido/listarCarrito`;

  constructor(private http:HttpClient) { }

  public listarCarrito(){
    return this.http.get(this.url);
  } 
}
