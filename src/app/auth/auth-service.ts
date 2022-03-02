import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private static BASE_URL = 'https://identitytoolkit.googleapis.com/v1/';
  private static SIGN_UP_URL = 'accounts:signUp?key=';
  private static SIGN_IN_URL = 'accounts:signInWithPassword?key=';
  private static KEY = environment.firebaseAPIKey;

  userAuthenticatedSub = new BehaviorSubject<User>(null);
  private tokenTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUpUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        AuthService.BASE_URL + AuthService.SIGN_UP_URL + `${AuthService.KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorReponse) => this.handleError(errorReponse)),
        tap((resData) => {
          this.handleUserAuthenticationData(resData);
        })
      );
  }

  signInUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        AuthService.BASE_URL + AuthService.SIGN_IN_URL + `${AuthService.KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorReponse) => this.handleError(errorReponse)),
        tap((resData) => {
          this.handleUserAuthenticationData(resData);
        })
      );
  }

  logout() {
    this.userAuthenticatedSub.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _accessToken: string;
      _tokenExpDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._accessToken,
      new Date(userData._tokenExpDate)
    );
    if (loadedUser.token) {
      this.userAuthenticatedSub.next(loadedUser);
      const expirationIn =
        new Date(userData._tokenExpDate).getTime() - new Date().getTime();
      this.autologout(expirationIn);
    }
  }

  autologout(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleUserAuthenticationData(resData: AuthResponseData) {
    const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expDate
    );
    this.userAuthenticatedSub.next(user);
    this.autologout(+resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorReponse: any) {
    console.log(errorReponse);
    let errorMessage = 'An unknown error occured!';
    if (!errorReponse.error || !errorReponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorReponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email is aready registered';
        break;
      case 'INVALID_PASSWORD':
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Invalid user or password';
        break;
    }

    return throwError(() => errorMessage);
  }
}
