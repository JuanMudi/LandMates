import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { UserRegistration } from '../models/user/user-registration';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;



  constructor(private http: HttpClient) { }

  getUserNameById(id: string): Observable<string> {
    return this.http.get<UserRegistration>(`${this.apiUrl}/user/${id}`).pipe(map(user => user.name + ' ' + user.lastName));
  }
}
