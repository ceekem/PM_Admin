import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  loading: boolean | undefined;
  companies: any;
  constructor(
    public api: ApiService,
    public fun: FunctionsService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.loading = true;
    this.api.get('crud/companies').subscribe({
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
        this.companies = response;
      },
    });
  }
}