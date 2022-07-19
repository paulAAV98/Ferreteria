import { Component, OnInit } from '@angular/core';
import { SucursalesService } from 'src/app/servicios/sucursales.service';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {

  public sucursales: string[] = [];

  constructor(private ss: SucursalesService) { }

  ngOnInit(): void {
    this.ss.obtenerSucursales()
      .subscribe((res: any) => {
        console.log(res);
        this.sucursales = res;
      });
  }

}
