import { Component, inject, Inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, DataTablesModule, CommonModule],
  template: `
    <app-header *ngIf="!isLoginRoute"></app-header>
    <main [class.page-content]="!isLoginRoute">
      <router-outlet />
    </main>
  `,
  styles: [
    `
      main {
        padding-inline: 16px;
      }
    `,
  ],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private router: Router) {}

  get isLoginRoute(): boolean {
    return ['/login', '/register'].includes(this.router.url);
  }
}
