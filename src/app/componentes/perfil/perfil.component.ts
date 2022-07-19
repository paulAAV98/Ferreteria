import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SesionService } from 'src/app/servicios/sesion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public loading: boolean = false;
  public usuario: any;

  constructor(
    public dialogRef: MatDialogRef<PerfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ss: SesionService,
  ) {
    this.perfilForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', Validators.required],
    });
    this.usuario = this.ss.obtenerSesion();
  }

  ngOnInit(): void {
    this.perfilForm.patchValue({
      email: this.usuario['correo'],
      password: this.usuario['contrasena']
    });
  }

  public onSubmit() {
    if (this.perfilForm.invalid) {
      return Object.values(this.perfilForm.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }

    this.loading = true;

    const email = this.perfilForm.get('email')?.value;
    const password = this.perfilForm.get('password')?.value;
    console.log(email, password);

    const codigo = this.usuario['codigoCuenta'];
    this.ss.editarCuenta(codigo, email, password)
      .subscribe({
        next: res => {
          console.info(res);
          this.loading = false;
          Swal.fire('Cuenta editada', 'Usuario actualizado con exito', 'success');
          this.ss.recuperarUsuario(codigo);
          this.dialogRef.close();
        },
        error: e => {
          console.error(e);
          this.loading = false;
          Swal.fire('Error', 'Algo salio mal', 'error');
        }
      });

  }

  public isInValid(input: string) {
    return this.perfilForm.get(input)?.invalid && this.perfilForm.get(input)?.touched;
  }

  public isValid(input: string) {
    return this.perfilForm.get(input)?.valid;
  }
}
