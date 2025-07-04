import { Component } from '@angular/core';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';

@Component({
  selector: 'app-home',
  imports: [CustomerInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
