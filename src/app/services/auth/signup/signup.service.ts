import { Injectable } from '@angular/core';
import { UserRegistration } from '../../../models/user/user-registration';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  signUp(user: UserRegistration): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, user)
  }
  verifyEmail(email: string): Observable<any> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/requestverify?email=${email}`)
  }
}
