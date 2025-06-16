import { Component, inject, OnInit, signal } from '@angular/core';
import { SqlApiService } from '../Services/sql-api.service';
import { CustomerType } from '../Models/customer.type';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common'
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AgGridAngular } from "ag-grid-angular";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, colorSchemeDarkBlue, colorSchemeLightCold, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { colorSchemeDark } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  imports: [FormsModule, CommonModule, AgGridAngular, RouterModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

title = 'Add Customer';
customer: CustomerType = {} as CustomerType;
data: CustomerType[] = [];
updateSuccess = false;
updateError = false;
theme4 = themeQuartz.withPart(colorSchemeDarkBlue);
theme2 = themeQuartz.withPart(colorSchemeLightCold);

colDefs: ColDef[] = [
      { field: "customerId" },
      { field: "firstName" },
      { field: "lastName" },
      { field: "email" },
      { field: "phone" }
   ];

    defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
  };

constructor(private sqlApiService: SqlApiService) { }

ngOnInit() {
  this.refreshCustomers();
}

refreshCustomers() {
  this.sqlApiService.getCustomersFromApi('http://localhost:5000/customers/post')
  .subscribe((data: CustomerType[]) => {
    this.data = data;
  });
}

checkForm() {
  if (
    !this.customer.firstName ||
    !this.customer.lastName ||
    !this.customer.email ||
    !this.customer.phone
  ) {
    this.updateSuccess = false;
  }
}

AddCustomer() {
  this.sqlApiService.AddCustomer(this.customer)
    .subscribe({
      next: (data) => {

        console.log(data);
        this.refreshCustomers();
        this.updateSuccess = true;
      },
      error: (error) => {
        console.error(error);
        this.updateError = true;
      }
    });


  }
}
