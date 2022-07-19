import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { icon, Map, Marker, tileLayer } from 'leaflet';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { PedidosService } from 'src/app/servicios/pedidos.service';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public map!: Map;

  @Input() public lat!: number;
  @Input() public lng!: number;
  @Input() public sucursal!: string;

  public cedula: string = '';
  public usuario: any;

  constructor(
    public dialogRef: MatDialogRef<MapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ss: UsuarioService,
    private ps: PedidosService,
    private ses: SesionService,
  ) { }

  ngOnInit(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }

    this.map = new Map('map').setView([this.lat, this.lng], 14); //Inicializa al mapa.
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //Carga la capa base para el mapa.
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const icono = icon({
      iconUrl: 'assets/icono.webp',
      iconSize: [50, 90],
      iconAnchor: [22, 94],
      popupAnchor: [2, -70]
    });

    const marcador = new Marker([this.lat, this.lng], { icon: icono });
    marcador.addTo(this.map);
    marcador.bindPopup(`<a href="https://www.google.com/maps/?q=${this.lat},${this.lng}" target="_blank">Google Maps</a>`);
  }

  public buscar(cedula: string) {
    console.log(cedula);
    this.ss.buscarPorCedula(cedula)
      .subscribe(res => {
        this.usuario = res;
        console.info(this.usuario);
      });
  }

  public hacerPedido() {
    if (this.usuario) {
      const user = this.ses.obtenerSesion();
      this.ps.hacerPedido(this.sucursal, this.lat, this.lng, user['correo'], this.cedula)
        .subscribe(res => {
          console.log(res);
          this.dialogRef.close();
          Swal.fire('Pedido completado', 'Se acaba de registrar su pedido', 'success');
          location.href = '/carrito';
        });
    } else {
      Swal.fire('No hay usuario', 'Debe seleccionar un usuario para facturacion', 'error');
    }
  }

}
