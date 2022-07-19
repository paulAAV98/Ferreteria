import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string = `${environment.service_url}`;

  constructor(private http: HttpClient) { }

  public buscarPorCedula(cedula: String) {
    return this.http.get(`${this.url}/cliente/${cedula}`);
  }
}
