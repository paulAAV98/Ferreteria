import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { SesionService } from '../servicios/sesion.service';

@Injectable({
  providedIn: 'root'
})
export class ProtejerRutaGuard implements CanActivate {

  constructor(private ss: SesionService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const usuario = this.ss.obtenerSesion();
    if (usuario)
      return true;
    this.router.navigateByUrl('/inicio');
    return false;
  }

}
