import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SesionService } from 'src/app/servicios/sesion.service';
import { TarjetaService } from 'src/app/servicios/tarjeta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {

  public registerForm: FormGroup;
  public loading: boolean = false;
  private usuario: any;

  constructor(
    public dialogRef: MatDialogRef<TarjetaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ts: TarjetaService,
    private ss: SesionService,
  ) {
    this.registerForm = this.formBuilder.group({
      propietario: ['', Validators.required],
      numero: ['', [Validators.required, Validators.maxLength(16)]],
      codigo: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.usuario = this.ss.obtenerSesion();
  }

  public onSubmit() {
    if (this.registerForm.invalid) {
      return Object.values(this.registerForm.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }

    this.loading = true;

    const propietario = this.registerForm.get('propietario')?.value;
    const numero = this.registerForm.get('numero')?.value;
    const codigo = this.registerForm.get('codigo')?.value;
    const fecha = this.registerForm.get('fecha')?.value;
    console.log(propietario, numero, codigo, fecha);

    const cc = this.usuario['codigoCuenta'];

    this.ts.registrarTarjeta(numero, fecha, codigo, propietario, cc)
      .subscribe(res => {
        console.log(res);
        this.loading = false;
        Swal.fire('Tarjeta añadida', 'Terjeta registrada con exito', 'success');
        this.ss.recuperarUsuario(cc);
        setTimeout(() => {
          location.href = '/tarjetas';
        }, 1000);
      });

  }

  public isInValid(input: string) {
    return this.registerForm.get(input)?.invalid && this.registerForm.get(input)?.touched;
  }

  public isValid(input: string) {
    return this.registerForm.get(input)?.valid;
  }


}
