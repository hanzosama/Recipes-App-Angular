import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) {}

  signUpUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        AuthService.BASE_URL + AuthService.SIGN_UP_URL + `${AuthService.KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError((errorReponse) => this.handleError(errorReponse)));
  }

  signInUser(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        AuthService.BASE_URL + AuthService.SIGN_IN_URL + `${AuthService.KEY}`,
        { email: email, password: password, returnSecureToken: true }
      )
      .pipe(catchError((errorReponse) => this.handleError(errorReponse)));
  }

  private handleError(errorReponse: any){
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
