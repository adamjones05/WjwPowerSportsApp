import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../Services/customer-service.service';
import { CustomerType } from '../Models/customer.type';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import {
  AllCommunityModule,
  colorSchemeLightCold,
  themeQuartz,
} from 'ag-grid-community';
import { colorSchemeDark } from 'ag-grid-community';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  imports: [FormsModule, CommonModule, AgGridAngular, RouterModule],
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css'],
})
export class AddCustomerComponent implements OnInit {
  title = 'Add Customer';
  customer: CustomerType = {
    customerId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  data: CustomerType[] = [];
  updateSuccess = false;
  updateError = false;
  theme2 = themeQuartz.withPart(colorSchemeLightCold);

  colDefs: ColDef[] = [
    { field: 'customerId' },
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'email' },
    { field: 'phone' },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
    resizable: true,
    editable: true,
  };

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.refreshCustomers();
  }

  refreshCustomers() {
    this.customerService
      .getCustomersFromApi()
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

  saveCustomer() {
    this.customerService.addCustomer(this.customer).subscribe({
      next: () => {
        this.refreshCustomers();
        this.updateSuccess = true;
        this.updateError = false;
      },
      error: (error) => {
        console.error(error);
        this.updateError = true;
        this.updateSuccess = false;
      }
    });
  }
}
