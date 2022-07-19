import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private ss: SesionService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return Object.values(this.loginForm.controls).forEach(control => {
        if (control instanceof FormGroup)
          Object.values(control.controls).forEach(ctrl => ctrl.markAsTouched());
        else
          control.markAsTouched();
      });
    }

    this.loading = true;

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(email, password);

    this.ss.iniciarSesion(email, password)
      .subscribe((res: any) => {
        this.loading = false;
        const user = JSON.stringify(res);
        localStorage.setItem('usuario', user);
        setTimeout(() => {
          location.href = '/';
        }, 1000);
      });
  }

  public isInValid(input: string) {
    return this.loginForm.get(input)?.invalid && this.loginForm.get(input)?.touched;
  }

  public isValid(input: string) {
    return this.loginForm.get(input)?.valid;
  }

}
