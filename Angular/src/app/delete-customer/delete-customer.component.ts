import { Component } from '@angular/core';
import { CustomerService } from '../Services/customer-service.service';
import { CustomerType } from '../Models/customer.type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delete-customer',
  imports: [CommonModule, FormsModule],
  providers: [CustomerService],
  templateUrl: './delete-customer.component.html',
  styleUrls: ['./delete-customer.component.css'],
  standalone: true,
})
export class DeleteCustomerComponent {
  customer: CustomerType[] = [];
  customerId: number = 0;

  updateSuccess = false;
  updateError = false;
  notFound = false;

  constructor(private customerService: CustomerService) {}

  DeleteCustomerId() {
    this.customerService.deleteCustomer(this.customerId).subscribe({
      next: () => {
        console.log('Customer deleted successfully');
        this.updateSuccess = true;
      },
      error: (err) => {
        this.updateSuccess = false;
        console.error('Error deleting customer:', err);
        if (err.status === 404) {
          this.notFound = true;
          this.updateError = false;
        } else if (err.status === 200) {
          this.updateSuccess = true;
        } else {
          this.notFound = false;
          this.updateError = true;
        }
      },
    });
  }

  checkForm() {
    if (!this.customerId) {
      this.updateSuccess = false;
      this.updateError = false;
      this.notFound = false;
    }
  }
}
