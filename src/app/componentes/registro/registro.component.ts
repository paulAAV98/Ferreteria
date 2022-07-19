import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SesionService } from 'src/app/servicios/sesion.service';
import { ValidarCedula } from 'src/utils/validar.cedula';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registerForm: FormGroup;
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<RegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ss: SesionService,
  ) {
    this.registerForm = this.formBuilder.group({
      cedula: ['', Validators.required, ValidarCedula.cedulaNoValida],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
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

    const cedula = this.registerForm.get('cedula')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    console.log(cedula, email, password);

    this.ss.registrarCuenta(cedula, email, password)
      .subscribe({
        next: res => {
          console.info(res);
          this.loading = false;
          setTimeout(() => {
            location.href = '/';
          }, 1000);
          Swal.fire('Cuenta creada', 'Usuario registrado con exito', 'success');
        },
        error: e => {
          console.info(e);
          this.loading = false;
          setTimeout(() => {
            location.href = '/';
          }, 1000);
          Swal.fire('Cuenta creada', 'Usuario registrado con exito', 'success');
          // console.error(e);
          // this.loading = false;
          // Swal.fire('Error', 'Algo salio mal', 'error');
        }
      });


  }

  public isInValid(input: string) {
    return this.registerForm.get(input)?.invalid && this.registerForm.get(input)?.touched;
  }

  public isValid(input: string) {
    return this.registerForm.get(input)?.valid;
  }

}
