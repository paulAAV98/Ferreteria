import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  public pedidos: any[] = [];
  private usuario: any;
  constructor(private ps: PedidosService, private ss: SesionService) { }

  ngOnInit(): void {
    this.usuario = this.ss.obtenerSesion();
    console.log(this.usuario);
    this.ps.listarPedido(this.usuario['codigoCuenta'])
      .subscribe((res: any) => {
        this.pedidos = res;
        console.log(this.pedidos);
      });
  }

  public anular(codigo: number) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: `Estas a punto de anular el pedido`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ps.anularPedido(codigo)
          .subscribe({
            next: res => {
              console.log(res);
              location.href = '/pedidos';
              Swal.fire(
                'Anulado',
                `Pedido cancelado`,
                'success'
              );
            },
            error: e => {
              console.log(e);
              location.href = '/pedidos';
              Swal.fire(
                'Anulado',
                `Pedido cancelado`,
                'success'
              );
            }
          });
      }
    });
  }

}
