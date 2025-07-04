import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import '@angular/compiler';
import { provideHttpClient } from '@angular/common/http';
import { enableProdMode } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

if ((window as any).ENABLE_PROD_MODE) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), { provide: ActivatedRoute, useValue: {} }],
});

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
