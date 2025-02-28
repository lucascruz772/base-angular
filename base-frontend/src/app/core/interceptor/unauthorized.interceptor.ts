import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';


/**
 * 
 * 
 *  
 *  
 */



export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
      catchError((error) => {
        if (error.status == 401) {
          localStorage.removeItem('accessToken');
          router.navigate(['/auth/login']);
        }
        return throwError(() => error);
        })
      );
  };







