import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading: boolean | undefined;
  count = {
    companies: 0
  }
  constructor(
    public api: ApiService,
    public fun: FunctionsService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) { }


  ngOnInit() { 
    this.countCompanies();
  }

  countCompanies() {
    this.loading = true;
    this.api.post(`admins/count/companies`, {})
      .subscribe({
        complete: () => {
          this.loading = false;
        },
        error: (error) => {
          this.loading = false;
          this.fun.presentAlertError(error.error.message || error.error.sqlMessage || 'Something went wrong. Try again.');
        },
        next: (response: any) => {
          this.count.companies = response.count;
        },
      });
  }

}