import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth-service.service';
import { Registration } from '../../Models/Registration.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registration: Registration;

  constructor(public authServ: AuthService, private router: Router) {
    this.registration = { ...this.authServ.emptyRegistration };
  }

  submitRegistration() {
    console.log(this.registration);
    this.authServ.postRegistration(this.registration).subscribe({
      next: (res) => {
        alert('Registration was successful!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log(err);
        if (err?.error?.message === 'User with email already exists!') {
          alert(err.error.message);
        } else {
          alert('There was an error processing your registration!');
        }
      },
    });
  }
}
