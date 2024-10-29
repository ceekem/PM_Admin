import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FunctionsService } from '../../services/functions.service';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  loading: boolean | undefined;
  users: any;
  count = {
    projects: 0,
    users: 0,
    clients : 0,
    staff : 0
  };
  company : any = {
    title : ""
  };
  projects : any
  constructor(
    public api: ApiService,
    public fun: FunctionsService,
    public auth: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.paramMap.get('company_id')) {
      this.getProjects(this.activatedRoute.snapshot.paramMap.get('company_id'));
      this.getCompany(this.activatedRoute.snapshot.paramMap.get('company_id'));
      this.getUsers(this.activatedRoute.snapshot.paramMap.get('company_id'));
      this.countProjects(
        this.activatedRoute.snapshot.paramMap.get('company_id')
      );
      this.countClients(this.activatedRoute.snapshot.paramMap.get('company_id'));
      this.countStaff(this.activatedRoute.snapshot.paramMap.get('company_id'));
    }
  }

  getCompany(company_id: any) {
    this.loading = true;
    let body = {
      companies: company_id,
    };
    this.api.get(`crud/companies/${company_id}`).subscribe({
      complete: () => {},
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
        this.company = response;
      },
    });
  }

  getProjects(company_id: any) {
    this.loading = true;
    let body = {
      companies: company_id,
    };
    this.api.post(`where/projects/and`, body).subscribe({
      complete: () => {},
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
        this.projects = response;
      },
    });
  }

  getUsers(company_id: any) {
    this.loading = true;
    let body = {
      companies: company_id,
    };
    this.api.post('where/users/and', body).subscribe({
      complete: () => {},
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
        this.users = response;
      },
    });
  }

  countProjects(company_id: any) {
    this.api.post(`admins/count/projects/${company_id}`, {}).subscribe({
      complete: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.fun.presentAlertError(
          error.error.message ||
            error.error.sqlMessage ||
            'Something went wrong. Try again.'
        );
      },
      next: (response: any) => {
        this.count.projects = response.count;
      },
    });
  }

  countStaff(company_id: any) {
    this.loading = true;
    this.api.post(`admins/count/staff/${company_id}`, {}).subscribe({
      complete: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.fun.presentAlertError(
          error.error.message ||
            error.error.sqlMessage ||
            'Something went wrong. Try again.'
        );
      },
      next: (response: any) => {
        this.count.staff = response.count;
      },
    });
  }

  countClients(company_id: any) {
    this.loading = true;
    this.api.post(`admins/count/clients/${company_id}`, {}).subscribe({
      complete: () => {
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.fun.presentAlertError(
          error.error.message ||
            error.error.sqlMessage ||
            'Something went wrong. Try again.'
        );
      },
      next: (response: any) => {
        this.count.clients = response.count;
      },
    });
  }
}
