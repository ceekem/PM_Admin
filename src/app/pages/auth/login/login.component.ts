import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { FunctionsService } from '../../../services/functions.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any;
  loading: boolean | undefined;
  constructor(
    public api: ApiService,
    public fun: FunctionsService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    if (this.auth.is_login) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.dirty && this.form.valid) {
      this.login();
    } else {
      for (let i in this.form.controls) this.form.controls[i].markAsTouched();
    }
  }

  login() {
    this.loading = true;
    this.api.post_('auth/admins', this.form.value).subscribe({
      complete: () => { },
      error: (error) => {
        this.loading = false;
        this.fun.presentAlertError(
          error.error.message ||
          error.error.sqlMessage ||
          'Something went wrong. Try again.'
        );
      },
      next: (response) => {
        this.loading = false;
        this.auth.setLogin(response);
        this.router.navigateByUrl('/dashboard');
      },
    });
  }

}