import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SesionService } from 'src/app/servicios/sesion.service';
import { LoginComponent } from '../login/login.component';
import { PerfilComponent } from '../perfil/perfil.component';
import { RegistroComponent } from '../registro/registro.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public sesionActiva: boolean = false;

  constructor(public dialog: MatDialog, private ss: SesionService,) { }

  ngOnInit(): void {
    const usuario = this.ss.obtenerSesion();
    if (usuario) {
      this.sesionActiva = true;
    }
  }

  public login() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '380px',
      panelClass: 'my-dialog',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public perfil() {
    const dialogRef = this.dialog.open(PerfilComponent, {
      width: '400px',
      height: '380px',
      panelClass: 'my-dialog',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public register() {
    const dialogRef = this.dialog.open(RegistroComponent, {
      width: '400px',
      height: '430px',
      panelClass: 'my-dialog',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public logout() {
    setTimeout(() => { 
      this.ss.cerrarSesion();
      location.href = '/';
     }, 1000)
  }

}
