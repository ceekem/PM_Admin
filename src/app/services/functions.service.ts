import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  constructor(
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) { }

  currentDate() {
    return this.datePipe.transform(new Date(), 'yyyy-MM-dd h:mm:ss');
  }

  transformDate(date: string | number | Date, sequence = 'MMM dd, yyyy') {
    // MySql format - 'y-MM-dd'
    return this.datePipe.transform(date, sequence);
  }

  presentAlert(title: string | undefined, message = 'Success') {
    this.toastr.success(title, message);
  }

  presentAlertError(title: string | undefined, message = 'Error') {
    this.toastr.error(title, message);
  }

  presentConfirm(fn: (arg0: boolean) => void, title: any, message = '') {
    if(confirm(title)) {
      fn(true)
  } else {
    fn(false)
  }
  }

  remove_object_from_array(array: any[], object: any) {
    return array.splice(array.indexOf(object), 1);
  }

  nameInitial(e : any) {
    return e.substring(0,1);
  }
}