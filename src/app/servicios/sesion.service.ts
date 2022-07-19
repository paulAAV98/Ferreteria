import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService {
  private url: string = `${environment.service_url}`;

  constructor(private http: HttpClient) { }

  public recuperarUsuario(codigo: number) {
    this.http.get(`${this.url}/cuenta/${codigo}`)
      .subscribe(res => {
        localStorage.removeItem('usuario');
        const user = JSON.stringify(res);
        localStorage.setItem('usuario', user);
      });
  }

  public registrarCuenta(cedula: string, correo: string, contrasena: string) {
    return this.http.post(`${this.url}/cliente/registrar`, { cedula, correo, contrasena });
  }

  public editarCuenta(codigoCuenta: number, correo: string, contrasena: string) {
    return this.http.put(`${this.url}/cuenta/edit`, { codigoCuenta, correo, contrasena });
  }

  public iniciarSesion(correo: string, contrasena: string) {
    return this.http.post(`${this.url}/iniciarsesion`, { correo, contrasena });
  }

  public obtenerSesion() {
    const data = localStorage.getItem('usuario');
    if (data) {
      const usuario = JSON.parse(data);
      return usuario;
    }
    return null;
  }

  public cerrarSesion() {
    localStorage.clear();
  }
}
