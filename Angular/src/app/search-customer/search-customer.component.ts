import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../Services/customer-service.service';
import { CustomerType } from '../Models/customer.type';
import { ColDef } from 'ag-grid-community';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-search-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, AgGridAngular],
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css'],
})
export class SearchCustomerComponent {
  data: Array<CustomerType> = [];

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
  };

  constructor(private customerService: CustomerService) {}

  customerId: string = '';
  customer: any;
  searchSuccess: boolean = false;
  searchError: boolean = false;

  checkForm() {
    if (!this.customerId) {
      this.searchSuccess = false;
      this.searchError = false;
    }
  }
  searchCustomer() {
    this.customerService.getSingleCustomer(this.customerId).subscribe({
      next: (customer) => {
        this.data = [customer];
        this.searchSuccess = true;
        this.searchError = false;
      },
      error: (error) => {
        console.error('Error fetching customer:', error);
        this.data = [];
        this.searchSuccess = false;
        this.searchError = true;
      },
    });
  }
}
