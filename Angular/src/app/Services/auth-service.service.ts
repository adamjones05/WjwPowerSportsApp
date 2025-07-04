import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Login } from '../Models/Login.model';
import { Registration } from '../Models/Registration.model';
import { TokenResponse } from '../Models/TokenResponse.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  emptyLogin: Login = {
    email: '',
    password: '',
  };
  emptyRegistration: Registration = {
    email: '',
    password: '',
    passwordConfirm: '',
    firstName: '',
    lastName: '',
    city: '',
    gender: '',
  };

  firstName: string = '';
  lastName: string = '';
  userId: number = 0;
  email: string = '';
  isAuthenticated: boolean = false;
  token: string = '';

  constructor(public http: HttpClient) {}

  handleLogin(token: string) {
    return new Promise<void>((resolve) => {
      let tokenInfo: any = jwtDecode(token);
      // console.log(tokenInfo);
      this.firstName = tokenInfo['firstName'];
      this.lastName = tokenInfo['lastName'];
      this.userId = tokenInfo['userId'];
      this.email = tokenInfo['email'];
      this.token = token;
      this.isAuthenticated = true;

      resolve();
    });
  }

  postRegistration(userForRegister: Registration) {
    return this.http.post(
      'http://localhost:5000/Auth/Register',
      userForRegister
    );
  }

  postLogin(userForLogin: Login) {
    return this.http.post<TokenResponse>(
      'http://localhost:5000/Auth/Login',
      userForLogin
    );
  }

  getRefreshToken() {
    return this.http.get<TokenResponse>(
      'http://localhost:5000/Auth/RefreshToken'
    );
  }
}
