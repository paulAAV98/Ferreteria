import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtejerRutaGuard } from './guards/protejer-ruta.guard';
import { AcercaComponent } from './paginas/acerca/acerca.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { NoEcontradoComponent } from './paginas/no-econtrado/no-econtrado.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { SucursalesComponent } from './paginas/sucursales/sucursales.component';
import { TarjetasComponent } from './paginas/tarjetas/tarjetas.component';
import { VerCarritoComponent } from './paginas/ver-carrito/ver-carrito.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'productos/:nombre',
    component: ProductosComponent
  },
  {
    path: 'sucursales',
    component: SucursalesComponent
  },
  {
    path: 'acerca',
    component: AcercaComponent
  },
  {
    path: 'carrito',
    component: VerCarritoComponent
  },
  {
    path: 'tarjetas',
    canActivate: [ProtejerRutaGuard],
    component: TarjetasComponent,
  },
  {
    path: 'pedidos',
    canActivate: [ProtejerRutaGuard],
    component: PedidosComponent,
  },
  {
    path: '404',
    component: NoEcontradoComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
