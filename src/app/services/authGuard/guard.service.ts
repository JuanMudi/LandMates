import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth/auth.service';
import { map, Observable } from 'rxjs';
import { HeaderService } from '../header.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private authService = inject(AuthService);
  private router = inject(Router);
  private headerService = inject(HeaderService);

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        } else {
          this.headerService.setHeaderState(false);
          this.router.navigate(['/login']);

          return false;
        }
      })
    );
  }
}
