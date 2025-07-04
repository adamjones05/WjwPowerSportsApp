import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerType } from '../Models/customer.type';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SqlApiService {
  private getUrl = 'http://localhost:5000/customer/GetCustomers';
  private deleteUrl = 'http://localhost:5000/customer/DeleteCustomer';
  private updateUrl = 'http://localhost:5000/customer/UpdateCustomer';
  private addUrl = 'http://localhost:5000/customer/AddCustomer';
  private getSingleUrl = 'http://localhost:5000/customer/GetCustomer';
  customerList: Array<CustomerType> = [];

  constructor(private http: HttpClient) {}

  getCustomersFromApi(getUrl: string = this.getUrl): Observable<Array<CustomerType>> {
    return this.http.get<Array<CustomerType>>(getUrl);
  }

  updateCustomer(customer: CustomerType): Observable<CustomerType> {
    return this.http.put<CustomerType>(this.updateUrl, customer);
  }

  addCustomer(customer: CustomerType): Observable<CustomerType> {
    return this.http.post<CustomerType>(this.addUrl, customer);
  }

  getSingleCustomer(customerId: string): Observable<CustomerType> {
    return this.http.get<CustomerType>(`${this.getSingleUrl}/${customerId}`).pipe(
      catchError((error) => {
        console.error('Get single customer failed:', error);
        return throwError(() => error);
      })
    );
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.deleteUrl}/${customerId}`).pipe(
      catchError((error) => {
        console.error('Delete failed:', error);
        return throwError(() => error);
      })
    );
  }
}
