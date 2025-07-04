import { Component } from '@angular/core';
import { SqlApiService } from '../Services/customer-service.service';
import { CustomerType } from '../Models/customer.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import {
  AllCommunityModule,
  ColDef,
  colorSchemeDarkBlue,
  colorSchemeLightCold,
  ModuleRegistry,
  themeQuartz,
} from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  providers: [SqlApiService],
  imports: [CommonModule, FormsModule, AgGridAngular],
})
export class EditCustomerComponent implements OnInit {
  data: CustomerType[] = [];
  tableFill: CustomerType[] = [];

  jsonvalue: any;
  updateSuccess = false;
  updateError = false;
  searchSuccess = false;
  searchError = false;
  customer: CustomerType = {
    customerId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  theme4 = themeQuartz.withPart(colorSchemeDarkBlue);
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

  constructor(private sqlApiService: SqlApiService) {}

  checkForm() {
    if (
      !this.customer.customerId ||
      !this.customer.firstName ||
      !this.customer.lastName ||
      !this.customer.email ||
      !this.customer.phone
    ) {
      this.updateSuccess = false;
      this.searchSuccess = false;
      this.updateError = false;
      this.searchError = false;
    }
  }

  loadCustomerById() {
    const foundCustomer = this.data.find(
      (c) => c.customerId === +this.customer.customerId
    );

    if (foundCustomer) {
      this.tableFill = [foundCustomer];
      this.customer = { ...foundCustomer };
      this.searchSuccess = true;
    } else {
      console.log('Customer not found');
      this.searchError = true;
    }
  }

  loadCustomerByIdAfterSubmit() {
    const foundCustomer = this.data.find(
      (c) => c.customerId === +this.customer.customerId
    );

    if (foundCustomer) {
      this.tableFill = [foundCustomer];
      this.searchSuccess = false;
    } else {
      console.log('Customer not found');
      this.searchError = true;
    }
  }

  ngOnInit(): void {
    this.refreshCustomers();
  }

  refreshCustomers() {
    this.sqlApiService
      .getCustomersFromApi()
      .subscribe((data: CustomerType[]) => {
        this.data = data;
      });
  }

  async saveCustomer(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.sqlApiService.updateCustomer(this.customer).subscribe({
        next: () => {
          console.log('Customer updated.');
          resolve();
        },
        error: (err) => {
          console.error('Failed to update customer', err);
          reject(err);
        },
      });
    });
  }

  async submitForm() {
    try {
      await this.saveCustomer();
      this.submitForm();
      this.refreshCustomers();
      this.loadCustomerByIdAfterSubmit();
      this.updateSuccess = true;
    } catch (err) {
      console.error('Error saving customer', err);
    }
  }
}
