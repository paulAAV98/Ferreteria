import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TarjetaComponent } from 'src/app/componentes/tarjeta/tarjeta.component';
import { SesionService } from 'src/app/servicios/sesion.service';
import { TarjetaService } from 'src/app/servicios/tarjeta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  public tarjetas: any[] = [];
  public usuario: any;

  constructor(public dialog: MatDialog, private ss: SesionService, private ts: TarjetaService,) { }

  ngOnInit(): void {
    this.usuario = this.ss.obtenerSesion();
    this.tarjetas = this.usuario['tarjetaC'];
  }

  public add() {
    const dialogRef = this.dialog.open(TarjetaComponent, {
      width: '400px',
      height: '500px',
      panelClass: 'my-dialog',
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public borrar(codigo: number): void {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Estas a punto de eliminar la tarjeta de credito`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ts.eliminarTarjeta(codigo)
          .subscribe({
            next: res => {
              this.ss.recuperarUsuario(this.usuario['codigoCuenta']);
              Swal.fire(
                '¡Eliminado!',
                `Tarjeta eliminada`,
                'success'
              );
              setTimeout(() => {
                location.href = '/tarjetas';
              }, 500);
            },
            error: e => {
              this.ss.recuperarUsuario(this.usuario['codigoCuenta']);
              Swal.fire(
                '¡Eliminado!',
                `Tarjeta eliminada`,
                'success'
              );
              setTimeout(() => {
                location.href = '/tarjetas';
              }, 500);
            }
          });
      }
    });
  }

}
