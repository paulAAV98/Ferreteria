import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgregarCarritoService } from 'src/app/servicios/agregar-carrito.service';
import Swal from 'sweetalert2';
import { CarritoModalComponent } from '../carrito-modal/carrito-modal.component';

@Component({
  selector: 'app-editar-carrito',
  templateUrl: './editar-carrito.component.html',
  styleUrls: ['./editar-carrito.component.css']
})
export class EditarCarritoComponent implements OnInit {

  @Input() public carrito: any;

  constructor(
    public dialogRef: MatDialogRef<CarritoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private acs: AgregarCarritoService
  ) { }

  ngOnInit(): void {
  }

  public save() {
    console.log(this.carrito.cantidad, this.carrito.descripcion);
    this.carrito.precioTotal = this.carrito.precioUnitario * this.carrito.cantidad;
    this.acs.editarCarrito(this.carrito.cantidad, this.carrito.descripcion)
      .subscribe({
        next: res => {
          console.log(res);
          Swal.fire(
            'Producto editado',
            `Producto actualizado`,
            'success'
          );
          this.dialogRef.close();
        },
        error: e => {
          console.log(e);
          Swal.fire(
            'Producto editado',
            `Producto actualizado`,
            'success'
          );
          this.dialogRef.close();
        }
      });
  }

}
