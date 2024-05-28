import { Injectable } from '@angular/core';
import { UserRegistration } from '../../../models/user/user-registration';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  signUp(user: UserRegistration): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, user, { observe: 'response' });
  }
  verifyEmail(email: string): Observable<any> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/requestverify?email=${email}`)
  }
}
