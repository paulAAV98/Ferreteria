import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  private url: string = `${environment.service_url}/sucursales/nombres`;

  constructor(private http:HttpClient) { }

  public obtenerSucursales(){
    return this.http.get(this.url, );
  } 
}
