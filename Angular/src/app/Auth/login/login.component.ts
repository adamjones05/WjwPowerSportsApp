import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../Services/auth-service.service';
import { TokenResponse } from '../../Models/TokenResponse.model';
import { Login } from '../../Models/Login.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private router: Router, private authServ: AuthService) {}

  login: Login = {
    email: '',
    password: '',
  };

  submitLogin() {
    this.authServ.postLogin(this.login).subscribe({
      next: () => {
        this.router.navigate(['home']);
      },
      error: (loginError: any) => {
        console.log(loginError);
      },
    });
  }
}
