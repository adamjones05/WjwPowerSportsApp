import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerType } from '../Models/customer.type';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SqlApiService {
    private apiUrl = 'http://localhost:5000/customers/Post';
    customerList: Array<CustomerType> = [];
    
    constructor(private http: HttpClient) { }

    getCustomersFromApi(url: string) {
    return this.http.get<Array<CustomerType>>(url)
  }

  updateCustomer(customer: CustomerType): Observable<CustomerType> {
    return this.http.put<CustomerType>(this.apiUrl, customer);
  }

  AddCustomer(customer: CustomerType): Observable<CustomerType> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(customer);
    console.log(body)
    return this.http.post<CustomerType>(this.apiUrl, body,{'headers':headers})
  }

  getSingleCustomer(customerId: string): Observable<CustomerType> {
    return this.http.get<CustomerType>(`${this.apiUrl}/${customerId}`).pipe(
      catchError((error) => {
        console.error('Get single customer failed:', error);
      return throwError(() => error);
    })
  );
}

  DeleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${customerId}`).pipe(
      catchError((error) => {
        console.error('Delete failed:', error);
        return throwError(() => error);
      })
    );
  }
}
