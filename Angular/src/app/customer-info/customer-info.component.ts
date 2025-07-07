import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerService } from '../Services/customer-service.service';
import { CustomerType } from '../Models/customer.type';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import type { ColDef } from 'ag-grid-community';
import {
  AllCommunityModule,
  colorSchemeDarkBlue,
  colorSchemeDarkWarm,
  colorSchemeLightCold,
  colorSchemeLightWarm,
  ModuleRegistry,
  themeQuartz,
} from 'ag-grid-community';
import { DxButtonModule } from 'devextreme-angular';
import { colorSchemeDark } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withPart(colorSchemeDark);

@Component({
  selector: 'app-customer-info',
  imports: [CommonModule, RouterModule, AgGridAngular, DxButtonModule],
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css'],
})
export class CustomerInfoComponent implements OnInit {
  theme1 = themeQuartz.withPart(colorSchemeLightWarm);
  theme2 = themeQuartz.withPart(colorSchemeLightCold);
  theme3 = themeQuartz.withPart(colorSchemeDarkWarm);
  theme4 = themeQuartz.withPart(colorSchemeDarkBlue);
  rowData: Array<CustomerType> = [];

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

  ngOnInit(): void {
    this.customerService
      .getCustomersFromApi()
      .subscribe((customers) => {
        this.rowData = customers;
        console.log(this.rowData);
      });
  }
}

export class CustomerInfoComponentModule {}
