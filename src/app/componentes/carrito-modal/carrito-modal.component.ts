import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgregarCarritoService } from 'src/app/servicios/agregar-carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-modal',
  templateUrl: './carrito-modal.component.html',
  styleUrls: ['./carrito-modal.component.css']
})
export class CarritoModalComponent implements OnInit {

  @Input() public producto: any;
  public cantidad: number = 1;

  constructor(
    public dialogRef: MatDialogRef<CarritoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private acs: AgregarCarritoService
  ) { }

  ngOnInit(): void {
  }

  public save() {
    console.log(this.cantidad, this.producto);
    this.acs.agregarCarrito(this.cantidad, this.producto.nombre)
      .subscribe(res => {
        console.log(res);
        Swal.fire(
          'Producto agregado',
          `Producto agregado al carrito`,
          'success'
        );
        this.dialogRef.close();
      });
  }

}
