import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormGroup, EmailValidator } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  error: true | false;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})

export class LoginDialogComponent implements OnInit {

  constructor(private authService: AuthService,
    public dialogRef: MatDialogRef<LoginDialogComponent>, private router: Router) { }

  ngOnInit(): void {

  }

  userMail: string = null;
  error: boolean = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)])
  });


  getErrorMessageEmail() {

    if (this.form.controls.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.controls.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {

    if (this.form.controls.password.hasError('required'))
      return 'Password can\'t be empty';

    return this.form.controls.password.hasError('minlength') ? 'Password must be at least 5 characters long' : '';

  }

  login() {
    const val = this.form.value;
    if (val.email && val.password) {

      this.authService.login(val.email, val.password)
        .subscribe(
          (_) => {
            this.router.navigateByUrl(this.authService.redirectUrl);
            this.dialogRef.close(true)
          },
          (errorSubs: HttpErrorResponse) => {
            this.error = true;
            this.form.reset();
          }
        )
    }
  }

  close() {
    this.dialogRef.close(false);
    this.router.navigate(['/home'])
  }


}
