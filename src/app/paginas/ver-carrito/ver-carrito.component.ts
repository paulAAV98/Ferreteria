import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CarritoModalComponent } from 'src/app/componentes/carrito-modal/carrito-modal.component';
import { EditarCarritoComponent } from 'src/app/componentes/editar-carrito/editar-carrito.component';
import { MapaComponent } from 'src/app/componentes/mapa/mapa.component';
import { AgregarCarritoService } from 'src/app/servicios/agregar-carrito.service';
import { ListarCarroService } from 'src/app/servicios/listar-carro.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import { SucursalesService } from 'src/app/servicios/sucursales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-carrito',
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['./ver-carrito.component.css']
})
export class VerCarritoComponent implements OnInit {
  public listaCarrito: any[] = [];
  public sucursales: string[] = [];
  public sucur: string = '';
  public sesionActiva: boolean = false;

  constructor(private lcs: ListarCarroService,
    public dialog: MatDialog,
    private acs: AgregarCarritoService,
    private ss: SucursalesService,
    private ses: SesionService,
    ) { }

  ngOnInit(): void {
    const usuario = this.ses.obtenerSesion();
    if (usuario) {
      this.sesionActiva = true;
    }


    this.lcs.listarCarrito()
      .subscribe((res: any) => {
        console.log(res);
        this.listaCarrito = res;
      });

    this.ss.obtenerSucursales()
      .subscribe((res: any) => {
        console.log(res);
        this.sucursales = res;
      });
  }

  public abrirModal(carrito: any) {
    const dialogRef = this.dialog.open(EditarCarritoComponent);
    dialogRef.componentInstance.carrito = carrito;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public hacerPedido() {
    console.log(this.sucur);
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;
      console.info(lat, lng);
      const dialogRef = this.dialog.open(MapaComponent, {
        width: '600px',
        height: '570px',
        panelClass: 'my-dialog',
        disableClose: false
      });
      dialogRef.componentInstance.lat = lat;
      dialogRef.componentInstance.lng = lng;
      dialogRef.componentInstance.sucursal = this.sucur;
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    });

  }

  public eliminar(nombre: string) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Estas a punto de eliminar el producto del carrito`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.acs.eliminarCarrito(nombre)
          .subscribe({
            next: res => {
              console.log(res);
              location.href = '/carrito'
              Swal.fire(
                '¡Eliminado!',
                `Producto eliminado`,
                'success'
              );
            },
            error: e => {
              console.log(e);
              location.href = '/carrito'
              Swal.fire(
                '¡Eliminado!',
                `Producto eliminado`,
                'success'
              );
            }
          });
      }
    });


  }

}
