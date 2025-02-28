import { inject } from "@angular/core";
import { Type } from "@angular/core";
import { CanActivateChildFn, Router } from "@angular/router";
import { route } from "../../app.routes";
import { state } from "@angular/animations";

/**
 * 
 */

export const authGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('accessToken');

  if (token) {
    return true;
  } else {
    router.navigate(['/auth/login']);
    return false;
  }
};


