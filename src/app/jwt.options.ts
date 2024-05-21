import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../app/services/auth/auth/auth.service';

export function jwtOptionsFactory() {
  return {
    tokenGetter: () => {
      const authService = inject(AuthService);
      return authService.getToken();
    },
    allowedDomains: ['gruposjaveriana.dynaco.co/grupo-1-1'],  // Añade tu dominio de API aquí
    disallowedRoutes: ['gruposjaveriana.dynaco.co/grupo-1-1/auth/login', 'gruposjaveriana.dynaco.co/grupo-1-1/auth/signup' ]  // Añade tus rutas de autenticación aquí
  };
}

export const provideJwt: HttpInterceptorFn = (req, next) => {
  const token = jwtOptionsFactory().tokenGetter();
  if (token && !jwtOptionsFactory().disallowedRoutes.some(route => req.url.includes(route))) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
