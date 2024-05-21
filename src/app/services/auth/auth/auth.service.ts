import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /*
  * This method sends a POST request to the server to log in the user. 
  */
  login(email: string, password: string): Observable<any> {
    return this.http.post<string>(`${this.apiUrl}/auth/login`, { email, password })
    .pipe(
      tap((response: any) => {
        this.setToken(response.token);
      }));
  }

  isLoggedIn(): Observable<boolean> {
    const token = sessionStorage.getItem('token');
    return of(!!token)

  }
  // Obtiene el token de o sessionStorage
  getToken(): string | null {
    return sessionStorage.getItem('token');
  }

  private setToken(token: string): void {
    sessionStorage.setItem("token", token);
  
}
logout(): void {
  sessionStorage.removeItem('token');
}
}
