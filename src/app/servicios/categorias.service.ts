import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private url: string = `${environment.service_url}/categorias`;

  constructor(private http:HttpClient) { }

  public obtenerCategorias(){
    return this.http.get(this.url, );
  } 
}
