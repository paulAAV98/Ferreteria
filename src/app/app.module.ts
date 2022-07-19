import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { AcercaComponent } from './paginas/acerca/acerca.component';
import { ProductosComponent } from './paginas/productos/productos.component';
import { NoEcontradoComponent } from './paginas/no-econtrado/no-econtrado.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { SucursalesComponent } from './paginas/sucursales/sucursales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarritoModalComponent } from './componentes/carrito-modal/carrito-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerCarritoComponent } from './paginas/ver-carrito/ver-carrito.component';
import { EditarCarritoComponent } from './componentes/editar-carrito/editar-carrito.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TarjetasComponent } from './paginas/tarjetas/tarjetas.component';
import { OcultarTarjetaPipe } from './pipes/ocultar-tarjeta.pipe';
import { TarjetaComponent } from './componentes/tarjeta/tarjeta.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { MapaComponent } from './componentes/mapa/mapa.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    AppComponent,
    NavBarComponent,
    InicioComponent,
    AcercaComponent,
    ProductosComponent,
    NoEcontradoComponent,
    FooterComponent,
    SucursalesComponent,
    CarritoModalComponent,
    VerCarritoComponent,
    EditarCarritoComponent,
    LoginComponent,
    RegistroComponent,
    TarjetasComponent,
    OcultarTarjetaPipe,
    TarjetaComponent,
    PerfilComponent,
    PedidosComponent,
    MapaComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
