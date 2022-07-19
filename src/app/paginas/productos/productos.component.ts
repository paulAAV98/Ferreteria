import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CarritoModalComponent } from 'src/app/componentes/carrito-modal/carrito-modal.component';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  public productos: any[] = [];
  public productosAUX: any[] = [];
  public categorias: any[] = [];
  private sucursal: string = '';

  constructor(private route: ActivatedRoute, private ps: ProductosService,
     private cs: CategoriasService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sucursal = this.route.snapshot.paramMap.get('nombre') || '';
    if (this.sucursal) {
      this.ps.obtenerProductosPorSucursal(this.sucursal)
        .subscribe((res: any) => {
          console.log(res.listaProductos);
          this.productos = res.listaProductos;
          this.productos = this.productos.reduce((unique, o) => {
            if (!unique.some((obj: any) => obj.codigoProducto === o.codigoProducto && obj.nombre === o.nombre)) {
              unique.push(o);
            }
            return unique;
          }, []);
          this.productosAUX = this.productos.slice();
        });
      this.cs.obtenerCategorias()
        .subscribe((res: any) => {
          this.categorias = res;
          console.log(res);
        });
    }
  }

  public filtrar(event: any) {
    const codigo = (event.target as HTMLInputElement).value;
    this.productos = this.productosAUX.slice();
    if (codigo) {
      console.log(codigo);
      this.productos = this.productos.filter((v, i) => {
        console.log(v.categoria.codigoCategoria, codigo);
        return v.categoria.codigoCategoria == codigo;
      });
      console.log(this.productos);
    }
  }

  public abrirModal(producto: any) {
    const dialogRef = this.dialog.open(CarritoModalComponent);
    dialogRef.componentInstance.producto = producto;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
